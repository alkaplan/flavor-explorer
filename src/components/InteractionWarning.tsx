import type { Interaction } from '../types';
import { useCompound } from '../hooks/useCompounds';

interface InteractionWarningProps {
  interaction: Interaction;
  compact?: boolean;
}

export function InteractionWarning({ interaction, compact = false }: InteractionWarningProps) {
  const compoundA = useCompound(interaction.compound_a);
  const compoundB = useCompound(interaction.compound_b);

  const typeColors = {
    emergence: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', badge: 'bg-purple-100' },
    enhancement: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-100' },
    suppression: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-100' },
    additive: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800', badge: 'bg-gray-100' }
  };

  const colors = typeColors[interaction.interaction_type];

  if (compact) {
    return (
      <div className={`${colors.bg} ${colors.border} border rounded px-2 py-1 text-xs`}>
        <span className={colors.text}>
          {compoundA?.name} + {compoundB?.name}: {interaction.interaction_type}
        </span>
      </div>
    );
  }

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`${colors.badge} ${colors.text} px-2 py-0.5 rounded text-xs font-medium capitalize`}>
          {interaction.interaction_type}
        </span>
        <span className="text-xs text-gray-500">Source: {interaction.source}</span>
      </div>

      <p className={`text-sm ${colors.text} font-medium mb-2`}>
        {compoundA?.name || interaction.compound_a} + {compoundB?.name || interaction.compound_b}
      </p>

      {/* Effects */}
      <div className="space-y-1 text-xs">
        {interaction.emerged_descriptors.length > 0 && (
          <p className="text-purple-700">
            <span className="font-medium">Emerges:</span> {interaction.emerged_descriptors.join(', ')}
          </p>
        )}
        {interaction.enhanced_descriptors.length > 0 && (
          <p className="text-green-700">
            <span className="font-medium">Enhances:</span> {interaction.enhanced_descriptors.join(', ')}
          </p>
        )}
        {interaction.suppressed_descriptors.length > 0 && (
          <p className="text-red-700">
            <span className="font-medium">Suppresses:</span> {interaction.suppressed_descriptors.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
