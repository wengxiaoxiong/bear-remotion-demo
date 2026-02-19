// 镜头 10-11: 推理能力 - 单轮 vs 多轮
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene10_11_Reasoning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 左侧 ChatBot 动画
  const chatbotOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 右侧 Agent 循环动画
  const agentOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 循环箭头旋转
  const loopRotation = interpolate(frame, [40, 160], [0, 720], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 节点位置（正方形对齐圆周上的点，增强对齐）
  const nodeCircle = [
    { label: '思考', color: colors.primary,    rad: -Math.PI/2 },
    { label: '执行', color: colors.warning,    rad: 0 },
    { label: '观察', color: colors.secondary,  rad: Math.PI/2 },
    { label: '再思考', color: colors.accent,   rad: Math.PI },
  ];
  // 圆参数 - 放大尺寸
  const CIRCLE_SIZE = 380;
  const NODE_W = 130, NODE_H = 68;
  const CIRCLE_R = (CIRCLE_SIZE/2) - NODE_H/2 - 2; // 使矩形均匀贴边

  // 划分左右两栏
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* 标题栏 */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '50px',
          fontWeight: 700,
          color: colors.primary,
          backgroundColor: `${colors.primary}15`,
          padding: '16px 40px',
          borderRadius: '10px',
          zIndex: 2,
        }}
      >
        维度一：推理能力
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          padding: '140px 100px 80px 100px',
          gap: '0px',
          height: '100%',
        }}
      >
        {/* 左侧：ChatBot 单轮 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: chatbotOpacity,
            borderRight: `2px solid ${colors.border}`,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: colors.textMuted,
              marginBottom: '80px',
              letterSpacing: '-0.5px',
            }}
          >
            ChatBot
          </div>
          {/* 单轮流程，横向居中 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: colors.surface,
                padding: '40px 50px',
                borderRadius: '16px',
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 120,
                minHeight: 70,
              }}
            >
              <div style={{ fontSize: '34px', color: colors.text, fontWeight: 600 }}>❓ 提问</div>
            </div>
            <div style={{ fontSize: '44px', color: colors.textMuted }}>→</div>
            <div
              style={{
                backgroundColor: colors.surface,
                padding: '40px 50px',
                borderRadius: '16px',
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 120,
                minHeight: 70,
              }}
            >
              <div style={{ fontSize: '34px', color: colors.text, fontWeight: 600 }}>💬 回答</div>
            </div>
            <div style={{ fontSize: '44px', color: colors.danger, marginLeft: 8 }}>✕</div>
          </div>

          <div
            style={{
              marginTop: '50px',
              fontSize: '34px',
              color: colors.textMuted,
              fontWeight: 500,
              letterSpacing: '-0.5px',
            }}
          >
            单轮问答，一问一答结束
          </div>
        </div>

        {/* 右侧：Agent 多轮循环 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: agentOpacity,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: colors.accent,
              marginBottom: '80px',
              letterSpacing: '-0.5px',
            }}
          >
            Agent
          </div>
          {/* 循环图 居中且节点对齐圆周 */}
          <div
            style={{
              position: 'relative',
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            {/* 旋转的循环箭头 */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                border: `5px dashed ${colors.accent}60`,
                borderRadius: '50%',
                transform: `rotate(${loopRotation}deg)`,
                boxSizing: 'border-box',
              }}
            />
            {/* 四个节点，沿圆周均匀分布，矩形始终水平 */}
            {nodeCircle.map((node, idx) => {
              const angle = node.rad;
              const x = (CIRCLE_SIZE / 2) + CIRCLE_R * Math.cos(angle) - NODE_W / 2;
              const y = (CIRCLE_SIZE / 2) + CIRCLE_R * Math.sin(angle) - NODE_H / 2;
              const nodeSpring = spring({
                frame: frame - 50 - idx * 10,
                fps,
                config: { damping: 15 },
              });
              return (
                <div
                  key={node.label}
                  style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${NODE_W}px`,
                    height: `${NODE_H}px`,
                    backgroundColor: colors.surface,
                    borderRadius: '12px',
                    border: `2px solid ${node.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 3px 14px 0 ${colors.primary}0a`,
                    fontSize: '24px',
                    fontWeight: 600,
                    color: node.color,
                    transform: `scale(${nodeSpring})`,
                    opacity: nodeSpring,
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {node.label}
                </div>
              );
            })}
          </div>
          <div
            style={{
              marginTop: '50px',
              fontSize: '34px',
              color: colors.accent,
              fontWeight: 500,
              letterSpacing: '-0.5px',
            }}
          >
            多轮循环，直到任务完成
          </div>
        </div>
      </div>
      {/* VS分隔横条（在左右两栏中间） */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: '38px',
          color: colors.textMuted,
          fontWeight: 700,
          background: colors.background,
          padding: '10px 26px',
          borderRadius: '22px',
          border: `2px dashed ${colors.border}60`,
          zIndex: 2,
          pointerEvents: 'none',
          boxShadow: '0 3px 10px #2233440a',
        }}
      >
        VS
      </div>
    </AbsoluteFill>
  );
};
