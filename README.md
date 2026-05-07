# POC Challenge — Calendar Jigsaw

本仓库延续早期 Hackathon 项目 **Jigsaw** 的思路：在没有原始后端源码的前提下，重新实现 API、容器化运行，并探索用 AI 与 JavaScript 优化拼图求解。

## 背景

### Jigsaw（Hackathon）

- **Web 前端（已开源）**：[raas-jigsaw-web/raas-jigsaw-web.github.io](https://github.com/raas-jigsaw-web/raas-jigsaw-web.github.io)
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
