#!/usr/bin/env python3
"""Regenerate src/data/kotakAmal.json and src/data/bangunanMasjid.json
from the FORMATTED_VALUE CSV snapshots in scripts/kas-source/.

Refresh the snapshots by reading the Google Sheet
1w3K96V4Ibc6TWqcVoZVROLv35epPMx_rRIOECqilVAc (read-only):

  tab "Jurnal - Kotak Amal"        A1:G1002
  tab "Jurnal -bangunan mesjid"    A1:J300

Rules (do not change lightly):
  - Copy descriptions and dates exactly as written (including typo dates).
  - Never include the sheet's grand-total row; always use running saldo.
  - Drop trailing rows that only repeat the last balance.
  - Drop right-side scratch columns (F/G on kotak amal, J and the draft
    list on bangunan) and the pre-ledger "Mutasi DKM" line.
  - Opening balance on bangunan is metadata, not a Masuk amount.
"""

from __future__ import annotations

import csv
import json
import re
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "kas-source"
OUT_DIR = ROOT / "src" / "data"

DATE_RE = re.compile(r"^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$")


def parse_amount(raw: str) -> int | None:
    s = (raw or "").strip()
    if not s:
        return None
    # Sheet uses 1,603,973 or occasionally 250000 without separators.
    s = s.replace(",", "").replace(" ", "")
    if not re.fullmatch(r"-?\d+", s):
        raise ValueError(f"unparseable amount: {raw!r}")
    return int(s)


def parse_date(raw: str) -> date | None:
    s = (raw or "").strip()
    if not s:
        return None
    m = DATE_RE.match(s)
    if not m:
        return None
    d, mo, y = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    try:
        return date(y, mo, d)
    except ValueError:
        return None


def pad(row: list[str], n: int) -> list[str]:
    return row + [""] * (n - len(row))


def infer_groups(entries: list[dict]) -> list[dict]:
    """Assign groupYear/groupMonth from ledger order, not typo dates.

    Display dates stay as written. Grouping follows neighbouring trusted
    dates so e.g. 14-09-2026 sitting inside August stays in August 2026,
    and 01-07-2027 sits in July 2026.
    """
    parsed: list[date | None] = [parse_date(e["date"]) for e in entries]
    n = len(entries)
    context: date | None = None
    notes: list[str] = []

    def next_trusted(start: int, current: date | None) -> date | None:
        for j in range(start, n):
            dt = parsed[j]
            if dt is None:
                continue
            if 2023 <= dt.year <= 2026:
                # Skip only backward year-typos (e.g. 16-01-2025 amid Jan 2026).
                # Forward gaps of a year or more can be real pauses in the ledger.
                if current and (dt - current).days < -300:
                    continue
                return dt
        return None

    for i, entry in enumerate(entries):
        raw = entry["date"]
        dt = parsed[i]
        typo_reason = None
        chosen = context

        if dt is not None:
            candidate = dt
            if dt.year < 2023 or dt.year > 2026:
                typo_reason = f"year {dt.year}"
                if context is not None:
                    try:
                        candidate = date(context.year, dt.month, dt.day)
                    except ValueError:
                        candidate = context
            elif context is not None and (dt - context).days < -300:
                nxt = next_trusted(i + 1, context)
                if nxt is None or abs((nxt - context).days) < 90:
                    typo_reason = f"year {dt.year} in {context.year} sequence"
                    try:
                        candidate = date(context.year, dt.month, dt.day)
                    except ValueError:
                        candidate = context

            nxt = next_trusted(i + 1, context or candidate)
            month_typo = False
            if context is not None and nxt is not None:
                if candidate > nxt + timedelta(days=3) and candidate > context + timedelta(days=15):
                    month_typo = True
                    typo_reason = typo_reason or "month ahead of following entries"
                elif candidate < context - timedelta(days=7) and nxt >= context - timedelta(days=3):
                    month_typo = True
                    typo_reason = typo_reason or "month behind previous entries"

            if month_typo:
                chosen = context or candidate
            else:
                chosen = candidate
                context = candidate

            if typo_reason:
                notes.append(
                    f"{raw} {entry['description']!r}: grouped as "
                    f"{chosen.year}-{chosen.month:02d} ({typo_reason})"
                )
        else:
            chosen = context

        if chosen is None:
            chosen = date(2023, 1, 1)

        entry["groupYear"] = chosen.year
        entry["groupMonth"] = chosen.month

    return notes


def write_json(path: Path, payload: dict) -> None:
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    print(f"wrote {path.relative_to(ROOT)} ({payload['rowCount']} rows)")


def import_kotak() -> dict:
    rows = list(csv.reader((SOURCE / "jurnal-kotak-amal.csv").open()))
    entries: list[dict] = []
    for i, raw in enumerate(rows, 1):
        # Ledger body: first real entry 06-01-2023 through 13-11-2026.
        if i < 5 or i > 460:
            continue
        r = [c.strip() for c in pad(raw, 7)]
        date_s, akun, masuk_s, keluar_s, saldo_s, _ket, _cat = r[:7]
        if i == 15:
            # Side-note-only row in column G ("Infaq sblm"), no ledger data.
            continue
        if not (date_s or akun or masuk_s or keluar_s):
            continue
        entries.append(
            {
                "date": date_s,
                "description": akun,
                "masuk": parse_amount(masuk_s),
                "keluar": parse_amount(keluar_s),
                "saldo": parse_amount(saldo_s),
            }
        )

    notes = infer_groups(entries)
    last = entries[-1]
    if last["saldo"] != 1_603_973:
        raise SystemExit(f"kotak amal last saldo is {last['saldo']}, expected 1603973")
    if last["date"] != "13-11-2026":
        raise SystemExit(f"kotak amal last date is {last['date']!r}, expected 13-11-2026")

    total_masuk = sum(e["masuk"] or 0 for e in entries)
    total_keluar = sum(e["keluar"] or 0 for e in entries)

    payload = {
        "id": "kotak-amal",
        "title": "Laporan Kas Infaq Kotak Amal",
        "subtitle": "Infaq Ghoir Muqayyad",
        "asOf": "13 November 2026",
        "latestBalance": last["saldo"],
        "totalMasuk": total_masuk,
        "totalKeluar": total_keluar,
        "sourceNote": "Sumber: Jurnal Kas Kotak Amal DKM, disalin apa adanya.",
        "rowCount": len(entries),
        "defaultExpandedYears": [2026],
        "defaultExpandedMonths": ["2026-11", "2026-10", "2026-09"],
        "entries": entries,
    }
    write_json(OUT_DIR / "kotakAmal.json", payload)
    print(f"  total Masuk {total_masuk:,}  total Keluar {total_keluar:,}  saldo {last['saldo']:,}")
    print(f"  grouping notes ({len(notes)}):")
    for n in notes:
        print(f"    - {n}")
    return payload


def import_bangunan() -> dict:
    rows = list(csv.reader((SOURCE / "jurnal-bangunan-mesjid.csv").open()))
    opening_balance = None
    entries: list[dict] = []
    for i, raw in enumerate(rows, 1):
        r = [c.strip() for c in pad(raw, 10)]
        # Ignore column J (index 9) and the draft list on the right.
        no, tanggal, rt, nama, masuk_s, keluar_s, saldo_or_note = r[:7]
        if i == 3 and no == "Saldo Sebelumnya":
            opening_balance = parse_amount(masuk_s)
            entries.append(
                {
                    "no": "",
                    "date": "",
                    "rt": "",
                    "description": "Saldo Sebelumnya",
                    "masuk": None,
                    "keluar": None,
                    "saldo": opening_balance,
                    "isOpening": True,
                }
            )
            continue
        # Data starts after the column header on row 5.
        if i <= 5:
            continue
        if not (no or tanggal or nama or masuk_s or keluar_s or saldo_or_note):
            continue
        entries.append(
            {
                "no": no,
                "date": tanggal,
                "rt": rt,
                "description": nama,
                "masuk": parse_amount(masuk_s),
                "keluar": parse_amount(keluar_s),
                "saldo": parse_amount(saldo_or_note),
            }
        )

    if opening_balance != 54_409_500:
        raise SystemExit(f"bangunan opening is {opening_balance}, expected 54409500")

    numbered = [e for e in entries if e.get("no")]
    unnumbered_tail = [e for e in entries if not e.get("no") and not e.get("isOpening")]
    if len(numbered) != 25:
        raise SystemExit(f"expected 25 numbered bangunan rows, got {len(numbered)}")
    if len(unnumbered_tail) != 1:
        raise SystemExit(f"expected 1 unnumbered tail row, got {len(unnumbered_tail)}")
    tail = unnumbered_tail[0]
    if tail["saldo"] != 77_391_000:
        raise SystemExit(f"bangunan last saldo is {tail['saldo']}, expected 77391000")
    if tail["date"] != "11-09-2026":
        raise SystemExit(f"bangunan last date is {tail['date']!r}, expected 11-09-2026")
    if "Dari ketua" not in tail["description"]:
        raise SystemExit(f"unexpected tail description: {tail['description']!r}")

    semen = next(e for e in entries if "10 zak semen dari om Jeri" in e["description"])
    if semen["masuk"] != 600_000 or semen["keluar"] != 600_000:
        raise SystemExit(f"row 16 semen amounts unexpected: {semen}")

    notes = infer_groups(entries)
    tx_rows = [e for e in entries if not e.get("isOpening")]
    total_masuk = sum(e["masuk"] or 0 for e in tx_rows)
    total_keluar = sum(e["keluar"] or 0 for e in tx_rows)
    expected = opening_balance + total_masuk - total_keluar
    if expected != 77_391_000:
        raise SystemExit(
            f"bangunan arithmetic {opening_balance}+{total_masuk}-{total_keluar}={expected}, expected 77391000"
        )

    payload = {
        "id": "bangunan-masjid",
        "title": "Laporan Kas Bangunan Masjid",
        "subtitle": "Iuran dan belanja renovasi masjid",
        "asOf": "11 September 2026",
        "latestBalance": tail["saldo"],
        "totalMasuk": total_masuk,
        "totalKeluar": total_keluar,
        "openingBalance": opening_balance,
        "openingBalanceAsOf": "11 Maret 2023",
        "sourceNote": "Sumber: Jurnal Kas Bangunan Masjid DKM, disalin apa adanya.",
        "rowCount": len(entries),
        "defaultExpandedYears": sorted({e["groupYear"] for e in entries}, reverse=True),
        "defaultExpandedMonths": [],
        "entries": entries,
    }
    # Opening row has no date; pin it to Maret 2023 (as-of of the opening saldo).
    for e in entries:
        if e.get("isOpening"):
            e["groupYear"] = 2023
            e["groupMonth"] = 3
    payload["defaultExpandedYears"] = sorted({e["groupYear"] for e in entries}, reverse=True)
    payload["defaultExpandedMonths"] = sorted(
        {f"{e['groupYear']}-{e['groupMonth']:02d}" for e in entries},
        reverse=True,
    )
    write_json(OUT_DIR / "bangunanMasjid.json", payload)
    print(f"  opening {opening_balance:,}  Masuk {total_masuk:,}  Keluar {total_keluar:,}  saldo {tail['saldo']:,}")
    print(f"  grouping notes ({len(notes)}):")
    for n in notes:
        print(f"    - {n}")
    return payload


def main() -> None:
    kotak = import_kotak()
    bangunan = import_bangunan()
    combined = kotak["latestBalance"] + bangunan["latestBalance"]
    print(f"combined Total Saldo Kas: {combined:,} (expected 78,994,973)")
    if combined != 78_994_973:
        raise SystemExit("combined balance mismatch")


if __name__ == "__main__":
    main()
