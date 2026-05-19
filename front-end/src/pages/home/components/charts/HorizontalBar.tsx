interface HorizontalBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

export const HorizontalBar = ({ label, value, max, color }: HorizontalBarProps) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs text-gray-500 w-16 text-right shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-sm h-5 overflow-hidden">
        <div className="h-full rounded-sm transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
};
