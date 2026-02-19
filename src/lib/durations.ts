/**
 * 音频时长配置
 * 从生成的音频元数据自动加载
 */

// 默认时长（帧）- 当音频文件不存在时使用
export const DEFAULT_DURATIONS: Record<string, number> = {
  'Scene01-Title': 124,
  'Scene02-Features': 409,
  'Scene03-TooMuchCode': 158,
  'Scene04-OnePercent': 181,
  'Scene05-NanoBotIntro': 352,
  'Scene06-ProactiveDemo': 286,
  'Scene07-CronVsAgent': 482,
  'Scene08-Question': 220,
  'Scene09-VsIntro': 208,
  'Scene10-11-Reasoning': 510,
  'Scene12-13-GitHubExample': 786,
  'Scene14-Summary1': 336,
  'Scene15-16-Proactive': 536,
  'Scene17-18-Extensible': 577,
  'Scene19-ThreePillars': 200,
  'Scene20-21-WorkspaceIntro': 493,
  'Scene22-WorkspaceDesk': 432,
  'Scene23-24-WorkspacePath': 402,
  'Scene26-Memory': 725,
  'Scene27-Skills': 190,
  'Scene28-Assemble': 441,
  'Scene29-WorkspaceSummary': 242,
  'Scene30-MessageLife': 294,
  'Scene31-Entry': 308,
  'Scene32-Session': 212,
  'Scene33-Context': 586,
  'Scene34-Loop': 540,
  'Scene35-Exit': 171,
  'Scene36-LoopHighlight': 377,
  'Scene37-UnifiedPipeline': 475,
  'Scene38-ReviewIntro': 68,
  'Scene39-FourPillars': 830,
  'Scene40-OnePercentSummary': 131,
  'Scene41-Preview': 697,
};

// 计算总时长
export const TOTAL_DURATION_FRAMES = Object.values(DEFAULT_DURATIONS).reduce((a, b) => a + b, 0);

// 帧率
export const FPS = 30;

// 视频尺寸
export const WIDTH = 1920;
export const HEIGHT = 1080;

// 时长计算辅助函数
export const seconds = (s: number) => s * FPS;
