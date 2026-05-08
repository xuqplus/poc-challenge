# Day 2 — 求解器基准线测试结果

本文件包含两层内容：**（一）与优化算法（MRV）在同一随机种子、同一批日期上的配对对比**；**（二）Day 2 文档首次记录的穷举单次运行归档**，便于对照。

**共同设定：** `random_seed = 42`，每解预算 **2000 ms**，总预算 = `2000 × requested_count` ms；场景形状：S1 = 100×1，S2 = 10×10，S3 = 1×100（共 **111** 行）。

---

## （一）配对基准：穷举 vs MRV（优化算法）

在同一次 JVM 运行中顺序写入两份 CSV（日期与请求完全一致），便于公平对比。

### 运行元数据（配对）

| 字段 | 穷举 | MRV |
|------|------|-----|
| **run_id**（同一配对） | `daea9018-4653-4e43-84e3-e3180f3dc0d6` | 同上 |
| **random_seed** | 42 | 42 |
| **solver** | exhaustive | mrv |
| **数据行数** | 111 | 111 |
| **原始 CSV**（仓库内副本） | `jigsaw-api/benchmark-artifacts/solver-exhaustive-1778245517291.csv` | `jigsaw-api/benchmark-artifacts/solver-mrv-1778245517291.csv` |
| **脚本汇总报告**（同上目录） | `solver-exhaustive-1778245517291-report.md` | `solver-mrv-1778245517291-report.md` |

### 对比摘要（墙钟与样本）

## 配对对比（同场景、同 random_seed）

| 字段 | 左侧 | 右侧 |
|------|------|------|
| **标签** | 穷举（配对） | MRV（配对） |
| **CSV** | `solver-exhaustive-1778245517291.csv` | `solver-mrv-1778245517291.csv` |
| **run_id** | `daea9018-4653-4e43-84e3-e3180f3dc0d6` | `daea9018-4653-4e43-84e3-e3180f3dc0d6` |
| **random_seed** | 42 | 42 |
| **solver** | exhaustive | mrv |
| **行数** | 111 | 111 |

### 各场景墙钟与样本（左侧 vs 右侧）

| 场景 | 说明 | 墙钟合计 (ms) 左 | 墙钟合计 (ms) 右 | 右相对左 | timed_out 次数 左/右 | 成功样本 左/右 | overlap_rejects 左/右 |
|------|------|-------------------|------------------|---------|----------------------|----------------|-------------------------|
| **S1** | 场景 1 — 100 日期 × 1 解 | 65832.38 | 89686.12 | **+36.23%** | 11/20 | 89/80 | 13,452,653,844/16,495,979,920 |
| **S2** | 场景 2 — 10 日期 × 至多 10 解 | 29803.63 | 27983.53 | **-6.11%** | 0/0 | 100/100 | 6,113,966,430/5,038,262,308 |
| **S3** | 场景 3 — 1 日期 × 至多 100 解 | 14943.45 | 23016.89 | **+54.03%** | 0/0 | 100/100 | 2,991,084,939/4,149,110,220 |

### 全局墙钟

| 指标 | 左侧 | 右侧 | 右相对左 |
|------|------|------|----------|
| 全部场景墙钟总和 (ms) | 110579.46 | 140686.55 | **+27.23%** |
| 成功 / 失败样本 | 289 / 11 | 280 / 20 | — |

**解读（本轮数据）：** 在相同日期与超时预算下，MRV 在本仓库 Java 实现中的 **总墙钟与 S1/S3 场景并未低于穷举**；S2 略快。**成功样本数**（289 vs 280）在超时边界上也可能因搜索顺序不同而不一致。后续若要优化 MRV 实施或调参，应以本配对 CSV 为回归基线。

### 复现命令

新生成 CSV（写入 `target/benchmark-results/`，再将需要的文件拷入 `benchmark-artifacts/` 以便提交）：

```bash
cd jigsaw-api
./mvnw test -Djigsaw.benchmark.compare=true -Dtest=SolverComparisonBenchmarkIT
python3 scripts/summarize_benchmark_csv.py target/benchmark-results/solver-exhaustive-<ts>.csv
python3 scripts/compare_benchmark_csvs.py "穷举（配对）" target/benchmark-results/solver-exhaustive-<ts>.csv "MRV（配对）" target/benchmark-results/solver-mrv-<ts>.csv
```

仅用仓库内已提交的 CSV 重新汇总 / 对比：

```bash
cd jigsaw-api
python3 scripts/summarize_benchmark_csv.py benchmark-artifacts/solver-exhaustive-1778245517291.csv
python3 scripts/compare_benchmark_csvs.py "穷举（配对）" benchmark-artifacts/solver-exhaustive-1778245517291.csv "MRV（配对）" benchmark-artifacts/solver-mrv-1778245517291.csv
```

仅穷举、写法与历史一致时：

```bash
./mvnw test -Djigsaw.benchmark=true -Dtest=SolverBaselineBenchmarkIT
```

---

## （二）归档：Day 2 首次穷举单次运行（历史对照）

以下为 **首次** 基准文档记录的穷举求解器汇总（**仅穷举**，无 MRV 列；与上方配对穷举 **非同一次 JVM 计时**，数值仅供参考对照）。

### 运行元数据（归档）

| 字段 | 值 |
|------|-----|
| **random_seed** | 42 |
| **run_id** | `acdd8f5b-29fc-4233-8abc-52f312fe27cd` |
| **数据行数** | 111 |
| **原始 CSV**（仓库内副本） | `jigsaw-api/benchmark-artifacts/solver-baseline-1778242272227.csv` |

### 三场景汇总（归档）

| 场景 | 说明 | 调用次数 | 成功样本合计 | 失败样本合计 | `timed_out` 调用次数 | 墙钟合计 (ms) | mean (ms) | median (ms) | min / max (ms) |
|------|------|----------|--------------|--------------|------------------------|-----------------|-----------|-------------|----------------|
| **S1** | 100 随机日期 × 每日期 1 解 | 100 | 85 | 15 | 15 | 72473.75 | 724.74 | 383.84 | 10.71 / 2021.99 |
| **S2** | 10 随机日期 × 每日期至多 10 解 | 10 | 100 | 0 | 0 | 39304.17 | 3930.42 | 2467.38 | 416.82 / 15579.85 |
| **S3** | 1 随机日期 × 单次至多 100 解 | 1 | 100 | 0 | 0 | 11854.91 | 11854.91 | 11854.91 | 11854.91 / 11854.91 |

### 全局合计（归档）

| 指标 | 值 |
|------|-----|
| 全部场景墙钟时间总和 | **123,632.83 ms**（约 **123.63 s**） |
| 成功样本 / 失败样本（全局） | **285** / **15** |

### 各场景内部计数器合计（归档）

| 场景 | overlap_rejects | dedupe_rejects | leaf_candidates |
|------|-----------------|----------------|-----------------|
| S1 | 13,541,226,663 | 0 | 85 |
| S2 | 7,121,899,955 | 0 | 100 |
| S3 | 2,090,978,858 | 0 | 100 |

---

## 说明

- **失败样本**：相对本次请求的解个数尚未凑满的数量（含超时前未找到任何解的情况）。
- **归档段**中 S1 的 15 次失败对应 **`partial_timeout`**（单日期 2s 内未完成首个可行解枚举）。
- 配对段 CSV 含 **`solver`** 列；归档 CSV 为早期格式，可无该列（脚本仍可读）。
- 明细报告可由 `jigsaw-api/scripts/summarize_benchmark_csv.py` 从任意兼容 CSV 生成（例如 `benchmark-artifacts/*.csv`）。
