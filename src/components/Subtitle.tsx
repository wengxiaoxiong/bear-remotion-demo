/**
 * 字幕组件
 * 支持两种模式：
 * 1. 单字幕模式：传入 text，显示固定文本
 * 2. 多段字幕模式：传入 segments，按时间切换显示不同片段
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { fontFamily } from '../lib/fonts';
import { colors } from '../lib/utils';
import { SubtitleSegment, getCurrentSegment } from '../lib/subtitleSegments';

interface SubtitleProps {
  /** 单字幕文本（单字幕模式使用） */
  text?: string;
  /** 多段字幕配置（多段字幕模式使用） */
  segments?: SubtitleSegment[];
  /** 字幕开始显示的帧 */
  startFrame?: number;
  /** 字幕结束显示的帧 */
  endFrame?: number;
  /** 是否启用逐字高亮效果 */
  highlightWords?: boolean;
  /** 每字显示所需的帧数（默认：3帧/字） */
  framesPerWord?: number;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Subtitle: React.FC<SubtitleProps> = ({
  text,
  segments,
  startFrame = 0,
  endFrame,
  highlightWords = true,
  framesPerWord = 3,
  style,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const actualEndFrame = endFrame ?? durationInFrames;
  const relativeFrame = frame - startFrame;

  // 字幕淡入淡出
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 10, actualEndFrame - 10, actualEndFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // 多段字幕模式
  if (segments && segments.length > 0) {
    const currentSegment = getCurrentSegment(segments, relativeFrame);

    if (!currentSegment) {
      return null;
    }

    // 计算当前片段内的进度
    const segmentProgress = relativeFrame - currentSegment.startFrame;

    return (
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity,
          zIndex: 100,
          ...style,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '12px 28px',
            borderRadius: 8,
            display: 'inline-block',
            backdropFilter: 'blur(4px)',
            maxWidth: 'min(1200px, 85vw)',
          }}
        >
          {highlightWords ? (
            <HighlightedText
              text={currentSegment.text}
              progress={segmentProgress}
              framesPerWord={framesPerWord}
            />
          ) : (
            <PlainText text={currentSegment.text} />
          )}
        </div>
      </div>
    );
  }

  // 单字幕模式
  if (!text) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity,
        zIndex: 100,
        ...style,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '12px 28px',
          borderRadius: 8,
          display: 'inline-block',
          backdropFilter: 'blur(4px)',
          maxWidth: 'min(1200px, 85vw)',
        }}
      >
        {highlightWords ? (
          <HighlightedText
            text={text}
            progress={relativeFrame}
            framesPerWord={framesPerWord}
          />
        ) : (
          <PlainText text={text} />
        )}
      </div>
    </div>
  );
};

/**
 * 逐字高亮文本组件
 */
const HighlightedText: React.FC<{
  text: string;
  progress: number;
  framesPerWord: number;
}> = ({ text, progress, framesPerWord }) => {
  const chars = text.split('');

  return (
    <span
      style={{
        fontFamily,
        fontSize: 32,
        lineHeight: 1.5,
        fontWeight: 500,
      }}
    >
      {chars.map((char, index) => {
        const charStartFrame = index * framesPerWord;
        const isHighlighted = progress >= charStartFrame;
        const isCurrent =
          progress >= charStartFrame &&
          progress < charStartFrame + framesPerWord;

        return (
          <span
            key={index}
            style={{
              color: isCurrent
                ? colors.primary
                : isHighlighted
                  ? 'rgba(255, 255, 255, 0.95)'
                  : 'rgba(255, 255, 255, 0.35)',
              transition: 'color 0.05s ease',
              textShadow: isCurrent ? `0 0 12px ${colors.primary}60` : 'none',
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

/**
 * 纯文本组件（无高亮）
 */
const PlainText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span
      style={{
        fontFamily,
        fontSize: 32,
        color: '#ffffff',
        lineHeight: 1.5,
        fontWeight: 500,
      }}
    >
      {text}
    </span>
  );
};

/**
 * 简化版字幕组件（无高亮，仅显示）
 * 向后兼容
 */
export const SimpleSubtitle: React.FC<{
  text: string;
  style?: React.CSSProperties;
}> = ({ text, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity,
        zIndex: 100,
        ...style,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '12px 28px',
          borderRadius: 8,
          display: 'inline-block',
          backdropFilter: 'blur(4px)',
          maxWidth: 'min(1200px, 85vw)',
        }}
      >
        <PlainText text={text} />
      </div>
    </div>
  );
};
