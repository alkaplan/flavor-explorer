import { useMemo } from 'react';
import type { DescriptorVector } from '../types';
import { calculateSimilarity } from '../lib/blending';
import { FlavorRadar } from './FlavorRadar';
import { SimpleDescriptorBar } from './DescriptorBars';

interface RecipeComparisonProps {
  blendProfile: DescriptorVector;
  targetProfile: DescriptorVector;
  targetName: string;
}

export function RecipeComparison({
  blendProfile,
  targetProfile,
  targetName
}: RecipeComparisonProps) {
  const similarity = useMemo(() => {
    return calculateSimilarity(blendProfile, targetProfile);
  }, [blendProfile, targetProfile]);

  const { matched, missing, extra } = useMemo(() => {
    const targetDescriptors = Object.entries(targetProfile)
      .filter(([, v]) => v > 0.1)
      .sort((a, b) => b[1] - a[1]);

    const matched: [string, number, number][] = [];
    const missing: [string, number][] = [];
    const extra: [string, number][] = [];

    for (const [descriptor, targetIntensity] of targetDescriptors) {
      const blendIntensity = blendProfile[descriptor] || 0;
      if (blendIntensity > 0.05) {
        matched.push([descriptor, blendIntensity, targetIntensity]);
      } else {
        missing.push([descriptor, targetIntensity]);
      }
    }

    for (const [descriptor, blendIntensity] of Object.entries(blendProfile)) {
      if (blendIntensity > 0.1 && !targetProfile[descriptor]) {
        extra.push([descriptor, blendIntensity]);
      }
    }

    return { matched, missing, extra };
  }, [blendProfile, targetProfile]);

  const similarityPercent = Math.round(similarity * 100);

  // Color based on similarity
  const getSimilarityColor = () => {
    if (similarityPercent >= 80) return 'text-green-600';
    if (similarityPercent >= 60) return 'text-yellow-600';
    if (similarityPercent >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Similarity score */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Match Score vs {targetName}
        </h3>
        <div className={`text-5xl font-bold ${getSimilarityColor()}`}>
          {similarityPercent}%
        </div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              similarityPercent >= 80 ? 'bg-green-500' :
              similarityPercent >= 60 ? 'bg-yellow-500' :
              similarityPercent >= 40 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${similarityPercent}%` }}
          />
        </div>
      </div>

      {/* Radar comparison */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Profile Overlay</h3>
        <FlavorRadar
          profile={blendProfile}
          targetProfile={targetProfile}
          height={300}
          targetLabel={targetName}
        />
      </div>

      {/* Detailed breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Matched descriptors */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Matched ({matched.length})
          </h4>
          <div className="space-y-2">
            {matched.slice(0, 6).map(([descriptor, blend, target]) => (
              <SimpleDescriptorBar
                key={descriptor}
                descriptor={descriptor}
                intensity={blend}
                targetIntensity={target}
              />
            ))}
            {matched.length === 0 && (
              <p className="text-xs text-gray-500">No matching descriptors yet</p>
            )}
          </div>
        </div>

        {/* Missing descriptors */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-red-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Missing ({missing.length})
          </h4>
          <div className="space-y-2">
            {missing.slice(0, 6).map(([descriptor, target]) => (
              <div key={descriptor} className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{descriptor.replace(/_/g, ' ')}</span>
                <span className="text-red-600">need {Math.round(target * 100)}%</span>
              </div>
            ))}
            {missing.length === 0 && (
              <p className="text-xs text-gray-500">All target descriptors covered!</p>
            )}
          </div>
        </div>

        {/* Extra descriptors */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-amber-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Extra ({extra.length})
          </h4>
          <div className="space-y-2">
            {extra.slice(0, 6).map(([descriptor, intensity]) => (
              <div key={descriptor} className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{descriptor.replace(/_/g, ' ')}</span>
                <span className="text-amber-600">{Math.round(intensity * 100)}%</span>
              </div>
            ))}
            {extra.length === 0 && (
              <p className="text-xs text-gray-500">No extra descriptors</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
