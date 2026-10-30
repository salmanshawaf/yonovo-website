const columns = ["Customer", "Invoice", "Invoice date", "Due date", "Amount", "Current", "1 to 30", "31 to 60", "61 to 90", "90+", "Notes"];

const rows = [
  ["EXAMPLE Northwind Supply", "INV-1042", "2026-09-01", "2026-10-01", "4200", "", "4200", "", "", "", "Replace this row"],
  ["EXAMPLE Harbor Clinic", "INV-1048", "2026-07-15", "2026-08-14", "1800", "", "", "", "1800", "", "Replace this row"],
];

export default function AgingTemplate() {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-2xl border border-border bg-background">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              {columns.map((column) => (
                <th key={column} className="whitespace-nowrap px-3 py-3 font-medium text-xs text-muted uppercase tracking-wide">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[1]} className="border-t border-border">
                {row.map((cell, index) => (
                  <td key={`${row[1]}-${columns[index]}`} className="whitespace-nowrap px-3 py-3 text-secondary">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted">
        Sample rows only, dated as of October 30, 2026. INV-1042 was due October 1, so it sits in 1 to 30. INV-1048 was due August 14, so it sits in 61 to 90. Delete both rows before you use the file.
      </p>
      <a
        href="/templates/ar-aging-report-template.csv"
        download
        className="inline-flex w-fit items-center rounded-lg bg-brand-green px-4 py-2.5 text-sm font-medium text-brand-navy"
      >
        Download CSV template
      </a>
    </div>
  );
}
