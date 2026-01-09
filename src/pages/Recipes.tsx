import { useState } from 'react';
import { recipes, getRecipeCategories } from '../data/recipes';
import { useBlend } from '../hooks/useBlend';
import { useCompound } from '../hooks/useCompounds';
import { RecipeCard } from '../components/RecipeCard';
import { FlavorRadar } from '../components/FlavorRadar';
import type { Recipe } from '../types';

function KeyCompoundChip({ compoundId }: { compoundId: string }) {
  const compound = useCompound(compoundId);
  const { addCompound, components } = useBlend();
  const isInBlend = components.some(c => c.compound_id === compoundId);

  if (!compound) return null;

  return (
    <button
      onClick={() => addCompound(compoundId)}
      disabled={isInBlend}
      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
        isInBlend
          ? 'bg-indigo-100 text-indigo-700 cursor-default'
          : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
      }`}
    >
      {isInBlend && '✓ '}{compound.name}
    </button>
  );
}

export function Recipes() {
  const categories = getRecipeCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { result, setTargetProfile, targetName } = useBlend();

  const filteredRecipes = selectedCategory
    ? recipes.filter(r => r.category === selectedCategory)
    : recipes;

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleStartMatching = (recipe: Recipe) => {
    setTargetProfile(recipe.target_descriptors, recipe.name);
  };

  return (
    <div className="flex gap-6 h-full">
      {/* Left sidebar - Category filters */}
      <div className="w-48 flex-shrink-0 space-y-2">
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            selectedCategory === null
              ? 'bg-indigo-100 text-indigo-700 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Recipes ({recipes.length})
        </button>
        {categories.map(category => {
          const count = recipes.filter(r => r.category === category).length;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Main content - Recipe grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => handleRecipeSelect(recipe)}
            />
          ))}
        </div>
      </div>

      {/* Right sidebar - Selected recipe detail */}
      {selectedRecipe && (
        <div className="w-96 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-4 space-y-4 overflow-auto">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedRecipe.name}</h2>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700 capitalize">
                {selectedRecipe.category}
              </span>
            </div>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-600">{selectedRecipe.description}</p>

          {/* Target profile radar */}
          <FlavorRadar
            profile={selectedRecipe.target_descriptors}
            targetProfile={Object.keys(result.profile).length > 0 ? result.profile : null}
            height={280}
            profileLabel={selectedRecipe.name}
            targetLabel="Your Blend"
          />

          {/* Match button */}
          <button
            onClick={() => handleStartMatching(selectedRecipe)}
            className={`w-full py-2 rounded-lg font-medium transition-colors ${
              targetName === selectedRecipe.name
                ? 'bg-green-600 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {targetName === selectedRecipe.name ? '✓ Currently Matching' : 'Start Matching This Recipe'}
          </button>

          {/* Key compounds */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Compounds</h4>
            <p className="text-xs text-gray-500 mb-3">
              Click to add to your blend
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedRecipe.key_compounds.map(compoundId => (
                <KeyCompoundChip key={compoundId} compoundId={compoundId} />
              ))}
            </div>
          </div>

          {/* Target descriptors breakdown */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Target Profile</h4>
            <div className="space-y-1.5">
              {Object.entries(selectedRecipe.target_descriptors)
                .sort((a, b) => b[1] - a[1])
                .map(([descriptor, intensity]) => (
                  <div key={descriptor} className="flex items-center gap-2">
                    <span className="w-20 text-xs text-gray-600 truncate">
                      {descriptor.replace(/_/g, ' ')}
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
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
      )}
    </div>
  );
}
