// 镜头 41: 下集预告
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
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
        padding: '110px',
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
          color: colors.textMuted,
          marginBottom: '56px',
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
          gap: '84px',
          marginBottom: '84px',
        }}
      >
        {/* Proactive */}
        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: '28px',
            padding: '70px',
            width: '490px',
            textAlign: 'center',
            border: `4px solid ${colors.accent}`,
            transform: `scale(${spring({
              frame: frame - 20,
              fps,
              config: { damping: 15 },
            })})`,
          }}
        >
          <div style={{ fontSize: '78px', marginBottom: '28px' }}>⚡</div>
          <div
            style={{
              fontSize: '50px',
              fontWeight: 700,
              color: colors.accent,
              marginBottom: '21px',
            }}
          >
            Proactive
          </div>
          <div style={{ fontSize: '28px', color: colors.textMuted }}>
            主动执行机制
          </div>
        </div>

        {/* Skill */}
        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: '28px',
            padding: '70px',
            width: '490px',
            textAlign: 'center',
            border: `4px solid ${colors.secondary}`,
            transform: `scale(${spring({
              frame: frame - 35,
              fps,
              config: { damping: 15 },
            })})`,
          }}
        >
          <div style={{ fontSize: '78px', marginBottom: '28px' }}>📦</div>
          <div
            style={{
              fontSize: '50px',
              fontWeight: 700,
              color: colors.secondary,
              marginBottom: '21px',
            }}
          >
            Skill
          </div>
          <div style={{ fontSize: '28px', color: colors.textMuted }}>
            技能系统
          </div>
        </div>
      </div>

      {/* 三个问题 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          marginBottom: '84px',
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
                fontSize: '34px',
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

      {/* 结尾 */}
      <div
        style={{
          fontSize: '56px',
          fontWeight: 700,
          color: colors.accent,
          textAlign: 'center',
          opacity: interpolate(frame, [120, 140], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        这是最有意思的部分
        <br />
        我们下集见
      </div>
    </AbsoluteFill>
  );
};
