// 镜头 34: 第四步 - 循环
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily, codeFontFamily } from '../lib/fonts';

export const Scene34_Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 循环动画
  const loopProgress = (frame % 60) / 60;

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
            backgroundColor: colors.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 700,
            color: colors.text,
          }}
        >
          4
        </div>
        <div style={{ fontSize: '56px', fontWeight: 700, color: colors.secondary }}>
          循环
        </div>
      </div>

      {/* 循环流程图 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '42px',
          marginTop: '56px',
        }}
      >
        {/* LLM */}
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: colors.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '68px',
              boxShadow: `0 0 42px ${colors.secondary}40`,
            }}
          >
            🧠
          </div>
          <div
            style={{
              marginTop: '21px',
              fontSize: '28px',
              color: colors.secondary,
              fontWeight: 600,
            }}
          >
            LLM 回复
          </div>
        </div>

        {/* 包含 tool calls? */}
        <div
          style={{
            backgroundColor: colors.surface,
            padding: '28px',
            borderRadius: '17px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '22px', color: colors.textMuted, marginBottom: '14px' }}>
            包含 tool calls?
          </div>
          <div style={{ fontSize: '39px', color: colors.accent }}>✓ Yes</div>
        </div>

        {/* 工具执行 */}
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: colors.surface,
              padding: '35px',
              borderRadius: '17px',
              border: `3px solid ${colors.warning}`,
              minWidth: '250px',
            }}
          >
            <div style={{ fontSize: '50px', marginBottom: '14px' }}>🛠️</div>
            <div style={{ fontSize: '22px', color: colors.warning, fontWeight: 600 }}>
              执行工具
            </div>
            <code
              style={{
                fontFamily: codeFontFamily,
                fontSize: '17px',
                color: colors.textMuted,
                display: 'block',
                marginTop: '11px',
              }}
            >
              读文件 / 跑命令
            </code>
          </div>
        </div>

        {/* 结果返回 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '56px', color: colors.textMuted }}>➜</div>
          <div
            style={{
              fontSize: '20px',
              color: colors.textMuted,
              marginTop: '7px',
            }}
          >
            结果塞回
          </div>
        </div>

        {/* 再调 LLM */}
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: colors.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '68px',
              opacity: 0.7,
            }}
          >
            🧠
          </div>
          <div
            style={{
              marginTop: '21px',
              fontSize: '28px',
              color: colors.secondary,
            }}
          >
            再调 LLM
          </div>
        </div>
      </div>

      {/* 循环指示 */}
      <div
        style={{
          marginTop: '85px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '21px',
            backgroundColor: colors.surface,
            padding: '28px 56px',
            borderRadius: '17px',
          }}
        >
          <span style={{ fontSize: '39px' }}>🔄</span>
          <span style={{ fontSize: '34px', color: colors.text }}>
            这个循环可以走
          </span>
          <span
            style={{
              fontSize: '45px',
              fontWeight: 700,
              color: colors.accent,
            }}
          >
            N 轮
          </span>
        </div>
        <div
          style={{
            marginTop: '28px',
            fontSize: '28px',
            color: colors.textMuted,
          }}
        >
          直到给出最终回复
        </div>
      </div>
    </AbsoluteFill>
  );
};
