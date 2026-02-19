// 镜头 12-13: GitHub Issue 查询示例 — 层级动画版
// 1. 用户消息大→缩小上移 2. ChatBot 先出 + streaming 3. NanoBot 逐步 4. 卡片缩小→总结
import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import { colors } from '../lib/utils';
import { fontFamily, codeFontFamily } from '../lib/fonts';

// ——— 时间轴 (30fps) ———
const USER_BIG_END = 24; // 用户消息「大」展示结束
const USER_SHRINK_END = 56; // 用户消息缩小上移结束
const USER_FADE_OUT_START = 214; // 用户消息开始退场
const USER_FADE_OUT_END = 230;
const CHATBOT_ENTER_START = 66; // ChatBot 卡片开始进入（留出停顿）
const CHATBOT_ENTER_END = 88;
const CHATBOT_STREAM_START = 98; // streaming 开始（卡片进场后停顿）
const CHATBOT_STREAM_CHARS = 12; // "我没有访问 GitHub 的能力"
const CHATBOT_STREAM_FRAMES_PER_CHAR = 3;
const CHATBOT_FAIL_APPEAR = 138; // 「单轮结束·无法执行」出现
const NANOBOT_TITLE_START = 152; // NanoBot 标题
const NANOBOT_STEP_START = 168; // 第一步
const NANOBOT_STEP_STAGGER = 24; // 每步间隔
const CARDS_SHRINK_START = 250; // 两卡片开始缩小
const CARDS_SHRINK_END = 282;
const SUMMARY_APPEAR_START = 292; // 总结出现（缩小后留间隔）
const SUMMARY_APPEAR_END = 326;

const CHATBOT_MSG = '我没有访问 GitHub 的能力';

export const Scene12_13_GitHubExample: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ——— 1. 用户消息：先大居中（屏幕中央），再缩小上移 ———
  const userMsgOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const userMsgExitOpacity = interpolate(
    frame,
    [USER_FADE_OUT_START, USER_FADE_OUT_END],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const userMsgScale = interpolate(
    frame,
    [USER_BIG_END, USER_SHRINK_END],
    [1, 0.72],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );
  // 从屏幕中央(50%) 移到顶部(12%)
  const userMsgTopPct = interpolate(
    frame,
    [USER_BIG_END, USER_SHRINK_END],
    [50, 12],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );
  // -50% = 垂直居中，0 = 以顶部为基准
  const userMsgTranslateYPct = interpolate(
    frame,
    [USER_BIG_END, USER_SHRINK_END],
    [-50, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  // ——— 2. ChatBot 卡片：先出现，再 streaming ———
  const chatbotCardX = interpolate(
    frame,
    [CHATBOT_ENTER_START, CHATBOT_ENTER_END],
    [-80, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );
  const chatbotCardOpacity = interpolate(
    frame,
    [CHATBOT_ENTER_START, CHATBOT_ENTER_END - 8],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const chatbotStreamChars = Math.min(
    CHATBOT_STREAM_CHARS,
    Math.max(
      0,
      Math.floor((frame - CHATBOT_STREAM_START) / CHATBOT_STREAM_FRAMES_PER_CHAR)
    )
  );
  const chatbotStreamDisplay = CHATBOT_MSG.slice(0, chatbotStreamChars);
  const chatbotFailOpacity = interpolate(
    frame,
    [CHATBOT_FAIL_APPEAR, CHATBOT_FAIL_APPEAR + 14],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // ——— 3. NanoBot：标题 + 四步逐步（Agent 工具调用风格） ———
  const agentTitleOpacity = interpolate(
    frame,
    [NANOBOT_TITLE_START, NANOBOT_TITLE_START + 14],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const agentTitleX = interpolate(
    frame,
    [NANOBOT_TITLE_START, NANOBOT_TITLE_START + 14],
    [24, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const steps = [
    {
      num: '①',
      title: '调用 Shell',
      detail: 'gh issue list',
      kind: 'code' as const,
      color: colors.primary,
    },
    {
      num: '②',
      title: '读取结果',
      detail: '# 3 issues found',
      kind: 'result' as const,
      color: colors.accent,
    },
    {
      num: '③',
      title: '判断',
      detail: '需要总结、按优先级排序',
      kind: 'decision' as const,
      color: colors.warning,
    },
    {
      num: '④',
      title: '发送结果',
      detail: '整理好的列表发给用户',
      kind: 'send' as const,
      color: colors.secondary,
    },
  ];

  const stepMotion = (index: number) => {
    const stepStart = NANOBOT_STEP_START + index * NANOBOT_STEP_STAGGER;
    const x = interpolate(
      frame,
      [stepStart, stepStart + 16],
      [36, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
    );
    const opacity = interpolate(
      frame,
      [stepStart, stepStart + 12],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    const scale = spring({
      frame: frame - stepStart,
      fps,
      config: { damping: 16, stiffness: 140 },
    });
    return { x, opacity, scale };
  };

  // 步骤① 代码打字机
  const step0Start = NANOBOT_STEP_START;
  const codeVisibleChars = Math.min(
    'gh issue list'.length,
    Math.max(0, Math.floor((frame - step0Start - 8) / 2))
  );
  const codeDisplay = 'gh issue list'.slice(0, codeVisibleChars);
  const cursorBlink =
    frame >= step0Start + 8 && frame < step0Start + 8 + 20 && frame % 12 < 6;

  // ——— 4. 两卡片缩小，总结出现 ———
  const cardsScale = interpolate(
    frame,
    [CARDS_SHRINK_START, CARDS_SHRINK_END],
    [1, 0.82],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const cardsY = interpolate(
    frame,
    [CARDS_SHRINK_START, CARDS_SHRINK_END],
    [0, -24],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const summaryOpacity = interpolate(
    frame,
    [SUMMARY_APPEAR_START, SUMMARY_APPEAR_END],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const summaryY = interpolate(
    frame,
    [SUMMARY_APPEAR_START, SUMMARY_APPEAR_END],
    [20, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        padding: '50px 60px 46px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. 用户消息：大且居中 → 缩小上移 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: `${userMsgTopPct}%`,
          transform: `translate(-50%, ${userMsgTranslateYPct}%) scale(${userMsgScale})`,
          transformOrigin: 'center center',
          opacity: userMsgOpacity * userMsgExitOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: colors.surface,
            color: colors.text,
            padding: 'clamp(32px, 4vw, 52px) clamp(42px, 5vw, 72px)',
            borderRadius: '28px 28px 10px 28px',
            fontSize: 'clamp(48px, 6.5vw, 80px)',
            lineHeight: 1.4,
            border: `2px solid ${colors.border}`,
            boxShadow: `0 10px 50px ${colors.background}`,
            maxWidth: 'min(85vw, 820px)',
          }}
        >
          「帮我查一下昨天 GitHub 上有没有新 issue」
        </div>
      </div>

      {/* 2+3. 对比区：先 ChatBot，再 NanoBot 逐步；最后整体缩小（留出顶部给缩小后的用户消息） */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          gap: '36px',
          paddingTop: '18vh',
          transform: `scale(${cardsScale}) translateY(${cardsY}px)`,
          transformOrigin: 'center top',
        }}
      >
        {/* 左：ChatBot — 先出，消息 streaming */}
        <div
          style={{
            flex: '0 0 40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: '32px 36px',
            backgroundColor: colors.surface,
            borderRadius: '20px',
            border: `2px solid ${colors.danger}40`,
            boxShadow: `0 0 0 1px ${colors.danger}20, 0 10px 40px rgba(0,0,0,0.4)`,
            transform: `translateX(${chatbotCardX}px)`,
            opacity: chatbotCardOpacity,
          }}
        >
          <div
            style={{
              fontSize: 'clamp(32px, 3.8vw, 42px)',
              fontWeight: 700,
              color: colors.textMuted,
              marginBottom: '24px',
            }}
          >
            ChatBot
          </div>
          <div
            style={{
              width: '100%',
              backgroundColor: colors.surfaceLight,
              color: colors.textMuted,
              padding: '20px 26px',
              borderRadius: '14px 14px 14px 6px',
              fontSize: 'clamp(28px, 3vw, 36px)',
              border: `1px solid ${colors.border}`,
              minHeight: '68px',
            }}
          >
            {chatbotStreamDisplay}
            {chatbotStreamChars < CHATBOT_STREAM_CHARS && (
              <span style={{ opacity: 0.7 }}>|</span>
            )}
          </div>
          <div
            style={{
              marginTop: '18px',
              fontSize: 'clamp(24px, 2.5vw, 30px)',
              color: colors.danger,
              fontWeight: 600,
              opacity: chatbotFailOpacity,
            }}
          >
            单轮结束 · 无法执行
          </div>
        </div>

        {/* 右：NanoBot 会这样做 + 四步逐步 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 36px',
            backgroundColor: colors.surface,
            borderRadius: '20px',
            border: `2px solid ${colors.accent}40`,
            boxShadow: `0 0 0 1px ${colors.accent}20, 0 10px 40px rgba(0,0,0,0.4)`,
            transform: `translateX(${agentTitleX}px)`,
            opacity: agentTitleOpacity,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 'clamp(32px, 3.8vw, 42px)',
              fontWeight: 700,
              color: colors.accent,
              marginBottom: '22px',
            }}
          >
            NanoBot 会这样做：
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              flex: 1,
              minHeight: 0,
            }}
          >
            {steps.map((step, index) => {
              const { x, opacity, scale } = stepMotion(index);

              return (
                <div
                  key={step.num}
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: '18px',
                    opacity,
                    transform: `translateX(${x}px) scale(${scale})`,
                  }}
                >
                  <div
                    style={{
                      width: '62px',
                      height: '62px',
                      borderRadius: '50%',
                      backgroundColor: step.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: colors.background,
                      flexShrink: 0,
                      boxShadow: `0 3px 12px ${step.color}50`,
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: colors.surface,
                      padding: '16px 22px',
                      borderRadius: '12px',
                      borderLeft: `4px solid ${step.color}`,
                      border: `1px solid ${colors.border}`,
                      minWidth: 0,
                      boxShadow: '0 3px 16px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'clamp(24px, 2.6vw, 30px)',
                        fontWeight: 600,
                        color: step.color,
                        marginBottom: '6px',
                      }}
                    >
                      {step.title}
                    </div>
                    {step.kind === 'code' && (
                      <div
                        style={{
                          fontFamily: codeFontFamily,
                          fontSize: '24px',
                          color: colors.code,
                          backgroundColor: colors.background,
                          padding: '10px 16px',
                          borderRadius: '8px',
                          display: 'inline-block',
                        }}
                      >
                        {codeDisplay}
                        {cursorBlink && (
                          <span style={{ opacity: 0.9 }}>|</span>
                        )}
                      </div>
                    )}
                    {step.kind === 'result' && (
                      <div
                        style={{
                          fontFamily: codeFontFamily,
                          fontSize: '22px',
                          color: colors.accent,
                          backgroundColor: colors.background,
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: `1px solid ${colors.accent}40`,
                          display: 'inline-block',
                        }}
                      >
                        {step.detail}
                      </div>
                    )}
                    {(step.kind === 'decision' || step.kind === 'send') && (
                      <div
                        style={{
                          fontSize: '24px',
                          color: colors.textMuted,
                        }}
                      >
                        {step.detail}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. 总结 — 两卡片缩小后才出现 */}
      <div
        style={{
          marginTop: '26px',
          padding: '18px 28px',
          backgroundColor: `${colors.accent}14`,
          borderRadius: '14px',
          border: `1px solid ${colors.accent}50`,
          fontSize: 'clamp(34px, 4vw, 48px)',
          color: colors.accent,
          textAlign: 'center',
          fontWeight: 600,
          opacity: summaryOpacity,
          transform: `translateY(${summaryY}px)`,
          boxShadow: `0 0 26px ${colors.accent}20`,
        }}
      >
        走了 3～4 轮「想→做→看→再想」循环，能迭代、能纠错
      </div>
    </AbsoluteFill>
  );
};
