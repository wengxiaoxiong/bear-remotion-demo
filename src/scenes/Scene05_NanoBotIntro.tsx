// 镜头 5: NanoBot 能力展示
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const capabilities = [
  { icon: '📡', label: 'Agent核心框架', color: colors.primary },
  { icon: '⚡', label: '主动执行任务', color: colors.accent },
  { icon: '📋', label: '声明式技能', color: colors.secondary },
  { icon: '🧠', label: '分层上下文', color: colors.warning },
];

export const Scene05_NanoBotIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题弹入
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // 能力卡片逐个出现
  const getCardAnimation = (index: number) => {
    const start = 30 + index * 15;
    const y = interpolate(frame - start, [0, 20], [70, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const opacity = interpolate(frame - start, [0, 20], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const scale = spring({
      frame: frame - start,
      fps,
      config: { damping: 20, stiffness: 150 },
    });
    return { y, opacity, scale };
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        padding: '112px',
      }}
    >
      {/* NanoBot 标题 */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          marginBottom: '112px',
        }}
      >
        <span
          style={{
            fontSize: '140px',
            fontWeight: 800,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          NanoBot
        </span>
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: '39px',
          color: colors.textMuted,
          marginBottom: '84px',
          opacity: interpolate(frame, [20, 40], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        几千行代码，核心能力全部保留
      </div>

      {/* 能力卡片网格 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '42px',
          maxWidth: '1120px',
        }}
      >
        {capabilities.map((cap, index) => {
          const anim = getCardAnimation(index);
          return (
            <div
              key={cap.label}
              style={{
                backgroundColor: colors.surface,
                borderRadius: '22px',
                padding: '42px 56px',
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
                border: `1px solid ${colors.border}`,
                transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                opacity: anim.opacity,
              }}
            >
              <span style={{ fontSize: '56px' }}>{cap.icon}</span>
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 600,
                  color: cap.color,
                }}
              >
                {cap.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
