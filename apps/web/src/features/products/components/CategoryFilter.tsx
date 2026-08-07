"use client";

interface Props {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({ categories, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="category" className="text-sm font-medium text-slate-700">
        Category
      </label>

      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-cyan-600"
      >
        <option value="all">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
