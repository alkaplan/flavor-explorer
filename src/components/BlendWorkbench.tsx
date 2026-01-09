import { useState } from 'react';
import { useBlend } from '../hooks/useBlend';
import { useCompound } from '../hooks/useCompounds';
import { ConcentrationSlider } from './ConcentrationSlider';

interface BlendComponentItemProps {
  compoundId: string;
  concentration: number;
  onRemove: () => void;
  onConcentrationChange: (value: number) => void;
}

function BlendComponentItem({
  compoundId,
  concentration,
  onRemove,
  onConcentrationChange
}: BlendComponentItemProps) {
  const compound = useCompound(compoundId);

  if (!compound) return null;

  const topDescriptors = Object.entries(compound.descriptors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([d]) => d.replace(/_/g, ' '))
    .join(', ');

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-gray-900">{compound.name}</h4>
          <p className="text-xs text-gray-500">{topDescriptors}</p>
        </div>
        <button
          onClick={onRemove}
          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Remove compound"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ConcentrationSlider
        value={concentration}
        onChange={onConcentrationChange}
        label="Concentration"
      />
    </div>
  );
}

export function BlendWorkbench() {
  const {
    components,
    removeCompound,
    updateConcentration,
    clearBlend,
    saveCurrentBlend,
    result
  } = useBlend();

  const [saveName, setSaveName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSave = () => {
    if (saveName.trim()) {
      saveCurrentBlend(saveName.trim());
      setSaveName('');
      setShowSaveDialog(false);
    }
  };

  if (components.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <svg
          className="mx-auto w-12 h-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No compounds yet</h3>
        <p className="text-sm text-gray-500">
          Add compounds from the explorer to start building your blend
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">
          Your Blend ({components.length} compound{components.length !== 1 ? 's' : ''})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSaveDialog(true)}
            className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={clearBlend}
            className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Save dialog */}
      {showSaveDialog && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Blend name..."
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={() => setShowSaveDialog(false)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Compound list */}
      <div className="space-y-3">
        {components.map((component) => (
          <BlendComponentItem
            key={component.compound_id}
            compoundId={component.compound_id}
            concentration={component.concentration}
            onRemove={() => removeCompound(component.compound_id)}
            onConcentrationChange={(value) => updateConcentration(component.compound_id, value)}
          />
        ))}
      </div>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-amber-800 mb-2">Interaction Notes</h4>
          <ul className="space-y-1">
            {result.warnings.map((warning, index) => (
              <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                <span className="text-amber-500">•</span>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Active interactions */}
      {result.activeInteractions.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">
            Active Interactions ({result.activeInteractions.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.activeInteractions.map((interaction, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs rounded-full ${
                  interaction.interaction_type === 'emergence'
                    ? 'bg-purple-100 text-purple-700'
                    : interaction.interaction_type === 'enhancement'
                    ? 'bg-green-100 text-green-700'
                    : interaction.interaction_type === 'suppression'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {interaction.interaction_type}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
