// 镜头 7: Cron vs Agent 对比（左右分栏 + 多动效，中卡片内容居中、字号更大）
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const BRANCH_START = 55;
const BRANCH_STAGGER = 12;

export const Scene07_CronVsAgent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 动效相关数值同前（略）
  const cronX = interpolate(frame, [0, 22], [-120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const cronOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cronTitleScale = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 120 } });

  const cronDescOpacity = interpolate(frame, [15, 28], [0, 1], { extrapolateRight: 'clamp' });
  const errorBlockX = interpolate(frame, [25, 38], [-30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const errorBlockOpacity = interpolate(frame, [25, 35], [0, 1], { extrapolateRight: 'clamp' });
  const errorBounce = spring({ frame: frame - 42, fps, config: { damping: 10, stiffness: 200 } });
  const errorShake = Math.sin((frame - 42) * 0.5) * (frame >= 42 && frame <= 50 ? 4 : 0);
  const cronResultOpacity = interpolate(frame, [48, 55], [0, 1], { extrapolateRight: 'clamp' });

  const vsScale = spring({ frame: frame - 28, fps, config: { damping: 12, stiffness: 150 } });
  const vsPulse = 1 + Math.sin(frame * 0.08) * 0.04;
  const vsOpacity = interpolate(frame, [28, 38], [0, 1], { extrapolateRight: 'clamp' });

  const agentX = interpolate(frame, [12, 35], [120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const agentOpacity = interpolate(frame, [12, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const agentTitleScale = spring({ frame: frame - 38, fps, config: { damping: 14, stiffness: 120 } });

  const branch1 = {
    x: interpolate(frame, [BRANCH_START, BRANCH_START + 14], [40, 0], { extrapolateRight: 'clamp' }),
    opacity: interpolate(frame, [BRANCH_START, BRANCH_START + 10], [0, 1], { extrapolateRight: 'clamp' }),
    scale: spring({ frame: frame - BRANCH_START, fps, config: { damping: 16, stiffness: 140 } }),
  };
  const branch2 = {
    x: interpolate(frame, [BRANCH_START + BRANCH_STAGGER, BRANCH_START + BRANCH_STAGGER + 14], [40, 0], { extrapolateRight: 'clamp' }),
    opacity: interpolate(frame, [BRANCH_START + BRANCH_STAGGER, BRANCH_START + BRANCH_STAGGER + 10], [0, 1], { extrapolateRight: 'clamp' }),
    scale: spring({ frame: frame - (BRANCH_START + BRANCH_STAGGER), fps, config: { damping: 16, stiffness: 140 } }),
  };
  const branch3 = {
    x: interpolate(frame, [BRANCH_START + BRANCH_STAGGER * 2, BRANCH_START + BRANCH_STAGGER * 2 + 14], [40, 0], { extrapolateRight: 'clamp' }),
    opacity: interpolate(frame, [BRANCH_START + BRANCH_STAGGER * 2, BRANCH_START + BRANCH_STAGGER * 2 + 10], [0, 1], { extrapolateRight: 'clamp' }),
    scale: spring({ frame: frame - (BRANCH_START + BRANCH_STAGGER * 2), fps, config: { damping: 16, stiffness: 140 } }),
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: '84px 56px',
        gap: 0,
        overflow: 'hidden',
      }}
    >
      {/* 左侧: Cron — 左半屏 */}
      <div
        style={{
          flex: '1 1 0',
          minWidth: 0,
          maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: '34px',
          transform: `translateX(${cronX}px)`,
          opacity: cronOpacity,
        }}
      >
        <div
          style={{
            fontSize: 'clamp(50px, 5vw, 78px)',
            fontWeight: 700,
            color: colors.danger,
            marginBottom: '50px',
            transform: `scale(${cronTitleScale})`,
          }}
        >
          Cron Job
        </div>
        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: '25px',
            padding: 'clamp(50px, 5vw, 78px)',
            width: '100%',
            maxWidth: '672px',
            border: `2px solid ${colors.danger}40`,
            boxShadow: `0 0 45px ${colors.danger}15`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(31px, 2.6vw, 42px)',
              color: colors.textMuted,
              marginBottom: '25px',
              opacity: cronDescOpacity,
              textAlign: 'center',
            }}
          >
            数据源挂了的场景：
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 'clamp(25px, 2.2vw, 34px)',
              color: colors.danger,
              backgroundColor: `${colors.danger}15`,
              padding: '25px 45px',
              borderRadius: '14px',
              marginBottom: '34px',
              transform: `translateX(${errorBlockX}px)`,
              opacity: errorBlockOpacity,
              textAlign: 'center',
              width: '100%',
            }}
          >
            Error: API timeout
            <br />
            Exit code: 1
          </div>
          <div
            style={{
              fontSize: 'clamp(90px, 10vw, 129px)',
              textAlign: 'center',
              transform: `scale(${frame > 42 ? errorBounce : 0}) rotate(${errorShake}deg)`,
              marginBottom: '14px',
              transition: 'font-size 0.2s',
            }}
          >
            ❌
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: 'clamp(36px, 3vw, 50px)',
              color: colors.danger,
              marginTop: '11px',
              opacity: cronResultOpacity,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            直接报错退出
          </div>
        </div>
      </div>

      {/* 中间: 分隔线 + VS — 固定窄宽 */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: '22px',
        }}
      >
        <div
          style={{
            width: '1px',
            flex: '0 0 1px',
            alignSelf: 'stretch',
            background: `linear-gradient(to bottom, transparent, ${colors.border}, transparent)`,
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(45px, 5vw, 64px)',
            color: colors.textMuted,
            fontWeight: 700,
            transform: `scale(${vsScale * vsPulse})`,
            opacity: vsOpacity,
            flexShrink: 0,
          }}
        >
          VS
        </div>
        <div
          style={{
            width: '1px',
            flex: '0 0 1px',
            alignSelf: 'stretch',
            background: `linear-gradient(to bottom, transparent, ${colors.border}, transparent)`,
          }}
        />
      </div>

      {/* 右侧: Agent — 右半屏 */}
      <div
        style={{
          flex: '1 1 0',
          minWidth: 0,
          maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '34px',
          transform: `translateX(${agentX}px)`,
          opacity: agentOpacity,
        }}
      >
        <div
          style={{
            fontSize: 'clamp(50px, 5vw, 78px)',
            fontWeight: 700,
            color: colors.accent,
            marginBottom: '50px',
            transform: `scale(${agentTitleScale})`,
          }}
        >
          Agent
        </div>
        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: '25px',
            padding: 'clamp(50px, 5vw, 78px)',
            width: '100%',
            maxWidth: '672px',
            border: `2px solid ${colors.accent}40`,
            boxShadow: `0 0 45px ${colors.accent}15`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '34px', width: '100%', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: colors.surfaceLight,
                padding: '22px 36px',
                borderRadius: '14px',
                borderLeft: `5px solid ${colors.primary}`,
                transform: `translateX(${branch1.x}px) scale(${branch1.scale})`,
                opacity: branch1.opacity,
                fontSize: 'clamp(28px, 2.2vw, 39px)',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '588px',
                fontWeight: 500,
              }}
            >
              <span style={{ color: colors.primary, fontSize: '1.3em' }}>①</span>
              <span style={{ color: colors.text, marginLeft: '22px' }}>换个 API 试试</span>
            </div>
            <div
              style={{
                backgroundColor: colors.surfaceLight,
                padding: '22px 36px',
                borderRadius: '14px',
                borderLeft: `5px solid ${colors.warning}`,
                transform: `translateX(${branch2.x}px) scale(${branch2.scale})`,
                opacity: branch2.opacity,
                fontSize: 'clamp(28px, 2.2vw, 39px)',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '588px',
                fontWeight: 500,
              }}
            >
              <span style={{ color: colors.warning, fontSize: '1.3em' }}>②</span>
              <span style={{ color: colors.text, marginLeft: '22px' }}>整理部分结果</span>
            </div>
            <div
              style={{
                backgroundColor: `${colors.accent}20`,
                padding: '28px 36px',
                borderRadius: '14px',
                marginTop: '14px',
                transform: `translateX(${branch3.x}px) scale(${branch3.scale})`,
                opacity: branch3.opacity,
                width: '100%',
                maxWidth: '588px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ color: colors.accent, fontSize: 'clamp(28px, 2.4vw, 39px)', fontWeight: 600, marginBottom: '14px', textAlign: 'center' }}>
                ✅ 处理完成
              </div>
              <div style={{ color: colors.text, fontSize: 'clamp(22px, 2vw, 31px)', textAlign: 'center', fontWeight: 400, lineHeight: 1.35 }}>
                &quot;这块数据今天缺了，我明天再补&quot;
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
