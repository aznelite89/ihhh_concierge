/**
 * Minimal RFC-4180-ish CSV reader/writer — enough for the attendance list
 * exported from Excel or Google Sheets (quoted fields, embedded commas,
 * doubled quotes, CRLF line endings, optional BOM).
 */

export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false

  const input = text.replace(/^﻿/, "")

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
    } else if (char === ",") {
      row.push(field)
      field = ""
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && input[i + 1] === "\n") i++
      row.push(field)
      rows.push(row)
      row = []
      field = ""
    } else {
      field += char
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter(r => r.some(cell => cell.trim().length > 0))
}

export function toCsv(rows: (string | number)[][]): string {
  return rows.map(row => row.map(escapeCsvCell).join(",")).join("\r\n")
}

function escapeCsvCell(value: string | number): string {
  const str = String(value ?? "")
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}
