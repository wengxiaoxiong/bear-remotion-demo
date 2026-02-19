// 镜头 20-21: Workspace 工作区引入
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene20_21_WorkspaceIntro: React.FC = () => {
  const frame = useCurrentFrame();

  // 过渡文字淡入
  const textOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Workspace 标题
  const titleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleScale = interpolate(frame, [30, 50], [0.8, 1], {
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
      {/* 过渡句 */}
      <div
        style={{
          fontSize: '45px',
          color: colors.textMuted,
          textAlign: 'center',
          marginBottom: '84px',
          opacity: textOpacity,
          maxWidth: '1120px',
          lineHeight: 1.6,
        }}
      >
        光说「智能」太抽象了
        <br />
        Agent 运行时到底在「看什么」？
      </div>

      {/* Workspace 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '112px',
            fontWeight: 800,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '28px',
          }}
        >
          Workspace
        </div>
        <div
          style={{
            fontSize: '56px',
            color: colors.text,
            marginBottom: '42px',
          }}
        >
          工作区
        </div>
        <div
          style={{
            fontSize: '34px',
            color: colors.textMuted,
            backgroundColor: colors.surface,
            padding: '17px 42px',
            borderRadius: '11px',
            display: 'inline-block',
          }}
        >
          Agent 的办公桌 · 核心设计之一
        </div>
      </div>
    </AbsoluteFill>
  );
};
