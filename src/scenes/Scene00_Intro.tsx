// 镜头 00: 片头 - 个人IP展示
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

export const Scene00_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 背景淡入
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 头像弹跳进入动画
  const avatarSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const avatarScale = interpolate(avatarSpring, [0, 1], [0.5, 1]);
  const avatarOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 名字淡入上移动画
  const nameSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14, stiffness: 180 },
  });
  const nameY = interpolate(nameSpring, [0, 1], [30, 0]);
  const nameOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 副标题/签名淡入
  const taglineOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 底部装饰线动画
  const lineWidth = interpolate(frame, [70, 90], [0, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        opacity: bgOpacity,
      }}
    >
      {/* 头像容器 */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `4px solid ${colors.primary}`,
          boxShadow: `0 0 40px ${colors.primary}40, 0 8px 32px rgba(0,0,0,0.3)`,
          transform: `scale(${avatarScale})`,
          opacity: avatarOpacity,
          marginBottom: 40,
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
          fontSize: 72,
          fontWeight: 800,
          color: colors.text,
          letterSpacing: '-2px',
          transform: `translateY(${nameY}px)`,
          opacity: nameOpacity,
          textShadow: `0 4px 20px ${colors.primary}30`,
          marginBottom: 20,
        }}
      >
        熊老板i
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: 32,
          color: colors.textMuted,
          opacity: taglineOpacity,
          fontWeight: 400,
          letterSpacing: '1px',
        }}
      >
        用代码讲清楚技术原理
      </div>

      {/* 底部装饰线 */}
      <div
        style={{
          marginTop: 40,
          width: lineWidth,
          height: 4,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
          opacity: lineWidth > 0 ? 1 : 0,
        }}
      />
    </AbsoluteFill>
  );
};
