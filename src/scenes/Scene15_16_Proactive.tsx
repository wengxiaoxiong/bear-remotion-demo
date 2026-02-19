// 镜头 15-16: 主动性对比
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene15_16_Proactive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 左侧被动
  const passiveOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 右侧主动
  const activeOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 心跳动画
  const heartbeat = spring({
    frame: frame % 20,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        display: 'flex',
        flexDirection: 'row',
        padding: '80px 100px',
        gap: '80px',
      }}
    >
      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '50px',
          fontWeight: 700,
          color: colors.primary,
          backgroundColor: `${colors.primary}15`,
          padding: '16px 40px',
          borderRadius: '10px',
        }}
      >
        维度二：主动性
      </div>

      {/* 左侧：被动 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: passiveOpacity,
          filter: 'grayscale(0.5)',
        }}
      >
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: colors.textMuted,
            marginBottom: '50px',
          }}
        >
          被动 Reactive
        </div>

        <div
          style={{
            width: '380px',
            height: '380px',
            backgroundColor: colors.surface,
            borderRadius: '26px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${colors.border}`,
            opacity: 0.6,
          }}
        >
          <div style={{ fontSize: '100px', marginBottom: '26px' }}>🤖</div>
          <div style={{ fontSize: '28px', color: colors.textMuted }}>
            你不说话，它就不动
          </div>
        </div>

        <div
          style={{
            marginTop: '40px',
            fontSize: '34px',
            color: colors.textMuted,
          }}
        >
          等待用户输入...
        </div>
      </div>

      {/* 中间 vs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '38px',
          color: colors.textMuted,
          fontWeight: 700,
        }}
      >
        VS
      </div>

      {/* 右侧：主动 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: activeOpacity,
        }}
      >
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: colors.accent,
            marginBottom: '50px',
          }}
        >
          主动 Proactive
        </div>

        <div
          style={{
            width: '380px',
            height: '380px',
            backgroundColor: colors.surface,
            borderRadius: '26px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${colors.accent}60`,
            boxShadow: `0 0 50px ${colors.accent}20`,
          }}
        >
          {/* 心跳图标 */}
          <div
            style={{
              fontSize: '100px',
              marginBottom: '26px',
              transform: `scale(${1 + heartbeat * 0.2})`,
            }}
          >
            💓
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '24px', color: colors.accent }}>
              🕐 每 30 分钟检查任务
            </div>
            <div style={{ fontSize: '24px', color: colors.warning }}>
              ⏰ 早上 9 点发日报
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '40px',
            fontSize: '34px',
            color: colors.accent,
            fontWeight: 600,
          }}
        >
          不需要你一直盯着
        </div>
      </div>
    </AbsoluteFill>
  );
};
