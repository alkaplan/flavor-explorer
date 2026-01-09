import { useMemo, useState, useCallback } from 'react';
import type { Compound } from '../types';
import { compounds, getCompoundById } from '../data/compounds';
import { searchCompounds, getUniqueValues, findSimilarCompounds, type SearchFilters } from '../lib/search';

/**
 * Hook for accessing the full compound database
 */
export function useCompounds() {
  return useMemo(() => compounds, []);
}

/**
 * Hook for getting a single compound by ID
 */
export function useCompound(id: string | null): Compound | undefined {
  return useMemo(() => {
    if (!id) return undefined;
    return getCompoundById(id);
  }, [id]);
}

/**
 * Hook for searching and filtering compounds
 */
export function useCompoundSearch(initialFilters: SearchFilters = {}) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const results = useMemo(() => searchCompounds(filters), [filters]);

  const updateFilter = useCallback(<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const setQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, query }));
  }, []);

  return {
    results,
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    setQuery,
    totalCount: compounds.length,
    resultCount: results.length
  };
}

/**
 * Hook for getting filter options (for dropdowns)
 */
export function useFilterOptions() {
  return useMemo(() => ({
    chemicalClasses: getUniqueValues('chemical_class'),
    naturalSources: getUniqueValues('natural_sources'),
    functionalGroups: getUniqueValues('functional_groups')
  }), []);
}

/**
 * Hook for finding similar compounds
 */
export function useSimilarCompounds(compoundId: string | null, limit: number = 5): Compound[] {
  return useMemo(() => {
    if (!compoundId) return [];
    return findSimilarCompounds(compoundId, limit);
  }, [compoundId, limit]);
}

/**
 * Hook for compound selection state
 */
export function useCompoundSelection(initialSelected: string[] = []) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelected));

  const select = useCallback((id: string) => {
    setSelectedIds(prev => new Set(prev).add(id));
  }, []);

  const deselect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);

  const selectedCompounds = useMemo(() => {
    return Array.from(selectedIds)
      .map(id => getCompoundById(id))
      .filter((c): c is Compound => c !== undefined);
  }, [selectedIds]);

  return {
    selectedIds: Array.from(selectedIds),
    selectedCompounds,
    select,
    deselect,
    toggle,
    clear,
    isSelected,
    count: selectedIds.size
  };
}
