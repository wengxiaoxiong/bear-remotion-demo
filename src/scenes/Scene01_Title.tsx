// 镜头 1: 先展示Clawdbot，再展示Nanobot，突出40w代码→4k代码极致简化
import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

const EMOJI_SIZE = 154;
const MAIN_WORD_SIZE = 120;
const BIG_NUM_SIZE = 76;
const SMALL_NUM_SIZE = 42;

export const Scene01_Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 主区域整体淡入动画
  const mainOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // ------ Clawdbot（左侧）动画 ------
  const cbAppear = spring({
    frame: frame - 2,
    fps,
    config: { damping: 14, stiffness: 210 },
  });
  const cbEmojiUp = interpolate(cbAppear, [0, 1], [81, 0]);
  const cbWordScale = interpolate(cbAppear, [0, 1], [0.8, 1]);
  // 40w数值动画，快速滚动
  const cbCodeNum = Math.round(interpolate(frame, [6, 26], [0, 400000], {extrapolateLeft: 'clamp',extrapolateRight: 'clamp'}));

  // ------ Nanobot（右侧）动画 ------
  const nbStart = 32;
  const nbAppear = spring({
    frame: frame - nbStart,
    fps,
    config: { damping: 16, stiffness: 210 },
  });
  const nbEmojiUp = interpolate(nbAppear, [0, 1], [81, 0]);
  const nbWordScale = interpolate(nbAppear, [0, 1], [0.8, 1]);
  // 4k数值动画
  const nbCodeNum = Math.round(interpolate(frame, [nbStart+6, nbStart+26], [0, 4000], {extrapolateLeft: 'clamp',extrapolateRight: 'clamp'}));

  // 箭头动画（延迟到Nanobot快出现时进入、强调对比）
  const arrowShow = interpolate(frame, [nbStart - 4, nbStart + 10], [0, 1], {extrapolateLeft: "clamp",extrapolateRight: "clamp"});
  const arrowScale = interpolate(frame, [nbStart-2, nbStart+4], [2, 1], {extrapolateRight: "clamp"});
  const arrowRotate = interpolate(frame, [nbStart-3, nbStart+3], [-60, 0], {extrapolateRight: "clamp"});

  // 副标题淡入
  const subtitleOpacity = interpolate(frame, [nbStart+14, nbStart+34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // 色条动画
  const barW = Math.max(0, Math.min(1, (frame - (nbStart+27)) / 9));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
      }}
    >
      {/* 两端展示结构 */}
      <div
        style={{
          opacity: mainOpacity,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '118px',
          minHeight: 336,
        }}
      >
        {/* Clawdbot 区块 */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:294}}>
          <span
            style={{
              fontSize: EMOJI_SIZE,
              marginBottom: '-11px',
              lineHeight: 1,
              transform: `translateY(${cbEmojiUp}px) scale(${1 + 0.12 * Math.sin(frame / 6)})`,
              filter: 'drop-shadow(0 6px 11px rgba(180,100,25,0.16)) drop-shadow(0 1px 2px rgba(150,80,65,0.07))',
              transition: '0.12s cubic-bezier(.7,2,.4,1.3)',
              opacity: cbAppear,
            }}
          >
            🦞
          </span>
          <span
            style={{
              fontSize: MAIN_WORD_SIZE,
              fontWeight: 800,
              color: colors.text,
              fontFamily,
              letterSpacing: '-3px',
              transform: `scale(${cbWordScale})`,
              opacity: cbAppear < 0.88 ? 0 : 1,
              textShadow: `0 14px 90px rgba(210, 130, 30, 0.09), 0 1px 3px ${colors.text}88`,
              marginBottom: 25,
              marginTop: 7,
            }}
          >
            Clawdbot
          </span>
          {/* 代码行数 */}
          <span style={{
            fontFamily,
            fontSize: BIG_NUM_SIZE,
            fontWeight: 700,
            color: colors.accent,
            lineHeight: 1.1,
            textShadow: '0 4px 17px #ffce8522',
            letterSpacing: '-3px',
            opacity: cbAppear,
          }}>
            {cbCodeNum.toLocaleString()}
          </span>
          <div style={{
            fontSize: SMALL_NUM_SIZE,
            color: colors.textMuted,
            marginTop: 3,
            marginBottom: '-4px',
            opacity: cbAppear,
          }}>行代码</div>
        </div>

        {/* 箭头动画区 */}
        <span
          style={{
            fontSize: '98px',
            color: colors.textMuted,
            fontWeight: 700,
            margin: '0 35px',
            opacity: arrowShow,
            filter: 'drop-shadow(0 3px 2px #eceffc79)',
            transform: `scale(${arrowScale}) rotate(${arrowRotate}deg)`,
            transition: '0.15s cubic-bezier(.42,2,.5,1.4)',
            lineHeight: 1,
            transformOrigin: 'center',
            willChange: 'transform, opacity',
            pointerEvents:'none',
            userSelect:'none',
          }}
          aria-label="to-reduce"
        >
          →
        </span>

        {/* Nanobot 区块 */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:294}}>
          <span
            style={{
              fontSize: EMOJI_SIZE,
              marginBottom: '-11px',
              marginTop: 0,
              lineHeight: 1,
              transform: `translateY(${nbEmojiUp}px) scale(${1 + 0.13 * Math.cos(frame / 7)})`,
              filter: 'drop-shadow(0 7px 24px #34f3ff25) drop-shadow(0 1px 3px #ceeafbaa)',
              transition: '0.11s cubic-bezier(.7,2,.4,1.4)',
              opacity: nbAppear,
            }}
          >
            🤖
          </span>
          <span
            style={{
              fontSize: MAIN_WORD_SIZE,
              fontWeight: 800,
              color: colors.primary,
              fontFamily,
              letterSpacing: '-4px',
              transform: `scale(${nbWordScale})`,
              opacity: nbAppear < 0.86 ? 0 : 1,
              textShadow: '0 14px 50px rgba(70,150,255,0.13), 0 3px 1px #ebffffdd',
              marginBottom: 25,
              marginTop: 7,
            }}
          >
            Nanobot
          </span>
          {/* 代码行数 */}
          <span style={{
            fontFamily,
            fontSize: BIG_NUM_SIZE,
            fontWeight: 700,
            color: colors.accent,
            lineHeight: 1.1,
            textShadow: '0 4px 17px #34f3ff33',
            letterSpacing: '-3px',
            opacity: nbAppear,
          }}>
            {nbCodeNum.toLocaleString()}
          </span>
          <div style={{
            fontSize: SMALL_NUM_SIZE,
            color: colors.textMuted,
            marginTop: 3,
            marginBottom: '-4px',
            opacity: nbAppear,
          }}>行代码</div>
        </div>
      </div>

      {/* 副标题及绚丽色条 */}
      <div
        style={{
          opacity: subtitleOpacity,
          marginTop: '78px',
          fontSize: '48px',
          color: colors.textMuted,
          fontWeight: 500,
          position: 'relative',
          minHeight: '70px',
          letterSpacing: '-1px',
          zIndex: 1,
        }}
      >
        {/* 色条下划线 */}
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-7px',
            width: `${barW * 100}%`,
            height: '10px',
            borderRadius: '8px',
            background: `linear-gradient(90deg, #ffbf74 0%, #b3e2ff 80%, #8be3d4 100%)`,
            filter: 'blur(0.5px) brightness(0.98)',
            opacity: barW,
            transition: 'width 0.16s cubic-bezier(.7,2,.4,1.2)',
          }}
        ></span>
        <span style={{ position: 'relative', zIndex: 2 }}>
          40万行代码，极致简化为 4,000 行！
        </span>
      </div>
    </AbsoluteFill>
  );
};
