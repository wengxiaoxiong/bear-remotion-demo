// 镜头 38: 回顾引入
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene38_ReviewIntro: React.FC = () => {
  const frame = useCurrentFrame();

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
      <div
        style={{
          fontSize: '101px',
          fontWeight: 800,
          color: colors.text,
          opacity: interpolate(frame, [0, 25], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        快速回顾
      </div>

      <div
        style={{
          marginTop: '42px',
          fontSize: '39px',
          color: colors.textMuted,
          opacity: interpolate(frame, [20, 40], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Clawdbot 类 Agent 为什么「智能」？
      </div>
    </AbsoluteFill>
  );
};
