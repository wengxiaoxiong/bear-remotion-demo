import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface ScaleInProps {
  children: React.ReactNode;
  startFrame?: number;
  className?: string;
  style?: React.CSSProperties;
  config?: { damping?: number; stiffness?: number; mass?: number };
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  startFrame = 0,
  className,
  style,
  config = { damping: 200 },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - startFrame,
    fps,
    config,
  });

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};
