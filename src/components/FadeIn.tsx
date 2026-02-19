import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface FadeInProps {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  startFrame = 0,
  duration = 20,
  className,
  style,
  direction = 'none',
  distance = 30,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  let transform = 'translate(0, 0)';

  if (direction !== 'none') {
    const offset = interpolate(
      frame - startFrame,
      [0, duration],
      [distance, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
      }
    );

    switch (direction) {
      case 'up':
        transform = `translateY(${offset}px)`;
        break;
      case 'down':
        transform = `translateY(${-offset}px)`;
        break;
      case 'left':
        transform = `translateX(${offset}px)`;
        break;
      case 'right':
        transform = `translateX(${-offset}px)`;
        break;
    }
  }

  return (
    <div
      className={className}
      style={{
        ...style,
        opacity,
        transform,
      }}
    >
      {children}
    </div>
  );
};
