// 镜头 27: 技能目录
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily, codeFontFamily } from '../lib/fonts';

const skills = [
  { name: 'github', icon: '🐙', desc: 'GitHub 操作' },
  { name: 'shell', icon: '💻', desc: 'Shell 命令' },
  { name: 'search', icon: '🔍', desc: '网络搜索' },
];

export const Scene27_Skills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        padding: '112px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        技能目录
      </div>

      {/* skills/ 文件夹 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '21px',
          marginBottom: '56px',
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <span style={{ fontSize: '67px' }}>📁</span>
        <code
          style={{
            fontFamily: codeFontFamily,
            fontSize: '50px',
            color: colors.secondary,
          }}
        >
          skills/
        </code>
      </div>

      {/* 技能子目录 */}
      <div
        style={{
          display: 'flex',
          gap: '56px',
        }}
      >
        {skills.map((skill, index) => {
          const skillSpring = spring({
            frame: frame - 20 - index * 15,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          return (
            <div
              key={skill.name}
              style={{
                transform: `scale(${skillSpring}) translateY(${(1 - skillSpring) * 30}px)`,
                opacity: skillSpring,
              }}
            >
              {/* 技能文件夹 */}
              <div
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: '22px',
                  padding: '42px',
                  width: '280px',
                  textAlign: 'center',
                  border: `2px solid ${colors.border}`,
                }}
              >
                <div style={{ fontSize: '67px', marginBottom: '21px' }}>
                  {skill.icon}
                </div>
                <code
                  style={{
                    fontFamily: codeFontFamily,
                    fontSize: '25px',
                    color: colors.text,
                  }}
                >
                  {skill.name}/
                </code>
                <div
                  style={{
                    marginTop: '14px',
                    fontSize: '22px',
                    color: colors.textMuted,
                  }}
                >
                  {skill.desc}
                </div>

                {/* SKILL.md 文件 */}
                <div
                  style={{
                    marginTop: '28px',
                    backgroundColor: colors.background,
                    padding: '14px 21px',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${colors.secondary}`,
                  }}
                >
                  <code
                    style={{
                      fontFamily: codeFontFamily,
                      fontSize: '20px',
                      color: colors.secondary,
                    }}
                  >
                    SKILL.md
                  </code>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 说明 */}
      <div
        style={{
          marginTop: '70px',
          fontSize: '31px',
          color: colors.textMuted,
          textAlign: 'center',
          opacity: interpolate(frame, [80, 100], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        每个技能是一个子目录，里面放一份 SKILL.md
      </div>
    </AbsoluteFill>
  );
};
