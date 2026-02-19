// 镜头 22: Workspace 桌面隐喻
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const items = [
  { icon: '👤', label: '人格设定', color: colors.primary },
  { icon: '📋', label: '行为规范', color: colors.warning },
  { icon: '💡', label: '用户了解', color: colors.accent },
  { icon: '🧠', label: '长期记忆', color: colors.secondary },
  { icon: '🛠️', label: '技能清单', color: colors.pink },
  { icon: '✅', label: '待办事项', color: colors.cyan },
];

export const Scene22_WorkspaceDesk: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '112px',
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: '45px',
          color: colors.textMuted,
          marginBottom: '84px',
          textAlign: 'center',
          maxWidth: '1260px',
          lineHeight: 1.6,
        }}
      >
        你可以把 Workspace 理解成 Agent 的「办公桌」
        <br />
        上面放着它需要的所有东西
      </div>

      {/* 桌面 */}
      <div
        style={{
          width: '1400px',
          height: '700px',
          backgroundColor: colors.surface,
          borderRadius: '28px',
          border: `2px solid ${colors.border}`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 桌面纹理 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.surfaceLight} 100%)`,
            borderRadius: '28px',
          }}
        />

        {/* 桌面上的物品 */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '56px',
            padding: '84px',
          }}
        >
          {items.map((item, index) => {
            const itemSpring = spring({
              frame: frame - index * 10,
              fps,
              config: { damping: 15, stiffness: 150 },
            });

            return (
              <div
                key={item.label}
                style={{
                  backgroundColor: colors.background,
                  borderRadius: '22px',
                  padding: '42px 56px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '21px',
                  border: `2px solid ${item.color}40`,
                  transform: `scale(${itemSpring}) translateY(${(1 - itemSpring) * 20}px)`,
                  opacity: itemSpring,
                  boxShadow: `0 10px 30px ${item.color}15`,
                }}
              >
                <span style={{ fontSize: '67px' }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: '28px',
                    color: item.color,
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
