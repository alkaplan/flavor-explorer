import { useState } from 'react';
import { useInteractionSearch, useInteractionStats } from '../hooks/useInteractions';
import { InteractionWarning } from '../components/InteractionWarning';
import type { InteractionType } from '../types';

const interactionTypeInfo = {
  emergence: {
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'New flavor notes appear that weren\'t present in either compound alone'
  },
  enhancement: {
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Existing flavor notes become stronger and more pronounced'
  },
  suppression: {
    color: 'bg-red-100 text-red-800 border-red-200',
    description: 'Certain flavor notes are masked or reduced in intensity'
  },
  additive: {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    description: 'Flavors combine without significant modification'
  }
};

export function Encyclopedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<InteractionType | null>(null);
  const interactions = useInteractionSearch(searchQuery);
  const stats = useInteractionStats();

  const filteredInteractions = selectedType
    ? interactions.filter(i => i.interaction_type === selectedType)
    : interactions;

  return (
    <div className="flex gap-6 h-full">
      {/* Left sidebar - Stats and filters */}
      <div className="w-64 flex-shrink-0 space-y-6">
        {/* Stats */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Interaction Database</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Interactions</span>
              <span className="font-medium text-gray-900">{stats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Compounds Covered</span>
              <span className="font-medium text-gray-900">{stats.uniqueCompoundsCount}</span>
            </div>
          </div>
        </div>

        {/* Type breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">By Type</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedType === null
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Types ({stats.total})
            </button>
            {(Object.keys(stats.byType) as InteractionType[]).map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`w-full text-left px-3 py-2 rounded text-sm capitalize transition-colors ${
                  selectedType === type
                    ? `${interactionTypeInfo[type].color} font-medium border`
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {type} ({stats.byType[type]})
              </button>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Data Sources</h3>
          <div className="space-y-1 text-sm">
            {Object.entries(stats.bySource).map(([source, count]) => (
              <div key={source} className="flex justify-between text-gray-600">
                <span className="capitalize">{source}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-4 overflow-auto">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search interactions by compound or descriptor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Type description */}
        {selectedType && (
          <div className={`p-4 rounded-lg border ${interactionTypeInfo[selectedType].color}`}>
            <h4 className="font-medium capitalize">{selectedType}</h4>
            <p className="text-sm mt-1 opacity-80">
              {interactionTypeInfo[selectedType].description}
            </p>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500">
          Showing {filteredInteractions.length} interaction{filteredInteractions.length !== 1 ? 's' : ''}
        </p>

        {/* Interaction list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredInteractions.map((interaction, index) => (
            <InteractionWarning key={index} interaction={interaction} />
          ))}
        </div>

        {filteredInteractions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No interactions found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Right sidebar - Educational content */}
      <div className="w-80 flex-shrink-0 space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Understanding Interactions</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              When aromatic compounds are combined, they don't simply add together.
              Complex chemical and perceptual interactions can create, enhance, or
              suppress flavor notes.
            </p>
            <p>
              <strong className="text-gray-900">Emergence</strong> is perhaps the most
              fascinating — two compounds that individually smell nothing alike can
              together produce an entirely new perception.
            </p>
            <p>
              <strong className="text-gray-900">Suppression</strong> can be both a
              challenge and a tool. Unwanted notes can be masked, but desirable
              ones can also be diminished.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-medium text-purple-900 mb-3">Famous Emergences</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-purple-800">Indole + Jasmine compounds</p>
              <p className="text-purple-700">
                Indole alone smells fecal, but in trace amounts with floral compounds
                creates the heady jasmine character.
              </p>
            </div>
            <div>
              <p className="font-medium text-purple-800">Ethyl Isobutyrate + Maltol</p>
              <p className="text-purple-700">
                Creates a distinct pineapple candy note neither compound has alone.
              </p>
            </div>
            <div>
              <p className="font-medium text-purple-800">Furaneol + Lactones</p>
              <p className="text-purple-700">
                Together they produce rich strawberry cream notes.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-medium text-amber-900 mb-3">Concentration Matters</h3>
          <p className="text-sm text-amber-800">
            Many interactions are ratio-dependent. The same pair of compounds
            can produce different effects at different concentrations. Experiment
            with the sliders in the Workbench to explore this.
          </p>
        </div>
      </div>
    </div>
  );
}
