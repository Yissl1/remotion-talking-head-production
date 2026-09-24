# Remotion 组件模板

将 `components.tsx` 复制进目标 Remotion 工程，根据工程 FPS、字体和布局系统调整。模板提供：

- `SubtitleLayer`
- `TechCard`
- `DemoBackdrop`
- `DemoPanel`
- `SpeakerBubble`
- `MetricCard`
- `KeywordChip`
- `StepFlow`
- `ComparePanel`
- `EvidenceFrame`
- `SingleImageEvidence`
- `ImageSpread`
- `OperationDemoPanel`
- `DecisionMatrix`
- `SceneTransition`

模板保证展示素材在入场完成后保持稳定；`DemoBackdrop` 使用可配置 `themePhrase`。人物小窗必须与主口播使用同一源时间轴：直接挂在全局时间轴时可不设置 `startFrom`；放在延迟开始的 `Sequence` 中时，必须将 `sourceStartFrame` 对齐到该 Sequence 的全局起点，不能从源视频第 0 帧重新播放。


## DemoBackdrop 排版约定

- `themePhrase` 为必填主题短语，由当前视频内容决定。
- 默认使用横向平行文字带；相邻行左右错位；实心与描边交替。
- 不默认使用旋转、竖排或大小散点式堆叠。
- 背景文字只承担氛围和主题强化，不能压过证据素材、字幕、左上标题与人物圆形小窗。


## 本版统一视觉与动画

- `DemoBackdrop` 使用灰黑偏黑背景（`#111315`），艺术字保持横向平行、上下交错、实心/描边交替；`themePhrase` 只负责替换具体主题文案。
- 组件默认使用亮白（`#F7F8FA`）而非彩色强调。
- `TechCard`、`DemoPanel`、`SpeakerBubble` 支持 `edgeGlow`；只在需要强调层级的组件上开启。
- `MetricCard` 的数字会在入场后快速从 0 递增到目标值，适用于数据、百分比、数量和计时等信息。

## 使用约束

- `edit-script.json` 的组件名必须对应上述真实导出。
- 目标工程必须实际复制或导入本文件并通过 TypeScript/Remotion 编译，不能只参考组件名称后自行换成默认样式。
- 组件时间使用全局帧。证据素材若在全局根时间轴渲染，应把场景起点换算进媒体源时间；若放入 `Sequence`，必须同步调整组件接收的局部/全局帧，避免素材和人物圆窗从 0 重播。
- 完成预览后冻结组件 API；全片继续使用相同预设和组件，不得中途视觉漂移。


## 单图、多图和操作演示

- `SingleImageEvidence`：单张图片默认放人物右侧，一次性揭示后稳定停留。
- `ImageSpread`：多张图片先叠放，再按 `stack-spread`、`fan-spread`、`grid-reveal` 或 `orbit-spread` 逐张展开；同一视频的多组图片必须更换 variant。
- `OperationDemoPanel`：仅用于操作录屏，接收归一化 `trackPoints` 做目的性放大、聚焦圈和鼠标标记；普通案例/参考素材不要调用。

## 组件库增强（2026-08-27）

- `LineIconBadge`：图标、中文主标题、英文副标签的彩色信息组件；适合右侧大字号信息和证据步骤。
- `IconLabelChip`：紧凑型图标标签组件，支持 `boxed`、`edgeGlow` 和语义强调色。
- 图标语义：`ai`、`layers`、`download`、`user`、`check`、`warning`、`flow`。
- 录屏自带背景时，组件库调用方必须关闭 `DemoBackdrop`，保留原录屏背景。

## 2026-08-27 v3 组件使用补充

- `PersistentEditorialBar`：全片固定左上编辑栏。必须使用同一 `rect`、文案、颜色和时间范围，不能随场景变化。
- `BilingualSubtitle`：中文主字幕 + 英文副字幕；两行分别使用黑色半透明底条，底部居中，适合参考片式字幕。
- 录屏自带背景时，`DemoPanel` 只负责稳定播放原素材，调用方不要再包裹 `DemoBackdrop` 或其它背景板。
- 纵向信息组要设置明确的 `top` 间隔；`edgeGlow` 只做轻微边缘光，避免所有元素同时高亮。
- **无黑底模式**：用户明确不要黑底时，`DemoPanel` 应使用全画布 `rect={{left:0,top:0,width:1920,height:1080}}` 与 `fit="cover"`，只保留说明组件和 `SpeakerBubble` 叠加。


## 2026-08-27 v5 反馈固化

- `PersistentEditorialBar` 默认作为左上角短栏使用：建议 `rect.width` 控制在 420–560px，`rightLabel` 可省略；横线不得越过人物主体。
- `SpeakerBubble` 在证据段放入延迟 `Sequence` 时，必须设置 `sourceStartFrame={startFrame}`，让缩放框显示主口播在同一全局帧的画面；组件始终 `muted`，避免重复人声。
- 验收时必须对比缩放框嘴型、主口播音频和字幕在证据段首帧/中段/尾帧，确认三者保持同一时间轴。


## 2026-09-01 Microduck v2 组件规则

- `MetricCard` 支持 `fromValue`，金额、价格、数量必须从起始值递增到目标值；金额节点调用 `fromValue={0}`。
- 组件默认采用透明/低不透明度底层，避免大面积黑色矩形；`boxed` 仅在确有必要时启用，单屏最多一个轻量底板。
- `LineIconBadge` 与 `IconLabelChip` 交替使用无框图标、圆形描边、短线和轻微 `edgeGlow`，不要把所有信息套进方框。
- 全屏讲解素材应使用 1920×1080 原画幅，不裁剪、不另加背景板；只有该段显示 `SpeakerBubble`，且必须固定左下 `{left:54,top:690,width:270,height:270}`、静音并将 `sourceStartFrame` 对齐全局起点。
- 固定左上栏保持短、线条不越过人物；禁止跨屏黄色装饰横线。


## 2026-09-14 高级科技资讯组件

新增可复用的商业数据/科技资讯组件：`MetricHero`、`SponsorCard`、`SponsorCardGrid`、`EntityCategoryCard`、`EntityCategoryGrid`、`MetricProgressBar`、`ComparisonBars`、`DotMatrixMetric`、`StepListPanel`、`ArticleEvidencePanel`。它们均支持全局 `startFrame` / `endFrame`、逐项 reveal、圆角细描边和语义强调色；使用时遵循 `references/component-library.md` 的安全区、防剧透、从上到下/从左到右和素材独占规则。
