# 配对对比基准（穷举 vs MRV）

每次运行 `SolverComparisonBenchmarkIT`（`-Djigsaw.benchmark.compare=true`）会在同一 `run_id`、同一批日期下写出两份 CSV。本目录按 **Maven 写入文件名中的时间戳** 分子文件夹归档。

| 子目录 | run_id | MRV 阶段说明 |
|--------|--------|----------------|
| **`1778245517291/`** | `daea9018-4653-4e43-84e3-e3180f3dc0d6` | 初版 MRV（Map/Set 回溯 + 每层全量 MRV 计数） |
| **`1778246626406/`** | `890d2578-540a-4344-aa91-cc255785c2ad` | **A+B**：增量可行计数 + 数组/位掩码状态 |
| **`1778247269738/`** | `8803eed4-5b81-4012-912a-9e597022f262` | **A+B+LCV**：值排序（least-constraining）+ 零域早剪枝 |

每个子目录内：

- `solver-exhaustive-<ts>.csv` / `solver-mrv-<ts>.csv` — 原始数据  
- `*-report.md` — `scripts/summarize_benchmark_csv.py` 汇总  
- `comparison.md` — `scripts/compare_benchmark_csvs.py` 生成的 Markdown 对比  
