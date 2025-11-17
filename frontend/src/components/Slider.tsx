import { useState, useRef, useCallback, useEffect } from 'react'

export interface SliderProps {
    min: number;
    max: number;
    defaultValue: number;
    step?: number;
    onChange?: (value: number) => void;
}

const Slider = ({ min, max, defaultValue, step = 1, onChange }: SliderProps) => {
  const [value, setValue] = useState<number>(defaultValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateValue = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    setValue(clampedValue);
    onChange?.(clampedValue);
  }, [min, max, step, onChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updateValue(e.clientX);
    }
  }, [isDragging, updateValue]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="p-4 border-2 border-stone-900 bg-stone-800 rounded">
      <p className="text-xl font-bold mb-2">Slider (Value: {value})</p>
      <div 
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className="relative w-full h-2 bg-purple-500 rounded cursor-pointer"
      >
        <div
          className={`absolute w-8 h-8 bg-yellow-400 rounded-full ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            left: `${((value - min) / (max - min)) * 100}%`,
            transform: 'translate(-50%, -50%)',
            top: '50%'
          }}
        />
      </div>
    </div>
  );
};

export default Slider;