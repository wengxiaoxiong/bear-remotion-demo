// 镜头 3: "几十万行，读完黄花菜都凉了"
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene03_TooMuchCode: React.FC = () => {
  const frame = useCurrentFrame();

  // 整体淡入
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 关键词高亮动画
  const highlight1 = interpolate(frame, [25, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const highlight2 = interpolate(frame, [40, 50], [0, 1], {
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
        opacity,
      }}
    >
      <div
        style={{
          fontSize: '78px',
          color: colors.text,
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '1400px',
        }}
      >
        但今天我不是来带你读源码的——
        <br />
        <span
          style={
            {
              color: colors.warning,
              fontWeight: 700,
              opacity: 0.5 + highlight1 * 0.5,
              textDecoration: highlight1 > 0.5 ? 'underline wavy' : 'none',
              textDecorationColor: colors.warning,
            }
          }
        >
          几十万行
        </span>
        ，读完
        <span
          style={{
            color: colors.accent,
            fontWeight: 700,
            opacity: 0.5 + highlight2 * 0.5,
          }}
        >
          黄花菜都凉了
        </span>
        。
      </div>
    </AbsoluteFill>
  );
};
