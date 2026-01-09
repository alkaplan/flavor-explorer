import { useState } from 'react';
import { useCompoundSearch, useFilterOptions } from '../hooks/useCompounds';

interface CompoundSearchProps {
  onQueryChange?: (query: string) => void;
}

export function CompoundSearch({ onQueryChange }: CompoundSearchProps) {
  const { filters, setQuery, updateFilter, clearFilters, resultCount, totalCount } = useCompoundSearch();
  const { chemicalClasses, naturalSources } = useFilterOptions();
  const [showFilters, setShowFilters] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onQueryChange?.(value);
  };

  return (
    <div className="space-y-3">
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search compounds..."
          value={filters.query || ''}
          onChange={handleQueryChange}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filter toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <svg
            className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Filters
        </button>
        <span className="text-sm text-gray-500">
          {resultCount} of {totalCount} compounds
        </span>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Chemical class filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Chemical Class
              </label>
              <select
                value={filters.chemicalClass || ''}
                onChange={(e) => updateFilter('chemicalClass', e.target.value || undefined)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">All classes</option>
                {chemicalClasses.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Natural source filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Natural Source
              </label>
              <select
                value={filters.naturalSource || ''}
                onChange={(e) => updateFilter('naturalSource', e.target.value || undefined)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">All sources</option>
                {naturalSources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear filters */}
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
