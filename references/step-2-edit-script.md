# 第二步：逐时间码剪辑脚本

## 进入条件与门控

只有用户明确结束第一步（例如“下一步”“不需要 MG”“不需要继续生成了”“素材准备好了”“开始生成脚本”或同义表达）后，才能进入第二步。

第二步的输入必须是第一步已经分析的 SRT/语音时间码、真实素材，以及第一步已经生成并由用户确认可用的 MG 动画组件/素材。若用户没有 MG 需求，也必须先明确结束第一步后才能进入。

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
    "scriptConfirmed": false,
    "previewConfirmed": false
  },
  "scenes": []
}
```

用户采用新参考时，可把 `stylePreset` 改为本项目预设名，但仍须保留 `stylePresetSource`，指向当前项目的 `style-decision.md`。

## 每个片段必须记录

- `start`、`end`、`startFrame`、`endFrame`。
- 对应口播、关键词和字幕 cue。
- 场景模式：`speaker`、`speaker-material-split`、`evidence-stage`、`full-material`、`mg`。
- 人物布局、素材布局和安全区。
- 素材路径、素材内部起始时间/帧、裁切方式和入场后稳定策略。
- 调用的真实组件名、完整 props、内部节点 reveal 帧。
- 入场、停留、出场、转场和音效。
- `noSpoilerBefore`。
- MG 组件的项目内路径或资源 ID，确保只引用第一步已确认的组件。

## 真实组件映射

`components[].name` 只能使用 `assets/remotion-components/components.tsx` 的真实导出：

`SubtitleLayer`、`TechCard`、`KeywordChip`、`MetricCard`、`DemoBackdrop`、`DemoPanel`、`SpeakerBubble`、`EvidenceFrame`、`SingleImageEvidence`、`ImageSpread`、`OperationDemoPanel`、`StepFlow`、`ComparePanel`、`DecisionMatrix`、`SceneTransition`。

禁止写 `DemoCopy`、`InfoCard` 等不存在的占位组件。如果现有组件不能表达需求，必须先在组件源码中实现、编译验证并加入组件库说明，再写入脚本。

## 防剧透检查

- 产品名、数字、最终结论、风险词和步骤节点不得早于字幕关键词。
- 卡片容器可轻微提前建立空间，但内部文字不能提前。
- 一个流程在旁白只说到第一步时，不得展示后续完整节点。
- 素材本身若含后文结论，应裁切、遮罩或延后。

## 节奏规则

- 每 2–5 秒安排一次有意义的变化。
- 人物连续 8–12 秒后优先加入证据或结构化视觉；最长不宜连续 12–18 秒完全无变化。
- 同一种转场连续不超过两次。
- 全屏素材与分栏/证据台交替，避免整片 PPT 化。

完成 `edit-script.json` 后执行 JSON Schema 校验，并检查每个组件名都能在组件源码中找到。然后等待用户确认；只有收到明确的脚本确认后，才允许进入第三步。


## 新素材规则的脚本字段

凡使用新增组件，场景必须写清：

- `material.operationDemo`：是否为操作演示；普通素材不得填 true。
- `material.safeRect`：必须位于人物右侧或证据台安全区，避开脸部和字幕。
- 单图场景使用 `SingleImageEvidence`，多图场景使用 `ImageSpread` 并写 `variant`、`groupId`、`reveals`；同一脚本中多组图片不得复用同一 variant。
- 操作演示使用 `OperationDemoPanel` 并写 `trackPoints`、`sourceStartFrame`、`showCursor`、`showFocusRing`；追踪点必须对应口播中正在讲的操作，且不能提前聚焦后文结果。
- 非操作演示素材只能用 `SingleImageEvidence`、`EvidenceFrame` 或 `DemoPanel`，不得添加鼠标/聚焦追踪。
