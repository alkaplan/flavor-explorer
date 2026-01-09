/**
 * Data processing script to convert GoodScents and odor-pair data
 * into our app's compound and interaction formats.
 *
 * Run with: npx tsx scripts/process_data.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============ Types ============

interface GoodScentsOdor {
  'TGSC ID': string;
  Tags: string;
  Description: string;
}

interface GoodScentsMolecule {
  CID: string;
  MolecularWeight: string;
  IsomericSMILES: string;
  IUPACName: string;
  name: string;
}

interface OdorPairEntry {
  mol1: string;
  mol1_notes: string[];
  mol2: string;
  mol2_notes: string[];
  blend_notes: string[];
}

interface Compound {
  id: string;
  name: string;
  cas: string;
  smiles: string;
  descriptors: Record<string, number>;
  threshold_ppm: number | null;
  chemical_class: string;
  functional_groups: string[];
  natural_sources: string[];
  fema_number: string | null;
  typical_use_ppm: number | null;
}

interface Interaction {
  compound_a: string;
  compound_b: string;
  interaction_type: 'additive' | 'emergence' | 'suppression' | 'enhancement';
  emerged_descriptors: string[];
  suppressed_descriptors: string[];
  enhanced_descriptors: string[];
  blend_descriptors: Record<string, number>;
  source: string;
}

// ============ Utility Functions ============

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => obj[h] = values[i] || '');
    return obj;
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseTags(tagStr: string): string[] {
  // Parse Python-style list: "['floral','leafy']"
  try {
    const cleaned = tagStr.replace(/'/g, '"');
    return JSON.parse(cleaned);
  } catch {
    return [];
  }
}

function normalizeDescriptor(desc: string): string {
  return desc.toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function inferChemicalClass(smiles: string, name: string): string {
  const nameLower = name.toLowerCase();

  if (smiles.includes('C(=O)O') && !smiles.includes('C(=O)OC')) return 'carboxylic acid';
  if (smiles.includes('C(=O)OC') || smiles.includes('COC(=O)')) return 'ester';
  if (smiles.includes('C=O') && !smiles.includes('C(=O)O')) return 'aldehyde';
  if (smiles.includes('C(=O)C')) return 'ketone';
  if (smiles.includes('O') && smiles.includes('C') && !smiles.includes('=O')) {
    if (smiles.includes('c1') || smiles.includes('C1=C')) return 'phenol';
    return 'alcohol';
  }
  if (smiles.includes('S')) return 'sulfur compound';
  if (smiles.includes('N')) return 'nitrogen compound';
  if (nameLower.includes('terpene') || nameLower.includes('pinene') || nameLower.includes('limonene')) return 'terpene';
  if (smiles.includes('c1ccccc1') || smiles.includes('C1=CC=CC=C1')) return 'aromatic';

  return 'other';
}

function inferFunctionalGroups(smiles: string): string[] {
  const groups: string[] = [];

  if (smiles.includes('O') && !smiles.includes('=O')) groups.push('hydroxyl');
  if (smiles.includes('C=O')) groups.push('carbonyl');
  if (smiles.includes('C(=O)O')) groups.push('carboxyl');
  if (smiles.includes('C(=O)OC') || smiles.includes('COC(=O)')) groups.push('ester');
  if (smiles.includes('C=C')) groups.push('alkene');
  if (smiles.includes('C#C')) groups.push('alkyne');
  if (smiles.includes('c1') || smiles.includes('C1=C')) groups.push('aromatic');
  if (smiles.includes('S')) groups.push('sulfur');
  if (smiles.includes('N')) groups.push('amine');

  return groups.length > 0 ? groups : ['hydrocarbon'];
}

// ============ Main Processing ============

async function main() {
  console.log('Processing flavor data...\n');

  // Read GoodScents data
  const dataDir = path.join(__dirname, '../data/raw');
  const moleculesCSV = fs.readFileSync(path.join(dataDir, 'goodscents_molecules.csv'), 'utf-8');
  const odorCSV = fs.readFileSync(path.join(dataDir, 'data_rw_odor.csv'), 'utf-8');

  const molecules = parseCSV(moleculesCSV) as unknown as GoodScentsMolecule[];
  const odors = parseCSV(odorCSV) as unknown as GoodScentsOdor[];

  console.log(`Loaded ${molecules.length} molecules`);
  console.log(`Loaded ${odors.length} odor records`);

  // Read odor-pair data
  const odorPairData: OdorPairEntry[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, 'odor_pair_full.json'), 'utf-8')
  );
  console.log(`Loaded ${odorPairData.length} odor pairs`);

  // Create SMILES to CID mapping from molecules
  const smilesToCid = new Map<string, string>();
  const cidToMolecule = new Map<string, GoodScentsMolecule>();

  for (const mol of molecules) {
    if (mol.CID && mol.IsomericSMILES) {
      smilesToCid.set(mol.IsomericSMILES, mol.CID);
      cidToMolecule.set(mol.CID, mol);
    }
  }

  // Build descriptor frequency map from odor-pair for normalization
  const allDescriptors = new Map<string, number>();
  for (const pair of odorPairData) {
    for (const note of [...pair.mol1_notes, ...pair.mol2_notes, ...pair.blend_notes]) {
      const norm = normalizeDescriptor(note);
      allDescriptors.set(norm, (allDescriptors.get(norm) || 0) + 1);
    }
  }

  // Get top 80 most common descriptors
  const topDescriptors = [...allDescriptors.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 80)
    .map(([d]) => d);

  console.log(`\nTop descriptors: ${topDescriptors.slice(0, 20).join(', ')}...`);

  // Build compound list from odor-pair molecules that have CIDs
  const compoundMap = new Map<string, {
    smiles: string;
    notes: string[];
    cid: string | null;
    name: string;
  }>();

  for (const pair of odorPairData) {
    if (!compoundMap.has(pair.mol1)) {
      const cid = smilesToCid.get(pair.mol1) || null;
      const mol = cid ? cidToMolecule.get(cid) : null;
      compoundMap.set(pair.mol1, {
        smiles: pair.mol1,
        notes: pair.mol1_notes,
        cid,
        name: mol?.name || ''
      });
    }
    if (!compoundMap.has(pair.mol2)) {
      const cid = smilesToCid.get(pair.mol2) || null;
      const mol = cid ? cidToMolecule.get(cid) : null;
      compoundMap.set(pair.mol2, {
        smiles: pair.mol2,
        notes: pair.mol2_notes,
        cid,
        name: mol?.name || ''
      });
    }
  }

  console.log(`\nUnique compounds in odor-pair: ${compoundMap.size}`);
  console.log(`Compounds with CIDs: ${[...compoundMap.values()].filter(c => c.cid).length}`);

  // Select top 500 compounds that have CIDs and good descriptor coverage
  const compoundsWithCids = [...compoundMap.entries()]
    .filter(([_, c]) => c.cid && c.notes.length >= 2)
    .sort((a, b) => b[1].notes.length - a[1].notes.length)
    .slice(0, 500);

  console.log(`Selected ${compoundsWithCids.length} compounds for export`);

  // Convert to our Compound format
  const compounds: Compound[] = compoundsWithCids.map(([smiles, data]) => {
    const mol = cidToMolecule.get(data.cid!);

    // Build descriptor vector
    const descriptors: Record<string, number> = {};
    const noteCount = data.notes.length;
    data.notes.forEach((note, i) => {
      const norm = normalizeDescriptor(note);
      if (topDescriptors.includes(norm)) {
        // Higher intensity for notes listed first (more prominent)
        descriptors[norm] = Math.round((1 - i * 0.05) * 100) / 100;
      }
    });

    return {
      id: data.cid!,
      name: mol?.name || `Compound ${data.cid}`,
      cas: '', // Would need separate lookup
      smiles: smiles,
      descriptors,
      threshold_ppm: null,
      chemical_class: inferChemicalClass(smiles, mol?.name || ''),
      functional_groups: inferFunctionalGroups(smiles),
      natural_sources: [],
      fema_number: null,
      typical_use_ppm: null
    };
  });

  // Generate interactions from odor-pair data
  // Focus on pairs where both compounds are in our selected set
  const selectedCids = new Set(compounds.map(c => c.id));
  const selectedSmiles = new Set(compoundsWithCids.map(([s]) => s));

  const interactionCounts = new Map<string, {
    count: number;
    blend_notes: Map<string, number>;
  }>();

  for (const pair of odorPairData) {
    const cid1 = smilesToCid.get(pair.mol1);
    const cid2 = smilesToCid.get(pair.mol2);

    if (!cid1 || !cid2 || !selectedCids.has(cid1) || !selectedCids.has(cid2)) continue;
    if (cid1 === cid2) continue;

    const key = [cid1, cid2].sort().join('|');

    if (!interactionCounts.has(key)) {
      interactionCounts.set(key, { count: 0, blend_notes: new Map() });
    }

    const entry = interactionCounts.get(key)!;
    entry.count++;

    for (const note of pair.blend_notes) {
      const norm = normalizeDescriptor(note);
      entry.blend_notes.set(norm, (entry.blend_notes.get(norm) || 0) + 1);
    }
  }

  console.log(`\nPotential interactions: ${interactionCounts.size}`);

  // Build a map for quick compound lookup
  const compoundByCid = new Map<string, Compound>();
  for (const comp of compounds) {
    compoundByCid.set(comp.id, comp);
  }

  // Select top interactions (most data points)
  const topInteractions = [...interactionCounts.entries()]
    .filter(([key, data]) => {
      if (data.count < 1) return false;
      const [cid1, cid2] = key.split('|');
      return compoundByCid.has(cid1) && compoundByCid.has(cid2);
    })
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 200);

  console.log(`Selected ${topInteractions.length} interactions for export`);

  // Convert to our Interaction format
  const interactions: Interaction[] = topInteractions.map(([key, data]) => {
    const [cid1, cid2] = key.split('|');
    const comp1 = compoundByCid.get(cid1)!;
    const comp2 = compoundByCid.get(cid2)!;

    // Build blend descriptor vector
    const blendDescriptors: Record<string, number> = {};
    const maxCount = Math.max(...data.blend_notes.values());

    for (const [note, count] of data.blend_notes) {
      if (topDescriptors.includes(note)) {
        blendDescriptors[note] = Math.round((count / maxCount) * 100) / 100;
      }
    }

    // Determine emerged descriptors (in blend but not in either compound)
    const mol1Descriptors = new Set(Object.keys(comp1.descriptors));
    const mol2Descriptors = new Set(Object.keys(comp2.descriptors));
    const combinedDescriptors = new Set([...mol1Descriptors, ...mol2Descriptors]);
    const blendDescs = Object.keys(blendDescriptors);

    // Emerged: prominent in blend but not in individual compounds
    const emerged = blendDescs.filter(d =>
      !combinedDescriptors.has(d) && blendDescriptors[d] >= 0.4
    );

    // Enhanced: present in components and strong in blend
    const enhanced = blendDescs.filter(d =>
      combinedDescriptors.has(d) && blendDescriptors[d] >= 0.6
    );

    // Suppressed: strong in individual compounds but weak/absent in blend
    const suppressed = [...combinedDescriptors].filter(d => {
      const inBlend = blendDescriptors[d] || 0;
      const inComp1 = comp1.descriptors[d] || 0;
      const inComp2 = comp2.descriptors[d] || 0;
      const maxIndividual = Math.max(inComp1, inComp2);
      return maxIndividual >= 0.5 && inBlend < 0.3;
    });

    // Classify interaction type based on most prominent effect
    let type: Interaction['interaction_type'] = 'additive';
    if (emerged.length >= 1) type = 'emergence';
    else if (enhanced.length >= 2) type = 'enhancement';
    else if (suppressed.length >= 1) type = 'suppression';

    return {
      compound_a: cid1,
      compound_b: cid2,
      interaction_type: type,
      emerged_descriptors: emerged.slice(0, 5),
      suppressed_descriptors: suppressed.slice(0, 5),
      enhanced_descriptors: enhanced.slice(0, 5),
      blend_descriptors: blendDescriptors,
      source: 'odor-pair'
    };
  });

  // ============ Output ============

  // Generate compounds.ts
  const compoundsTS = `import type { Compound } from '../types';

// Generated from GoodScents and odor-pair datasets
// ${compounds.length} compounds with odor descriptors

export const compounds: Compound[] = ${JSON.stringify(compounds, null, 2)};

// Helper to get compound by ID
export function getCompoundById(id: string): Compound | undefined {
  return compounds.find(c => c.id === id);
}

// Helper to search compounds
export function searchCompounds(query: string): Compound[] {
  const lowerQuery = query.toLowerCase();
  return compounds.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.cas.includes(query) ||
    c.chemical_class.toLowerCase().includes(lowerQuery) ||
    c.natural_sources.some(s => s.toLowerCase().includes(lowerQuery)) ||
    Object.keys(c.descriptors).some(d => d.toLowerCase().includes(lowerQuery))
  );
}

// Get all unique chemical classes
export function getChemicalClasses(): string[] {
  return [...new Set(compounds.map(c => c.chemical_class))].sort();
}

// Get all unique natural sources
export function getNaturalSources(): string[] {
  return [...new Set(compounds.flatMap(c => c.natural_sources))].sort();
}
`;

  // Generate interactions.ts
  const interactionsTS = `import type { Interaction } from '../types';

// Generated from odor-pair dataset
// ${interactions.length} pairwise interactions with blend outcomes

export const interactions: Interaction[] = ${JSON.stringify(interactions, null, 2)};

// Helper to find interactions for a compound
export function getInteractionsForCompound(compoundId: string): Interaction[] {
  return interactions.filter(
    i => i.compound_a === compoundId || i.compound_b === compoundId
  );
}

// Helper to find interaction between two specific compounds
export function getInteractionBetween(compoundA: string, compoundB: string): Interaction | undefined {
  return interactions.find(
    i => (i.compound_a === compoundA && i.compound_b === compoundB) ||
         (i.compound_a === compoundB && i.compound_b === compoundA)
  );
}

// Get all unique interaction types
export function getInteractionTypes(): string[] {
  return [...new Set(interactions.map(i => i.interaction_type))];
}
`;

  // Write output files
  const outDir = path.join(__dirname, '../src/data');
  fs.writeFileSync(path.join(outDir, 'compounds.ts'), compoundsTS);
  fs.writeFileSync(path.join(outDir, 'interactions.ts'), interactionsTS);

  console.log('\n✅ Generated src/data/compounds.ts');
  console.log('✅ Generated src/data/interactions.ts');

  // Print some stats
  const typeCounts = interactions.reduce((acc, i) => {
    acc[i.interaction_type] = (acc[i.interaction_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\nInteraction type distribution:');
  for (const [type, count] of Object.entries(typeCounts)) {
    console.log(`  ${type}: ${count}`);
  }
}

main().catch(console.error);
