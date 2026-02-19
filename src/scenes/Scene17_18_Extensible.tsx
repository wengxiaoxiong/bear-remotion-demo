// 镜头 17-18: 扩展性对比
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily, codeFontFamily } from '../lib/fonts';

export const Scene17_18_Extensible: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 左侧 ChatBot
  const chatbotOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 右侧 Agent
  const agentOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 代码修改动画
  const codeTyping = Math.min(
    Math.floor((frame - 20) / 3),
    '修改代码 → 重新部署'.length
  );

  // Markdown 飞入
  const mdSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 15, stiffness: 100 },
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
        维度三：扩展性
      </div>

      {/* 左侧：ChatBot 写死 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: chatbotOpacity,
        }}
      >
        <div
          style={{
            fontSize: '50px',
            fontWeight: 700,
            color: colors.textMuted,
            marginBottom: '50px',
          }}
        >
          能力写死在代码里
        </div>

        {/* 代码块 */}
        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: '16px',
            padding: '40px',
            width: '100%',
            border: `1px solid ${colors.border}`,
            fontFamily: codeFontFamily,
            fontSize: '22px',
          }}
        >
          <div style={{ color: colors.textMuted }}>// 硬编码功能</div>
          <div style={{ color: colors.danger }}>if (input.includes("天气")) {'{'}</div>
          <div style={{ color: colors.text, marginLeft: '28px' }}>
            return getWeather();
          </div>
          <div style={{ color: colors.danger }}>{'}'}</div>
          <div style={{ color: colors.textMuted, marginTop: '20px' }}>
            // 想加新功能？
          </div>
          <div
            style={{
              color: colors.warning,
              marginTop: '14px',
            }}
          >
            {'修改代码 → 重新部署'.slice(0, codeTyping)}
            <span
              style={{
                opacity: frame % 30 < 15 ? 1 : 0,
              }}
            >
              |
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: '40px',
            fontSize: '34px',
            color: colors.danger,
          }}
        >
          ❌ 改代码 + 重新部署
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

      {/* 右侧：Agent 声明式技能 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: agentOpacity,
        }}
      >
        <div
          style={{
            fontSize: '50px',
            fontWeight: 700,
            color: colors.accent,
            marginBottom: '50px',
          }}
        >
          声明式技能系统
        </div>

        {/* Markdown 文档飞入 */}
        <div
          style={{
            transform: `translateY(${(1 - mdSpring) * 100}px) scale(${mdSpring})`,
            opacity: mdSpring,
          }}
        >
          <div
            style={{
              backgroundColor: colors.surface,
              borderRadius: '16px',
              padding: '32px',
              width: '400px',
              border: `2px solid ${colors.accent}60`,
              boxShadow: `0 12px 36px ${colors.accent}20`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              <span style={{ fontSize: '40px' }}>📄</span>
              <span
                style={{
                  fontSize: '26px',
                  color: colors.accent,
                  fontWeight: 600,
                }}
              >
                SKILL.md
              </span>
            </div>
            <div
              style={{
                fontSize: '18px',
                color: colors.textMuted,
                lineHeight: 1.6,
              }}
            >
              ---
              <br />
              name: 新技能
              <br />
              description: 技能描述
              <br />
              tools: [工具列表]
              <br />
              ---
            </div>
          </div>

          {/* 文件夹 */}
          <div
            style={{
              marginTop: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              opacity: interpolate(frame, [90, 110], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <span style={{ fontSize: '50px' }}>📁</span>
            <span style={{ fontSize: '50px' }}>➜</span>
            <span style={{ fontSize: '50px' }}>🤖</span>
            <span style={{ fontSize: '32px', color: colors.accent }}>
              学会新技能！
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: '40px',
            fontSize: '34px',
            color: colors.accent,
            opacity: interpolate(frame, [100, 120], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          ✅ 写文档即学会
        </div>
      </div>
    </AbsoluteFill>
  );
};
