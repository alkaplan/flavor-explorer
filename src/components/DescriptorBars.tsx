import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import type { DescriptorVector } from '../types';
import { DESCRIPTOR_CATEGORIES } from '../types';

interface DescriptorBarsProps {
  profile: DescriptorVector;
  targetProfile?: DescriptorVector | null;
  maxDescriptors?: number;
  height?: number;
  showComparison?: boolean;
}

// Color mapping for descriptor categories
const categoryColors: Record<string, string> = {
  fruity: '#f97316',   // orange
  floral: '#ec4899',   // pink
  green: '#22c55e',    // green
  spicy: '#dc2626',    // red
  woody: '#92400e',    // brown
  roasted: '#78350f',  // dark brown
  sweet: '#a855f7',    // purple
  savory: '#ef4444',   // red
  chemical: '#6b7280', // gray
  earthy: '#65a30d',   // lime
  dairy: '#fbbf24',    // yellow
  marine: '#0891b2',   // cyan
};

function getDescriptorColor(descriptor: string): string {
  for (const [category, descriptors] of Object.entries(DESCRIPTOR_CATEGORIES)) {
    if (descriptors.some(d => descriptor.toLowerCase().includes(d.toLowerCase()))) {
      return categoryColors[category] || '#6366f1';
    }
  }
  return '#6366f1'; // Default indigo
}

export function DescriptorBars({
  profile,
  targetProfile,
  maxDescriptors = 15,
  height = 400,
  showComparison = true
}: DescriptorBarsProps) {
  const data = useMemo(() => {
    // Get all descriptors
    const allDescriptors = new Set([
      ...Object.keys(profile),
      ...(targetProfile && showComparison ? Object.keys(targetProfile) : [])
    ]);

    // Sort by blend intensity, then by target
    const sorted = Array.from(allDescriptors)
      .map(descriptor => ({
        descriptor: descriptor.replace(/_/g, ' '),
        rawDescriptor: descriptor,
        blend: Math.round((profile[descriptor] || 0) * 100),
        target: targetProfile && showComparison
          ? Math.round((targetProfile[descriptor] || 0) * 100)
          : undefined,
        color: getDescriptorColor(descriptor)
      }))
      .sort((a, b) => {
        // Sort by blend first, then target
        const blendDiff = b.blend - a.blend;
        if (blendDiff !== 0) return blendDiff;
        return (b.target || 0) - (a.target || 0);
      })
      .slice(0, maxDescriptors);

    return sorted;
  }, [profile, targetProfile, maxDescriptors, showComparison]);

  if (Object.keys(profile).length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-50 rounded-lg"
        style={{ height }}
      >
        <p className="text-gray-500">Add compounds to see descriptor breakdown</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
      >
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 11, fill: '#6b7280' }}
        />
        <YAxis
          type="category"
          dataKey="descriptor"
          tick={{ fontSize: 11, fill: '#374151' }}
          width={75}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '12px'
          }}
          formatter={(value, name) => [
            `${value}%`,
            name === 'blend' ? 'Your Blend' : 'Target'
          ]}
        />

        {/* Target bars (background) */}
        {targetProfile && showComparison && (
          <Bar
            dataKey="target"
            fill="#fbbf24"
            opacity={0.4}
            radius={[0, 4, 4, 0]}
          />
        )}

        {/* Blend bars (foreground) */}
        <Bar dataKey="blend" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Simple horizontal bar for inline use
interface SimpleDescriptorBarProps {
  descriptor: string;
  intensity: number;
  targetIntensity?: number;
}

export function SimpleDescriptorBar({
  descriptor,
  intensity,
  targetIntensity
}: SimpleDescriptorBarProps) {
  const color = getDescriptorColor(descriptor);
  const percentage = Math.round(intensity * 100);
  const targetPercentage = targetIntensity ? Math.round(targetIntensity * 100) : undefined;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600 w-24 truncate">
        {descriptor.replace(/_/g, ' ')}
      </span>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
        {/* Target marker */}
        {targetPercentage !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-amber-500 z-10"
            style={{ left: `${targetPercentage}%` }}
          />
        )}
        {/* Blend bar */}
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
      <span className="text-xs text-gray-500 w-10 text-right">
        {percentage}%
      </span>
    </div>
  );
}
