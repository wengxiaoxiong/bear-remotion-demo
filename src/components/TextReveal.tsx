import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface TextRevealProps {
  text: string;
  startFrame?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  charDelay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  startFrame = 0,
  duration,
  className,
  style,
  charDelay = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const actualDuration = duration || text.length * charDelay;

  const progress = interpolate(
    frame - startFrame,
    [0, actualDuration],
    [0, text.length],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.linear,
    }
  );

  const visibleChars = Math.floor(progress);
  const displayedText = text.slice(0, visibleChars);

  return (
    <span className={className} style={style}>
      {displayedText}
      <span
        style={{
          opacity: frame % 30 < 15 ? 1 : 0,
          transition: 'none',
        }}
      >
        |
      </span>
    </span>
  );
};
