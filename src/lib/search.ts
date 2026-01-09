import type { Compound } from '../types';
import { compounds } from '../data/compounds';

export interface SearchFilters {
  query?: string;
  chemicalClass?: string;
  naturalSource?: string;
  descriptors?: string[];
  minThreshold?: number;
  maxThreshold?: number;
}

/**
 * Search and filter compounds based on various criteria
 */
export function searchCompounds(filters: SearchFilters): Compound[] {
  let results = [...compounds];

  // Text search across multiple fields
  if (filters.query && filters.query.trim()) {
    const query = filters.query.toLowerCase().trim();
    results = results.filter(compound => {
      const searchableText = [
        compound.name,
        compound.cas,
        compound.chemical_class,
        ...compound.natural_sources,
        ...compound.functional_groups,
        ...Object.keys(compound.descriptors)
      ].join(' ').toLowerCase();

      return searchableText.includes(query);
    });
  }

  // Filter by chemical class
  if (filters.chemicalClass) {
    results = results.filter(
      compound => compound.chemical_class.toLowerCase() === filters.chemicalClass!.toLowerCase()
    );
  }

  // Filter by natural source
  if (filters.naturalSource) {
    const source = filters.naturalSource.toLowerCase();
    results = results.filter(
      compound => compound.natural_sources.some(s => s.toLowerCase().includes(source))
    );
  }

  // Filter by descriptors (compound must have at least one of the specified descriptors)
  if (filters.descriptors && filters.descriptors.length > 0) {
    results = results.filter(compound => {
      const compoundDescriptors = Object.keys(compound.descriptors);
      return filters.descriptors!.some(d =>
        compoundDescriptors.some(cd => cd.toLowerCase().includes(d.toLowerCase()))
      );
    });
  }

  // Filter by threshold range
  if (filters.minThreshold !== undefined) {
    results = results.filter(
      compound => compound.threshold_ppm !== null && compound.threshold_ppm >= filters.minThreshold!
    );
  }

  if (filters.maxThreshold !== undefined) {
    results = results.filter(
      compound => compound.threshold_ppm !== null && compound.threshold_ppm <= filters.maxThreshold!
    );
  }

  return results;
}

/**
 * Get autocomplete suggestions based on partial input
 */
export function getAutocompleteSuggestions(input: string, limit: number = 10): string[] {
  if (!input || input.length < 2) return [];

  const query = input.toLowerCase();
  const suggestions = new Set<string>();

  for (const compound of compounds) {
    // Add compound names
    if (compound.name.toLowerCase().includes(query)) {
      suggestions.add(compound.name);
    }

    // Add matching natural sources
    for (const source of compound.natural_sources) {
      if (source.toLowerCase().includes(query)) {
        suggestions.add(source);
      }
    }

    // Add matching descriptors
    for (const descriptor of Object.keys(compound.descriptors)) {
      if (descriptor.toLowerCase().includes(query)) {
        suggestions.add(descriptor);
      }
    }

    if (suggestions.size >= limit * 2) break;
  }

  return Array.from(suggestions)
    .sort((a, b) => {
      // Prioritize starts-with matches
      const aStarts = a.toLowerCase().startsWith(query);
      const bStarts = b.toLowerCase().startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.localeCompare(b);
    })
    .slice(0, limit);
}

/**
 * Find compounds similar to a given compound based on descriptors
 */
export function findSimilarCompounds(compoundId: string, limit: number = 5): Compound[] {
  const target = compounds.find(c => c.id === compoundId);
  if (!target) return [];

  const targetDescriptors = Object.keys(target.descriptors);

  const scored = compounds
    .filter(c => c.id !== compoundId)
    .map(compound => {
      const compoundDescriptors = Object.keys(compound.descriptors);

      // Calculate Jaccard similarity for descriptor presence
      const intersection = targetDescriptors.filter(d => compoundDescriptors.includes(d));
      const union = new Set([...targetDescriptors, ...compoundDescriptors]);
      const jaccardSimilarity = intersection.length / union.size;

      // Calculate cosine similarity for descriptor values
      let dotProduct = 0;
      let magnitudeA = 0;
      let magnitudeB = 0;

      for (const descriptor of union) {
        const a = target.descriptors[descriptor] || 0;
        const b = compound.descriptors[descriptor] || 0;
        dotProduct += a * b;
        magnitudeA += a * a;
        magnitudeB += b * b;
      }

      const cosineSimilarity = magnitudeA > 0 && magnitudeB > 0
        ? dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB))
        : 0;

      // Combine both metrics
      const score = (jaccardSimilarity + cosineSimilarity) / 2;

      return { compound, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(s => s.compound);
}

/**
 * Get compounds grouped by chemical class
 */
export function getCompoundsByClass(): Record<string, Compound[]> {
  const grouped: Record<string, Compound[]> = {};

  for (const compound of compounds) {
    if (!grouped[compound.chemical_class]) {
      grouped[compound.chemical_class] = [];
    }
    grouped[compound.chemical_class].push(compound);
  }

  return grouped;
}

/**
 * Get all unique values for a given field (for filter dropdowns)
 */
export function getUniqueValues(field: 'chemical_class' | 'natural_sources' | 'functional_groups'): string[] {
  const values = new Set<string>();

  for (const compound of compounds) {
    if (field === 'chemical_class') {
      values.add(compound.chemical_class);
    } else {
      for (const value of compound[field]) {
        values.add(value);
      }
    }
  }

  return Array.from(values).sort();
}
