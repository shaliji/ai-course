# PPT 目录说明

## 结构

```
PPT/
├── CLAUDE.md
├── assets/
├── images/
├── video/
└── index.html
```

## 职责

- `index.html`：正式网页 PPT 入口，使用 `guizang-ppt-skill` 模板底座承载横向 transform 翻页、底部导航、ESC 索引与 Motion 入场动效；视觉层改为 Clean Review。
- `assets/`：存放模板运行依赖，目前包含 Motion One 本地兜底文件 `motion.min.js`。
- `images/`：存放 PPT 图片资源，文件名使用 `{页号}-{语义}.{ext}`，例如 `01-cover.png`。
- `video/`：存放 PPT 视频资源，页面只用相对路径引用，保证目录可整体迁移。
- `CLAUDE.md`：记录目录边界、文件职责和后续维护规则。

## 决策

本目录只服务“养龙虾课程 / OpenClaw”PPT 产物。页面结构遵循 `guizang-ppt-skill` 的单 HTML 横向翻页交付规范：`index.html` 与资源目录同级，提供底部圆点导航、键盘翻页、滚轮翻页、触屏滑动和 ESC 索引。

视觉风格不继承 guizang 的电子杂志风，而采用 `lieflat-html-design` 的 `clean-review`：红橙主色、黑色重点块、极简信息层级，适配初中生 AI 课程场景。

## 开发规范

- 新页面只追加到 `index.html` 的 `<div id="deck">` 内。
- 每个 `<section class="slide">` 必须配置 `light` / `dark` / `hero light` / `hero dark` 主题类，确保背景与导航状态正确。
- 每个核心内容块必须加 `data-anim`，否则翻页没有入场节奏。
- 图片放入 `images/`，视频放入 `video/`，HTML 中使用相对路径。
- 结构变更后同步更新本文件，避免交付物和说明脱节。

## 变更记录

- 2026-05-29：建立标准 PPT 目录骨架，新增 `index.html`、`assets/`、`images/`、`video/` 与 guizang 模板原生 ESC 索引/底部导航。
- 2026-05-29：删除旧兼容入口 `openclaw-course.html`，统一使用 `index.html` 作为唯一入口。
- 2026-05-29：将临时图片 `images/image.png` 重命名为 `images/05-openclaw-vs-chatbot.png`，并新增第 5 页大图展示。
- 2026-05-29：将第 7 页临时图片 `images/image.png` 重命名为 `images/07-openclaw-core-features.png`，并更新核心功能介绍页引用。
- 2026-05-29：将第 9 页截图 `images/PixPin_2026-05-29_12-02-24.png` 重命名为 `images/09-assign-task-dialog.png`，并新增对话布置任务页。
- 2026-05-29：将第 10 页截图 `images/PixPin_2026-05-29_12-05-36.png` 重命名为 `images/10-official-expert-agent.png`，并新增官方专家 Agent 页。
- 2026-05-29：将第 11 页截图 `images/PixPin_2026-05-29_12-07-52.png` 重命名为 `images/11-scheduled-task.png`，并新增定时任务页。
- 2026-05-29：将第 12-15 页截图分别重命名为 `images/12-file-records.png`、`images/13-app-links.png`、`images/14-memory-dream.png`、`images/15-lab-features.png`，并新增文件、链接、记忆、Lab 四页。
- 2026-05-29：新增第 16 页体验环节，展示微信闲聊、安装星座测试 skill、完成星座测试三步任务。
- 2026-05-29：新增第 17 页创建专属 Agent 任务说明，并提供语雀“任务完成步骤”外链按钮。
- 2026-05-29：将 `images/image.png`、`images/image (1).png` 重命名为 skill 示例图资源，并新增“什么是 skill”双图说明页。
- 2026-05-29：新增第 19 页创建错题集 skill 任务说明，并提供语雀“任务完成步骤”外链按钮。
- 2026-05-29：新增第 20 页作品展示环节章节页，仅保留“作品展示 / 环节”文字。
- 2026-05-29：新增第 21 页课程总结，收束 AI 自主执行、人的持续学习与效率提升关系。
- 2026-05-29：在第 4 页后插入第 5 页 `video/龙虾介绍.mov` 视频页，后续页面显示编号顺延，课程总结页调整为第 22 页。
- 2026-05-29：将“什么是 skill”拆为第 19 页章节标题和 skill 双图示例页，后续页码顺延至第 23 页总结。
- 2026-05-29：在第 19 页后插入第 20 页 `video/skill 是什么.mov` 视频页，skill 示例图顺延，课程总结页调整为第 24 页。
- 2026-05-29：将原第 4 页“龙虾是什么”拆为第 4 页章节标题和第 5 页双问题页，后续页码顺延，skill 示例图重命名为 `images/22-skill-example-left.png`、`images/22-skill-example-right.png`，课程总结页调整为第 25 页。
