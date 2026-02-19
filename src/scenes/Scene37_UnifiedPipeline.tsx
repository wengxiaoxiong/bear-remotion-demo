// 镜头 37: 统一管线 - 所有触发源走同一条路
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const triggers = [
  { icon: '💬', label: '用户消息', color: colors.primary },
  { icon: '💓', label: '心跳任务', color: colors.accent },
  { icon: '⏰', label: '定时任务', color: colors.warning },
  { icon: '📤', label: '子任务回报', color: colors.secondary },
];

export const Scene37_UnifiedPipeline: React.FC = () => {
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
        padding: '110px',
      }}
    >
      {/* 四个触发源 */}
      <div
        style={{
          display: 'flex',
          gap: '56px',
          marginBottom: '70px',
        }}
      >
        {triggers.map((trigger, index) => {
          const triggerSpring = spring({
            frame: frame - index * 10,
            fps,
            config: { damping: 15 },
          });

          return (
            <div
              key={trigger.label}
              style={{
                textAlign: 'center',
                transform: `scale(${triggerSpring}) translateY(${(1 - triggerSpring) * 30}px)`,
                opacity: triggerSpring,
              }}
            >
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  backgroundColor: colors.surface,
                  border: `4px solid ${trigger.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '56px',
                  marginBottom: '21px',
                }}
              >
                {trigger.icon}
              </div>
              <div
                style={{
                  fontSize: '25px',
                  color: trigger.color,
                  fontWeight: 600,
                }}
              >
                {trigger.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* 汇聚箭头 */}
      <div
        style={{
          fontSize: '67px',
          color: colors.textMuted,
          marginBottom: '42px',
          opacity: interpolate(frame, [50, 70], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        ⬇
      </div>

      {/* 统一管线 */}
      <div
        style={{
          backgroundColor: colors.surface,
          borderRadius: '22px',
          padding: '42px 84px',
          border: `4px solid ${colors.primary}`,
          transform: `scale(${spring({
            frame: frame - 60,
            fps,
            config: { damping: 15 },
          })})`,
        }}
      >
        <div
          style={{
            fontSize: '45px',
            color: colors.primary,
            fontWeight: 700,
          }}
        >
          同一条执行管线
        </div>
        <div
          style={{
            fontSize: '25px',
            color: colors.textMuted,
            textAlign: 'center',
            marginTop: '14px',
          }}
        >
          进入 → 会话 → 上下文 → 循环 → 退出
        </div>
      </div>

      {/* 强调 */}
      <div
        style={{
          marginTop: '70px',
          fontSize: '39px',
          color: colors.text,
          textAlign: 'center',
          opacity: interpolate(frame, [90, 110], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        不管是你发消息让它做事
        <br />
        还是它自己到点醒来干活
        <br />
        <span style={{ color: colors.accent, fontWeight: 700 }}>
          执行逻辑完全一致
        </span>
      </div>
    </AbsoluteFill>
  );
};
