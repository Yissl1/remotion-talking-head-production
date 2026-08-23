import React from 'react';
import {AbsoluteFill, Easing, Img, Video, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const TWO_TARGET_FPS = 30;
export const TWO_TARGET_WIDTH = 2010;
export const TWO_TARGET_HEIGHT = 1080;

// The source is about 6.99s. The timeline deliberately fits two semantic holds
// into the source instead of appending unrelated frames after the second target.
const TARGET_ONE_REACHED = 0.35 * TWO_TARGET_FPS;
const TARGET_ONE_HOLD_END = 3.35 * TWO_TARGET_FPS;
const TARGET_TWO_REACHED = 3.80 * TWO_TARGET_FPS;

// Keep the inspected content dominant in frame. The output anchor is where the
// selected source point should land in the final frame; this intentionally crops
// away the large empty white page around the UI instead of leaving the target at
// its original lower-page position.
const TARGET_ONE = {x: 0.56, y: 0.27};
const TARGET_ONE_ANCHOR = {x: 0.50, y: 0.50};
const TARGET_ONE_ZOOM = 3.20;
const TARGET_TWO = {x: 0.57, y: 0.90};
const TARGET_TWO_ANCHOR = {x: 0.50, y: 0.50};
const TARGET_TWO_ZOOM = 4.80;

// The source switches away from the attachment strip near 6.7s. Freeze a clean
// attachment-strip frame for the tail so the second target remains visible instead
// of exposing the source video's unrelated follow-up state.
const FREEZE_START = 6.58 * TWO_TARGET_FPS;
const OUTPUT_END = 6.90 * TWO_TARGET_FPS;
export const TWO_TARGET_DURATION_FRAMES = Math.round(OUTPUT_END);

const clampProgress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

export const MouseZoomTwoTargets: React.FC = () => {
  const frame = useCurrentFrame();

  // Animate the source point, its output anchor, and zoom together so both
  // targets arrive smoothly without showing the surrounding blank page.
  const p1 = clampProgress(frame, 0, TARGET_ONE_REACHED);
  const p2 = clampProgress(frame, TARGET_ONE_HOLD_END, TARGET_TWO_REACHED);

  let sourceX = 0.50;
  let sourceY = 0.50;
  let anchorX = 0.50;
  let anchorY = 0.50;
  let zoom = 1;

  if (frame <= TARGET_ONE_REACHED) {
    sourceX = 0.50 + (TARGET_ONE.x - 0.50) * p1;
    sourceY = 0.50 + (TARGET_ONE.y - 0.50) * p1;
    anchorX = 0.50 + (TARGET_ONE_ANCHOR.x - 0.50) * p1;
    anchorY = 0.50 + (TARGET_ONE_ANCHOR.y - 0.50) * p1;
    zoom = 1 + (TARGET_ONE_ZOOM - 1) * p1;
  } else if (frame <= TARGET_ONE_HOLD_END) {
    sourceX = TARGET_ONE.x;
    sourceY = TARGET_ONE.y;
    anchorX = TARGET_ONE_ANCHOR.x;
    anchorY = TARGET_ONE_ANCHOR.y;
    zoom = TARGET_ONE_ZOOM;
  } else {
    sourceX = TARGET_ONE.x + (TARGET_TWO.x - TARGET_ONE.x) * p2;
    sourceY = TARGET_ONE.y + (TARGET_TWO.y - TARGET_ONE.y) * p2;
    anchorX = TARGET_ONE_ANCHOR.x + (TARGET_TWO_ANCHOR.x - TARGET_ONE_ANCHOR.x) * p2;
    anchorY = TARGET_ONE_ANCHOR.y + (TARGET_TWO_ANCHOR.y - TARGET_ONE_ANCHOR.y) * p2;
    zoom = TARGET_ONE_ZOOM + (TARGET_TWO_ZOOM - TARGET_ONE_ZOOM) * p2;
  }

  // CSS applies the translate after the scale. This formula places the selected
  // source point exactly at the requested output anchor.
  const translateX = (anchorX - 0.5) - (sourceX - 0.5) * zoom;
  const translateY = (anchorY - 0.5) - (sourceY - 0.5) * zoom;
  const contentTransform = `translate(${translateX * 100}%, ${translateY * 100}%) scale(${zoom})`;

  return (
    <AbsoluteFill style={{backgroundColor: '#fff', overflow: 'hidden'}}>
      <Video
        src={staticFile('production/style-choice-demo-target.mp4')}
        startFrom={0}
        pauseWhenBuffering={false}
        volume={1}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'fill',
          transformOrigin: 'center center',
          transform: contentTransform,
          willChange: 'transform',
        }}
      />
      {frame >= FREEZE_START ? (
        <Img
          src={staticFile('production/mouse-zoom-freeze/attachment-hold.jpg')}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            transformOrigin: 'center center',
            transform: contentTransform,
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};


