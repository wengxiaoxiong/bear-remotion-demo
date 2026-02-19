// 镜头 28: 文件 + 用户需求拼装成 System Prompt，再发给 LLM
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const files = [
  { name: 'SOUL.md', color: colors.primary, delay: 0 },
  { name: 'AGENTS.md', color: colors.warning, delay: 5 },
  { name: 'USER.md', color: colors.accent, delay: 10 },
  { name: 'MEMORY.md', color: colors.secondary, delay: 15 },
  { name: 'SKILL.md', color: colors.pink, delay: 20 },
];

// 时间轴：文件出现 → Prompt 盒子 → 用户消息出现 → 组装完成 → 发给 LLM
const PROMPT_START = 80;
const USER_MSG_START = 130;
const ASSEMBLE_START = 180;  // 用户发消息后开始「组装」
const SEND_TO_LLM_START = 220; // 组装好的 prompt 丢给大模型
const LLM_APPEAR = 260;

export const Scene28_Assemble: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const promptScale = spring({
    frame: frame - PROMPT_START,
    fps,
    config: { damping: 15 },
  });

  // 用户消息出现（聊天气泡）
  const userMsgOpacity = spring({
    frame: frame - USER_MSG_START,
    fps,
    config: { damping: 18 },
  });

  // 组装动效：用户消息「飞入」Prompt，Prompt 闪一下
  const assembleProgress = interpolate(
    frame,
    [ASSEMBLE_START, ASSEMBLE_START + 25],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const promptPulse = assembleProgress > 0 && assembleProgress < 1
    ? 1 + Math.sin(assembleProgress * Math.PI) * 0.08
    : 1;

  // 组装完成后，向下箭头出现，表示「丢给大模型」
  const sendArrowOpacity = interpolate(
    frame,
    [SEND_TO_LLM_START, SEND_TO_LLM_START + 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const sendArrowY = interpolate(
    frame,
    [SEND_TO_LLM_START, SEND_TO_LLM_START + 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const llmScale = spring({
    frame: frame - LLM_APPEAR,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '70px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* 左侧：文件列表 + 用户消息 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '23px',
            alignItems: 'flex-start',
          }}
        >
          {files.map((file) => {
            const fileSpring = spring({
              frame: frame - file.delay * 3,
              fps,
              config: { damping: 15 },
            });

            return (
              <div
                key={file.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '23px',
                  transform: `scale(${fileSpring})`,
                  opacity: fileSpring,
                }}
              >
                <span style={{ fontSize: '50px' }}>📄</span>
                <div
                  style={{
                    backgroundColor: `${file.color}15`,
                    padding: '20px 35px',
                    borderRadius: '14px',
                    border: `2px solid ${file.color}50`,
                    minWidth: '230px',
                  }}
                >
                  <span style={{ color: file.color, fontWeight: 600, fontSize: '28px' }}>
                    {file.name}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '40px',
                    color: colors.textMuted,
                    opacity: fileSpring > 0.8 ? 1 : 0,
                  }}
                >
                  ➜
                </span>
              </div>
            );
          })}

          {/* 用户本次需求 / 用户消息 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '23px',
              marginTop: '12px',
              opacity: userMsgOpacity,
              transform: `translateX(${(1 - userMsgOpacity) * 43}px) scale(${userMsgOpacity})`,
            }}
          >
            <span style={{ fontSize: '45px' }}>💬</span>
            <div
              style={{
                backgroundColor: `${colors.accent}18`,
                padding: '20px 35px',
                borderRadius: '17px',
                border: `2px solid ${colors.accent}60`,
                minWidth: '260px',
              }}
            >
              <span style={{ color: colors.accent, fontWeight: 600, fontSize: '26px' }}>
                用户本次需求
              </span>
            </div>
            <span
              style={{
                fontSize: '40px',
                color: colors.textMuted,
                opacity: userMsgOpacity > 0.8 ? 1 : 0,
              }}
            >
              ➜
            </span>
          </div>
        </div>

        {/* 中间：System Prompt 盒子（含文件内容 + 用户需求） */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '34px',
          }}
        >
          <div
            style={{
              backgroundColor: `${colors.primary}10`,
              borderRadius: '28px',
              padding: '56px 80px',
              border: `3px solid ${colors.primary}`,
              transform: `scale(${promptScale * promptPulse})`,
              boxShadow: `0 0 60px ${colors.primary}30`,
            }}
          >
            <div
              style={{
                fontSize: '45px',
                color: colors.primary,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              System Prompt
            </div>
            <div
              style={{
                fontSize: '22px',
                color: colors.textMuted,
                textAlign: 'center',
                marginTop: '20px',
                lineHeight: 1.6,
              }}
            >
              <div>按固定顺序拼装 · 文件内容</div>
              <div style={{ marginTop: '6px', color: colors.accent }}>+ 用户本次需求</div>
            </div>
          </div>

          {/* 向下箭头：组装完成后「丢给大模型」 */}
          <div
            style={{
              fontSize: '70px',
              color: colors.accent,
              opacity: sendArrowOpacity * (0.6 + 0.4 * sendArrowY),
              transform: `translateY(${(1 - sendArrowY) * 17}px)`,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >
            ⬇
          </div>

          <div
            style={{
              fontSize: '23px',
              color: colors.textMuted,
              opacity: sendArrowOpacity,
            }}
          >
            组装完成 → 发给大模型
          </div>

          <div
            style={{
              backgroundColor: `${colors.accent}20`,
              borderRadius: '50%',
              width: '170px',
              height: '170px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${llmScale})`,
              border: `2px solid ${colors.accent}`,
              boxShadow: `0 0 40px ${colors.accent}40`,
            }}
          >
            <span style={{ fontSize: '85px' }}>🧠</span>
          </div>
          <div
            style={{
              fontSize: '40px',
              color: colors.accent,
              fontWeight: 600,
              opacity: llmScale,
            }}
          >
            LLM
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
