// 镜头 9: Agent vs ChatBot 对比引入
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene09_VsIntro: React.FC = () => {
  const frame = useCurrentFrame();

  // 整体淡入
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 三个维度标签
  const dimensions = ['推理能力', '主动性', '扩展性'];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        opacity,
      }}
    >
      {/* 对比标题 */}
      <div
        style={{
          fontSize: '101px',
          fontWeight: 800,
          color: colors.text,
          marginBottom: '112px',
          display: 'flex',
          alignItems: 'center',
          gap: '42px',
        }}
      >
        <span style={{ color: colors.textMuted }}>ChatBot</span>
        <span style={{ fontSize: '67px', color: colors.textMuted }}>vs</span>
        <span style={{ color: colors.accent }}>Agent</span>
      </div>

      {/* 三个维度标签 */}
      <div
        style={{
          display: 'flex',
          gap: '56px',
        }}
      >
        {dimensions.map((dim, index) => {
          const dimOpacity = interpolate(frame, [20 + index * 10, 35 + index * 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const dimY = interpolate(frame, [20 + index * 10, 35 + index * 10], [30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={dim}
              style={{
                backgroundColor: colors.surface,
                padding: '28px 56px',
                borderRadius: '17px',
                border: `1px solid ${colors.border}`,
                fontSize: '39px',
                color: colors.text,
                opacity: dimOpacity,
                transform: `translateY(${dimY}px)`,
              }}
            >
              {dim}
            </div>
          );
        })}
      </div>

      {/* 底部说明 */}
      <div
        style={{
          marginTop: '84px',
          fontSize: '34px',
          color: colors.textMuted,
          opacity: interpolate(frame, [60, 80], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        三个维度的本质区别
      </div>
    </AbsoluteFill>
  );
};
