// 镜头 6: 凌晨3点主动执行演示
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily, codeFontFamily } from '../lib/fonts';

export const Scene06_ProactiveDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 终端窗口滑入
  const terminalY = interpolate(frame, [0, 25], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const terminalOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 时间标签动画
  const timeLabelScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15 },
  });

  // 日志逐行显示
  const logs = [
    { time: '03:00:00', text: '[Cron] Triggered daily_report_job', color: colors.textMuted },
    { time: '03:00:02', text: '[Agent] Loading task list...', color: colors.text },
    { time: '03:00:03', text: '[Agent] Reading workspace context', color: colors.text },
    { time: '03:00:05', text: '[Tool] gh issue list --since yesterday', color: colors.primary },
    { time: '03:00:08', text: '[Agent] Found 5 new issues', color: colors.accent },
    { time: '03:00:10', text: '[Agent] Generating summary...', color: colors.text },
    { time: '03:00:15', text: '[Telegram] ✅ Daily report sent to channel', color: colors.secondary },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        padding: '84px',
      }}
    >
      {/* 时间标签 */}
      <div
        style={{
          position: 'absolute',
          top: '84px',
          right: '112px',
          backgroundColor: colors.danger,
          color: colors.text,
          padding: '21px 42px',
          borderRadius: '17px',
          fontSize: '50px',
          fontWeight: 700,
          transform: `scale(${timeLabelScale})`,
          boxShadow: `0 0 42px ${colors.danger}60`,
        }}
      >
        🕐 03:00
      </div>

      {/* 无人触发标签 */}
      <div
        style={{
          position: 'absolute',
          top: '84px',
          left: '112px',
          backgroundColor: colors.warning,
          color: colors.background,
          padding: '17px 34px',
          borderRadius: '11px',
          fontSize: '34px',
          fontWeight: 600,
          opacity: interpolate(frame, [40, 55], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        🚫 无人触发
      </div>

      {/* 终端窗口 */}
      <div
        style={{
          width: '1260px',
          backgroundColor: colors.surface,
          borderRadius: '22px',
          overflow: 'hidden',
          border: `1px solid ${colors.border}`,
          transform: `translateY(${terminalY}px)`,
          opacity: terminalOpacity,
          boxShadow: '0 35px 70px -17px rgba(0,0,0,0.5)',
        }}
      >
        {/* 终端标题栏 */}
        <div
          style={{
            backgroundColor: colors.surfaceLight,
            padding: '21px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          <span style={{ marginLeft: '21px', fontSize: '20px', color: colors.textMuted, fontFamily: codeFontFamily }}>
            nanobot — zsh
          </span>
        </div>

        {/* 终端内容 */}
        <div
          style={{
            padding: '35px 42px',
            fontFamily: codeFontFamily,
            fontSize: '22px',
            lineHeight: 2,
          }}
        >
          {logs.map((log, index) => {
            const logStart = 20 + index * 12;
            const logOpacity = interpolate(frame - logStart, [0, 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={index}
                style={{
                  opacity: logOpacity,
                  color: log.color,
                }}
              >
                <span style={{ color: colors.textMuted, marginRight: '21px' }}>
                  {log.time}
                </span>
                {log.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部说明 */}
      <div
        style={{
          marginTop: '70px',
          fontSize: '39px',
          color: colors.textMuted,
          textAlign: 'center',
          opacity: interpolate(frame, [100, 120], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        Agent 自主运行，无需人工干预
      </div>
    </AbsoluteFill>
  );
};
