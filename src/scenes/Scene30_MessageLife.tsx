// 镜头 30: 一条消息的一生 - 引入
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const steps = [
  { num: '1', label: '进入', color: colors.primary },
  { num: '2', label: '会话', color: colors.warning },
  { num: '3', label: '上下文', color: colors.accent },
  { num: '4', label: '循环', color: colors.secondary },
  { num: '5', label: '退出', color: colors.pink },
];

export const Scene30_MessageLife: React.FC = () => {
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
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: '80px',
          color: colors.text,
          fontWeight: 700,
          marginBottom: '30px',
          opacity: interpolate(frame, [0, 25], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        一条消息的
        <span style={{ color: colors.primary }}>一生</span>
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: '34px',
          color: colors.textMuted,
          marginBottom: '90px',
          opacity: interpolate(frame, [15, 35], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        当你发一条消息给 Agent，整个流程是怎么走的？
      </div>

      {/* 五步预览 */}
      <div
        style={{
          display: 'flex',
          gap: '30px',
        }}
      >
        {steps.map((step, index) => {
          const stepSpring = spring({
            frame: frame - 40 - index * 10,
            fps,
            config: { damping: 15 },
          });

          return (
            <div
              key={step.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '22px',
                opacity: stepSpring,
                transform: `translateY(${(1 - stepSpring) * 30}px)`,
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: colors.surface,
                  border: `3px solid ${step.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  fontWeight: 700,
                  color: step.color,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  fontSize: '28px',
                  color: colors.text,
                  fontWeight: 500,
                }}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
