# Video Edit QA Checklist

## Safe Area

- All cards, numbers, labels, images, and badges are fully inside the canvas.
- Large numbers fit inside the safe area at every count-up state, not only at the final value.
- Subtitle text is not covered by overlays or player-like UI.
- The speaker's face remains clear unless the visual intentionally becomes full-screen b-roll.

## Overlap

- No two materials occupy the same slot at the same time.
- Same-topic accumulations use separate positions: left top, left mid, left bottom, right top, right mid, right bottom.
- When no free slot remains, fade out the previous material before showing the next.
- Cards with internal text do not have redundant large text on top of them.

## Timing

- Each visual appears when its keyword is spoken.
- List items reveal one by one according to speech order.
- B-roll appears only when it supports the current sentence.
- Fast transitions still leave enough time to read.

## Remotion Checks

Use commands like these from the Remotion project folder:

```bash
npm run lint
node scripts/overlapcheck.mjs
npx remotion still src/index.ts CaseStudyEdit out/check/f0120.png --frame=120
npx remotion render CaseStudyEdit out/final_1080p.mp4 --crf=18
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration -of json out/final_1080p.mp4
ffmpeg -y -ss 00:00:04 -i out/final_1080p.mp4 -frames:v 1 out/final-check-004s.jpg
```

Adjust composition id, entrypoint, and frames to the local project.

## Delivery

- Copy the final mp4 to `<用户主目录>/AI自媒体/成品/YYYYMMDD`, creating the dated folder if needed. On macOS `<用户主目录>` is normally `/Users/<用户名>`; on Windows it is normally `C:\\Users\\<用户名>`.
- Use an 8-digit local date with no separators, such as `<用户主目录>/AI自媒体/成品/20260623` on 2026-06-23.
- Use clear filenames inside that folder, including the current date or topic when helpful.
- If requested, start Remotion Studio and provide the local editable URL.
## Dynamic Talking-Head and Material Continuity

### Person Window

- A shrunken speaker window is a continuously playing source-video crop, not a static screenshot.
- Speaker window, face, subtitle band, and source-material focal area never overlap.
- Keep its frame thin and calm; reject oversized, off-canvas, glowing, or repetitive boxes.
- Verify the full-screen ↔ small-window move is stable, without jitter or excessive bounce.

### Material Playback and Transitions

- Screen recordings, examples, and comparison clips play through their intended action; they are not frozen thumbnails.
- At 0.5–1 second sample intervals, moving source clips show changing frames.
- On a clip end, immediately cut or transition to the ready next material/speaker; no blank hold or empty frame.
- Comparison clips are simultaneously playable when the point is A/B comparison. If source audio is intended, verify dialogue ducking and recovery.

### Semantic Motion and MG

- Every beat has an explanatory change; reject decorative boxes, particles, or HUD elements that add no meaning.
- Motion follows the speech cue and hands an object, line, value, or focus to the next beat.
- The final CTA and spoken ending remain intact and readable through the final two seconds.
- For HyperFrames, inspect deterministic data attributes, paused timelines in `window.__timelines`, and video media start alignment.
