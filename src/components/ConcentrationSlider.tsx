import { useState, useEffect } from 'react';

interface ConcentrationSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

export function ConcentrationSlider({
  value,
  onChange,
  min = 1,
  max = 100,
  label,
  showValue = true
}: ConcentrationSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce updates to parent
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [localValue, value, onChange]);

  const percentage = ((localValue - min) / (max - min)) * 100;

  return (
    <div className="space-y-1">
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-gray-600">{label}</span>}
          {showValue && (
            <span className="font-medium text-gray-900">{localValue}</span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={localValue}
          onChange={(e) => setLocalValue(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          style={{
            background: `linear-gradient(to right, rgb(79 70 229) 0%, rgb(79 70 229) ${percentage}%, rgb(229 231 235) ${percentage}%, rgb(229 231 235) 100%)`
          }}
        />
      </div>
    </div>
  );
}
