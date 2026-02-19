// 镜头 39: 四件事总结
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const pillars = [
  {
    title: '会推理',
    desc: '多轮思考-行动循环',
    detail: '能迭代、能纠错',
    icon: '🧠',
    color: colors.primary,
  },
  {
    title: '会主动',
    desc: '心跳和定时任务',
    detail: '没人说话也能干活',
    icon: '⚡',
    color: colors.accent,
  },
  {
    title: '会扩展',
    desc: '声明式技能系统',
    detail: '写文档就能教它新能力',
    icon: '📦',
    color: colors.secondary,
  },
  {
    title: '看得准',
    desc: '分层上下文工程',
    detail: '让模型每次都能看到该看的信息',
    icon: '👁️',
    color: colors.warning,
  },
];

export const Scene39_FourPillars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        padding: '110px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 说明 */}
      <div
        style={{
          fontSize: '34px',
          color: colors.textMuted,
          marginBottom: '70px',
          textAlign: 'center',
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        不是因为用了什么魔法模型
        <br />
        而是因为在<span style={{ color: colors.primary, fontWeight: 600 }}>架构层面</span>做了四件事：
      </div>

      {/* 四件事 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '42px',
          maxWidth: '1260px',
        }}
      >
        {pillars.map((pillar, index) => {
          const pillarSpring = spring({
            frame: frame - 20 - index * 15,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          return (
            <div
              key={pillar.title}
              style={{
                backgroundColor: colors.surface,
                borderRadius: '22px',
                padding: '49px',
                borderLeft: `7px solid ${pillar.color}`,
                transform: `scale(${pillarSpring}) translateY(${(1 - pillarSpring) * 20}px)`,
                opacity: pillarSpring,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '21px',
                  marginBottom: '21px',
                }}
              >
                <span style={{ fontSize: '50px' }}>{pillar.icon}</span>
                <span
                  style={{
                    fontSize: '45px',
                    fontWeight: 700,
                    color: pillar.color,
                  }}
                >
                  {pillar.title}
                </span>
              </div>
              <div
                style={{
                  fontSize: '28px',
                  color: colors.text,
                  marginBottom: '14px',
                }}
              >
                {pillar.desc}
              </div>
              <div
                style={{
                  fontSize: '22px',
                  color: colors.textMuted,
                }}
              >
                {pillar.detail}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
