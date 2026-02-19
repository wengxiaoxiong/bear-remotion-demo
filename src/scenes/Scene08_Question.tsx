// 镜头 8: 核心问题 - 为什么看起来"智能"？
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene08_Question: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 问题文本淡入
  const textOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // "智能"高亮动画
  const smartScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // 副标题淡入
  const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
      {/* 副标题 */}
      <div
        style={{
          fontSize: '39px',
          color: colors.primary,
          marginBottom: '56px',
          opacity: subtitleOpacity,
          fontWeight: 600,
        }}
      >
        第一集
      </div>

      {/* 核心问题 */}
      <div
        style={{
          fontSize: '78px',
          color: colors.text,
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: '1400px',
          opacity: textOpacity,
        }}
      >
        Clawdbot 类架构的 Agent
        <br />
        为什么看起来
        <span
          style={{
            color: colors.accent,
            fontWeight: 800,
            display: 'inline-block',
            transform: `scale(${1 + smartScale * 0.1})`,
            textShadow: `0 0 56px ${colors.accent}40`,
          }}
        >
          「智能」
        </span>
        ？
      </div>

      {/* 装饰线 */}
      <div
        style={{
          width: interpolate(frame, [20, 50], [0, 280], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          height: '6px',
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
          borderRadius: '3px',
          marginTop: '84px',
        }}
      />
    </AbsoluteFill>
  );
};
