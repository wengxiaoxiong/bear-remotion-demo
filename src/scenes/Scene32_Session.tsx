// 镜头 32: 第二步 - 会话
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily, codeFontFamily } from '../lib/fonts';

export const Scene32_Session: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 会话盒子打开动画
  const boxScale = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  // 历史记录淡入
  const historyOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
            backgroundColor: colors.warning,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 700,
            color: colors.background,
          }}
        >
          2
        </div>
        <div style={{ fontSize: '56px', fontWeight: 700, color: colors.warning }}>
          会话
        </div>
      </div>

      {/* 流程图 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '85px',
          marginTop: '85px',
        }}
      >
        {/* Session Key */}
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: colors.surface,
              padding: '28px 42px',
              borderRadius: '14px',
              marginBottom: '21px',
            }}
          >
            <code
              style={{
                fontFamily: codeFontFamily,
                fontSize: '26px',
                color: colors.primary,
              }}
            >
              session_key
            </code>
          </div>
          <div style={{ fontSize: '26px', color: colors.textMuted }}>查找/创建</div>
        </div>

        {/* 箭头 */}
        <div style={{ fontSize: '68px', color: colors.textMuted }}>➜</div>

        {/* 会话盒子 */}
        <div
          style={{
            transform: `scale(${boxScale})`,
          }}
        >
          <div
            style={{
              backgroundColor: colors.surface,
              borderRadius: '22px',
              padding: '56px',
              width: '560px',
              border: `4px solid ${colors.warning}`,
              boxShadow: `0 0 56px ${colors.warning}30`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '21px',
                marginBottom: '42px',
              }}
            >
              <span style={{ fontSize: '50px' }}>💬</span>
              <span
                style={{
                  fontSize: '34px',
                  color: colors.warning,
                  fontWeight: 700,
                }}
              >
                会话存储
              </span>
            </div>

            {/* 历史对话 */}
            <div
              style={{
                opacity: historyOpacity,
              }}
            >
              <div
                style={{
                  fontSize: '22px',
                  color: colors.textMuted,
                  marginBottom: '21px',
                }}
              >
                加载历史对话...
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    backgroundColor: colors.background,
                    padding: '16px 22px',
                    borderRadius: '17px 17px 17px 6px',
                    alignSelf: 'flex-start',
                    maxWidth: '80%',
                  }}
                >
                  <span style={{ fontSize: '20px', color: colors.text }}>
                    之前的消息...
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: colors.primary,
                    padding: '16px 22px',
                    borderRadius: '17px 17px 6px 17px',
                    alignSelf: 'flex-end',
                    maxWidth: '80%',
                  }}
                >
                  <span style={{ fontSize: '20px', color: colors.text }}>
                    之前的回复...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
