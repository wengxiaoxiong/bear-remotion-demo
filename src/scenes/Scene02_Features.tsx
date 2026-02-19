// 镜头 2: GitHub 仓库对比展示 - OpenClaw vs NanoBot
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

export const Scene02_Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // 整体内容区缩放 + 淡入
  const contentScale = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 120 },
  });
  const contentOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // OpenClaw 卡片动画
  const openclawCardOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const openclawCardX = interpolate(frame, [8, 28], [-60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // NanoBot 卡片动画（稍晚一点）
  const nanobotCardOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nanobotCardX = interpolate(frame, [23, 43], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 代码行数数字滚动动画
  const openclawLines = interpolate(frame, [45, 90], [0, 400000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nanobotLines = interpolate(frame, [55, 100], [0, 4000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 对比标签动画
  const tagOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 卡片宽度
  const cardWidth = Math.min(width * 0.42, 460);
  const padding = width < 600 ? 20 : 40;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${padding}px`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1200,
          transform: `scale(${contentScale})`,
          opacity: contentOpacity,
        }}
      >
        {/* 标题 */}
        <div
          style={{
            fontSize: width < 600 ? 28 : 36,
            color: colors.textMuted,
            marginBottom: width < 600 ? 30 : 40,
            textAlign: 'center',
            opacity: interpolate(frame, [0, 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          两个项目的代码量对比
        </div>

        {/* 双卡片对比区域 */}
        <div
          style={{
            display: 'flex',
            flexDirection: width < 900 ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: width < 900 ? 30 : 50,
            width: '100%',
          }}
        >
          {/* OpenClaw 卡片 */}
          <div
            style={{
              width: '100%',
              maxWidth: cardWidth,
              backgroundColor: colors.surface,
              borderRadius: '24px',
              padding: width < 600 ? '20px' : '28px',
              border: `1px solid ${colors.border}`,
              boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
              opacity: openclawCardOpacity,
              transform: `translateX(${openclawCardX}px)`,
            }}
          >
            {/* 项目名称 */}
            <div
              style={{
                fontSize: width < 600 ? 24 : 32,
                fontWeight: 700,
                color: colors.text,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span>🦞</span>
              <span>OpenClaw</span>
            </div>

            {/* GitHub 截图 */}
            <Img
              src={staticFile('assets/openclaw-github.png')}
              style={{
                width: '100%',
                borderRadius: '14px',
                display: 'block',
                marginBottom: 20,
              }}
            />

            {/* 代码行数 */}
            <div
              style={{
                textAlign: 'center',
                padding: '16px',
                backgroundColor: 'rgba(255,206,133,0.1)',
                borderRadius: '12px',
                border: `1px solid ${colors.accent}40`,
              }}
            >
              <div
                style={{
                  fontSize: width < 600 ? 36 : 48,
                  fontWeight: 800,
                  color: colors.accent,
                  lineHeight: 1,
                  letterSpacing: '-2px',
                }}
              >
                {Math.floor(openclawLines).toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: width < 600 ? 14 : 16,
                  color: colors.textMuted,
                  marginTop: 6,
                }}
              >
                行代码
              </div>
            </div>
          </div>

          {/* 对比箭头（仅在桌面端显示） */}
          {width >= 900 && (
            <div
              style={{
                fontSize: '48px',
                color: colors.textMuted,
                opacity: interpolate(frame, [60, 80], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: `scale(${spring({
                  frame: frame - 60,
                  fps,
                  config: { damping: 14, stiffness: 180 },
                })})`,
              }}
            >
              →
            </div>
          )}

          {/* NanoBot 卡片 */}
          <div
            style={{
              width: '100%',
              maxWidth: cardWidth,
              backgroundColor: colors.surface,
              borderRadius: '24px',
              padding: width < 600 ? '20px' : '28px',
              border: `2px solid ${colors.primary}`,
              boxShadow: `0 24px 48px rgba(0,0,0,0.35), 0 0 30px ${colors.primary}20`,
              opacity: nanobotCardOpacity,
              transform: `translateX(${nanobotCardX}px)`,
            }}
          >
            {/* 项目名称 */}
            <div
              style={{
                fontSize: width < 600 ? 24 : 32,
                fontWeight: 700,
                color: colors.primary,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span>🤖</span>
              <span>NanoBot</span>
            </div>

            {/* GitHub 截图 */}
            <Img
              src={staticFile('assets/nanobot-github.png')}
              style={{
                width: '100%',
                borderRadius: '14px',
                display: 'block',
                marginBottom: 20,
              }}
            />

            {/* 代码行数 */}
            <div
              style={{
                textAlign: 'center',
                padding: '16px',
                backgroundColor: `${colors.primary}15`,
                borderRadius: '12px',
                border: `1px solid ${colors.primary}50`,
              }}
            >
              <div
                style={{
                  fontSize: width < 600 ? 36 : 48,
                  fontWeight: 800,
                  color: colors.primary,
                  lineHeight: 1,
                  letterSpacing: '-2px',
                }}
              >
                {Math.floor(nanobotLines).toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: width < 600 ? 14 : 16,
                  color: colors.textMuted,
                  marginTop: 6,
                }}
              >
                行代码
              </div>
            </div>
          </div>
        </div>

        {/* 底部对比标签 */}
        <div
          style={{
            marginTop: width < 600 ? 30 : 40,
            padding: '16px 32px',
            backgroundColor: colors.surface,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            opacity: tagOpacity,
            transform: `translateY(${interpolate(frame, [80, 100], [20, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px)`,
          }}
        >
          <span
            style={{
              fontSize: width < 600 ? 18 : 24,
              color: colors.text,
              fontWeight: 600,
            }}
          >
            <span style={{ color: colors.accent }}>40万行</span>
            <span style={{ color: colors.textMuted, margin: '0 12px' }}>→</span>
            <span style={{ color: colors.primary }}>4,000行</span>
            <span style={{ color: colors.textMuted, marginLeft: 12 }}>（仅1%代码量）</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
