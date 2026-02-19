// 镜头 23-24: Workspace 路径 + 常驻文件介绍
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily, codeFontFamily } from '../lib/fonts';

export const Scene23_24_WorkspacePath: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pathOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const treeOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bootstrapOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bootstrapFiles = [
    { file: 'SOUL.md', desc: '人格/价值观', example: '"你是一个高效、友好的技术助手"', color: colors.primary },
    { file: 'AGENTS.md', desc: '行为规范', example: '"遇到不确定的事先确认，不要瞎猜"', color: colors.warning },
    { file: 'USER.md', desc: '用户信息与偏好', example: '"用户喜欢简洁的回复，不要废话"', color: colors.accent },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        padding: '56px 67px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        gap: '56px',
        alignItems: 'stretch',
      }}
    >
      {/* 左栏：路径 + 结构树 */}
      <div
        style={{
          flex: '0 0 48%',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <div style={{ fontSize: '48px', fontWeight: 600, color: colors.text, marginBottom: '17px' }}>
          Workspace 是什么？
        </div>
        <div style={{ fontSize: '36px', color: colors.textMuted, marginBottom: '22px' }}>
          约定好结构的目录，初始化后在：
        </div>
        <div
          style={{
            backgroundColor: colors.surface,
            padding: '22px 34px',
            borderRadius: '14px',
            marginBottom: '28px',
            opacity: pathOpacity,
            border: `2px solid ${colors.accent}40`,
          }}
        >
          <code
            style={{
              fontFamily: codeFontFamily,
              fontSize: '42px',
              fontWeight: 600,
              color: colors.accent,
            }}
          >
            ~/.nanobot/workspace
          </code>
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            backgroundColor: colors.surface,
            padding: '25px 34px',
            borderRadius: '14px',
            opacity: treeOpacity,
            borderLeft: `6px solid ${colors.secondary}`,
          }}
        >
          <div style={{ fontSize: '31px', color: colors.secondary, fontWeight: 600, marginBottom: '17px' }}>
            workspace/ 结构
          </div>
          <pre
            style={{
              fontFamily: codeFontFamily,
              fontSize: '25px',
              lineHeight: 1.55,
              color: colors.text,
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {`├── AGENTS.md, SOUL.md, USER.md   ← 常驻 system
├── TOOLS.md, IDENTITY.md    ← 可选，有则注入
├── HEARTBEAT.md             ← 每 30 分钟按内容执行
├── memory/
│   ├── MEMORY.md            ← 长期记忆，注入上下文
│   └── HISTORY.md           ← 事件日志，按需 grep
└── skills/<名>/SKILL.md     ← 自定义技能`}
          </pre>
        </div>
      </div>

      {/* 右栏：常驻文件说明 + 三个文件示例 */}
      <div
        style={{
          flex: '1 1 52%',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          gap: '22px',
        }}
      >
        <div
          style={{
            backgroundColor: `${colors.primary}20`,
            padding: '25px 31px',
            borderRadius: '14px',
            border: `2px solid ${colors.primary}50`,
            borderLeft: `8px solid ${colors.primary}`,
            opacity: bootstrapOpacity,
          }}
        >
          <div style={{ fontSize: '36px', color: colors.primary, fontWeight: 700, marginBottom: '11px' }}>
            ⭐ 常驻文件（每次对话全文注入 System Prompt）
          </div>
          <div style={{ fontSize: '28px', color: colors.textMuted }}>
            AGENTS.md、SOUL.md、USER.md —— 决定「怎么做人、怎么用工具、用户偏好」
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, minHeight: 0 }}>
          {bootstrapFiles.map((item, index) => {
            const itemSpring = spring({
              frame: frame - 50 - index * 12,
              fps,
              config: { damping: 15 },
            });
            return (
              <div
                key={item.file}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '28px',
                  opacity: itemSpring * bootstrapOpacity,
                  transform: `translateX(${(1 - itemSpring) * 30}px)`,
                  flex: '0 0 auto',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '196px',
                    backgroundColor: colors.surface,
                    padding: '20px 25px',
                    borderRadius: '11px',
                    borderLeft: `6px solid ${item.color}`,
                  }}
                >
                  <code
                    style={{
                      fontFamily: codeFontFamily,
                      fontSize: '31px',
                      color: item.color,
                      fontWeight: 700,
                    }}
                  >
                    {item.file}
                  </code>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '31px', color: colors.text, marginBottom: '6px', fontWeight: 500 }}>
                    {item.desc}
                  </div>
                  <div style={{ fontSize: '25px', color: colors.textMuted, fontStyle: 'italic' }}>
                    {item.example}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
