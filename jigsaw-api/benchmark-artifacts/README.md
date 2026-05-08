# 基准测试导出（随仓库版本管理）

本目录存放 POC 演示用的 **CSV 原始结果** 及 **`summarize_benchmark_csv.py` 生成的 Markdown 报告**。运行时 Maven 仍默认写入 `target/benchmark-results/`；复核或更新演示数据后可将新 CSV 复制到此处再提交。

| 文件 | 说明 |
|------|------|
| `solver-exhaustive-*`、`solver-mrv-*` | 同一次配对运行（同一 `run_id`，`random_seed=42`），含 `solver` 列 |
| `solver-baseline-*` | 较早的仅穷举单次运行（CSV 无 `solver` 列，脚本仍可汇总） |
