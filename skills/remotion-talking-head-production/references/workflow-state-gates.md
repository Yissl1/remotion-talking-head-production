# 工作流状态与确认门

本文件是本 Skill 的执行状态机。任何阶段都要以用户明确输入为门控，不得把“已提供文件”或模型认为方案合理当作确认。插画是独立 Skill 生成的媒体素材，必须先展示并由用户选择后才能进入脚本。

## 状态机

```text
awaiting-style
  -> awaiting-materials
  -> analyzing-srt-and-assets
  -> generating-illustrations
  -> awaiting-illustration-selection
  -> mg-production                 # 仅用户明确要求额外 MG 时，可循环
  -> awaiting-script-request
  -> awaiting-script-confirmation
  -> rendering-30s-preview
  -> awaiting-preview-confirmation
  -> rendering-final
  -> completed
```

`awaiting-materials`、`analyzing-srt-and-assets`、`generating-illustrations`、`awaiting-illustration-selection` 和可选的 `mg-production` 都属于第一步。插画确认前禁止生成脚本或任何视频预览。MG 不再是插画确认前的必经步骤，只有用户明确需要额外 MG 时才进入。

## 插画确认门

完成 SRT/素材分析后进入 `generating-illustrations`，调用独立 `ian-xiaohei-illustrations` Skill，逐张生成独立插画，并记录：

- `path`、`filename`
- 对应 `srtCueIds`、`start`、`end`
- `semanticCue`、`purpose`
- `status`（`candidate` / `selected` / `rejected` / `redo-requested`）

展示插画后进入 `awaiting-illustration-selection`。以下表达才算插画确认：

- “确认这些插画”
- “使用第 1、3 张”
- “第 1、2、4 张可以”
- “重做第 2 张”后再次确认
- “不需要插画，进入脚本”

单独“继续”不算插画确认；如果用户只说“继续”，必须继续展示、解释或询问插画选择，不得跳到脚本或渲染。

## 第一阶段结束门

进入 `awaiting-script-request` 前必须确认：

- SRT 和素材已分析，或记录无法分析的原因；
- 真实素材已登记路径、类型、用途和操作演示属性；
- 插画已确认选择，或用户明确不需要插画；
- 若用户明确要求 MG，MG 已确认并有路径/资源 ID；若没有明确要求，不强制制作 MG；
- 用户明确说“下一步”“素材准备好了”“开始生成脚本”或同义表达。

## 脚本门

生成 `edit-plan.md` 与 `edit-script.json` 后，状态为 `awaiting-script-confirmation`。必须把脚本摘要和文件路径交给用户确认。用户确认前禁止渲染 30 秒预览、完整成片或把“继续”视为默认同意。

## 预览门

脚本确认后只渲染默认 30 秒代表性预览，状态为 `awaiting-preview-confirmation`。必须等待用户明确表示预览没问题、可以出片或同义表达，才允许全片渲染。若用户提出修改，回到脚本或素材接入阶段并重新生成 30 秒预览。

## 状态文件

建议每个项目维护 `workflow-state.json`：

```json
{
  "state": "awaiting-illustration-selection",
  "stylePreset": "deposited-final-v1",
  "illustrationsConfirmed": false,
  "selectedIllustrations": [],
  "scriptConfirmed": false,
  "previewConfirmed": false,
  "materials": [],
  "illustrationAssets": [],
  "mgAssets": []
}
```

任何状态不满足门控条件时，禁止执行下一阶段的脚本或渲染动作。
