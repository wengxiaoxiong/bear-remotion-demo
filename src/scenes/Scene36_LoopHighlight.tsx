// 镜头 36: 循环强调 - ChatBot 1轮 vs Agent N轮
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene36_LoopHighlight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        padding: '110px',
      }}
    >
      {/* 关键区别 */}
      <div
        style={{
          fontSize: '45px',
          color: colors.textMuted,
          marginBottom: '70px',
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
          }),
        }}
      >
        最关键的是第四步 —— 那个「想→做→看→再想」的循环
      </div>

      {/* 对比 */}
      <div
        style={{
          display: 'flex',
          gap: '140px',
          alignItems: 'center',
        }}
      >
        {/* ChatBot: 1轮 */}
        <div
          style={{
            textAlign: 'center',
            opacity: interpolate(frame, [20, 40], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              fontSize: '50px',
              color: colors.textMuted,
              marginBottom: '42px',
            }}
          >
            ChatBot
          </div>
          <div
            style={{
              width: '210px',
              height: '210px',
              borderRadius: '50%',
              backgroundColor: colors.surface,
              border: `4px solid ${colors.textMuted}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '78px',
              fontWeight: 700,
              color: colors.textMuted,
            }}
          >
            1
          </div>
          <div
            style={{
              marginTop: '28px',
              fontSize: '34px',
              color: colors.textMuted,
            }}
          >
            只走一轮
          </div>
        </div>

        {/* VS */}
        <div
          style={{
            fontSize: '45px',
            color: colors.textMuted,
            fontWeight: 700,
          }}
        >
          VS
        </div>

        {/* Agent: N轮 */}
        <div
          style={{
            textAlign: 'center',
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              fontSize: '50px',
              color: colors.accent,
              marginBottom: '42px',
              fontWeight: 700,
            }}
          >
            Agent
          </div>
          <div
            style={{
              width: '252px',
              height: '252px',
              borderRadius: '50%',
              backgroundColor: `${colors.accent}15`,
              border: `6px solid ${colors.accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '101px',
              fontWeight: 800,
              color: colors.accent,
              boxShadow: `0 0 84px ${colors.accent}40`,
              animation: frame > 60 ? 'pulse 1s infinite' : 'none',
            }}
          >
            N
          </div>
          <div
            style={{
              marginTop: '28px',
              fontSize: '34px',
              color: colors.accent,
              fontWeight: 600,
            }}
          >
            走 N 轮
          </div>
        </div>
      </div>

      {/* 总结 */}
      <div
        style={{
          marginTop: '84px',
          fontSize: '39px',
          color: colors.text,
          textAlign: 'center',
          opacity: interpolate(frame, [80, 100], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        这就是 Agent 跟普通 ChatBot{' '}
        <span style={{ color: colors.accent, fontWeight: 700 }}>最大的区别</span>
      </div>
    </AbsoluteFill>
  );
};
