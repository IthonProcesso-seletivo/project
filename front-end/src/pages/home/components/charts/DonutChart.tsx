interface DonutChartProps {
  total: number;
  spent: number;
}

export const DonutChart = ({ total, spent }: DonutChartProps) => {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(spent / total, 1);
  const spentDash = pct * circ;
  const availDash = circ - spentDash;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#d1fae5" strokeWidth="18" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#16a34a" strokeWidth="18"
          strokeDasharray={`${availDash} ${spentDash}`} strokeDashoffset={circ / 4} strokeLinecap="round" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#ef4444" strokeWidth="18"
          strokeDasharray={`${spentDash} ${availDash}`} strokeDashoffset={circ / 4 - availDash} strokeLinecap="round" />
      </svg>
      <div className="flex flex-col gap-1.5 text-xs self-start px-2">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-600 inline-block shrink-0" />
          Total disponivel : {total}
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block shrink-0" />
          Total gasto : {spent}
        </span>
      </div>
    </div>
  );
};
