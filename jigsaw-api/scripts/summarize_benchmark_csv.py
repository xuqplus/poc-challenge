#!/usr/bin/env python3
"""Aggregate solver-baseline CSV rows into a Markdown report (stdin or file arg)."""
from __future__ import annotations

import csv
import sys
from collections import defaultdict
from pathlib import Path
from statistics import median


def ns_to_ms(ns: str) -> float:
    return float(ns) / 1_000_000.0


def main() -> None:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if path:
        lines = path.read_text(encoding="utf-8").splitlines()
    else:
        lines = sys.stdin.read().splitlines()
    reader = csv.DictReader(lines)
    rows = list(reader)
    if not rows:
        print("No data rows.", file=sys.stderr)
        sys.exit(1)

    run_id = rows[0]["run_id"]
    seed = rows[0]["random_seed"]
    by_scene: dict[str, list[dict[str, str]]] = defaultdict(list)
    for r in rows:
        by_scene[r["scenario_id"]].append(r)

    out: list[str] = []
    out.append("# 求解器基准线报告（Solver baseline）\n")
    out.append(f"- **CSV**：`{path.name if path else '(stdin)'}`\n")
    out.append(f"- **run_id**：`{run_id}`\n")
    out.append(f"- **random_seed**：{seed}\n")
    out.append(f"- **总行数（数据行）**：{len(rows)}\n")
    out.append("\n---\n")

    order = ["S1", "S2", "S3"]
    labels = {
        "S1": "场景 1 — 100 个随机日期 × 每日期 1 解",
        "S2": "场景 2 — 10 个随机日期 × 每日期至多 10 解",
        "S3": "场景 3 — 1 个随机日期 × 至多 100 解（单次调用）",
    }

    for sid in order:
        rs = by_scene.get(sid, [])
        if not rs:
            continue
        out.append(f"\n## {labels.get(sid, sid)}\n")
        wall_ms = [ns_to_ms(r["wall_time_ns"]) for r in rs]
        succ = sum(int(r["success_samples"]) for r in rs)
        fail = sum(int(r["failure_samples"]) for r in rs)
        timeouts = sum(1 for r in rs if r["timed_out"].lower() == "true")
        overlap = sum(int(r["overlap_rejects"]) for r in rs)
        dedupe = sum(int(r["dedupe_rejects"]) for r in rs)
        leaf = sum(int(r["leaf_candidates"]) for r in rs)

        out.append(f"| 指标 | 值 |\n|------|-----|\n")
        out.append(f"| 调用次数 | {len(rs)} |\n")
        out.append(f"| 成功样本合计（返回的解个数） | {succ} |\n")
        out.append(f"| 失败样本合计（未凑满请求的解个数） | {fail} |\n")
        out.append(f"| 其中发生 `timed_out` 的调用次数 | {timeouts} |\n")
        out.append(f"| 墙钟时间合计 (ms) | {sum(wall_ms):.2f} |\n")
        out.append(f"| 墙钟时间 mean (ms) | {sum(wall_ms)/len(wall_ms):.2f} |\n")
        out.append(f"| 墙钟时间 median (ms) | {median(wall_ms):.2f} |\n")
        out.append(f"| 墙钟时间 min / max (ms) | {min(wall_ms):.2f} / {max(wall_ms):.2f} |\n")
        out.append(f"| overlap_rejects 合计 | {overlap:,} |\n")
        out.append(f"| dedupe_rejects 合计 | {dedupe:,} |\n")
        out.append(f"| leaf_candidates 合计 | {leaf:,} |\n")

    out.append("\n---\n")
    out.append("\n## 全局合计\n")
    wall_all = [ns_to_ms(r["wall_time_ns"]) for r in rows]
    out.append(
        f"- 全部场景墙钟时间总和：**{sum(wall_all):.2f} ms**（约 **{sum(wall_all)/1000:.2f} s**）\n"
    )
    out.append(
        f"- 全部成功 / 失败样本：`{sum(int(r['success_samples']) for r in rows)}` / "
        f"`{sum(int(r['failure_samples']) for r in rows)}`\n"
    )

    text = "".join(out)
    if path:
        report_path = path.with_name(path.stem + "-report.md")
        report_path.write_text(text, encoding="utf-8")
        print(f"Wrote {report_path}", file=sys.stderr)
    print(text)


if __name__ == "__main__":
    main()
