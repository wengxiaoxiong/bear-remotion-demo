// 镜头 2: GitHub 仓库 + 功能图标条（主视觉放大、布局统一）
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

const icons = [
  { name: 'WhatsApp', file: 'whatsapp.png', color: '#25D366' },
  { name: 'Telegram', file: 'telegram.png', color: '#0088cc' },
  { name: 'Slack', file: 'slack.png', color: '#4A154B' },
  { name: 'Email', file: 'gmail.png', color: '#EA4335' },
];

export const Scene02_Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // 整体内容区缩放 + 淡入（从中心聚拢，更有冲击力）
  const contentScale = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 120 },
  });
  const contentOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // GitHub 卡片：略晚一点、带一点 Y 缓动
  const cardOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardY = interpolate(frame, [8, 28], [42, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (x) => spring({ frame: x * 25, fps, config: { damping: 20 } }),
  });

  // 图标逐个亮起（横向一排，快速连续）
  const getIconOpacity = (index: number) => {
    const start = 28 + index * 6;
    return interpolate(frame, [start, start + 12], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };
  const getIconScale = (index: number) => {
    const start = 28 + index * 6;
    return spring({
      frame: frame - start,
      fps,
      config: { damping: 14, stiffness: 180 },
    });
  };

  // 代码行数数字滚动，最大40w
  const lineCount = interpolate(frame, [45, 100], [0, 400000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 底部标语
  const taglineOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 主视觉宽度：占画面 72%，最大 900px，保证大图
  const cardWidth = Math.min(width * 0.72, 900);
  const padding = width < 600 ? 34 : 67;

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
      {/* 统一内容块：居中，主图在上、行数和平台图标分两行 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: cardWidth + 112,
          transform: `scale(${contentScale})`,
          opacity: contentOpacity,
        }}
      >
        {/* 主视觉：大号 GitHub 卡片 */}
        <div
          style={{
            width: '100%',
            maxWidth: cardWidth,
            backgroundColor: colors.surface,
            borderRadius: '28px',
            padding: width < 600 ? '28px' : '39px',
            border: `1px solid ${colors.border}`,
            boxShadow: '0 34px 67px rgba(0,0,0,0.4)',
            opacity: cardOpacity,
            transform: `translateY(${cardY}px)`,
          }}
        >
          <Img
            src={staticFile('assets/openclaw-github.png')}
            style={{
              width: '100%',
              borderRadius: '17px',
              display: 'block',
            }}
          />
        </div>

        {/* 下方统一信息条：分为"行数"一行+"平台icon"一行 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: width < 600 ? 17 : 28,
            marginTop: width < 600 ? 28 : 39,
            width: '100%',
            paddingLeft: 11,
            paddingRight: 11,
          }}
        >
          {/* 代码行数单独一行 */}
          <div
            style={{
              fontSize: width < 600 ? 31 : 39,
              color: colors.textMuted,
              whiteSpace: 'nowrap',
              marginBottom: width < 600 ? 11 : 17,
              textAlign: 'center',
              width: '100%',
            }}
          >
            <span
              style={{
                color: colors.accent,
                fontWeight: 700,
                fontSize: width < 600 ? 39 : 50,
              }}
            >
              {Math.floor(lineCount).toLocaleString()}
            </span>{' '}
            行代码
          </div>

          {/* 平台图标单独一行（居中横排） */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: width < 600 ? 22 : 34,
              width: '100%',
            }}
          >
            {icons.map((icon, index) => (
              <div
                key={icon.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  opacity: getIconOpacity(index),
                  transform: `scale(${getIconScale(index)})`,
                }}
              >
                <Img
                  src={staticFile(`assets/${icon.file}`)}
                  style={{
                    width: width < 600 ? 56 : 67,
                    height: width < 600 ? 56 : 67,
                    borderRadius: '14px',
                  }}
                />
                <span
                  style={{
                    fontSize: width < 600 ? 25 : 31,
                    color: colors.text,
                    fontWeight: 500,
                  }}
                >
                  {icon.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>


    </AbsoluteFill>
  );
};
