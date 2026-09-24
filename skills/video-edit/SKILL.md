---
name: video-edit
description: Remotion-based talking-head video editing workflow for AI self-media videos. Use when Codex needs to cut or rebuild a 16:9 or 9:16 talking-head video with dynamic overlays, b-roll, captions, source cards, safe-area layout, keyword-timed animations, local editable Remotion Studio, final 1080p+ render, or fixes for overlapping/off-screen video materials.
---

# Video Edit

## Workflow

Use the Remotion skill first for Remotion-specific rules. If captions, ffmpeg, images, or timing are involved, read the relevant Remotion rule files before editing.

1. Gather inputs: raw video, transcript with timecodes, reference screenshots/videos, platform ratio, output directory, and any forbidden text or icons.
2. Before timing any overlay, extract or obtain a timestamped transcript from the actual source video. Treat script/docx copy as planning context only unless it is already a verified, timestamped transcript of the exact video.
3. Inspect existing project structure before editing. Prefer the current Remotion project's patterns, components, assets, and naming.
4. Build a cue map from the timestamped transcript before touching visuals. Include exact times for money numbers, product names, lesson headings, examples, proof points, and CTA.
5. Build or update overlays from the cue map. Time each visual to the spoken keyword, not to the section title or written script alone.
6. Use a safe layout system before adding visual richness. Keep the speaker visually dominant and reserve side columns for materials.
7. Render still frames at risky timestamps before full export. Check the actual rendered mp4 after export.
8. Start Remotion Studio when the user asks for a local editable version and provide the local URL.
9. Copy the final mp4 into the dated product folder: `<用户主目录>/AI自媒体/成品/YYYYMMDD`, using local current date format such as `20260623`. Create the folder if it does not exist. On macOS `<用户主目录>` is normally `/Users/<用户名>`; on Windows it is normally `C:\\Users\\<用户名>`. If that AI self-media folder does not exist, ask the user for the final output folder rather than assuming a different location.

## Transcript-First Cue Map

For talking-head edits, always create or infer a cue map from the actual audio before layout work:

- Extract the real video transcript with timestamps whenever the raw video exists. Do not rely on a docx/script as the timing source.
- Convert transcript events into a cue map such as: `2.04 月入10万美金`, `30.88 ShipFast`, `32.69 CodeFast`, `33.88 LogoFast`, `45.18 去年进账100万美金`.
- Use the cue map for every overlay start time. If a product, number, card row, chart, screenshot, or proof point is not yet spoken, it should not be visible.
- Treat each row inside a visual as its own timed asset. A section card or HUD can enter early, but its internal claims must reveal one by one at their spoken cues.
- When the transcript differs from the written script, the transcript wins. Remove or rewrite visuals for ideas that are not actually spoken.
- For revenue or money claims, record both value and unit in the cue map: monthly, annual, one-time payment, MRR, ARR, or total revenue. Never swap units.

## Layout Rules

For 16:9 talking-head videos with the speaker centered, prefer the proven layout from this project:

- For centered talking-head edits, lock placement independently by visual class: honor the user's latest side instruction for explanation/information components and for proof/source assets. If the user assigns them to opposite sides, preserve that split; never force every overlay and proof image onto one side based on a generic project default.
- Keep one main item per reserved side at a time; sequence items instead of stacking dense panels, while preserving the user's component/evidence side split.
- Keep materials fully inside the 1920x1080 canvas. Do not let large numbers, cards, images, badges, or subtitles run off-screen.
- Avoid overlap by construction. If two elements would share a band, sequence them instead of stacking them.
- Do not put important overlays over the speaker's face or the subtitle band.
- Let prior materials remain only when they are still readable and occupy separate slots.
- When a new material would cover old text, either move it to an empty slot or fade the old material out first.
- Do not place components on the unrequested side to create a left/right rhythm when the user has explicitly fixed component placement. The speaker remains the visual center.
- Keep the subtitle band clear. If the source video already has subtitles, treat the lower center as unavailable for overlays.
- Avoid top-left duplication: do not show both a persistent lesson badge and a large HUD title with the same number/section label.

## Visual Style Rules

For polished AI self-media edits, avoid making every material a glass card with rows inside. Use a more premium HUD/information-layer style by default:

- Prefer left-side layered information: large Chinese title, small uppercase English/Chinese kicker, neon underline, short subline, and timed supporting elements.
- Use cards sparingly. Reserve framed cards for real screenshots, source materials, CTA blocks, or compact proof modules; do not wrap every idea in a big rounded rectangle.
- Replace list-card layouts with mixed visual forms: big typography, icon docks, signal rows with only left rules/underlines, data strips, mini panels, timelines, flow nodes, equations, and lightweight terminal/source frames.
- Keep existing good animations such as count-ups, pop-ins, staggered row reveals, and subtle screenshot drift, but apply them to the HUD elements rather than forcing everything into a card.
- The left side can carry more information than before, but it must still breathe: use strong hierarchy, short labels, and negative space instead of dense paragraphs.
- Match the reference aesthetic when asked for a more advanced look: tech/HUD, neon cyan/green/amber accents, bold white Chinese headlines, small bilingual metadata, and thin glowing lines.

### Preferred HUD Pattern

Use this visual hierarchy for most concept sections:

1. Small metadata line: uppercase English plus optional Chinese, e.g. `MOVE 01 · DISTRIBUTION`, `PORTFOLIO LINE`, `PUBLIC TRUST`.
2. Thin neon vertical tick and underline.
3. Large bold Chinese headline, usually 2 lines, with one important word in accent color.
4. One short subline only if it adds meaning.
5. Supporting elements below: icon dock, signal rows, mini panels, timeline, equation, or data strips.

Good reusable component ideas:

- `HoloTitle`: kicker + neon underline + large Chinese title + optional subline.
- `SignalRows`: staggered rows with only a left rule, underline, translucent gradient, and short labels. This replaces bulky list cards.
- `IconDock`: 2-5 circular neon icons for roles, products, skills, or actions.
- `MiniPanel`: small proof or formula module, not a giant card.
- `SourceShot`: real product/source screenshot in a lightweight frame with subtle drift; use for proof, not decoration.
- `ProductPills` / data strip: compact revenue or product metrics using thin rules and colored text, not a big boxed table.

Avoid this default look unless specifically requested:

- One large rounded rectangle containing every line of information.
- Multiple glass cards stacked vertically on the same side.
- A card that appears and immediately reveals all rows, chips, claims, or examples.
- Decorative UI that explains nothing or feels like generic sci-fi filler.

### Section Treatment Examples

When editing business/AI case-study videos, use these patterns:

- Hook metric: large count-up number only after the spoken money cue; label must include the spoken unit such as `月入十万美金` or `去年进账一百万美金`.
- Origin story: `HoloTitle` with place/time + `SignalRows` for dated milestones such as basement, first email, first payment, proof moment.
- Product matrix: big title like `产品矩阵`; reveal product rows only when each product name is spoken; show product screenshots on the right when each product is named.
- Funnel/ecosystem: do not show the whole funnel at once. Reveal each node or row when the speaker says free entry, paid product, ecosystem, or portfolio hedge.
- Lessons/moves: use one big HUD title per lesson and reveal supporting signals one by one. Do not also add a separate lesson badge if the HUD title already carries the lesson number.
- Skill stacking: use bars, columns, icons, or equation-style visuals rather than a text list.
- Failure/trust section: use warning/trust color language and a timeline or signal rows; avoid sensational visuals that are not supported by the speech.

## Timing Rules

Make overlays match the spoken words:

- The actual video transcript timecodes are the source of truth. Do not time materials from a Word/script file when the video audio exists.
- If a section says "感悟 1 是 A, B, C", reveal A when A is spoken, B when B is spoken, and C when C is spoken.
- For cards with multiple rows, chips, bullets, numbers, or examples, reveal each internal item at its own spoken cue. Do not show all rows at card entry.
- Do not reveal future products, claims, examples, or outcomes before the speaker says them. Product/source screenshots should appear when the product is named or the source claim is spoken.
- Match money metrics exactly to the spoken unit and timing. For example, do not swap monthly revenue and annual revenue; if the audio says "月入十万", show monthly $100K, and if it says "年入百万/去年进账100万", show annual $1M.
- Use the transcript timecodes as the source of truth, then verify by previewing frames.
- Keep material changes frequent enough to feel alive, but never so fast that text cannot be read.
- For list reveals, stagger chips or rows by the actual phrase timing.
- If an overlay container enters before all its internal details are spoken, hide future details rather than showing them dimly with readable text.
- Source screenshots should appear no earlier than the named product/source cue and should disappear or give way before the next screenshot in the same slot.
- When a spoken section has 5-6 internal claims, prefer a single HUD title plus row-by-row reveal. Do not compress them into a dense paragraph.

## Material Rules

Use rich but relevant materials:

- Prefer real product screenshots, article/source screenshots, app UI, charts, b-roll photos, and simple data visualizations that match the current spoken point.
- Use web search or generated images only when they improve relevance. Avoid images that look obviously AI-generated.
- Do not add unnecessary labels if the icon/card already explains itself.
- Remove user-forbidden elements such as handles, follow badges, or misspelled names.
- Keep Chinese names exact. In this project, use "子昂", not "紫昂".
- For product intro sections, make sure every named product has matching material when possible. If the audio names ShipFast, CodeFast, and LogoFast, include LogoFast too.
- Do not show unrelated proof materials just because they exist in the folder. A screenshot must support the current spoken point.
- If web-sourced or local product material is missing, search for or create a relevant support asset before settling for a generic placeholder.

## Verification

Read [references/qa-checklist.md](references/qa-checklist.md) before final export or after fixing layout complaints.

Minimum checks:

- Confirm that a timestamped transcript from the actual video exists and that overlay cue times came from it.
- Confirm there is a cue map for all money metrics, product names, section headings, and proof screenshots.
- Check for visual spoilers: no card row, product screenshot, money number, or conclusion appears before its spoken cue.
- Check metric-unit matching, especially monthly vs annual numbers.
- Check product-material coverage: all named products in a product-intro sequence have a corresponding screenshot or deliberate visual treatment.
- Check visual sophistication: the edit should not be dominated by repeated rounded glass cards with text rows. Use HUD titles, icons, signal rows, data strips, or lightweight frames.
- Check duplicate section labels: do not stack old lesson badges on top of new HUD headings.
- Run TypeScript/lint if available.
- Run a static overlap/time-slot check if the project has one, or create a small script for risky timelines.
- Render still frames at every risky timestamp: opening hook, large money numbers, dense list reveals, lesson badges, b-roll cards, closing CTA.
- Create a contact sheet of rendered stills from the risky timestamps and visually inspect it before asking the user to review.
- Extract frames from the final mp4 after render. Do not rely only on Remotion stills.
- Confirm final video is at least 1080p.

## HUD Redesign Completion Standard

When a video has been upgraded from card-list visuals to the premium HUD/information-layer style, the completion state should include all of the following:

- The visual presentation is no longer dominated by "glass card + text rows." It uses large HUD titles, English kicker metadata, glowing thin lines, icon docks, signal rows, data strips, lightweight screenshot frames, timelines, or flow nodes.
- The previously fixed transcript timing remains intact. The HUD redesign must not break the rule that visuals appear only when the corresponding words are spoken.
- The local Remotion Studio preview is the primary review artifact. Provide the Studio URL and ask the user to inspect it before final export.
- The `video-edit` skill should be updated with any new durable visual/timing rule discovered during the redesign, so the user does not need to repeat the same correction next time.
- Generate key stills or a contact sheet after the HUD redesign and inspect it for hierarchy, overlap, subtitle clearance, and whether the left side feels information-rich but not cramped.
- In the handoff message, explicitly summarize the new visual language, for example: "changed from glass card lists to HUD information layers with large titles, English kickers, glowing lines, icon docks, signal rows, data strips, and lightweight source frames."

## Preview-First Rule

When the user reports timing, spoiler, or overlap problems, or asks to inspect locally, stop at a local editable Remotion Studio preview. Do not render or copy a final mp4 until the user confirms the preview.

If a render is accidentally created inside the working project, do not copy it to the final product folder or present it as final. Keep the Remotion Studio URL as the review artifact until the user confirms.

## Marc Lou Case Study Lessons From 2026-06-27

These are reusable editing lessons from the Marc Lou product-matrix edit:

- The first serious pass failed because visuals were timed from the script instead of the actual audio. The fix was to transcribe the raw video and build a timestamp cue map first.
- The opening cue said monthly $100K, while the middle cue said annual/last-year $1M. The fix was to bind metric value, unit, and time together instead of treating money numbers as interchangeable.
- Product materials must match the spoken list. ShipFast and CodeFast were present, but LogoFast was missing from the product intro; the fix was to add LogoFast material exactly when LogoFast was spoken.
- Card rows are also timed materials. Product rows, lesson rows, and proof rows should pop at their own spoken phrases, not all at card entry.
- Overlap must be prevented by slot sequencing, not by hoping the layout looks okay. Maintain a simple overlap-check script or equivalent table for left/right slots.
- The more premium version used HUD composition: `HoloTitle`, `SignalRows`, `IconDock`, `MiniPanel`, data strips, and lightweight source frames. This should be the default direction for AI/business case-study edits.
- Reference aesthetic: bold white Chinese headline, neon cyan/green/amber accent, thin glowing lines, small uppercase English metadata, sparse but information-rich left side, real source proof on the right.
- Keep existing animation strengths: count-up metrics, pop-in icons, row-by-row reveal, subtle screenshot drift, and fade-out holds.
- Final review should be a local Remotion Studio preview plus key still/contact-sheet inspection. Export final mp4 only after user approval.

## Delivery Path

Default to the user's AI self-media product folder:

```text
<用户主目录>/AI自媒体/成品/YYYYMMDD
```

Use an 8-digit local date with no separators. For example, on 2026-06-23, put outputs under:

```text
<用户主目录>/AI自媒体/成品/20260623
```

Keep generated working files in the Remotion project as needed, but the user-facing final mp4 must be copied into the dated product folder.
## Project Addendum: 口播动态包装、人物小窗与素材连续性

本节是对上述原始工作流的增量补充：保留原有 Remotion 的转录优先、时序、布局、安全区、HUD 与交付规则；以下规则用于口播型短视频的动态人物缩放、素材穿插、MG 动画与转场。

### 先拆内容，再做动态画面

- 在制作前完成真实 ASR 和 cue map。按自然语义拆成连续 beat，而不是只按字幕换行切画面。
- 每个 beat 都要有一个可解释的视觉变化：对象生成、拆分、连接、传递、移动、聚合、数值增长、状态切换、镜头推进或关系高亮。
- 字幕负责呈现“说了什么”；信息卡、标题、流程、图表负责解释“这段真正想说明什么”。不要把信息卡当作整段字幕的重复。
- 前一个 beat 的关键对象优先交接到下一个 beat。不要提前展示完整结论后等待旁白；除刻意的重点停留外，不得连续超过 1 秒没有信息变化。
- 动画先完成可读的静态终帧，再制作进入、保持、离开。最后一个关键动作必须在口播结束前完成，并保留可读终帧和完整 CTA。
- 用户指定人物侧边布局时，按素材类别分别锁定位置：说明/信息组件与证明/证据素材可以分居人物两侧；严格遵守用户最新明确指定，不能把某一侧的通用模板套到所有组件。
- 禁止突兀的纯黑对比面板/黑色大底组件；尽量用透明文字、细线和真实素材融入原画面。
- 用户要求全程固定的左上角信息条时，从首帧持续到尾帧，样式、位置保持一致，并检查与字幕和其他图文不冲突。

### 动态人物缩放小窗

- 人物从全屏缩为小窗时，必须仍使用同一段连续播放的原口播视频和原口播音频；禁止用静态截图冒充人物小窗。
- 默认让录屏、案例图、成片和对比视频成为主画面；人物小窗仅作为持续讲解的陪衬。根据主素材关键区在左下、右下或侧边切换，不要长期固定在单一位置。
- 小窗使用细边界、留白和轻阴影即可，不使用厚重大框、发光描边、超屏框或廉价 AI HUD。人物脸、字幕安全区、录屏操作区和案例关键内容不得互相遮挡。
- 全屏→小窗采用稳定的缩放与位移，建议 0.35–0.55 秒；小窗→全屏应服务于下一观点或结论。避免高频抖动、过度弹簧和每句话都缩放。
- 人物移动前先检查字幕安全区；人物框缩小后，人物视频本身必须继续随时间播放，而不是只移动外框。

### 入场、出场与丝滑转场

- 切点优先对齐重音、停顿、关键词、句号或素材中可见动作。普通观点切换可直接切；有关系的内容优先采用共享对象衔接。
- 推荐将标题线延展成流程线、数字变成数据卡、录屏缩为证据条、输入素材汇入模型节点等方式作为语义交接，而不是无意义的旋转、翻页或扫光。
- 常用时长：直接切 0–0.18 秒；证据轻滑入/模糊转清晰 0.20–0.40 秒；人物让位给素材或流程推进 0.25–0.55 秒；素材结束回人物 0.10–0.35 秒。
- 出场必须为下一画面让位。不能先清空旧画面再等待新画面，也不能出现黑场、白场、底色空白、空框或素材结束后的长时间定格。
- 同一种转场连续使用不超过 2–3 次；放大素材时应使用稳定缩放和裁切，不制造明显抖动。

### MG 动画的使用边界

- MG 动画只用于解释关系、流程、对比、数据或状态变化，不能只是装饰性粒子、无意义扫描线或反复出现的方框。
- 流程类：节点按口播逐个出现、连接、传递，形成清晰的输入→处理→输出。
- 对比类：A/B 真实视频等高同步播放，用简洁版本标签、中线和 1–3 个比较维度说明差异。需要听原片时，明确口播淡出、原声区间和淡回口播。
- 数据类：数字和单位同时出现；条形图、折线、计数器和状态点跟随口播推进。来源使用小型来源条或真实截图，不做夸张新闻墙。
- 结论类：前文元素聚合为一句核心结论或 CTA，再回到人物全屏。避免所有元素都塞进同样的圆角大卡片。

### 真实素材、音频与实现约束

- 录屏、案例、成片和 B-roll 必须使用真实视频连续播放，不能以首帧、封面或静态抽帧替代。素材播放区间结束时立即回切人物或衔接下一素材。
- 如需播放案例原声，标注口播降低音量的起止、素材原声区间和恢复点；音效必须低于人声，且不应每个元素都发声。
- 声音语义：出现用 click/pop，移动用 whoosh，流程连接用 tick，数据增长用 riser/count，结论完成用 confirm。避免嘈杂、重复和盖住口播。
- 若项目采用 HyperFrames 而非 Remotion：使用 HTML/CSS/GSAP；元素与口播共用 `data-start`、`data-duration`、`data-track-index`；场景 timeline 使用 `{ paused: true }` 并注册到 `window.__timelines`；视频用 `<video>` 及正确的 `data-media-start` 保持连续播放；禁用 `Math.random()`、`Date.now()`、无限循环和不可复现的物理模拟。

### Preview-First 补充验收

在完整渲染前，除原有 Preview-First 检查外，至少预览：开场、全屏→人物小窗、录屏/案例进入、视频素材播放中、素材结束回切、左右对比、CTA 和最后两秒。

- 以 0.5–1 秒间隔抽帧确认真实视频仍在播放，而不是静帧。
- 检查字幕不挡脸，小窗不压住录屏关键操作区，人物框与字幕之间有稳定安全距离。
- 检查所有框均在画布内；删除无解释价值、超屏、挡脸或重复的大方框。
- 确认原口播的结尾和评论/CTA 没有被意外裁切。
- 详细表格可使用 `references/cue-map-template.md`；人物、素材和 MG 的具体语言可使用 `references/talking-head-motion-language.md`；最终验收使用 `references/qa-checklist.md`。

## 增量规则：以原 Skill 为主的低干扰口播实现

本段是对原有 video-edit 规范的增量，不替换或削弱前文。默认仍采用原 Skill 的主视觉、字幕与信息包装，只在真实口播素材同步、人物占比和 MG 克制上补充以下约束：

### 1. 人物优先与开合结构
- 开头与结尾各至少 2–3 秒使用人物原始口播全屏画面；不要在第一帧直接堆海报、标题或信息卡。
- 中段也优先保留人物全屏口播，只有在观点需要证据、案例或流程解释时才切入素材；素材结束后必须立刻回到人物，不留黑场或空白。
- 人物全屏、人物窗口、素材窗口都必须来自同一个原始视频时间轴。人物窗口不是截图，必须连续播放同一段对应的画面和嘴型。

### 2. 口播同步与字幕
- 口播音频只保留一条主轨；所有人物窗口静音，且按全局 source frame 对齐，禁止重复播放或错位播放声音。
- SRT/真实语音识别时间码是字幕与画面切点的唯一依据。字幕文本必须完整保留，不能擅自删掉结尾互动语。
- 字幕固定在安全区，不压脸、不遮素材关键主体；人物窗口出现时，窗口与字幕安全区分离。

### 3. 素材槽位与层级
- 一个时间段只允许一个主素材槽位。海报、录屏、案例图、视频片段不得同时叠在同一位置。
- 图片默认完整显示，优先 `contain`，必要时在画布内留白；禁止为了填满画面而裁掉文字或主体。
- 真实视频素材必须使用连续播放区间，不得只显示首帧。播放结束后做平滑淡出或回人物切换。

### 4. MG、转场与科技感
- MG 只解释“关系、流程、变化”，每个信息段最多 1–2 个主动作；删除装饰性大框、堆卡、重复边框和无意义粒子。
- 优先使用细线、短标签、遮罩推入、轻微缩放、局部高亮、数字递进和状态切换；转场时长 8–16 帧，保持丝滑，不做廉价 HUD。
- 科技感来自克制的冷色高光、真实 UI/录屏、细网格、轻微光扫和可信的提示音，不来自霓虹粒子或大面积发光。
- 每个动效元素在进入前先完成静态终帧；所有动画必须可复现，不使用 `Math.random()`、`Date.now()`、无限循环或不可控物理模拟。

### 5. 渲染前验收
- 必须抽查 0 秒、开头转场、每个素材入/出点、人物窗口出现点、字幕长句和结尾 CTA。
- 验收重点：海报完整、人物嘴型与字幕同步、素材不重叠、素材连续播放、字幕不压脸、开头和结尾人物全屏、MG 数量克制。

## 参考博主风格增量：讲解型科技教程 / 视频论文包装

本节是对原有 `video-edit` 规则的低干扰增量，不替换、不覆盖原 Skill。仅当用户明确要求“参考该博主”“做成讲解型科技教程/视频论文风格”时启用；否则仍以原有视频剪辑规范为准。

### 1. 总体定位

- 风格关键词：讲解型、科技教程、视频论文、真实工作流、克制高级、证据驱动。
- 视觉节奏不是高频卡点，而是“旁白主导 + 真实操作持续发生 + 信息结构逐步揭示”。单个内容段可连续保持 10–30 秒，只要录屏中的鼠标、滚动、输入、选中、页面变化仍在发生，就不视为静止。
- 真实网页、软件界面、文档、表格、案例视频优先于装饰性 MG。MG 只负责解释关系、流程、筛选和结果，不抢主画面。
- 不使用霓虹粒子、扫描线、赛博 HUD、连续旋转、PPT 翻页或“每句话一个大卡片”的包装。

### 2. 推荐段落结构

- 开场 2–5 秒：人物原始口播全屏，保留自然表情和真实环境；标题只放一条短观点，避免第一帧堆满信息。
- 观点展开：人物全屏与真实录屏交替。只有当旁白提到工具、案例、流程、数据或证据时，才切入相应素材。
- 章节转折：使用黑色章节卡，包含小号 `SCENE / EPISODE`、居中大标题、橙红色细线和一句极短副标题；章节卡只承担“换主题”，不要承载大段正文。
- 证据段：使用米白/暖灰信息页、网页录屏、文档或表格。人物优先作为左下圆形小窗或轻抠像，保留连续口型；不得用静态截图代替动态口播。
- 结论/CTA：将前文元素收束为一句结论，再回到人物全屏或简洁搜索/评论 CTA；不要以空白、黑场或未完成的卡片结束。

### 3. 画面语言与版式

- 背景优先米白、暖灰、黑色章节页；正文使用深灰/黑色，关键词只使用少量橙红色强调，网页原生蓝色可以保留。
- 章节卡：小号英文标签置于标题上方，标题居中，橙红色细线作为唯一强装饰。线条长度和位置固定，不随文字随机变化。
- 信息页：标题位于上方或左上，流程卡/关系图置于中部，底部保留字幕安全区。卡片使用轻阴影、细边框和较小圆角，不使用厚重外框。
- 人物小窗优先圆形头像或轻抠像；放在左下时要避开字幕和网页关键操作区。小窗必须是原视频连续播放，并与全局 source frame 对齐，不能使用截帧贴图。
- 同一时间段只保留一个主视觉槽位。不要把海报、录屏、案例视频和流程卡同时压在同一层级；需要对比时采用明确的 A/B 分栏或先后切换。
- 图片默认 `contain`，保证标题、人物和关键文字完整可见。所有边界必须在画布内，禁止超屏、挡脸和把字幕压在素材关键主体上。

### 4. 章节卡与信息页的动画

- 章节卡入场：`0.25–0.45s` 的淡入、轻微上移或遮罩推入；标题先出现，细线随后延展，副标题最后淡入。章节卡出场不超过 `0.25–0.40s`。
- 信息页入场：先完成静态终帧，再按旁白顺序逐个揭示节点/行/标签。不要在第一帧一次性展示完整结论。
- 流程图：按照“输入 → 处理 → 输出”连接；每个节点出现时再绘制连接线，线条只走一次，不循环、不闪烁。
- 筛选/对比：先显示候选集合，再逐项降低非目标项的饱和度或透明度，最后高亮被选结果；不要用夸张爆炸、抖动或红色警报。
- 文档/网页：保留真实滚动、鼠标移动、点击、选中、输入和页面加载，必要时做轻微推近（约 1.02–1.06），不要把真实录屏冻结成首帧。
- 同类转场连续最多 2 次。人物→录屏使用 `0.20–0.35s` 轻推入/淡化；录屏→信息页使用 `0.20–0.40s` 清晰化/淡化；章节卡作为自然呼吸点，不做快速炫技。

### 5. 字幕与信息卡分工

- 字幕只记录“说了什么”，沿用原 Skill 的 SRT/真实语音时间码，底部居中或底部安全区，灰白色、轻阴影/轻透明底即可；不把每个词做成不同颜色的艺术字。
- 信息卡只表达“这段话真正意味着什么”，可使用短标题、结论句、流程节点、数字或来源标签；信息卡不能重复整句字幕。
- 字幕出现、换行和消失必须跟语音严格同步；信息卡可以提前少量进入建立结构，但具体数字、产品名、结论和最终选择不能早于旁白。
- 长句优先按语义断行，不让字幕覆盖脸、嘴部、网页按钮或人物小窗；长句期间允许画面轻微运动，但不要为了字幕动画改变口播节奏。

### 6. 音效与混音：少而准、真实高级

- 人声是绝对主轨，建议峰值约 `-6~-3 dBFS`。轻音乐/环境底床约 `-30~-24 dBFS`；普通 UI/点击约 `-24~-18 dBFS`；章节冲击或转场约 `-20~-14 dBFS`，并做短衰减。
- 每个信息段最多 1 个主转场音效 + 1–3 个语义事件音效。音效只绑定“出现、点击、输入、滚动、连接、完成”等可解释动作，不绑定每个字幕词。
- 章节卡：低频 soft hit 或短尾 impact，允许提前 `2–4 帧`，但不能提前透露章节结论。
- 网页/软件出现：短促、真实、低音量的 UI click；鼠标点击、选中、按钮触发使用单次 click/tap；输入或滚动使用极轻的键盘/滚轮质感。
- 流程节点出现使用柔和 tick/pop，连接完成使用短 confirm/chime，数据增长使用极轻的 riser/count；避免尖锐、玩具感和连续滴滴声。
- 禁止扫描音效、廉价反馈音、连续 beep、过大 whoosh、盖住人声的高频音效。所有音效均需 ducking，使人声至少比事件音效高 `6–10 dB`。
- 音效保留 `50–120ms` 预响或尾巴，避免硬切；素材原声需要播放时，先降低/暂停口播，再完整播放明确区间，结束后平滑淡回口播。

### 7. MG 使用边界

- 每个信息段最多 1–2 个主 MG 动作。真实录屏自身已经有鼠标和页面变化时，优先减少额外 MG。
- 只做四类 MG：流程连接、关系高亮、候选筛选、数字/状态变化。装饰性大框、重复边框、无意义粒子、漂浮图标和大面积发光全部删除。
- MG 先出结构、后出细节、最后出结论；不要让完整流程在旁白说到第一步之前就全部出现。
- 所有文字必须有独立的排版盒和安全边界；标题、标签、数字和字幕不得共享同一绝对定位层，避免艺术字叠加、溢出和互相遮挡。

### 8. Remotion 实现约束

- 使用同一条全局时间轴：旁白、SRT、人物全屏、人物小窗、录屏、案例视频、章节卡、MG 和音效均由 frame cue 驱动。
- 真实视频素材必须用连续播放区间；人物小窗仅改变位置/缩放/裁切，不改变 source frame。任何人物小窗都必须静音，避免重复声音和嘴型错位。
- 对每个素材槽位声明 `startFrame`、`durationInFrames`、`zIndex`、`safeRect`、`sourceStartFrame`；渲染前做时间槽位重叠检查。一个槽位同时只能有一个主素材。
- 动画使用可复现的 `spring`/`interpolate`，禁止 `Math.random()`、`Date.now()`、无限循环和不可控物理模拟。字幕、信息卡和 MG 文字均需在进入前完成静态终帧测量。
- 最低验收：抽查 0 秒、开场人物、每个章节卡、每个真实素材入/出点、网页滚动中段、人物小窗嘴型、字幕长句、A/B 对比、结尾 CTA；从最终 MP4 再次抽帧，不只看 Remotion still。

### 9. 与原 Skill 的优先级

1. 真实音频/语音识别时间码与用户明确禁用项优先。
2. 原 Skill 的素材连续播放、字幕同步、安全区、人物优先和 MG 克制规则优先。
3. 本节只补充章节卡、米白信息页、真实教程录屏和少而准的音效语言。
4. 如果本节与用户新的具体要求冲突，以用户当前明确要求为准，并记录为本项目的局部覆盖，不要把一次性偏好写成全局默认。

## 2026-09-03 二次修正：素材与人物分离、竖屏黑边修复

- 用户明确要求“素材和人物不能重叠”时，案例 MP4 必须作为完全不透明的全屏替换层播放；不得通过 0.65–0.76 半透明叠加人物。此规则覆盖同日早先的透明案例展示建议。
- 案例 MP4 播放期间不得生成左下人物缩放框。主口播音频继续由唯一的主音轨提供，案例素材保持静音，字幕和已确认的信息组件可位于案例素材上方。
- 原始口播视频内部出现竖屏素材且两侧自带纯黑边时：中央竖屏内容保持完全不透明；两侧可复用原始口播中其他时间段的动态人物画面作为低对比背景，仅对两侧背景做约 0.45–0.58 透明度、轻微模糊和降亮度。不得把中央素材本身做成半透明。
- 普通信息组件继续禁止半透明彩色长方框。固定左上角组件采用“发光圆点 + 标签 + 约 34px 短实色线 + 辅助标签”的无框结构，装饰线不得跨过人物。
- 验收必须从最终导出的 MP4 抽查：竖屏段中间素材清晰不透明、两侧不是纯黑；每个案例动画段人物不透出；案例结束后一帧正常恢复口播；音频轨存在且持续。

## 2026-09-06 Shotcraft 动效库路由

执行 Remotion 口播剪辑时，可调用 `remotion-talking-head-production` 中的 Shotcraft 动效库：

- 动效实现：`assets/remotion-components/shotcraft-effects.tsx`
- 统一入口：`ShotcraftEffect`
- 接缝转场：`ShotcraftTransition`
- 选型与素材来源：`references/shotcraft-source/` 和 `references/component-library.md`

按语义路由：仪表盘卡片高能登场用 `runway-ground-skim`；多页面体量用 `page-waterfall-wall`；功能首次亮相用 `neon-frame-forerun`；集成/生态/版本翻新用 `integration-hub-map`；占位到真实数据用 `hatch-depth`；UI 功能区巡礼用 `graze-face-tour`。镜头接缝按 `shot-transitions.md` 选择 `portal-wipe`、`dark-travel`、`focus-relay`、`title-card`、`whip-pan` 或 `flash-cut`，禁止默认裸切。

动效必须使用全局 `startFrame/endFrame`，按 SRT cue 安排，遵守人物和字幕安全区；不使用默认占位内容替代真实页面证据。每段 30 秒通常选择 1–3 个主效果，同类转场连续不超过两次，并在最终 MP4 抽查入场、中段、出场及恢复帧。

## 2026-09-24 用户硬性规则：左上角短组件、全片包装、人物左侧统一布局

- 顶部固定组件只允许出现在左上角，使用短标签、短线和小型信息结构；禁止整条全宽渐变底色、长横条顶栏或从左铺到右的顶部背景。
- 用户要求全片包装时，包装必须覆盖从首帧到尾帧的完整口播时间轴，不能只在前30秒预览阶段添加组件；30秒之后也必须根据SRT语义持续安排同步包装。
- 30秒后的包装也要有视觉变化：按各段口播语义交替使用短标题/大字强调、步骤列表、数据条、引语或状态提示、流程节点等结构；不要让后半段连续多个段落都套同一种组件样式，同时仍须与SRT同步。
- 人物保持画面中心时，信息包装组件、解释标签、手机录屏和非证明类真实素材统一放在人物左侧；不得因为布局不便而移到右侧。用户明确指定的证明/证据图片可按其指示放到人物右侧，与左侧组件分区呈现。
- 本规则覆盖此前“人物右侧固定区域”的旧规则；以后以用户最新明确指定的方向为准。
- 所有组件必须避开人物脸部、底部字幕和素材关键内容；左侧空间不足时缩小、分段或留白。证明图片如按用户要求放右侧，也必须避开人物主体及字幕。
- 最终验收必须抽查开头、30秒前后、后半段和结尾，确认左上角短组件、左侧组件布局、用户指定的证明图片位置、全片包装和语义同步均符合要求。

