#!/usr/bin/env python3
"""Compare two solver benchmark CSVs (same scenario layout). Prints Markdown to stdout."""
from __future__ import annotations

import argparse
import csv
import sys
from collections import defaultdict
from pathlib import Path
from statistics import median


def ns_to_ms(ns: str) -> float:
    return float(ns) / 1_000_000.0


def aggregate(rows: list[dict[str, str]]) -> dict[str, dict[str, float | int]]:
    """Per scenario_id: wall sum, calls, succ, fail, timeouts, overlap, dedupe, leaf."""
    by_scene: dict[str, list[dict[str, str]]] = defaultdict(list)
    for r in rows:
        by_scene[r["scenario_id"]].append(r)

    out: dict[str, dict[str, float | int]] = {}
    for sid, rs in by_scene.items():
        wall_ms = [ns_to_ms(r["wall_time_ns"]) for r in rs]
        succ = sum(int(r["success_samples"]) for r in rs)
        fail = sum(int(r["failure_samples"]) for r in rs)
        timeouts = sum(1 for r in rs if r["timed_out"].lower() == "true")
        overlap = sum(int(r["overlap_rejects"]) for r in rs)
        dedupe = sum(int(r["dedupe_rejects"]) for r in rs)
        leaf = sum(int(r["leaf_candidates"]) for r in rs)
        out[sid] = {
            "calls": len(rs),
            "wall_sum": sum(wall_ms),
            "wall_mean": sum(wall_ms) / len(wall_ms) if wall_ms else 0.0,
            "wall_median": median(wall_ms) if wall_ms else 0.0,
            "wall_min": min(wall_ms) if wall_ms else 0.0,
            "wall_max": max(wall_ms) if wall_ms else 0.0,
            "succ": succ,
            "fail": fail,
            "timeouts": timeouts,
            "overlap": overlap,
            "dedupe": dedupe,
            "leaf": leaf,
        }
    return out


def pct_delta(old: float, new: float) -> str:
    if old == 0:
        return "n/a"
    return f"{100.0 * (new - old) / old:+.2f}%"


def main() -> None:
    ap = argparse.ArgumentParser(description="Compare two benchmark CSVs by scenario.")
    ap.add_argument("label_left", help='Left column label (e.g. "Day2 exhaustive")')
    ap.add_argument("csv_left", type=Path)
    ap.add_argument("label_right", help='Right column label (e.g. "MRV")')
    ap.add_argument("csv_right", type=Path)
    args = ap.parse_args()

    left_rows = list(csv.DictReader(args.csv_left.read_text(encoding="utf-8").splitlines()))
    right_rows = list(csv.DictReader(args.csv_right.read_text(encoding="utf-8").splitlines()))
    if not left_rows or not right_rows:
        print("One or both CSVs have no data rows.", file=sys.stderr)
        sys.exit(1)

    m_left = aggregate(left_rows)
    m_right = aggregate(right_rows)
    order = ["S1", "S2", "S3"]
    labels = {
        "S1": "场景 1 — 100 日期 × 1 解",
        "S2": "场景 2 — 10 日期 × 至多 10 解",
        "S3": "场景 3 — 1 日期 × 至多 100 解",
    }

    rl0 = left_rows[0]
    rr0 = right_rows[0]
    seed_l = rl0.get("random_seed", "")
    seed_r = rr0.get("random_seed", "")
    run_l = rl0.get("run_id", "")
    run_r = rr0.get("run_id", "")
    sol_l = rl0.get("solver", "")
    sol_r = rr0.get("solver", "")

    lines: list[str] = []
    lines.append("## 配对对比（同场景、同 random_seed）\n\n")
    lines.append("| 字段 | 左侧 | 右侧 |\n|------|------|------|\n")
    lines.append(f"| **标签** | {args.label_left} | {args.label_right} |\n")
    lines.append(f"| **CSV** | `{args.csv_left.name}` | `{args.csv_right.name}` |\n")
    lines.append(f"| **run_id** | `{run_l}` | `{run_r}` |\n")
    lines.append(f"| **random_seed** | {seed_l} | {seed_r} |\n")
    if sol_l or sol_r:
        lines.append(f"| **solver** | {sol_l or '—'} | {sol_r or '—'} |\n")
    lines.append(f"| **行数** | {len(left_rows)} | {len(right_rows)} |\n")
    lines.append("\n### 各场景墙钟与样本（左侧 vs 右侧）\n\n")
    lines.append(
        "| 场景 | 说明 | 墙钟合计 (ms) 左 | 墙钟合计 (ms) 右 | 右相对左 | "
        "timed_out 次数 左/右 | 成功样本 左/右 | overlap_rejects 左/右 |\n"
        "|------|------|-------------------|------------------|---------|----------------------|----------------|-------------------------|\n"
    )

    wall_left_total = sum(ns_to_ms(r["wall_time_ns"]) for r in left_rows)
    wall_right_total = sum(ns_to_ms(r["wall_time_ns"]) for r in right_rows)

    for sid in order:
        a = m_left.get(sid)
        b = m_right.get(sid)
        if not a or not b:
            continue
        delta = pct_delta(float(a["wall_sum"]), float(b["wall_sum"]))
        lines.append(
            f"| **{sid}** | {labels.get(sid, sid)} | "
            f"{a['wall_sum']:.2f} | {b['wall_sum']:.2f} | **{delta}** | "
            f"{a['timeouts']}/{b['timeouts']} | {a['succ']}/{b['succ']} | "
            f"{a['overlap']:,}/{b['overlap']:,} |\n"
        )

    lines.append("\n### 全局墙钟\n\n")
    lines.append(
        f"| 指标 | 左侧 | 右侧 | 右相对左 |\n|------|------|------|----------|\n"
        f"| 全部场景墙钟总和 (ms) | {wall_left_total:.2f} | {wall_right_total:.2f} | "
        f"**{pct_delta(wall_left_total, wall_right_total)}** |\n"
    )

    succ_l = sum(int(r["success_samples"]) for r in left_rows)
    succ_r = sum(int(r["success_samples"]) for r in right_rows)
    fail_l = sum(int(r["failure_samples"]) for r in left_rows)
    fail_r = sum(int(r["failure_samples"]) for r in right_rows)
    lines.append(
        f"| 成功 / 失败样本 | {succ_l} / {fail_l} | {succ_r} / {fail_r} | — |\n"
    )

    sys.stdout.write("".join(lines))


if __name__ == "__main__":
    main()
