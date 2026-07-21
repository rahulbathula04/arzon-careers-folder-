/**
 * Tiny CSV helpers used by admin pages.
 *
 * Rules:
 * - Quote every field; double internal quotes.
 * - Render null/undefined as empty string.
 * - Render objects/arrays as JSON so they round-trip predictably.
 * - Use CRLF line endings so Excel opens it cleanly.
 */

export type CsvColumn<T> = {
  key: string;
  header: string;
  accessor?: (row: T) => unknown;
};

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str =
    typeof value === "string"
      ? value
      : typeof value === "number" || typeof value === "boolean"
        ? String(value)
        : value instanceof Date
          ? value.toISOString()
          : JSON.stringify(value);
  // CSV formula-injection guard: prefix cells starting with =, +, -, @, tab, or CR
  // with a leading single-quote so spreadsheet apps treat them as text, not formulas.
  const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function rowsToCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map((c) => escapeCell(c.header)).join(",");
  const body = rows
    .map((row) =>
      columns
        .map((c) =>
          escapeCell(c.accessor ? c.accessor(row) : (row as Record<string, unknown>)[c.key]),
        )
        .join(","),
    )
    .join("\r\n");
  return body ? `${header}\r\n${body}\r\n` : `${header}\r\n`;
}

export function downloadCsv(filename: string, csv: string): void {
  if (typeof window === "undefined") return;
  // Prepend BOM so Excel detects UTF-8.
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportCsv<T>(filename: string, rows: T[], columns: CsvColumn<T>[]): void {
  downloadCsv(filename, rowsToCsv(rows, columns));
}

export function dateStampedFilename(base: string, ext = "csv"): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return `${base}-${stamp}.${ext}`;
}

/**
 * Same as exportCsv, but first calls the `recordAdminExport` serverFn to
 * rate-limit and audit-log the action. The download only proceeds if the
 * server call succeeds (e.g. throws on rate-limit / not-authorized).
 *
 * Callers pass a serverFn-bound `record` returned from
 * `useServerFn(recordAdminExport)` to avoid coupling this helper to TanStack
 * Start imports.
 */
export async function exportCsvAudited<T>(
  record: (args: {
    data: { resource: string; rowCount: number; details?: Record<string, unknown> };
  }) => Promise<unknown>,
  resource: string,
  filename: string,
  rows: T[],
  columns: CsvColumn<T>[],
  details?: Record<string, unknown>,
): Promise<void> {
  await record({ data: { resource, rowCount: rows.length, details } });
  downloadCsv(filename, rowsToCsv(rows, columns));
}
