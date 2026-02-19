// 镜头 26: 记忆层展示
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily, codeFontFamily } from '../lib/fonts';

export const Scene26_Memory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        padding: '112px',
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: '45px',
          color: colors.text,
          marginBottom: '70px',
          fontWeight: 600,
        }}
      >
        记忆层
      </div>

      {/* MEMORY.md */}
      <div
        style={{
          marginBottom: '56px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '21px',
            marginBottom: '28px',
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <span style={{ fontSize: '50px' }}>📁</span>
          <code
            style={{
              fontFamily: codeFontFamily,
              fontSize: '34px',
              color: colors.accent,
            }}
          >
            memory/
          </code>
        </div>

        {/* MEMORY.md 卡片 */}
        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: '22px',
            padding: '42px',
            marginLeft: '70px',
            border: `2px solid ${colors.accent}40`,
            opacity: interpolate(frame, [15, 35], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateX(${interpolate(frame, [15, 35], [-30, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '21px',
              marginBottom: '21px',
            }}
          >
            <code
              style={{
                fontFamily: codeFontFamily,
                fontSize: '31px',
                color: colors.accent,
                fontWeight: 600,
              }}
            >
              MEMORY.md
            </code>
            <span
              style={{
                backgroundColor: `${colors.accent}20`,
                color: colors.accent,
                padding: '6px 17px',
                borderRadius: '6px',
                fontSize: '20px',
              }}
            >
              Agent 自己会写入
            </span>
          </div>

          <div
            style={{
              fontSize: '25px',
              color: colors.textMuted,
              lineHeight: 1.6,
              fontFamily: codeFontFamily,
              backgroundColor: colors.background,
              padding: '28px',
              borderRadius: '11px',
            }}
          >
            <div style={{ color: colors.textMuted }}># 长期记忆</div>
            <div style={{ marginTop: '14px' }}>
              - 用户喜欢周报只要摘要
            </div>
            <div style={{ color: colors.accent }}>
              + Agent 自动写入此条
            </div>
          </div>
        </div>
      </div>

      {/* HISTORY.md */}
      <div
        style={{
          backgroundColor: colors.surface,
          borderRadius: '22px',
          padding: '42px',
          marginLeft: '70px',
          border: `2px solid ${colors.border}`,
          opacity: interpolate(frame, [50, 70], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          transform: `translateX(${interpolate(frame, [50, 70], [-30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}px)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '21px',
            marginBottom: '21px',
          }}
        >
          <code
            style={{
              fontFamily: codeFontFamily,
              fontSize: '31px',
              color: colors.text,
              fontWeight: 600,
            }}
          >
            HISTORY.md
          </code>
          <span
            style={{
              backgroundColor: colors.surfaceLight,
              color: colors.textMuted,
              padding: '6px 17px',
              borderRadius: '6px',
              fontSize: '20px',
            }}
          >
            按需 grep 查询
          </span>
        </div>

        <div
          style={{
            fontSize: '25px',
            color: colors.textMuted,
            lineHeight: 1.6,
          }}
        >
          事件日志，Agent 不会每次都读
        </div>
      </div>
    </AbsoluteFill>
  );
};
