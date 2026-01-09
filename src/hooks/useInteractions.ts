import { useMemo } from 'react';
import type { Interaction, Compound } from '../types';
import { interactions, getInteractionsForCompound, getInteractionBetween } from '../data/interactions';
import { getCompoundById } from '../data/compounds';

/**
 * Hook for accessing all interactions
 */
export function useInteractions() {
  return useMemo(() => interactions, []);
}

/**
 * Hook for getting interactions involving a specific compound
 */
export function useCompoundInteractions(compoundId: string | null): Interaction[] {
  return useMemo(() => {
    if (!compoundId) return [];
    return getInteractionsForCompound(compoundId);
  }, [compoundId]);
}

/**
 * Hook for getting the interaction between two specific compounds
 */
export function useInteractionBetween(
  compoundA: string | null,
  compoundB: string | null
): Interaction | undefined {
  return useMemo(() => {
    if (!compoundA || !compoundB) return undefined;
    return getInteractionBetween(compoundA, compoundB);
  }, [compoundA, compoundB]);
}

/**
 * Enriched interaction with compound details
 */
export interface EnrichedInteraction extends Interaction {
  compoundADetails: Compound | undefined;
  compoundBDetails: Compound | undefined;
}

/**
 * Hook for getting interactions with full compound details
 */
export function useEnrichedInteractions(): EnrichedInteraction[] {
  return useMemo(() => {
    return interactions.map(interaction => ({
      ...interaction,
      compoundADetails: getCompoundById(interaction.compound_a),
      compoundBDetails: getCompoundById(interaction.compound_b)
    }));
  }, []);
}

/**
 * Hook for filtering interactions by type
 */
export function useInteractionsByType(type: Interaction['interaction_type'] | null): Interaction[] {
  return useMemo(() => {
    if (!type) return interactions;
    return interactions.filter(i => i.interaction_type === type);
  }, [type]);
}

/**
 * Hook for getting interaction statistics
 */
export function useInteractionStats() {
  return useMemo(() => {
    const stats = {
      total: interactions.length,
      byType: {
        additive: 0,
        emergence: 0,
        suppression: 0,
        enhancement: 0
      },
      bySource: {} as Record<string, number>,
      compoundsWithInteractions: new Set<string>()
    };

    for (const interaction of interactions) {
      stats.byType[interaction.interaction_type]++;
      stats.bySource[interaction.source] = (stats.bySource[interaction.source] || 0) + 1;
      stats.compoundsWithInteractions.add(interaction.compound_a);
      stats.compoundsWithInteractions.add(interaction.compound_b);
    }

    return {
      ...stats,
      uniqueCompoundsCount: stats.compoundsWithInteractions.size
    };
  }, []);
}

/**
 * Hook for checking if adding a compound would create new interactions
 */
export function usePotentialInteractions(
  currentCompoundIds: string[],
  newCompoundId: string | null
): Interaction[] {
  return useMemo(() => {
    if (!newCompoundId || currentCompoundIds.length === 0) return [];

    const potentialInteractions: Interaction[] = [];

    for (const existingId of currentCompoundIds) {
      const interaction = getInteractionBetween(existingId, newCompoundId);
      if (interaction) {
        potentialInteractions.push(interaction);
      }
    }

    return potentialInteractions;
  }, [currentCompoundIds, newCompoundId]);
}

/**
 * Hook for search/filter interactions
 */
export function useInteractionSearch(query: string): EnrichedInteraction[] {
  const enrichedInteractions = useEnrichedInteractions();

  return useMemo(() => {
    if (!query.trim()) return enrichedInteractions;

    const lowerQuery = query.toLowerCase();

    return enrichedInteractions.filter(interaction => {
      // Search by compound names
      const compoundAName = interaction.compoundADetails?.name.toLowerCase() || '';
      const compoundBName = interaction.compoundBDetails?.name.toLowerCase() || '';

      if (compoundAName.includes(lowerQuery) || compoundBName.includes(lowerQuery)) {
        return true;
      }

      // Search by interaction type
      if (interaction.interaction_type.includes(lowerQuery)) {
        return true;
      }

      // Search by emerged/suppressed/enhanced descriptors
      const allDescriptors = [
        ...interaction.emerged_descriptors,
        ...interaction.suppressed_descriptors,
        ...interaction.enhanced_descriptors
      ];

      if (allDescriptors.some(d => d.toLowerCase().includes(lowerQuery))) {
        return true;
      }

      return false;
    });
  }, [enrichedInteractions, query]);
}
