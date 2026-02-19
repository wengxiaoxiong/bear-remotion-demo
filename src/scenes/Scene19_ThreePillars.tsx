// 镜头 19: 三个能力总结
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const pillars = [
  { text: '会推理', icon: '🧠', color: colors.primary, desc: '多轮循环，能迭代' },
  { text: '会主动', icon: '⚡', color: colors.accent, desc: '心跳定时，自动执行' },
  { text: '会扩展', icon: '📦', color: colors.secondary, desc: 'Markdown 即技能' },
];

export const Scene19_ThreePillars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
      {/* 三个能力 */}
      <div
        style={{
          display: 'flex',
          gap: '56px',
          marginBottom: '112px',
        }}
      >
        {pillars.map((pillar, index) => {
          const pillarSpring = spring({
            frame: frame - index * 15,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          return (
            <div
              key={pillar.text}
              style={{
                backgroundColor: colors.surface,
                borderRadius: '28px',
                padding: '70px 56px',
                width: '364px',
                textAlign: 'center',
                border: `2px solid ${pillar.color}40`,
                transform: `scale(${pillarSpring}) translateY(${(1 - pillarSpring) * 30}px)`,
                opacity: pillarSpring,
              }}
            >
              <div style={{ fontSize: '84px', marginBottom: '28px' }}>
                {pillar.icon}
              </div>
              <div
                style={{
                  fontSize: '50px',
                  fontWeight: 700,
                  color: pillar.color,
                  marginBottom: '21px',
                }}
              >
                {pillar.text}
              </div>
              <div style={{ fontSize: '25px', color: colors.textMuted }}>
                {pillar.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* 总结句 */}
      <div
        style={{
          fontSize: '56px',
          color: colors.text,
          textAlign: 'center',
          opacity: interpolate(frame, [60, 80], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        三件事加在一起
        <br />
        就是 NanoBot{' '}
        <span style={{ color: colors.accent, fontWeight: 700 }}>智能的来源</span>
      </div>
    </AbsoluteFill>
  );
};
