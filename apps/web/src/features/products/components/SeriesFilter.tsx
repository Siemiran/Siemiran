"use client";

interface Props {
  series: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SeriesFilter({ series, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="series" className="text-sm font-medium text-slate-700">
        Series
      </label>

      <select
        id="series"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-cyan-600"
      >
        <option value="all">All Series</option>

        {series.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
