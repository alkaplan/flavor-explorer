import { useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import type { DescriptorVector } from '../types';

interface FlavorRadarProps {
  profile: DescriptorVector;
  targetProfile?: DescriptorVector | null;
  maxDescriptors?: number;
  height?: number;
  showLegend?: boolean;
  profileLabel?: string;
  targetLabel?: string;
}

export function FlavorRadar({
  profile,
  targetProfile,
  maxDescriptors = 12,
  height = 400,
  showLegend = true,
  profileLabel = 'Your Blend',
  targetLabel = 'Target'
}: FlavorRadarProps) {
  const data = useMemo(() => {
    // Combine descriptors from both profiles
    const allDescriptors = new Set([
      ...Object.keys(profile),
      ...(targetProfile ? Object.keys(targetProfile) : [])
    ]);

    // Sort by maximum intensity across both profiles
    const sorted = Array.from(allDescriptors)
      .map(descriptor => ({
        descriptor,
        maxIntensity: Math.max(
          profile[descriptor] || 0,
          targetProfile?.[descriptor] || 0
        )
      }))
      .sort((a, b) => b.maxIntensity - a.maxIntensity)
      .slice(0, maxDescriptors);

    // Format for recharts
    return sorted.map(({ descriptor }) => ({
      descriptor: descriptor.replace(/_/g, ' '),
      blend: Math.round((profile[descriptor] || 0) * 100),
      target: targetProfile ? Math.round((targetProfile[descriptor] || 0) * 100) : undefined
    }));
  }, [profile, targetProfile, maxDescriptors]);

  if (Object.keys(profile).length === 0 && !targetProfile) {
    return (
      <div
        className="flex items-center justify-center bg-gray-50 rounded-lg"
        style={{ height }}
      >
        <p className="text-gray-500">Add compounds to see flavor profile</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="descriptor"
          tick={{ fontSize: 11, fill: '#6b7280' }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          tickCount={5}
        />

        {/* Target profile (if comparing) */}
        {targetProfile && (
          <Radar
            name={targetLabel}
            dataKey="target"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ r: 3, fill: '#f59e0b' }}
          />
        )}

        {/* Main blend profile */}
        <Radar
          name={profileLabel}
          dataKey="blend"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.3}
          strokeWidth={2}
          dot={{ r: 3, fill: '#6366f1' }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '12px'
          }}
          formatter={(value) => [`${value}%`, '']}
        />

        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            iconType="circle"
          />
        )}
      </RadarChart>
    </ResponsiveContainer>
  );
}
