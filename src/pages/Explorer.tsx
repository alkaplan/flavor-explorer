import { useState } from 'react';
import { useCompoundSearch, useFilterOptions, useCompound } from '../hooks/useCompounds';
import { CompoundCard } from '../components/CompoundCard';
import { FlavorRadar } from '../components/FlavorRadar';

export function Explorer() {
  const { results, filters, setQuery, updateFilter, clearFilters, resultCount, totalCount } = useCompoundSearch();
  const { chemicalClasses, naturalSources } = useFilterOptions();
  const [selectedCompoundId, setSelectedCompoundId] = useState<string | null>(null);
  const selectedCompound = useCompound(selectedCompoundId);

  return (
    <div className="flex gap-6 h-full">
      {/* Left sidebar - Search and filters */}
      <div className="w-80 flex-shrink-0 space-y-4">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search compounds..."
            value={filters.query || ''}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="font-medium text-gray-900">Filters</h3>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Chemical Class</label>
            <select
              value={filters.chemicalClass || ''}
              onChange={(e) => updateFilter('chemicalClass', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">All classes</option>
              {chemicalClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Natural Source</label>
            <select
              value={filters.naturalSource || ''}
              onChange={(e) => updateFilter('naturalSource', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">All sources</option>
              {naturalSources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Clear filters
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Showing {resultCount} of {totalCount} compounds
        </p>
      </div>

      {/* Main content - Compound grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {results.map(compound => (
            <CompoundCard
              key={compound.id}
              compound={compound}
              onClick={() => setSelectedCompoundId(compound.id)}
            />
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No compounds found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Right sidebar - Selected compound detail */}
      {selectedCompound && (
        <div className="w-96 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-4 space-y-4 overflow-auto">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedCompound.name}</h2>
              <p className="text-sm text-gray-500">{selectedCompound.chemical_class}</p>
            </div>
            <button
              onClick={() => setSelectedCompoundId(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Flavor profile */}
          <FlavorRadar
            profile={selectedCompound.descriptors}
            height={250}
            showLegend={false}
            profileLabel={selectedCompound.name}
          />

          {/* Details */}
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-700">CAS Number:</span>
              <span className="ml-2 text-gray-600">{selectedCompound.cas}</span>
            </div>

            {selectedCompound.threshold_ppm && (
              <div>
                <span className="font-medium text-gray-700">Threshold:</span>
                <span className="ml-2 text-gray-600">{selectedCompound.threshold_ppm} ppm</span>
              </div>
            )}

            {selectedCompound.fema_number && (
              <div>
                <span className="font-medium text-gray-700">FEMA Number:</span>
                <span className="ml-2 text-gray-600">{selectedCompound.fema_number}</span>
              </div>
            )}

            <div>
              <span className="font-medium text-gray-700">Functional Groups:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {selectedCompound.functional_groups.map(group => (
                  <span key={group} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                    {group}
                  </span>
                ))}
              </div>
            </div>

            {selectedCompound.natural_sources.length > 0 && (
              <div>
                <span className="font-medium text-gray-700">Found in:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedCompound.natural_sources.map(source => (
                    <span key={source} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Top descriptors */}
            <div>
              <span className="font-medium text-gray-700">Descriptors:</span>
              <div className="mt-2 space-y-1">
                {Object.entries(selectedCompound.descriptors)
                  .sort((a, b) => b[1] - a[1])
                  .map(([descriptor, intensity]) => (
                    <div key={descriptor} className="flex items-center gap-2">
                      <span className="w-24 text-xs text-gray-600 truncate">
                        {descriptor.replace(/_/g, ' ')}
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${intensity * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-xs text-gray-500 text-right">
                        {Math.round(intensity * 100)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
