// 镜头 29: Workspace 总结
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene29_WorkspaceSummary: React.FC = () => {
  const frame = useCurrentFrame();

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
      {/* 金句 */}
      <div
        style={{
          fontSize: '68px',
          color: colors.text,
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '1400px',
          opacity: interpolate(frame, [0, 25], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <span style={{ color: colors.primary, fontWeight: 700 }}>
          Workspace
        </span>{' '}
        就是 Agent 的
        <span style={{ color: colors.accent, fontWeight: 700 }}>
          上下文来源
        </span>
      </div>

      <div
        style={{
          marginTop: '56px',
          fontSize: '45px',
          color: colors.textMuted,
          textAlign: 'center',
          opacity: interpolate(frame, [30, 50], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        它的智能程度
        <br />
        很大程度上取决于这个 Workspace{' '}
        <span
          style={{
            color: colors.warning,
            fontWeight: 600,
            textDecoration: 'underline',
            textDecorationColor: colors.warning,
          }}
        >
          设计得好不好
        </span>
      </div>

      {/* 装饰 */}
      <div
        style={{
          marginTop: '84px',
          display: 'flex',
          gap: '28px',
          opacity: interpolate(frame, [60, 80], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        {['👤', '📋', '💡', '🧠', '🛠️', '✅'].map((icon, index) => (
          <div
            key={index}
            style={{
              fontSize: '50px',
              opacity: 0.5,
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
