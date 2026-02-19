// 镜头 35: 第五步 - 退出 (Telegram UI 风格)
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily } from '../lib/fonts';

export const Scene35_Exit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 手机界面进入动画
  const phoneScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15 },
  });

  // 消息气泡动画
  const msg1Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15 },
  });

  const msg2Spring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 15 },
  });

  const msg3Spring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 15 },
  });

  // NanoBot 头像出现
  const botScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15 },
  });

  // 保存指示器
  const saveOpacity = interpolate(frame, [40, 50, 80, 90], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '60px',
        padding: '60px',
      }}
    >
      {/* 左侧：步骤标题 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: colors.pink,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 700,
            color: colors.text,
          }}
        >
          5
        </div>
        <div style={{ fontSize: '48px', fontWeight: 700, color: colors.pink }}>
          退出
        </div>
        <div
          style={{
            fontSize: '20px',
            color: colors.textMuted,
            textAlign: 'center',
            maxWidth: '200px',
            marginTop: '10px',
          }}
        >
          保存结果并通知用户
        </div>
      </div>

      {/* 中间箭头 */}
      <div
        style={{
          fontSize: '60px',
          color: colors.textMuted,
          opacity: interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        ➜
      </div>

      {/* 右侧：Telegram 手机界面 */}
      <div
        style={{
          transform: `scale(${phoneScale})`,
          opacity: phoneScale,
        }}
      >
        {/* 手机外壳 */}
        <div
          style={{
            width: '380px',
            height: '680px',
            backgroundColor: '#1c1c1e',
            borderRadius: '40px',
            padding: '12px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
            border: '2px solid #333',
          }}
        >
          {/* 屏幕 */}
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#0d1117',
              borderRadius: '30px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Telegram 顶部栏 */}
            <div
              style={{
                backgroundColor: '#1c1c1e',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid #2c2c2e',
              }}
            >
              <span style={{ fontSize: '20px', color: '#8e8e93' }}>←</span>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                }}
              >
                🤖
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: colors.text }}>
                  NanoBot
                </div>
                <div style={{ fontSize: '12px', color: '#34c759' }}>在线</div>
              </div>
              <span style={{ fontSize: '20px', color: '#8e8e93' }}>⋮</span>
            </div>

            {/* 聊天区域 */}
            <div
              style={{
                flex: 1,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                overflow: 'hidden',
              }}
            >
              {/* 日期分隔线 */}
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#8e8e93',
                  marginBottom: '8px',
                }}
              >
                今天
              </div>

              {/* NanoBot 消息 1 - 左侧 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '8px',
                  transform: `translateY(${(1 - msg1Spring) * 20}px)`,
                  opacity: msg1Spring,
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    flexShrink: 0,
                    transform: `scale(${botScale})`,
                  }}
                >
                  🤖
                </div>
                <div
                  style={{
                    backgroundColor: '#2c2c2e',
                    padding: '10px 14px',
                    borderRadius: '18px 18px 18px 4px',
                    maxWidth: '260px',
                  }}
                >
                  <div style={{ fontSize: '14px', color: colors.text, lineHeight: 1.5 }}>
                    ✅ 任务执行完成！
                  </div>
                  <div style={{ fontSize: '11px', color: '#8e8e93', marginTop: '4px', textAlign: 'right' }}>
                    09:30
                  </div>
                </div>
              </div>

              {/* NanoBot 消息 2 - 左侧 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '8px',
                  transform: `translateY(${(1 - msg2Spring) * 20}px)`,
                  opacity: msg2Spring,
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    flexShrink: 0,
                  }}
                >
                  🤖
                </div>
                <div
                  style={{
                    backgroundColor: '#2c2c2e',
                    padding: '10px 14px',
                    borderRadius: '18px 18px 18px 4px',
                    maxWidth: '260px',
                  }}
                >
                  <div style={{ fontSize: '14px', color: colors.text, lineHeight: 1.5 }}>
                    为您查询到 <span style={{ color: colors.accent, fontWeight: 600 }}>3 个新 issue</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#8e8e93', marginTop: '4px', textAlign: 'right' }}>
                    09:30 ✓
                  </div>
                </div>
              </div>

              {/* NanoBot 消息 3 - 文件卡片 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '8px',
                  transform: `translateY(${(1 - msg3Spring) * 20}px)`,
                  opacity: msg3Spring,
                }}
              >
                <div style={{ width: '32px', flexShrink: 0 }} />
                <div
                  style={{
                    backgroundColor: '#2c2c2e',
                    padding: '12px',
                    borderRadius: '18px 18px 18px 4px',
                    maxWidth: '260px',
                    borderLeft: '3px solid ' + colors.warning,
                  }}
                >
                  <div style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '4px' }}>
                    📎 执行报告.md
                  </div>
                  <div style={{ fontSize: '12px', color: '#8e8e93' }}>
                    详细结果已保存到 MEMORY
                  </div>
                  <div style={{ fontSize: '11px', color: '#8e8e93', marginTop: '6px', textAlign: 'right' }}>
                    09:31 ✓✓
                  </div>
                </div>
              </div>

              {/* 保存提示 - 临时显示 */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: saveOpacity,
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: '16px 28px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span style={{ fontSize: '24px' }}>💾</span>
                  <span style={{ fontSize: '16px', color: colors.text }}>保存会话...</span>
                </div>
              </div>
            </div>

            {/* 底部输入栏 */}
            <div
              style={{
                backgroundColor: '#1c1c1e',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderTop: '1px solid #2c2c2e',
              }}
            >
              <span style={{ fontSize: '24px', color: '#8e8e93' }}>+</span>
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#2c2c2e',
                  borderRadius: '20px',
                  padding: '10px 16px',
                  fontSize: '15px',
                  color: '#8e8e93',
                }}
              >
                消息
              </div>
              <span style={{ fontSize: '24px', color: '#8e8e93' }}>🎤</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
