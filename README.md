# EP1: 用1%的代码复刻 Clawdbot（1/3）

> 「熊老板i」视频 Remotion 源码

https://space.bilibili.com/25484432?spm_id_from=333.1007.0.0

这是「熊老板i」系列视频的 Remotion 动画源码。本集介绍如何用 1% 的代码量复刻 Clawdbot 的核心架构。

## 📋 项目信息

- **系列名称**：用1%的代码复刻 Clawdbot（共3集）
- **本集标题**：凌晨三点，它自己醒了
- **时长目标**：6-7 分钟
- **定位**：有编程基础但不了解 Agent 的观众
- **技术栈**：Remotion + React + TypeScript

## 🎬 核心工作流

本项目遵循以下六个步骤的创作流程：

### 1. 写文章 📝
- 内容：撰写视频的核心文章内容
- 用途：作为视频的知识基础和内容框架
- 说明：这是整个视频的起点，确定要讲解的主题和知识点

### 2. 写逐字稿 📄
- 文件：`ep1逐字稿.md`
- 内容：完整的 TTS 逐字稿，包含时间轴和画面标注
- 方法：**使用 AI 生成**（基于第一步的文章内容）
- 用途：作为视频的脚本和旁白文本

### 3. 拆分镜表 🎞️
- 文件：`ep1分镜表.md`
- 内容：详细的镜头分解，包含：
  - 每个镜头的时间轴
  - 画面类型（remotion 动画 / remotion PPT / 录频 / 截图）
  - 画面描述
  - 需要准备的素材清单
- 方法：**使用 AI 拆分**（基于逐字稿）
- 用途：指导动画制作和素材准备

### 4. 找素材 🖼️
- 目录：`assets/`
- 内容：根据分镜表中的素材清单准备所需资源
- 说明：**AI 可能会要求我们去找一些图片素材**，如：
  - GitHub 仓库截图
  - 图标（SVG/PNG）
  - 产品界面截图
  - 终端录屏等
- 用途：为动画制作提供必要的视觉素材

### 5. 做动画 🎨
- 目录：`src/scenes/`
- 内容：每个镜头对应一个 React 组件
- 技术：使用 Remotion 制作动画效果
- 方法：**使用 `remotion-best-practice` skill** 来制作
- 类型：
  - **remotion 动画**：流程图、对比图、目录树、序列图等
  - **remotion PPT**：金句、标题、列表等简约排版
  - **录频**：真实或模拟的终端/界面录屏
  - **截图**：GitHub、产品界面等真实截图

### 6. 剪辑和合成 TTS 🎵
- 使用 Remotion 渲染最终视频
- 合成 TTS（文本转语音）音频
- 输出：`out/EP1.mp4`

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发预览

```bash
pnpm dev
```

启动 Remotion Studio，可以在浏览器中预览和调试动画。

### 渲染视频

```bash
pnpm build
```

渲染最终视频到 `out/` 目录。

## 📁 项目结构

```
ep1/
├── src/
│   ├── scenes/          # 各个场景组件
│   ├── components/      # 可复用组件
│   ├── lib/            # 工具函数
│   ├── Root.tsx        # 根组件
│   └── index.tsx       # 入口文件
├── assets/             # 静态资源（图片、视频等）
├── public/             # 公共资源
├── out/                # 渲染输出目录（已忽略）
├── ep1逐字稿.md        # TTS 逐字稿
├── ep1分镜表.md        # 分镜表
├── package.json
├── remotion.config.ts  # Remotion 配置
└── tsconfig.json       # TypeScript 配置
```

## 📝 文件说明

### 逐字稿（ep1逐字稿.md）
包含完整的视频脚本，包括：
- 时间轴标注
- 画面描述
- Remotion 动画备注

### 分镜表（ep1分镜表.md）
详细的镜头分解表，包含：
- 镜头编号和时间
- 画面类型
- 画面描述
- 需要准备的素材清单

### 场景组件（src/scenes/）
每个场景对应一个 TypeScript/React 组件：
- `Scene01_Title.tsx` - 标题场景
- `Scene02_Features.tsx` - 功能展示
- `Scene03_TooMuchCode.tsx` - 代码量对比
- ... 等等

## 🎯 本集内容概览

本集主要讲解：

1. **从 ChatBot 到 Agent 的本质区别**
   - 推理能力：单轮问答 vs 多轮循环
   - 主动性：被动响应 vs 主动执行
   - 扩展性：写死代码 vs 声明式技能

2. **Workspace 工作区**
   - Agent 的"办公桌"概念
   - 文件结构（SOUL.md、AGENTS.md、USER.md、memory、skills）
   - 分层上下文工程

3. **一条消息的一生**
   - 进入 → 会话 → 上下文 → 循环 → 退出
   - Agent Loop 的核心机制
   - 统一执行管线

## 🔧 技术细节

- **Remotion 版本**：^4.0.0
- **React 版本**：^18.2.0
- **TypeScript 版本**：^5.3.0
- **包管理器**：pnpm

## 📦 依赖说明

主要依赖：
- `remotion` - Remotion 核心库
- `@remotion/cli` - Remotion CLI 工具
- `@remotion/google-fonts` - Google 字体支持
- `@remotion/transitions` - 过渡动画效果

## 📄 许可证

本项目为「熊老板i」视频制作源码，仅供学习和参考使用。

## 🔗 相关链接

- [Remotion 官方文档](https://www.remotion.dev/)
- [Clawdbot/OpenClaw GitHub](https://github.com/clawdbot)

---

**制作**：熊老板i  
**技术**：Remotion + React + TypeScript
