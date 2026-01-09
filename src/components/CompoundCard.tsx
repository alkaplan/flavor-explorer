import type { Compound } from '../types';
import { useBlend } from '../hooks/useBlend';

interface CompoundCardProps {
  compound: Compound;
  showAddButton?: boolean;
  showDetails?: boolean;
  onClick?: () => void;
}

export function CompoundCard({
  compound,
  showAddButton = true,
  showDetails = false,
  onClick
}: CompoundCardProps) {
  const { addCompound, components } = useBlend();
  const isInBlend = components.some(c => c.compound_id === compound.id);

  const topDescriptors = Object.entries(compound.descriptors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addCompound(compound.id);
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white border rounded-lg p-4 shadow-sm transition-all
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-indigo-300' : ''}
        ${isInBlend ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200'}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{compound.name}</h3>
          <p className="text-xs text-gray-500">{compound.chemical_class}</p>
        </div>
        {showAddButton && (
          <button
            onClick={handleAdd}
            disabled={isInBlend}
            className={`
              px-3 py-1 rounded text-sm font-medium transition-colors
              ${isInBlend
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }
            `}
          >
            {isInBlend ? 'Added' : 'Add'}
          </button>
        )}
      </div>

      {/* Descriptor tags */}
      <div className="flex flex-wrap gap-1 mb-2">
        {topDescriptors.map(([descriptor, intensity]) => (
          <span
            key={descriptor}
            className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700"
            style={{
              opacity: 0.5 + intensity * 0.5
            }}
          >
            {descriptor.replace(/_/g, ' ')}
          </span>
        ))}
      </div>

      {/* Natural sources */}
      {compound.natural_sources.length > 0 && (
        <p className="text-xs text-gray-500">
          Found in: {compound.natural_sources.slice(0, 3).join(', ')}
          {compound.natural_sources.length > 3 && '...'}
        </p>
      )}

      {/* Extended details */}
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1">
          <p><span className="font-medium">CAS:</span> {compound.cas}</p>
          {compound.threshold_ppm && (
            <p><span className="font-medium">Threshold:</span> {compound.threshold_ppm} ppm</p>
          )}
          {compound.fema_number && (
            <p><span className="font-medium">FEMA:</span> {compound.fema_number}</p>
          )}
          <p>
            <span className="font-medium">Groups:</span> {compound.functional_groups.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
