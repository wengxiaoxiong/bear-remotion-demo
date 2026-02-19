// 动画工具函数
import { interpolate, Easing } from 'remotion';
import type { SpringConfig } from 'remotion';

// 常用的 Spring 配置
export const springConfigs = {
  smooth: { damping: 200 } as SpringConfig,
  snappy: { damping: 20, stiffness: 200 } as SpringConfig,
  bouncy: { damping: 8 } as SpringConfig,
  heavy: { damping: 15, stiffness: 80, mass: 2 } as SpringConfig,
};

// 淡入动画
export function fadeIn(frame: number, duration: number, startFrame = 0) {
  return interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// 淡出动画
export function fadeOut(frame: number, duration: number, endFrame: number) {
  return interpolate(frame, [endFrame - duration, endFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

// 打字机效果 - 返回应该显示的字符数
export function typewriter(frame: number, speed: number, textLength: number, startFrame = 0) {
  const progress = Math.max(0, frame - startFrame);
  return Math.min(Math.floor(progress / speed), textLength);
}

// 滑动进入
export function slideIn(
  frame: number,
  duration: number,
  direction: 'left' | 'right' | 'up' | 'down' = 'left',
  distance = 100,
  startFrame = 0
) {
  const progress = interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const offset = (1 - progress) * distance;

  switch (direction) {
    case 'left':
      return { x: -offset, y: 0 };
    case 'right':
      return { x: offset, y: 0 };
    case 'up':
      return { x: 0, y: -offset };
    case 'down':
      return { x: 0, y: offset };
  }
}

// 缩放动画
export function scaleIn(frame: number, duration: number, startFrame = 0) {
  return interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });
}

// 颜色主题
export const colors = {
  background: '#0a0a0f',
  surface: '#13131f',
  surfaceLight: '#1e1e2e',
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  accent: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  border: '#1e293b',
  code: '#e2e8f0',
  pink: '#f472b6',
  cyan: '#22d3ee',
};

// 帧数计算 (假设 30fps)
export const FPS = 30;
export const seconds = (s: number) => s * FPS;
