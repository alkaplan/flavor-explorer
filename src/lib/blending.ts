import type { DescriptorVector, BlendComponent, Interaction } from '../types';
import { getCompoundById } from '../data/compounds';
import { getInteractionBetween } from '../data/interactions';

// Blending algorithm configuration
const CONFIG = {
  emergenceStrength: 0.6,      // How strong emerged descriptors appear
  suppressionFactor: 0.3,      // Multiplier for suppressed descriptors (lower = more suppression)
  enhancementFactor: 1.4,      // Multiplier for enhanced descriptors
  minConcentrationThreshold: 5, // Minimum concentration to consider a compound
};

export interface BlendResult {
  profile: DescriptorVector;
  activeInteractions: Interaction[];
  warnings: string[];
  contributions: Record<string, DescriptorVector>; // Per-compound contributions
}

/**
 * Compute the blended flavor profile from multiple compounds at various concentrations.
 *
 * Algorithm:
 * 1. Base blend: weighted average of compound descriptor vectors
 * 2. Apply pairwise interactions (emergence, suppression, enhancement)
 * 3. Apply higher-order heuristics for 3+ compound interactions
 * 4. Normalize final profile
 */
export function computeBlend(components: BlendComponent[]): BlendResult {
  const warnings: string[] = [];
  const activeInteractions: Interaction[] = [];
  const contributions: Record<string, DescriptorVector> = {};

  // Filter out components below threshold
  const activeComponents = components.filter(c => c.concentration >= CONFIG.minConcentrationThreshold);

  if (activeComponents.length === 0) {
    return { profile: {}, activeInteractions: [], warnings: [], contributions: {} };
  }

  // Step 1: Compute base blend (weighted average)
  const totalConcentration = activeComponents.reduce((sum, c) => sum + c.concentration, 0);
  let baseProfile: DescriptorVector = {};

  for (const component of activeComponents) {
    const compound = getCompoundById(component.compound_id);
    if (!compound) {
      warnings.push(`Compound ${component.compound_id} not found`);
      continue;
    }

    const weight = component.concentration / totalConcentration;
    const compoundContribution: DescriptorVector = {};

    for (const [descriptor, intensity] of Object.entries(compound.descriptors)) {
      const weightedIntensity = intensity * weight;
      baseProfile[descriptor] = (baseProfile[descriptor] || 0) + weightedIntensity;
      compoundContribution[descriptor] = weightedIntensity;
    }

    contributions[component.compound_id] = compoundContribution;
  }

  // Step 2: Apply pairwise interactions
  let modifiedProfile = { ...baseProfile };

  for (let i = 0; i < activeComponents.length; i++) {
    for (let j = i + 1; j < activeComponents.length; j++) {
      const compA = activeComponents[i];
      const compB = activeComponents[j];

      const interaction = getInteractionBetween(compA.compound_id, compB.compound_id);
      if (!interaction) continue;

      activeInteractions.push(interaction);

      // Calculate interaction strength based on minimum concentration
      const interactionStrength = Math.min(compA.concentration, compB.concentration) / 100;

      switch (interaction.interaction_type) {
        case 'emergence':
          // Add emerged descriptors
          for (const descriptor of interaction.emerged_descriptors) {
            modifiedProfile[descriptor] = (modifiedProfile[descriptor] || 0) +
              CONFIG.emergenceStrength * interactionStrength;
          }
          // Blend in the known outcome
          for (const [descriptor, intensity] of Object.entries(interaction.blend_descriptors)) {
            const blendInfluence = intensity * interactionStrength * 0.3;
            modifiedProfile[descriptor] = Math.max(
              modifiedProfile[descriptor] || 0,
              (modifiedProfile[descriptor] || 0) * 0.7 + blendInfluence
            );
          }
          break;

        case 'suppression':
          // Reduce suppressed descriptors
          for (const descriptor of interaction.suppressed_descriptors) {
            if (modifiedProfile[descriptor]) {
              modifiedProfile[descriptor] *= CONFIG.suppressionFactor;
              warnings.push(
                `${getCompoundById(compA.compound_id)?.name || compA.compound_id} may suppress ` +
                `"${descriptor}" notes`
              );
            }
          }
          break;

        case 'enhancement':
          // Boost enhanced descriptors
          for (const descriptor of interaction.enhanced_descriptors) {
            if (modifiedProfile[descriptor]) {
              modifiedProfile[descriptor] *= CONFIG.enhancementFactor;
            } else {
              modifiedProfile[descriptor] = 0.3 * interactionStrength;
            }
          }
          break;

        case 'additive':
          // No special processing for additive interactions
          break;
      }
    }
  }

  // Step 3: Apply higher-order heuristics for 3+ compounds
  if (activeComponents.length >= 3) {
    // Check for reinforced emergences (same emergence from multiple pairs)
    const emergenceCounts: Record<string, number> = {};
    for (const interaction of activeInteractions) {
      if (interaction.interaction_type === 'emergence') {
        for (const descriptor of interaction.emerged_descriptors) {
          emergenceCounts[descriptor] = (emergenceCounts[descriptor] || 0) + 1;
        }
      }
    }

    // Boost descriptors that emerge from multiple interactions
    for (const [descriptor, count] of Object.entries(emergenceCounts)) {
      if (count > 1) {
        modifiedProfile[descriptor] = (modifiedProfile[descriptor] || 0) * (1 + count * 0.2);
      }
    }

    // Check for conflicting suppressions and enhancements
    const enhanced = new Set(
      activeInteractions
        .filter(i => i.interaction_type === 'enhancement')
        .flatMap(i => i.enhanced_descriptors)
    );
    const suppressed = new Set(
      activeInteractions
        .filter(i => i.interaction_type === 'suppression')
        .flatMap(i => i.suppressed_descriptors)
    );

    // Partial cancellation when same descriptor is both enhanced and suppressed
    for (const descriptor of enhanced) {
      if (suppressed.has(descriptor)) {
        // They partially cancel out - net effect is slight reduction
        modifiedProfile[descriptor] = (modifiedProfile[descriptor] || 0) * 0.85;
        warnings.push(`Conflicting interactions affecting "${descriptor}"`);
      }
    }
  }

  // Step 4: Normalize (clamp to 0-1 range and apply L1 normalization for display)
  const normalizedProfile: DescriptorVector = {};
  let maxValue = 0;

  for (const [descriptor, intensity] of Object.entries(modifiedProfile)) {
    // Clamp to reasonable range
    const clamped = Math.max(0, Math.min(1.5, intensity));
    if (clamped > 0.01) { // Filter out very weak descriptors
      normalizedProfile[descriptor] = clamped;
      maxValue = Math.max(maxValue, clamped);
    }
  }

  // Scale so max is 1.0
  if (maxValue > 1) {
    for (const descriptor of Object.keys(normalizedProfile)) {
      normalizedProfile[descriptor] /= maxValue;
    }
  }

  return {
    profile: normalizedProfile,
    activeInteractions,
    warnings: [...new Set(warnings)], // Remove duplicate warnings
    contributions
  };
}

/**
 * Calculate similarity between two descriptor vectors (0-1, higher = more similar)
 */
export function calculateSimilarity(profileA: DescriptorVector, profileB: DescriptorVector): number {
  const allDescriptors = new Set([...Object.keys(profileA), ...Object.keys(profileB)]);

  if (allDescriptors.size === 0) return 0;

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (const descriptor of allDescriptors) {
    const a = profileA[descriptor] || 0;
    const b = profileB[descriptor] || 0;
    dotProduct += a * b;
    magnitudeA += a * a;
    magnitudeB += b * b;
  }

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  // Cosine similarity
  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

/**
 * Get the top N descriptors from a profile, sorted by intensity
 */
export function getTopDescriptors(profile: DescriptorVector, n: number = 10): [string, number][] {
  return Object.entries(profile)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

/**
 * Calculate what adding a compound would contribute to a blend
 */
export function previewCompoundAddition(
  currentComponents: BlendComponent[],
  newCompoundId: string,
  concentration: number = 50
): { delta: DescriptorVector; newInteractions: Interaction[]; warnings: string[] } {
  const currentResult = computeBlend(currentComponents);
  const newComponents = [...currentComponents, { compound_id: newCompoundId, concentration }];
  const newResult = computeBlend(newComponents);

  const delta: DescriptorVector = {};
  const allDescriptors = new Set([
    ...Object.keys(currentResult.profile),
    ...Object.keys(newResult.profile)
  ]);

  for (const descriptor of allDescriptors) {
    const oldValue = currentResult.profile[descriptor] || 0;
    const newValue = newResult.profile[descriptor] || 0;
    const change = newValue - oldValue;
    if (Math.abs(change) > 0.05) {
      delta[descriptor] = change;
    }
  }

  const newInteractions = newResult.activeInteractions.filter(
    i => !currentResult.activeInteractions.includes(i)
  );

  return {
    delta,
    newInteractions,
    warnings: newResult.warnings.filter(w => !currentResult.warnings.includes(w))
  };
}
