// 镜头 31: 第一步 - 进入
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene31_Entry: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 消息气泡动画
  const bubbleX = interpolate(frame, [0, 25], [500, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bubbleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 适配层缩放
  const adapterScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15 },
  });

  // 队列动画
  const queueScale = spring({
    frame: frame - 50,
    fps,
    config: { damping: 15 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        padding: '115px',
      }}
    >
      {/* 步骤标题 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          marginBottom: '85px',
        }}
      >
        <div
          style={{
            width: '85px',
            height: '85px',
            borderRadius: '50%',
            backgroundColor: colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 700,
            color: colors.text,
          }}
        >
          1
        </div>
        <div style={{ fontSize: '56px', fontWeight: 700, color: colors.primary }}>
          进入
        </div>
      </div>

      {/* 流程图 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '56px',
          marginTop: '115px',
        }}
      >
        {/* 用户 */}
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '90px', marginBottom: '21px' }}>👤</div>
          <div style={{ fontSize: '28px', color: colors.textMuted }}>用户</div>
        </div>

        {/* 箭头 */}
        <div style={{ fontSize: '56px', color: colors.textMuted }}>➜</div>

        {/* Telegram */}
        <div
          style={{
            textAlign: 'center',
            opacity: bubbleOpacity,
          }}
        >
          <div style={{ fontSize: '90px', marginBottom: '21px' }}>✈️</div>
          <div style={{ fontSize: '28px', color: colors.textMuted }}>Telegram</div>
        </div>

        {/* 消息气泡 */}
        <div
          style={{
            backgroundColor: colors.primary,
            color: colors.text,
            padding: '21px 35px',
            borderRadius: '28px 28px 6px 28px',
            fontSize: '26px',
            transform: `translateX(${bubbleX}px)`,
            opacity: bubbleOpacity,
          }}
        >
          查询 GitHub issues
        </div>

        {/* 箭头 */}
        <div style={{ fontSize: '56px', color: colors.textMuted }}>➜</div>

        {/* 适配层 */}
        <div
          style={{
            textAlign: 'center',
            transform: `scale(${adapterScale})`,
            opacity: adapterScale,
          }}
        >
          <div
            style={{
              backgroundColor: colors.surface,
              padding: '35px',
              borderRadius: '17px',
              border: `3px solid ${colors.warning}`,
            }}
          >
            <div style={{ fontSize: '50px', marginBottom: '14px' }}>🔌</div>
            <div style={{ fontSize: '26px', color: colors.warning, fontWeight: 600 }}>
              适配层
            </div>
            <div style={{ fontSize: '20px', color: colors.textMuted, marginTop: '7px' }}>
              转为统一格式
            </div>
          </div>
        </div>

        {/* 箭头 */}
        <div
          style={{
            fontSize: '56px',
            color: colors.textMuted,
            opacity: adapterScale,
          }}
        >
          ➜
        </div>

        {/* 消息队列 */}
        <div
          style={{
            textAlign: 'center',
            transform: `scale(${queueScale})`,
            opacity: queueScale,
          }}
        >
          <div
            style={{
              backgroundColor: colors.surface,
              padding: '35px',
              borderRadius: '17px',
              border: `3px solid ${colors.accent}`,
            }}
          >
            <div style={{ fontSize: '50px', marginBottom: '14px' }}>📬</div>
            <div style={{ fontSize: '26px', color: colors.accent, fontWeight: 600 }}>
              消息队列
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
