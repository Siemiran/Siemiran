"use client";

interface Props {
  families: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function FamilyFilter({ families, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="family" className="text-sm font-medium text-slate-700">
        Family
      </label>

      <select
        id="family"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-cyan-600"
      >
        <option value="all">All Families</option>

        {families.map((family) => (
          <option key={family} value={family}>
            {family}
          </option>
        ))}
      </select>
    </div>
  );
}
