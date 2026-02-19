// 镜头 14: 第一轮对比总结
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene14_Summary1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 循环图标动画
  const loopScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15 },
  });

  // 金句淡入
  const textOpacity = interpolate(frame, [40, 60], [0, 1], {
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
        padding: '100px',
      }}
    >
      {/* 循环动画 */}
      <div
        style={{
          width: '260px',
          height: '260px',
          border: `8px solid ${colors.accent}40`,
          borderRadius: '50%',
          borderTopColor: colors.accent,
          transform: `scale(${loopScale}) rotate(${frame * 3}deg)`,
          marginBottom: '80px',
        }}
      />

      {/* 轮数标注 */}
      <div
        style={{
          fontSize: '50px',
          color: colors.accent,
          marginBottom: '50px',
          opacity: loopScale,
        }}
      >
        3-4 轮循环
      </div>

      {/* 金句 */}
      <div
        style={{
          fontSize: '64px',
          color: colors.text,
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: '1100px',
          opacity: textOpacity,
        }}
      >
        能<span style={{ color: colors.primary }}>迭代</span>、能
        <span style={{ color: colors.accent }}>纠错</span>
      </div>

      {/* 本质区别 */}
      <div
        style={{
          marginTop: '50px',
          fontSize: '38px',
          color: colors.textMuted,
          opacity: interpolate(frame, [70, 90], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        这就是 Agent 和 ChatBot 的第一个本质区别
      </div>
    </AbsoluteFill>
  );
};
