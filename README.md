# POC Challenge — Calendar Jigsaw

本仓库延续早期 Hackathon 项目 **Jigsaw** 的思路：在没有原始后端源码的前提下，重新实现 API、容器化运行，并探索用 AI 与 JavaScript 优化拼图求解。

## 背景

### Jigsaw（Hackathon）

- **Web 前端（已开源）**：[raas-jigsaw-web/raas-jigsaw-web.github.io](https://github.com/raas-jigsaw-web/raas-jigsaw-web.github.io)（本仓库子模块目录名：`jigsaw-web/`）
- **后端 API**：未开源，需部署在内部 AWS 环境，因此无法直接复用。

### 灵感与早期实现

项目灵感来自一类日历拼图游戏。最初由本人用 **Java** 实现了穷举求解算法，并已开源：

- [xuqplus/calendar-jigsaw](https://github.com/xuqplus/calendar-jigsaw)

### 未开源后端的能力（简述）

当时的后端代码库实现了**费洛蒙（pheromone）类算法**，用于在求解过程中加速、优化拼图搜索；具体实现未对外公开。

---

## 本仓库的目标

1. **重新实现 API**：由于原 Jigsaw API 未开源，需要在本项目中自行实现等价或兼容的服务接口。
2. **可复现运行**：提供 **Docker** 或 **Docker Compose** 配置，使项目在本地或 CI 中能一键拉起。
3. **AI 辅助优化求解**：探索利用 AI 改进拼图求解策略或参数（具体形态待定：提示、搜索剪枝、启发式等）。
4. **测试与对比**：建立基准测试与对比流程，量化优化前后的效果（速度、成功率、步数等）。
5. **JavaScript 实现与纯前端路径**：将优化后的求解算法用 **JS** 实现，使应用可以演进为**纯前端**部署（无需专用后端即可演示完整流程）。

---

## 相关链接

| 资源 | 地址 |
|------|------|
| 原 Web 前端仓库 | https://github.com/raas-jigsaw-web/raas-jigsaw-web.github.io |
| Java 穷举求解参考 | https://github.com/xuqplus/calendar-jigsaw |

---

## 交付物说明（面试官场景）

**Day 1 验证**：镜像已发布至 Docker Hub，直接用仓库根目录 **`docker-compose.yml`** 拉取并启动即可，无需本地编译。

| 服务 | 说明 | 主机端口 |
|------|------|----------|
| **api** | Spring Boot（`/resolve` 等） | [http://localhost:8080](http://localhost:8080) |
| **web** | nginx 托管前端静态资源 | [http://localhost:8000](http://localhost:8000) |

前置：**Docker** + **Compose V2**（`docker compose`）。在**克隆后的仓库根目录**执行：

```bash
docker compose pull && docker compose up -d
```

浏览器访问 [http://localhost:8000](http://localhost:8000)；前端请求 [http://localhost:8080](http://localhost:8080) 上的 API。停止：`docker compose down`。

如需**本地改代码再打镜像**：先在宿主机执行 `./mvnw clean package -DskipTests`（`jigsaw-api`）、`cnpm i && cnpm run build`（`jigsaw-web`，cnpm 走国内镜像源），再在仓库根执行 **`./scripts/sync-web-dist-to-root.sh`**（把 `jigsaw-web/dist` 同步到仓库根 **`dist/`**，供 GitHub Pages 与产物一致性），然后 `docker compose build && docker compose up -d`（当前 Dockerfile 仅打包运行环境与已编译产物）。

### 架构决策与权衡（摘要）

| 决策 | 理由 | 权衡 |
|------|------|------|
| API 用 Java 17 + Spring Boot | 与常见企业栈一致，便于测试与部署 | 较 Node 服务镜像体积更大 |
| **Dockerfile 只做运行环境 + COPY 本地产物** | 宿主机 `./mvnw package` / `cnpm i && cnpm run build` 完成后，`docker build` 仅打包 JRE/nginx + jar/`dist`，镜像构建快 | 打镜像前必须手动执行一遍编译；版本升级时需同步 `Dockerfile` 中 jar 文件名 |
| Web 镜像为 **nginx + 静态 `dist/`** | 无 Node 构建层，镜像小、构建快 | 静态资源必须在宿主机构建好 |
| **仓库根 `dist/`** | `jigsaw-web` 生产构建后运行 `./scripts/sync-web-dist-to-root.sh`，将 **`jigsaw-web/dist` 镜像到根目录 `dist/`** | 便于 **GitHub Pages** 直接托管静态站点；与打 Web 镜像前应保持一致 |

GitHub Pages：经典「从分支部署」仅支持分支上的 **`/`（仓库根）** 或 **`/docs`**。若站点入口必须在子路径 **`/dist`**，请使用 **GitHub Actions** 将仓库根 `dist/` 发布到 Pages，或将构建产物同步到所选目录后再部署（详见仓库根 **`scripts/sync-web-dist-to-root.sh`** 与 `.cursor/rules/github-pages-root-dist.mdc`）。

可按面试要求在此段落后补充更细的模块边界、缓存（如 Caffeine）与 CORS 说明。

### AI 协作说明（请按需填写）

建议在提交前用几句话写明：

- 哪些部分由 AI（如 Cursor）辅助（脚手架、Dockerfile 草稿、文案结构等）；
- 你对生成内容做了哪些**关键修改**（安全校验、业务语义、测试、版本与端口约定等）。

下方为占位示例，**请替换为你的真实过程**：

> 示例：API 接口形状与测试用例由本人主导；AI 辅助生成初版 Dockerfile 与 README 小节，已在本机修正 Compose 端口、Maven 构建路径并手动验证构建命令。

### 验证指南

**1. Docker Compose + Hub（推荐）** — 与上文「交付物说明」一致：**`docker compose pull && docker compose up -d`**，无需本地编译；前端 [http://localhost:8000](http://localhost:8000)，API [http://localhost:8080](http://localhost:8080)；可选按控制器约定请求 **`/resolve`** 等接口。

**2. 本地源码运行（调试）**

```bash
cd jigsaw-api && ./mvnw spring-boot:run
cd jigsaw-web && pnpm install && pnpm run dev   # 另开终端；需已初始化 submodule
```

**3. 本地构建镜像（维护者）** — 先在 **`jigsaw-api`** / **`jigsaw-web`** 完成编译；**Web 构建后务必**在仓库根执行 **`./scripts/sync-web-dist-to-root.sh`**，再 `docker compose build`，或单独 `docker build ./jigsaw-api`、`docker build ./jigsaw-web`（标签见下文）。

### Docker Hub（镜像名与发布）

- `qunqunxu398/jigsaw-api:poc`
- `qunqunxu398/jigsaw-web:poc`

发布：`docker login -u qunqunxu398`（建议用 Hub **Access Token**）。完整顺序示例：

```bash
(cd jigsaw-api && ./mvnw clean package -DskipTests) \
  && (cd jigsaw-web && cnpm i && cnpm run build) \
  && ./scripts/sync-web-dist-to-root.sh \
  && docker compose build && docker compose push
```

---

## Day 2：AI 辅助优化、基准测试与对比报告（简要）

在 Day 1 可交付运行的基础上，利用 AI（Cursor 等）协助迭代 **备选求解器**：以 **MRV（Minimum Remaining Values）** + **前向相容剪枝** 为核心思路，在 `jigsaw-api` 中实现 `CalendarJigsawMrvService`，并通过 **配对基准测试**（相同随机种子、相同日期与请求序列）与原有 **穷举**求解器对比。

### 测试与报告的位置

| 内容 | 路径 |
|------|------|
| **汇总文档（推荐阅读）** | 仓库根目录 [**`BENCHMARK_DAY2.md`**](BENCHMARK_DAY2.md) |
| **配对运行 CSV / `comparison.md` / 汇总报告** | **`jigsaw-api/benchmark-artifacts/paired/<时间戳>/`**（索引见该目录下 **`README.md`**） |
| **复现集成测试** | `cd jigsaw-api && ./mvnw test -Djigsaw.benchmark.compare=true -Dtest=SolverComparisonBenchmarkIT` |

脚本：`jigsaw-api/scripts/summarize_benchmark_csv.py`、`compare_benchmark_csvs.py`。

### 优化成果（基于同一配对基准，相对穷举后端）

以下为最新口径（**MRV**：增量可行域 + 数组状态 + **LCV 值序** + 零域剪枝；与穷举在同一 JVM 配对运行，`random_seed=42`，详见 [**`BENCHMARK_DAY2.md`**](BENCHMARK_DAY2.md)）。

| 指标 | 结果 |
|------|------|
| **全局墙钟总和**（三场景合计） | MRV 相对穷举约 **−75.8%**（穷举约 **112.7 s** → MRV 约 **27.2 s**） |
| **分场景墙钟**（相对穷举） | S1 约 **−72%**，S2 约 **−83%**，S3 约 **−77%** |
| **限时下的成功样本**（配对 111 次调用合计） | 穷举 **289** → MRV **299**（失败 **11 → 1**） |

实现演进（归档 CSV 同路径）：初版 MRV 曾 **慢于穷举**（全局墙钟约 **+27%**）；加入增量域与数组化（A+B）后约 **−28%**；再加入 LCV 与早剪枝后达到上文 **约 −76%** 量级。

### [演示前端](https://xuqplus.github.io/poc-challenge/)

GitHub Pages 对应仓库根目录下的 **`dist/`**（由 `jigsaw-web` 构建后经 `./scripts/sync-web-dist-to-root.sh` 同步）。

- [**`/play/play14`**](https://xuqplus.github.io/poc-challenge/#/play/play14)：调用默认 **`/resolve`**（穷举求解）；[**`/play/play15`**](https://xuqplus.github.io/poc-challenge/#/play/play15)：调用 **`solver=mrv`**（优化求解）。菜单文案已区分两者（中英文）。

---

