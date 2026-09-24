# 第二步：逐时间码剪辑脚本

## 进入条件与门控

只有用户明确结束第一步（例如“下一步”“素材准备好了”“开始生成脚本”“不需要插画，进入脚本”或同义表达）后，才能进入第二步。

第二步的输入必须是第一步已经分析的：SRT/语音时间码、真实素材、用户确认的插画，以及已确认的 MG（如有）。如果用户不需要插画或 MG，也必须有明确的“不需要”确认和第一步结束指令。

脚本生成完成后必须停在 `awaiting-script-confirmation`，把 `edit-plan.md` 和 `edit-script.json` 交给用户确认。用户确认前禁止渲染 30 秒预览、完整成片或把“脚本确认”视为默认同意。

## 产物

- `edit-plan.md`：便于用户阅读的分镜表。
- `edit-script.json`：供 Remotion 直接读取的结构化脚本。

脚本根节点必须包含：

```json
{
  "stylePreset": "deposited-final-v1",
  "stylePresetSource": "references/final-style-preset.md",
  "fps": 30,
  "width": 1920,
  "height": 1080,
  "themePhrase": "根据本期主题生成的短语",
  "workflow": {
    "state": "awaiting-script-confirmation",
    "illustrationsConfirmed": true,
    "selectedIllustrations": ["01-topic.png"],
    "scriptConfirmed": false,
    "previewConfirmed": false
  },
  "scenes": []
}
```

## 每个片段必须记录

- `start`、`end`、`startFrame`、`endFrame`。
- 对应口播、关键词和字幕 cue。
- 场景模式：`speaker`、`speaker-material-split`、`evidence-stage`、`full-material`、`illustration`、`mg`。
- 人物布局、素材布局和安全区。
- 素材路径、素材类型、素材内部起始时间/帧、裁切方式和入场后稳定策略。
- 调用的真实组件名、完整 props、内部节点 reveal 帧。
- 入场、停留、出场、转场和音效。
- `noSpoilerBefore`。
- 已确认插画或 MG 的项目内路径/资源 ID，确保只引用第一步已确认的资源。

## 素材类型与真实组件映射

素材类型可为：`video`、`image`、`screenshot`、`logo`、`illustration`、`audio`、`other`。

`components[].name` 只能使用 `assets/remotion-components/components.tsx` 的真实导出：

`SubtitleLayer`、`TechCard`、`KeywordChip`、`MetricCard`、`DemoBackdrop`、`DemoPanel`、`SpeakerBubble`、`EvidenceFrame`、`SingleImageEvidence`、`ImageSpread`、`OperationDemoPanel`、`StepFlow`、`ComparePanel`、`DecisionMatrix`、`SceneTransition`。

插画默认使用 `SingleImageEvidence`；若与其他证据需要统一包裹，可使用 `EvidenceFrame` 或 `DemoPanel`。插画不是新的包装组件，不自动使用 `OperationDemoPanel`。

禁止写 `DemoCopy`、`InfoCard` 等不存在的占位组件。如果现有组件不能表达需求，必须先在组件源码中实现、编译验证并加入组件库说明，再写入脚本。

## 插画场景字段示例

```json
{
  "mode": "illustration",
  "material": {
    "type": "illustration",
    "path": "C:/project/assets/illustrations/01-topic.png",
    "filename": "01-topic.png",
    "semanticCue": "对应的 SRT 语义",
    "role": "semantic-explanation",
    "displayMode": "side-panel",
    "selected": true,
    "operationDemo": false,
    "safeRect": { "left": 0.58, "top": 0.16, "width": 0.34, "height": 0.52 }
  },
  "components": [
    { "name": "SingleImageEvidence", "props": { "path": "C:/project/assets/illustrations/01-topic.png" } }
  ]
}
```

`displayMode` 只能使用 `side-panel`、`two-thirds-panel`、`full-material`。实际布局仍由 `deposited-final-v1` 决定，不能因为素材类型自动全屏或改变人物安全区。

## 防剧透与节奏

- 产品名、数字、最终结论、风险词和步骤节点不得早于字幕关键词。
- 卡片容器可轻微提前建立空间，但内部文字不能提前。
- 每 2–5 秒安排一次有意义的变化；人物连续 8–12 秒后优先加入证据或结构化视觉。
- 同一种转场连续不超过两次；全屏素材与分栏/证据台交替，避免整片 PPT 化。
- 插画出现与 SRT 语义同步，入场完成后稳定停留，不持续抖动、循环缩放、鼠标追踪或漂移。

## 几何与验收

生成脚本时先建立人物安全区、素材区、组件区和字幕区的矩形表。任意时刻这些矩形不得相交；插画不能挡脸、挡嘴、挡手、挡字幕或与其他组件重叠。素材结束后按语义窗口切回人物口播，必要时先退场再进入下一组。

完成 `edit-script.json` 后执行 JSON Schema 校验，并检查每个组件名都能在组件源码中找到。然后等待用户确认；只有收到明确的脚本确认后，才允许进入第三步。

## 新素材字段

- `material.operationDemo`：是否为操作演示；插画和普通素材必须为 `false`。
- `material.safeRect`：必须位于人物右侧或证据台安全区，避开脸部和字幕。
- 单图场景使用 `SingleImageEvidence`；多图场景使用 `ImageSpread` 并写 `variant`、`groupId`、`reveals`。
- 操作演示使用 `OperationDemoPanel` 并写 `trackPoints`、`sourceStartFrame`、`showCursor`、`showFocusRing`。
- 非操作演示素材和插画只能用 `SingleImageEvidence`、`EvidenceFrame` 或 `DemoPanel`，不得添加鼠标/聚焦追踪。

