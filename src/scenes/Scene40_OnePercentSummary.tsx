// 镜头 40: 1% 代码总结
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene40_OnePercentSummary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1% 缩放动画
  const scale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
      }}
    >
      {/* 1% */}
      <div
        style={{
          fontSize: '252px',
          fontWeight: 800,
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transform: `scale(${scale})`,
          marginBottom: '42px',
        }}
      >
        1%
      </div>

      {/* 说明 */}
      <div
        style={{
          fontSize: '50px',
          color: colors.text,
          textAlign: 'center',
          opacity: interpolate(frame, [40, 60], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        代码量 · 四件事全部跑通
      </div>

      {/* NanoBot */}
      <div
        style={{
          marginTop: '70px',
          fontSize: '67px',
          fontWeight: 700,
          color: colors.accent,
          opacity: interpolate(frame, [70, 90], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        NanoBot
      </div>
    </AbsoluteFill>
  );
};
