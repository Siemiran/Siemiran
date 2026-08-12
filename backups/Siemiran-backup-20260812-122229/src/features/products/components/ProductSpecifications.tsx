interface Props {
  specifications?: Record<string, string>;
}

export default function ProductSpecifications({ specifications }: Props) {
  if (!specifications) return null;

  const rows = Object.entries(specifications);

  if (rows.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-3xl font-bold text-slate-900">
        Technical Specifications
      </h2>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-b last:border-0">
                <td className="w-1/3 bg-slate-50 px-6 py-4 font-medium">
                  {label}
                </td>

                <td className="px-6 py-4">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
