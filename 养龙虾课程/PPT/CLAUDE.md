# PPT 目录说明

## 结构

```
PPT/
├── CLAUDE.md
├── assets/
├── images/
├── video/
├── index.html
└── openclaw-course-cover.png
```

## 职责

- `index.html`：正式网页 PPT 入口，使用 `guizang-ppt-skill` 模板底座承载横向 transform 翻页、底部导航、ESC 索引与 Motion 入场动效；视觉层改为 Clean Review。
- `assets/`：存放模板运行依赖，目前包含 Motion One 本地兜底文件 `motion.min.js`。
- `images/`：存放 PPT 图片资源，文件名使用 `{页号}-{语义}.{ext}`，例如 `01-cover.png`。
- `video/`：存放 PPT 视频资源，页面只用相对路径引用，保证目录可整体迁移。
- `openclaw-course-cover.png`：首页渲染验证截图，不作为页面运行依赖。
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
