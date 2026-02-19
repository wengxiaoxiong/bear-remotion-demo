// 镜头 4: "1%"强调动画
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene04_OnePercent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 100% 缩小到 1% 的动画
  const shrinkProgress = interpolate(frame, [0, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  // 1% 弹入动画
  const onePercentScale = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // 副文案淡入
  const subtitleOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 条形图动画
  const barWidth = interpolate(frame, [30, 90], [560, 28], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
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
      {/* 顶部文案 */}
      <div
        style={{
          fontSize: '56px',
          color: colors.textMuted,
          marginBottom: '84px',
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        我要做的事情是：
      </div>

      {/* 百分比动画 */}
      <div
        style={{
          position: 'relative',
          height: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 100% (缩小消失) */}
        <div
          style={{
            fontSize: `${168 * (1 - shrinkProgress * 0.8)}px`,
            fontWeight: 700,
            color: colors.textMuted,
            opacity: 1 - shrinkProgress,
            position: shrinkProgress > 0.5 ? 'absolute' : 'static',
          }}
        >
          100%
        </div>

        {/* 1% (弹入) */}
        {frame > 40 && (
          <div
            style={{
              fontSize: '252px',
              fontWeight: 800,
              color: colors.primary,
              transform: `scale(${onePercentScale})`,
              textShadow: `0 0 84px ${colors.primary}40`,
            }}
          >
            1%
          </div>
        )}
      </div>

      {/* 条形图 */}
      <div
        style={{
          width: '560px',
          height: '22px',
          backgroundColor: colors.surfaceLight,
          borderRadius: '11px',
          marginTop: '56px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${barWidth}px`,
            height: '100%',
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
            borderRadius: '11px',
          }}
        />
      </div>

      {/* 副文案 */}
      <div
        style={{
          fontSize: '50px',
          color: colors.text,
          marginTop: '84px',
          opacity: subtitleOpacity,
          fontWeight: 500,
        }}
      >
        把 Clawdbot 的<span style={{ color: colors.accent }}>核心架构</span>复刻出来
      </div>
    </AbsoluteFill>
  );
};
