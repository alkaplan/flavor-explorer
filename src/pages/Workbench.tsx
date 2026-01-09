import { useState } from 'react';
import { useBlend } from '../hooks/useBlend';
import { useCompoundSearch } from '../hooks/useCompounds';
import { BlendWorkbench } from '../components/BlendWorkbench';
import { CompoundCard } from '../components/CompoundCard';
import { FlavorRadar } from '../components/FlavorRadar';
import { DescriptorBars } from '../components/DescriptorBars';
import { RecipeComparison } from '../components/RecipeComparison';

type ViewMode = 'radar' | 'bars' | 'comparison';

export function Workbench() {
  const { result, targetProfile, targetName, components } = useBlend();
  const { results, filters, setQuery } = useCompoundSearch();
  const [viewMode, setViewMode] = useState<ViewMode>('radar');

  const showComparison = viewMode === 'comparison' && targetProfile && targetName;

  return (
    <div className="flex gap-6 h-full">
      {/* Left sidebar - Compound palette */}
      <div className="w-80 flex-shrink-0 space-y-4 overflow-auto">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Compound Palette</h2>
          <input
            type="text"
            placeholder="Search to add..."
            value={filters.query || ''}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-auto">
          {results.slice(0, 20).map(compound => (
            <CompoundCard
              key={compound.id}
              compound={compound}
              showDetails={false}
            />
          ))}
        </div>
      </div>

      {/* Center - Blend workbench */}
      <div className="w-96 flex-shrink-0 overflow-auto">
        <BlendWorkbench />
      </div>

      {/* Right - Visualization */}
      <div className="flex-1 space-y-4 overflow-auto">
        {/* View mode toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('radar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'radar'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Radar Chart
          </button>
          <button
            onClick={() => setViewMode('bars')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'bars'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bar Chart
          </button>
          {targetProfile && (
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'comparison'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              Compare to {targetName}
            </button>
          )}
        </div>

        {/* Visualization */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <svg
                  className="mx-auto w-16 h-16 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No blend yet</h3>
                <p className="text-sm text-gray-500">
                  Add compounds from the palette to see your flavor profile
                </p>
              </div>
            </div>
          ) : showComparison ? (
            <RecipeComparison
              blendProfile={result.profile}
              targetProfile={targetProfile}
              targetName={targetName}
            />
          ) : viewMode === 'radar' ? (
            <FlavorRadar
              profile={result.profile}
              targetProfile={targetProfile}
              height={450}
              targetLabel={targetName || 'Target'}
            />
          ) : (
            <DescriptorBars
              profile={result.profile}
              targetProfile={targetProfile}
              height={450}
            />
          )}
        </div>

        {/* Active interactions summary */}
        {result.activeInteractions.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">
              Active Interactions ({result.activeInteractions.length})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {result.activeInteractions.map((interaction, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    interaction.interaction_type === 'emergence'
                      ? 'bg-purple-50 border border-purple-200'
                      : interaction.interaction_type === 'enhancement'
                      ? 'bg-green-50 border border-green-200'
                      : interaction.interaction_type === 'suppression'
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className={`text-xs font-medium uppercase ${
                    interaction.interaction_type === 'emergence'
                      ? 'text-purple-700'
                      : interaction.interaction_type === 'enhancement'
                      ? 'text-green-700'
                      : interaction.interaction_type === 'suppression'
                      ? 'text-red-700'
                      : 'text-gray-700'
                  }`}>
                    {interaction.interaction_type}
                  </span>
                  {interaction.emerged_descriptors.length > 0 && (
                    <p className="text-purple-700 mt-1">
                      +{interaction.emerged_descriptors.join(', ')}
                    </p>
                  )}
                  {interaction.enhanced_descriptors.length > 0 && (
                    <p className="text-green-700 mt-1">
                      ↑{interaction.enhanced_descriptors.join(', ')}
                    </p>
                  )}
                  {interaction.suppressed_descriptors.length > 0 && (
                    <p className="text-red-700 mt-1">
                      ↓{interaction.suppressed_descriptors.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
