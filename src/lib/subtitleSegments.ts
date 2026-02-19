/**
 * 字幕分段配置
 * 每个场景可以包含多个字幕片段，按时间顺序显示
 * 
 * 结构：
 * - sceneId: 场景ID
 * - segments: 字幕片段数组
 *   - text: 字幕文本
 *   - startFrame: 开始帧（相对于场景起始）
 *   - endFrame: 结束帧（相对于场景起始）
 */

export interface SubtitleSegment {
  text: string;
  startFrame: number;
  endFrame: number;
}

export interface SceneSubtitles {
  segments: SubtitleSegment[];
}

/**
 * 场景字幕分段配置
 * 为长语音场景拆分多个字幕片段
 */
export const SCENE_SUBTITLE_SEGMENTS: Record<string, SceneSubtitles> = {
  // Scene02-Features - 长句子拆分
  'Scene02-Features': {
    segments: [
      { text: '最近在 AI Agent 圈子里非常火。', startFrame: 0, endFrame: 90 },
      { text: '它能接 WhatsApp、Telegram、Slack，', startFrame: 90, endFrame: 180 },
      { text: '能自己发邮件、跑命令、管日历，', startFrame: 180, endFrame: 270 },
      { text: '带持久记忆，还能学新技能。', startFrame: 270, endFrame: 340 },
      { text: '代码量是数十万行级别。', startFrame: 340, endFrame: 409 },
    ],
  },

  // Scene05-NanoBotIntro
  'Scene05-NanoBotIntro': {
    segments: [
      { text: '这个精简版叫 NanoBot。', startFrame: 0, endFrame: 80 },
      { text: '几千行代码，但 Clawdbot 最关键的能力——', startFrame: 80, endFrame: 180 },
      { text: '多通道接入、主动执行任务、', startFrame: 180, endFrame: 260 },
      { text: '声明式技能、分层上下文——', startFrame: 260, endFrame: 320 },
      { text: '全都保留了。', startFrame: 320, endFrame: 352 },
    ],
  },

  // Scene06-ProactiveDemo
  'Scene06-ProactiveDemo': {
    segments: [
      { text: '看，这是它在凌晨三点，', startFrame: 0, endFrame: 70 },
      { text: '没有任何人发消息的情况下，自己醒来，', startFrame: 70, endFrame: 160 },
      { text: '读了任务清单，跑了命令，', startFrame: 160, endFrame: 230 },
      { text: '把日报推到了 Telegram。', startFrame: 230, endFrame: 286 },
    ],
  },

  // Scene07-CronVsAgent
  'Scene07-CronVsAgent': {
    segments: [
      { text: '你可能说——这不就是 cron job 吗？', startFrame: 0, endFrame: 100 },
      { text: '不一样。', startFrame: 100, endFrame: 140 },
      { text: 'cron job 数据源挂了就直接报错退出。', startFrame: 140, endFrame: 240 },
      { text: '这个 Agent 会自己判断：换个 API 试试；', startFrame: 240, endFrame: 340 },
      { text: '还不行，就先把能拿到的部分整理好，', startFrame: 340, endFrame: 420 },
      { text: '告诉你「这块数据今天缺了，我明天再补」。', startFrame: 420, endFrame: 482 },
    ],
  },

  // Scene10-11-Reasoning
  'Scene10-11-Reasoning': {
    segments: [
      { text: '第一个维度，推理能力。', startFrame: 0, endFrame: 70 },
      { text: 'ChatBot 是单轮问答：你问 A，它答 B，完事了。', startFrame: 70, endFrame: 180 },
      { text: 'NanoBot 是多轮循环——', startFrame: 180, endFrame: 250 },
      { text: '它会想一步、做一步、看结果、再想下一步。', startFrame: 250, endFrame: 360 },
      { text: '这个循环可以跑很多轮，直到任务真的完成。', startFrame: 360, endFrame: 510 },
    ],
  },

  // Scene12-13-GitHubExample
  'Scene12-13-GitHubExample': {
    segments: [
      { text: '举个例子。', startFrame: 0, endFrame: 40 },
      { text: '你让它「帮我查一下昨天 GitHub 上有没有新 issue」。', startFrame: 40, endFrame: 160 },
      { text: '一个普通 ChatBot 只能说「我没有访问 GitHub 的能力」。', startFrame: 160, endFrame: 300 },
      { text: '但 NanoBot 会这样做：', startFrame: 300, endFrame: 370 },
      { text: '先调用 Shell 工具跑 gh issue list，拿到结果；', startFrame: 370, endFrame: 480 },
      { text: '然后读一遍——发现有三个新 issue；', startFrame: 480, endFrame: 580 },
      { text: '接着它会判断：要不要帮用户总结一下？', startFrame: 580, endFrame: 670 },
      { text: '要不要按优先级排个序？', startFrame: 670, endFrame: 730 },
      { text: '最后才把整理好的结果发给你。', startFrame: 730, endFrame: 786 },
    ],
  },

  // Scene14-Summary1
  'Scene14-Summary1': {
    segments: [
      { text: '这个过程可能走了三四轮「想→做→看→再想」的循环。', startFrame: 0, endFrame: 160 },
      { text: '这就是 Agent 和 ChatBot 的第一个本质区别——', startFrame: 160, endFrame: 260 },
      { text: '它不是一次调用就结束，而是能迭代、能纠错。', startFrame: 260, endFrame: 336 },
    ],
  },

  // Scene15-16-Proactive
  'Scene15-16-Proactive': {
    segments: [
      { text: '第二个维度，主动性。', startFrame: 0, endFrame: 70 },
      { text: 'ChatBot 是被动的——你不说话，它就不动。', startFrame: 70, endFrame: 180 },
      { text: 'NanoBot 是主动的——', startFrame: 180, endFrame: 250 },
      { text: '你可以给它设一个心跳周期，比如每 30 分钟检查一次任务清单；', startFrame: 250, endFrame: 380 },
      { text: '也可以设定时任务，比如每天早上 9 点发日报。', startFrame: 380, endFrame: 480 },
      { text: '不需要你一直盯着它。', startFrame: 480, endFrame: 536 },
    ],
  },

  // Scene17-18-Extensible
  'Scene17-18-Extensible': {
    segments: [
      { text: '第三个维度，扩展性。', startFrame: 0, endFrame: 70 },
      { text: 'ChatBot 的能力是写死在代码里的。', startFrame: 70, endFrame: 150 },
      { text: '你想让它多做一件事，得改代码、重新部署。', startFrame: 150, endFrame: 260 },
      { text: 'NanoBot 不一样——', startFrame: 260, endFrame: 320 },
      { text: '你只需要写一份 Markdown 文档，', startFrame: 320, endFrame: 400 },
      { text: '描述这个技能是什么、怎么用、依赖什么工具，', startFrame: 400, endFrame: 490 },
      { text: '扔到指定目录下，它就学会了。', startFrame: 490, endFrame: 577 },
    ],
  },

  // Scene20-21-WorkspaceIntro
  'Scene20-21-WorkspaceIntro': {
    segments: [
      { text: '但是，光说「智能」太抽象了。', startFrame: 0, endFrame: 90 },
      { text: '我们来看看 Clawdbot 类架构的 Agent 运行的时候，', startFrame: 90, endFrame: 200 },
      { text: '到底在「看什么」。', startFrame: 200, endFrame: 260 },
      { text: '这就要聊到一个关键概念——Workspace，工作区。', startFrame: 260, endFrame: 370 },
      { text: '这是 Clawdbot 架构的核心设计之一，', startFrame: 370, endFrame: 450 },
      { text: 'NanoBot 完整保留了它。', startFrame: 450, endFrame: 493 },
    ],
  },

  // Scene22-WorkspaceDesk
  'Scene22-WorkspaceDesk': {
    segments: [
      { text: '你可以把 Workspace 理解成 Agent 的「办公桌」。', startFrame: 0, endFrame: 110 },
      { text: '上面放着它需要的所有东西：', startFrame: 110, endFrame: 190 },
      { text: '它的人格设定、行为规范、它对你的了解、', startFrame: 190, endFrame: 290 },
      { text: '长期记忆、可以用的技能清单，', startFrame: 290, endFrame: 360 },
      { text: '甚至还有一个待办事项文件。', startFrame: 360, endFrame: 432 },
    ],
  },

  // Scene23-24-WorkspacePath
  'Scene23-24-WorkspacePath': {
    segments: [
      { text: '具体来说，Workspace 是一个目录，', startFrame: 0, endFrame: 80 },
      { text: '通常在 ~/.nanobot/workspace，结构长这样：', startFrame: 80, endFrame: 180 },
      { text: '最上面几个文件是「常驻文件」——', startFrame: 180, endFrame: 270 },
      { text: '每次对话都会被完整加载到 System Prompt 里：', startFrame: 270, endFrame: 402 },
    ],
  },

  // Scene26-Memory
  'Scene26-Memory': {
    segments: [
      { text: '然后是记忆层：', startFrame: 0, endFrame: 60 },
      { text: 'memory/MEMORY.md：长期记忆，', startFrame: 60, endFrame: 150 },
      { text: '这不是写死的配置文件——Agent 自己会往里面写东西。', startFrame: 150, endFrame: 280 },
      { text: '比如你说「以后周报只要摘要就行」，', startFrame: 280, endFrame: 380 },
      { text: '它会自己把这条信息写进 MEMORY.md。', startFrame: 380, endFrame: 480 },
      { text: 'memory/HISTORY.md：事件日志，', startFrame: 480, endFrame: 570 },
      { text: 'Agent 不会每次都读，而是需要的时候用 grep 去查。', startFrame: 570, endFrame: 725 },
    ],
  },

  // Scene28-Assemble
  'Scene28-Assemble': {
    segments: [
      { text: '这些文件，在每次对话开始时，', startFrame: 0, endFrame: 80 },
      { text: '会按照固定的顺序，被拼装成一条 System Prompt 发给大模型。', startFrame: 80, endFrame: 230 },
      { text: '这就是为什么 Agent 能「记住」你是谁、', startFrame: 230, endFrame: 340 },
      { text: '知道自己该怎么做、知道有哪些技能可以用。', startFrame: 340, endFrame: 441 },
    ],
  },

  // Scene33-Context
  'Scene33-Context': {
    segments: [
      { text: '第三步，上下文。', startFrame: 0, endFrame: 60 },
      { text: '核心步骤来了——系统按照分层策略拼 System Prompt。', startFrame: 60, endFrame: 190 },
      { text: '就是刚才说的：先放身份信息，', startFrame: 190, endFrame: 280 },
      { text: '再放行为规范、人格、用户信息，', startFrame: 280, endFrame: 370 },
      { text: '接着是长期记忆，最后是技能。', startFrame: 370, endFrame: 450 },
      { text: '然后把历史对话和你刚发的消息拼上去，', startFrame: 450, endFrame: 540 },
      { text: '一起发给 LLM。', startFrame: 540, endFrame: 586 },
    ],
  },

  // Scene34-Loop
  'Scene34-Loop': {
    segments: [
      { text: '第四步，循环。', startFrame: 0, endFrame: 60 },
      { text: 'LLM 回复了。', startFrame: 60, endFrame: 100 },
      { text: '如果回复里包含 tool calls——', startFrame: 100, endFrame: 180 },
      { text: '比如它想读个文件或者跑个命令，', startFrame: 180, endFrame: 270 },
      { text: '系统就执行工具，把结果塞回对话，再调一次 LLM。', startFrame: 270, endFrame: 400 },
      { text: '这个循环可以走很多轮，直到 LLM 给出最终回复。', startFrame: 400, endFrame: 540 },
    ],
  },

  // Scene36-LoopHighlight
  'Scene36-LoopHighlight': {
    segments: [
      { text: '注意，最关键的是第四步——', startFrame: 0, endFrame: 80 },
      { text: '那个「想→做→看→再想」的循环。', startFrame: 80, endFrame: 190 },
      { text: '这就是 Agent 跟普通 ChatBot 最大的区别。', startFrame: 190, endFrame: 290 },
      { text: 'ChatBot 只走一轮，Agent 走 N 轮。', startFrame: 290, endFrame: 377 },
    ],
  },

  // Scene37-UnifiedPipeline
  'Scene37-UnifiedPipeline': {
    segments: [
      { text: '而且，这条管线不只服务用户消息。', startFrame: 0, endFrame: 90 },
      { text: '心跳任务、定时任务、子任务回报——', startFrame: 90, endFrame: 200 },
      { text: '所有触发源最终都走这同一条路。', startFrame: 200, endFrame: 300 },
      { text: '这意味着不管是你发消息让它做事，', startFrame: 300, endFrame: 390 },
      { text: '还是它自己到点醒来干活，执行逻辑完全一致。', startFrame: 390, endFrame: 475 },
    ],
  },

  // Scene39-FourPillars
  'Scene39-FourPillars': {
    segments: [
      { text: 'Clawdbot 类 Agent 之所以「智能」，', startFrame: 0, endFrame: 80 },
      { text: '不是因为它用了什么魔法模型，', startFrame: 80, endFrame: 160 },
      { text: '而是因为它在架构层面做了四件事：', startFrame: 160, endFrame: 260 },
      { text: '会推理——多轮思考-行动循环，能迭代、能纠错。', startFrame: 260, endFrame: 400 },
      { text: '会主动——心跳和定时任务，没人说话也能干活。', startFrame: 400, endFrame: 520 },
      { text: '会扩展——Skill 声明式技能系统，写文档就能教它新能力。', startFrame: 520, endFrame: 660 },
      { text: '看得准——分层上下文工程，让模型每次都能看到该看的信息。', startFrame: 660, endFrame: 830 },
    ],
  },

  // Scene41-Preview
  'Scene41-Preview': {
    segments: [
      { text: '但是，「会主动」和「会扩展」这两个点，', startFrame: 0, endFrame: 100 },
      { text: '今天只是点到为止。', startFrame: 100, endFrame: 160 },
      { text: '下一集，我会深入拆解 Proactive 主动执行机制', startFrame: 160, endFrame: 290 },
      { text: '和 Skill 技能系统——', startFrame: 290, endFrame: 360 },
      { text: '心跳到底怎么唤醒 Agent？', startFrame: 360, endFrame: 440 },
      { text: '定时任务是怎么持久化和调度的？', startFrame: 440, endFrame: 530 },
      { text: '一个 Skill 从被发现到被使用，中间经历了什么？', startFrame: 530, endFrame: 640 },
      { text: '这是最有意思的部分。我们下集见。', startFrame: 640, endFrame: 697 },
    ],
  },
};

/**
 * 获取场景的字幕分段
 * 如果没有配置分段，返回 null（使用单字幕模式）
 */
export function getSceneSubtitleSegments(sceneId: string): SubtitleSegment[] | null {
  const scene = SCENE_SUBTITLE_SEGMENTS[sceneId];
  return scene?.segments || null;
}

/**
 * 获取当前帧应该显示的字幕片段
 */
export function getCurrentSegment(
  segments: SubtitleSegment[],
  currentFrame: number
): SubtitleSegment | null {
  return segments.find(
    (seg) => currentFrame >= seg.startFrame && currentFrame < seg.endFrame
  ) || null;
}
