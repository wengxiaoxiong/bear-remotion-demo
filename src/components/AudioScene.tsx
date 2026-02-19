/**
 * 音频场景包装组件
 * 将音频、字幕和场景内容组合在一起
 * 
 * 字幕支持两种模式：
 * 1. 单字幕模式：传入 subtitleText，显示固定文本
 * 2. 多段字幕模式：根据 sceneId 自动从 subtitleSegments.ts 获取分段配置
 */

import React from 'react';
import { Audio, staticFile } from 'remotion';
import { Subtitle, SimpleSubtitle } from './Subtitle';
import { getSceneSubtitleSegments } from '../lib/subtitleSegments';

interface AudioSceneProps {
  /** 场景ID，用于定位音频文件和字幕分段 */
  sceneId: string;
  /** 字幕文本（单字幕模式使用，优先级低于分段配置） */
  subtitleText?: string;
  /** 子组件（场景内容） */
  children: React.ReactNode;
  /** 是否启用逐字高亮 */
  highlightWords?: boolean;
  /** 音频开始偏移（帧） */
  audioOffset?: number;
  /** 是否显示字幕 */
  showSubtitle?: boolean;
  /** 强制使用单字幕模式（忽略分段配置） */
  forceSingleSubtitle?: boolean;
  /** 自定义字幕样式 */
  subtitleStyle?: React.CSSProperties;
}

/**
 * 音频场景包装组件
 * 自动加载对应 sceneId 的音频文件并显示字幕
 * 优先使用分段字幕配置，如果没有则使用单字幕文本
 */
export const AudioScene: React.FC<AudioSceneProps> = ({
  sceneId,
  subtitleText,
  children,
  highlightWords = true,
  audioOffset = 0,
  showSubtitle = true,
  forceSingleSubtitle = false,
  subtitleStyle,
}) => {
  const audioSrc = staticFile(`audio/${sceneId}.mp3`);
  
  // 获取分段字幕配置
  const segments = !forceSingleSubtitle ? getSceneSubtitleSegments(sceneId) : null;
  
  return (
    <>
      {/* 音频 */}
      <Audio src={audioSrc} startFrom={audioOffset} />
      
      {/* 场景内容 */}
      {children}
      
      {/* 字幕 */}
      {showSubtitle && (
        <Subtitle
          text={subtitleText}
          segments={segments || undefined}
          highlightWords={highlightWords}
          style={subtitleStyle}
        />
      )}
    </>
  );
};

interface AudioSceneWithDurationProps {
  /** 音频文件路径 */
  audioSrc: string;
  /** 字幕文本（单字幕模式使用） */
  subtitleText?: string;
  /** 多段字幕配置 */
  segments?: import('../lib/subtitleSegments').SubtitleSegment[];
  /** 子组件（场景内容） */
  children: React.ReactNode;
  /** 是否启用逐字高亮 */
  highlightWords?: boolean;
  /** 是否显示字幕 */
  showSubtitle?: boolean;
  /** 自定义字幕样式 */
  subtitleStyle?: React.CSSProperties;
}

/**
 * 带时长的音频场景组件（用于 Series 中）
 */
export const AudioSceneWithDuration: React.FC<AudioSceneWithDurationProps> = ({
  audioSrc,
  subtitleText,
  segments,
  children,
  highlightWords = true,
  showSubtitle = true,
  subtitleStyle,
}) => {
  return (
    <>
      {/* 音频 */}
      <Audio src={audioSrc} />
      
      {/* 场景内容 */}
      {children}
      
      {/* 字幕 */}
      {showSubtitle && (
        <Subtitle
          text={subtitleText}
          segments={segments}
          highlightWords={highlightWords}
          style={subtitleStyle}
        />
      )}
    </>
  );
};

/**
 * 简单的音频场景组件（仅音频+字幕，无逐字高亮）
 */
export const SimpleAudioScene: React.FC<{
  sceneId: string;
  subtitleText: string;
  children: React.ReactNode;
}> = ({ sceneId, subtitleText, children }) => {
  const audioSrc = staticFile(`audio/${sceneId}.mp3`);
  
  return (
    <>
      <Audio src={audioSrc} />
      {children}
      <SimpleSubtitle text={subtitleText} />
    </>
  );
};
