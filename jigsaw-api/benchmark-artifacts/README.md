# 基准测试导出（随仓库版本管理）

## 布局

| 路径 | 内容 |
|------|------|
| **`paired/<时间戳>/`** | 穷举 vs MRV **配对**运行：CSV、`comparison.md`、各 solver 的 `summarize` 报告（详见 [`paired/README.md`](paired/README.md)） |
| **`solver-baseline-*.csv`** | Day 2 早期 **仅穷举**单次运行（无 `solver` 列），与配对穷举非同一次 JVM |

新生成的文件默认在 `target/benchmark-results/`；归档时将整个 **`paired/<ts>/`** 目录或单次 CSV 拷入此处再提交。
