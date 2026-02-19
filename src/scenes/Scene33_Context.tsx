// 镜头 33: 第三步 - 上下文拼装
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const layers = [
  { label: '身份信息', color: colors.primary, icon: '🆔' },
  { label: '行为规范', color: colors.warning, icon: '📋' },
  { label: '人格设定', color: colors.accent, icon: '👤' },
  { label: '用户信息', color: colors.secondary, icon: '💡' },
  { label: '长期记忆', color: colors.pink, icon: '🧠' },
  { label: '可用技能', color: colors.cyan, icon: '🛠️' },
  { label: '历史对话', color: colors.textMuted, icon: '💬' },
  { label: '新消息', color: colors.primary, icon: '✨' },
];

export const Scene33_Context: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        padding: '85px 115px',
      }}
    >
      {/* 步骤标题 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          marginBottom: '56px',
        }}
      >
        <div
          style={{
            width: '85px',
            height: '85px',
            borderRadius: '50%',
            backgroundColor: colors.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 700,
            color: colors.background,
          }}
        >
          3
        </div>
        <div style={{ fontSize: '56px', fontWeight: 700, color: colors.accent }}>
          上下文
        </div>
        <div
          style={{
            fontSize: '28px',
            color: colors.textMuted,
            backgroundColor: colors.surface,
            padding: '11px 22px',
            borderRadius: '11px',
          }}
        >
          核心步骤
        </div>
      </div>

      {/* 分层拼装动画 */}
      <div
        style={{
          display: 'flex',
          gap: '56px',
          alignItems: 'flex-start',
        }}
      >
        {/* 左侧：各层 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '11px',
            flex: 1,
          }}
        >
          {layers.map((layer, index) => {
            const layerSpring = spring({
              frame: frame - index * 8,
              fps,
              config: { damping: 15 },
            });

            return (
              <div
                key={layer.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '17px',
                  opacity: layerSpring,
                  transform: `translateX(${(1 - layerSpring) * 70}px)`,
                }}
              >
                <span style={{ fontSize: '28px', width: '42px' }}>
                  {layer.icon}
                </span>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: colors.surface,
                    padding: '14px 22px',
                    borderRadius: '11px',
                    borderLeft: `6px solid ${layer.color}`,
                  }}
                >
                  <span style={{ color: layer.color, fontWeight: 600, fontSize: '22px' }}>
                    {layer.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '28px',
                    color: colors.textMuted,
                    opacity: layerSpring > 0.8 ? 1 : 0,
                  }}
                >
                  ➜
                </span>
              </div>
            );
          })}
        </div>

        {/* 右侧：System Prompt */}
        <div
          style={{
            width: '490px',
          }}
        >
          <div
            style={{
              backgroundColor: colors.surface,
              borderRadius: '22px',
              padding: '42px',
              border: `4px solid ${colors.primary}`,
              transform: `scale(${spring({
                frame: frame - 70,
                fps,
                config: { damping: 15 },
              })})`,
            }}
          >
            <div
              style={{
                fontSize: '31px',
                color: colors.primary,
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: '28px',
              }}
            >
              System Prompt
            </div>
            <div
              style={{
                fontSize: '22px',
                color: colors.textMuted,
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              按固定顺序拼装
              <br />
              一起发给 LLM
            </div>
          </div>

          {/* LLM */}
          <div
            style={{
              marginTop: '42px',
              textAlign: 'center',
              transform: `scale(${spring({
                frame: frame - 90,
                fps,
                config: { damping: 15 },
              })})`,
            }}
          >
            <div
              style={{
                width: '112px',
                height: '112px',
                borderRadius: '50%',
                backgroundColor: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '56px',
              }}
            >
              🧠
            </div>
            <div
              style={{
                marginTop: '21px',
                fontSize: '28px',
                color: colors.accent,
                fontWeight: 600,
              }}
            >
              LLM
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
