# 工作流状态与确认门

本文件是本 Skill 的执行状态机。任何阶段都要以用户明确输入为门控，不得把“已提供文件”或“模型认为方案合理”当作用户确认。

## 状态机

```text
awaiting-style
  -> awaiting-materials-and-mg
  -> mg-production (用户要求生成/修改 MG 时，可循环多轮)
  -> awaiting-script-request (素材/MG 已整理，等待用户结束第一步)
  -> awaiting-script-confirmation
  -> rendering-30s-preview
  -> awaiting-preview-confirmation
  -> rendering-final
  -> completed
```

`awaiting-materials-and-mg` 与 `mg-production` 都属于第一步，不得生成最终剪辑脚本或视频预览。MG 可以多轮制作：用户提供参考图/视频/描述后，生成组件、写入 brief、给出短动画预览，然后回到 `mg-production` 或 `awaiting-script-request`。

## 允许的用户结束表达

以下表达或语义等价表达可以把第一步推进到脚本阶段：

- 下一步
- 不需要 MG
- 不需要继续生成了
- 素材准备好了
- 开始生成脚本

单独的“继续”不自动跳过第一步；若上下文没有明确结束素材/MG 准备，应继续收集或询问。

## 三道门

### 门一：结束素材/MG 阶段

进入第二步前必须确认：

- 已分析主口播和 SRT，或记录无法分析的原因；
- 已登记真实素材及其路径/用途；
- 已生成并确认的 MG 组件有路径/资源 ID；
- 缺失素材和 MG 替代方案已告知用户；
- 用户明确发出结束第一步的指令。

### 门二：确认剪辑脚本

生成 `edit-plan.md` 与 `edit-script.json` 后，状态为 `awaiting-script-confirmation`。必须把脚本摘要和文件路径交给用户，等待明确的“确认/可以/按这个脚本做”等同意。此门之前禁止 30 秒预览。

### 门三：确认 30 秒预览

脚本确认后只渲染默认 30 秒代表性预览，状态为 `awaiting-preview-confirmation`。必须等待用户明确表示预览没问题、可以出片或同义表达，才允许全片渲染。若用户提出修改，回到脚本或 MG 阶段并重新生成 30 秒预览。

## 中断与恢复

每次回复前先读取当前项目状态文件（建议 `workflow-state.json`）。如果文件不存在，根据对话上下文初始化，但不要重复读取已经分析过的素材。状态文件至少记录：

```json
{
  "state": "awaiting-materials-and-mg",
  "stylePreset": "deposited-final-v1",
  "scriptConfirmed": false,
  "previewConfirmed": false,
  "materials": [],
  "mgAssets": []
}
```

任何状态不满足门控条件时，禁止执行下一阶段的渲染动作。
