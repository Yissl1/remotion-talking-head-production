# 第一步：分析素材、生成并确认插画（可选 MG）

## 固定顺序

1. 分析主口播视频、SRT 与真实素材。
2. 根据 SRT 语义和认知锚点判断哪些段落适合插画。
3. 调用 `C:\Users\11066\.codex\skills\ian-xiaohei-illustrations\SKILL.md`，按独立 Skill 原有提示词和 QA 逐张生成插画；不修改其视觉 DNA、专属 IP、提示词或输出规则。
4. 展示每张插画的预览、文件名、对应 SRT cue、表达目的和建议使用区间，等待用户确认/选择。
5. 若用户明确需要额外 MG，再进入 `mg-production`；插画不等于 MG，不能自动互相替代。
6. 用户明确结束第一步后，才能生成第二步脚本。

## 分析产物

- `style-decision.md`
- `cue-map.json`
- `material-requirements.md`
- `illustration-shot-list.md`
- `illustration-assets.json`
- `mg-design-brief.md`（仅有 MG 需求时）

每张插画必须登记：

```json
{
  "path": "C:/project/assets/illustrations/01-topic.png",
  "filename": "01-topic.png",
  "srtCueIds": [3, 4],
  "start": 12.4,
  "end": 17.8,
  "semanticCue": "对应的 SRT 语义",
  "purpose": "解释流程/对比/概念隐喻",
  "status": "candidate"
}
```

## 用户确认

允许的确认表达：

- “确认这些插画”
- “使用第 1、3 张”
- “第 1、2 张可以”
- “重做第 2 张”后再次确认
- “不需要插画，进入脚本”

用户只说“继续”时，不得自动跳过插画选择。确认之前禁止生成 `edit-plan.md`、`edit-script.json`、30 秒预览和完整成片。

## 插画接入边界

插画只是普通媒体素材，和视频、截图、图片、Logo 一样由第二步脚本决定出现位置。它不自动触发 MG、全屏证据、操作演示追踪或新的包装系统。插画必须遵守既有人物安全区、字幕安全区、组件互斥、防剧透、时间码同步、稳定停留、入场/停留/出场和音效规则。

## 可选 MG 循环

用户明确提供 MG 参考或描述时，才创建可复用 Remotion 组件/素材，记录表达句子、构成、文案层级、位置、入场/停留/出场帧数、音效触发点和预览区间。每轮提供静帧或 2–6 秒预览并等待修改/确认。若用户说“不需要 MG”，直接跳过 MG，不阻挡脚本。

## 第一步完成标准

SRT/素材分析完成；插画已生成并确认选择，或用户明确不需要插画；用户明确需要的 MG 已确认，或用户明确不需要 MG；用户明确结束第一步。完成前不得生成脚本或视频。
