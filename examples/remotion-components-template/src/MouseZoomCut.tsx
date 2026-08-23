import React from 'react';
import {Easing,Video,staticFile,useCurrentFrame,interpolate,AbsoluteFill} from 'remotion';

export const MOUSE_ZOOM_FPS = 30;
export const MOUSE_ZOOM_WIDTH = 1920;
export const MOUSE_ZOOM_HEIGHT = 1034;

// The source cursor reaches the reference block at about 4.35s.
// Keep the target in view for exactly three seconds, then cut the trailing frames.
const ZOOM_START = 3.75 * MOUSE_ZOOM_FPS;
const TARGET_REACHED = 4.35 * MOUSE_ZOOM_FPS;
const HOLD_END = 7.35 * MOUSE_ZOOM_FPS;
export const MOUSE_ZOOM_DURATION_FRAMES = Math.round(HOLD_END);

export const MouseZoomCut: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(
    frame,
    [ZOOM_START, TARGET_REACHED],
    [1, 1.55],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)},
  );
  const progress = interpolate(
    frame,
    [ZOOM_START, TARGET_REACHED],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)},
  );
  // Follow the cursor's approach, then hold the user-provided reference location.
  const focusX = 0.49 + (0.42 - 0.49) * progress;
  const focusY = 0.43 + (0.29 - 0.43) * progress;
  const translateX = (0.5 - focusX) * (zoom - 1) * 100;
  const translateY = (0.5 - focusY) * (zoom - 1) * 100;

  return (
    <AbsoluteFill style={{backgroundColor: '#fff', overflow: 'hidden'}}>
      <Video
        src={staticFile('production/mg-prompt-demo-target.mp4')}
        startFrom={0}
        pauseWhenBuffering={false}
        volume={1}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'fill',
          transformOrigin: 'center center',
          transform: `translate(${translateX}%, ${translateY}%) scale(${zoom})`,
          willChange: 'transform',
        }}
      />
    </AbsoluteFill>
  );
};
