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

模板保证展示素材在入场完成后保持稳定；`DemoBackdrop` 使用可配置 `themePhrase`；人物小窗不设置 `startFrom`，因此可在全局 Composition 中与主口播保持同步。若人物视频放在延迟开始的 `Sequence` 中，应根据该 Sequence 的时间关系调整源时间，不能盲目从零播放。


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
