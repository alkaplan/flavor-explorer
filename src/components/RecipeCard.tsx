import type { Recipe } from '../types';
import { useBlend } from '../hooks/useBlend';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
  showMatchButton?: boolean;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  fruit: { bg: 'bg-orange-100', text: 'text-orange-800' },
  floral: { bg: 'bg-pink-100', text: 'text-pink-800' },
  spice: { bg: 'bg-amber-100', text: 'text-amber-800' },
  roasted: { bg: 'bg-stone-100', text: 'text-stone-800' },
  dairy: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  savory: { bg: 'bg-red-100', text: 'text-red-800' },
  sweet: { bg: 'bg-purple-100', text: 'text-purple-800' },
  other: { bg: 'bg-gray-100', text: 'text-gray-800' }
};

export function RecipeCard({ recipe, onClick, showMatchButton = true }: RecipeCardProps) {
  const { setTargetProfile, targetName } = useBlend();
  const isActive = targetName === recipe.name;

  const colors = categoryColors[recipe.category] || categoryColors.other;

  const topDescriptors = Object.entries(recipe.target_descriptors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const handleMatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActive) {
      setTargetProfile(null);
    } else {
      setTargetProfile(recipe.target_descriptors, recipe.name);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white border rounded-lg p-4 transition-all
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
        ${isActive ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-gray-200'}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{recipe.name}</h3>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${colors.bg} ${colors.text}`}>
            {recipe.category}
          </span>
        </div>
        {showMatchButton && (
          <button
            onClick={handleMatch}
            className={`
              px-3 py-1 rounded text-sm font-medium transition-colors
              ${isActive
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }
            `}
          >
            {isActive ? 'Matching' : 'Match'}
          </button>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>

      {/* Top descriptors with intensity bars */}
      <div className="space-y-1.5">
        {topDescriptors.map(([descriptor, intensity]) => (
          <div key={descriptor} className="flex items-center gap-2">
            <span className="text-xs text-gray-600 w-20 truncate">
              {descriptor.replace(/_/g, ' ')}
            </span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-400 rounded-full"
                style={{ width: `${intensity * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-8 text-right">
              {Math.round(intensity * 100)}%
            </span>
          </div>
        ))}
      </div>

      {/* Key compounds hint */}
      <p className="mt-3 text-xs text-gray-500">
        {recipe.key_compounds.length} key compound{recipe.key_compounds.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
