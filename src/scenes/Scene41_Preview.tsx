// 镜头 41: 下集预告 + 个人IP结尾
import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene41_Preview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topics = [
    '心跳到底怎么唤醒 Agent？',
    '定时任务是怎么持久化和调度的？',
    '一个 Skill 从被发现到被使用，中间经历了什么？',
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        padding: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: '40px',
          color: colors.textMuted,
          marginBottom: '40px',
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        下一集深入拆解
      </div>

      {/* 两个模块 */}
      <div
        style={{
          display: 'flex',
          gap: '60px',
          marginBottom: '50px',
        }}
      >
        {/* Proactive */}
        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: '24px',
            padding: '50px',
            width: '420px',
            textAlign: 'center',
            border: `3px solid ${colors.accent}`,
            transform: `scale(${spring({
              frame: frame - 20,
              fps,
              config: { damping: 15 },
            })})`,
          }}
        >
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>⚡</div>
          <div
            style={{
              fontSize: '42px',
              fontWeight: 700,
              color: colors.accent,
              marginBottom: '16px',
            }}
          >
            Proactive
          </div>
          <div style={{ fontSize: '24px', color: colors.textMuted }}>
            主动执行机制
          </div>
        </div>

        {/* Skill */}
        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: '24px',
            padding: '50px',
            width: '420px',
            textAlign: 'center',
            border: `3px solid ${colors.secondary}`,
            transform: `scale(${spring({
              frame: frame - 35,
              fps,
              config: { damping: 15 },
            })})`,
          }}
        >
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>📦</div>
          <div
            style={{
              fontSize: '42px',
              fontWeight: 700,
              color: colors.secondary,
              marginBottom: '16px',
            }}
          >
            Skill
          </div>
          <div style={{ fontSize: '24px', color: colors.textMuted }}>
            技能系统
          </div>
        </div>
      </div>

      {/* 三个问题 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '50px',
        }}
      >
        {topics.map((topic, index) => {
          const topicSpring = spring({
            frame: frame - 60 - index * 15,
            fps,
            config: { damping: 15 },
          });

          return (
            <div
              key={index}
              style={{
                fontSize: '28px',
                color: colors.text,
                textAlign: 'center',
                opacity: topicSpring,
                transform: `translateX(${(1 - topicSpring) * 30}px)`,
              }}
            >
              <span style={{ color: colors.warning }}>?</span> {topic}
            </div>
          );
        })}
      </div>

      {/* 结尾 - 个人IP展示 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: interpolate(frame, [120, 150], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          transform: `translateY(${interpolate(frame, [120, 150], [30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}px)`,
        }}
      >
        {/* 头像 */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `3px solid ${colors.primary}`,
            boxShadow: `0 0 20px ${colors.primary}40`,
            marginBottom: 16,
          }}
        >
          <Img
            src={staticFile('assets/我.PNG')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* 名字 */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: 8,
          }}
        >
          熊老板i
        </div>

        {/* 结束语 */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 600,
            color: colors.accent,
            textAlign: 'center',
          }}
        >
          这是最有意思的部分，我们下集见
        </div>
      </div>
    </AbsoluteFill>
  );
};
