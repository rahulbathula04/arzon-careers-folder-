import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { p as objectType, z as recordType, q as stringType, A as unknownType, x as numberType } from "../_libs/zod.mjs";
function escapeCell(value) {
  if (value === null || value === void 0) return "";
  const str = typeof value === "string" ? value : typeof value === "number" || typeof value === "boolean" ? String(value) : value instanceof Date ? value.toISOString() : JSON.stringify(value);
  const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}
function rowsToCsv(rows, columns) {
  const header = columns.map((c) => escapeCell(c.header)).join(",");
  const body = rows.map(
    (row) => columns.map(
      (c) => escapeCell(c.accessor ? c.accessor(row) : row[c.key])
    ).join(",")
  ).join("\r\n");
  return body ? `${header}\r
${body}\r
` : `${header}\r
`;
}
function downloadCsv(filename, csv) {
  if (typeof window === "undefined") return;
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
function dateStampedFilename(base, ext = "csv") {
  const d = /* @__PURE__ */ new Date();
  const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return `${base}-${stamp}.${ext}`;
}
async function exportCsvAudited(record, resource, filename, rows, columns, details) {
  await record({ data: { resource, rowCount: rows.length, details } });
  downloadCsv(filename, rowsToCsv(rows, columns));
}
const recordAdminExport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  resource: stringType().min(1).max(64).regex(/^[a-z0-9_\-]+$/),
  rowCount: numberType().int().min(0).max(1e6),
  details: recordType(stringType().min(1).max(64), unknownType()).optional()
}).parse(input)).handler(createSsrRpc("efadad4220f15a12f94dc520a2d24405c59cb6340d8567694c8b7ea17cc3b0c8"));
export {
  dateStampedFilename as d,
  exportCsvAudited as e,
  recordAdminExport as r
};
