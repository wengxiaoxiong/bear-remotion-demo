# 熊老板i 的视频制作工作流

> 基于 Remotion + React + TypeScript 的编程类视频工业化生产流程

https://space.bilibili.com/25484432?spm_id_from=333.1007.0.0

本仓库展示「熊老板i」制作编程类教学视频的完整工作流。核心思想是**以 TTS 音频时长为基准**，将文案、分镜、动画、字幕串联成一条可复用的工业化流水线。

## 🎯 工作流核心理念

传统视频制作的问题是「先做画面再想配音」，导致音画不同步。本工作流采用「**先配音后做动画**」的逆向思维：

```
逐字稿 → TTS 生成 → 获得精确时长 → 按此时长制作动画 → 音画完美同步
```

**关键认知转变**：
- ❌ 不是「我写好了脚本，大概做个 5 秒动画」
- ✅ 而是「TTS 告诉我这段语音是 4.14 秒，我的动画必须正好 4.14 秒」

---

## 🎬 六步工作流详解

### 第 1 步：写文章 📝

**目的**：确定视频的知识框架和核心论点

**输出**：一篇完整的文章（如技术博客）

**关键动作**：
- 确定要讲解的技术概念
- 梳理论点之间的逻辑关系
- 准备代码示例和架构图

**示例**：
```
文章标题：《Clawdbot 架构解析：为什么它能主动执行任务？》
内容：介绍 Agent 与 ChatBot 的区别、Workspace 概念、消息生命周期...
```

---

### 第 2 步：写逐字稿 📄

**目的**：将文章转换为口语化的视频脚本

**输出**：`ep1逐字稿.md`

**关键动作**：
- 用 AI（如 Claude）将文章改写为口语化逐字稿
- 标注画面切换点（如「这里展示代码」、「这里展示架构图」）
- **注意每句话的长度**——这直接影响 TTS 时长

**逐字稿示例**：
```markdown
【Scene01-Title】
画面：代码编辑器背景，标题渐显
语音：看这个项目——Clawdbot，现在改名叫 OpenClaw。

【Scene02-Features】
画面：功能列表逐个弹出
语音：最近在 AI Agent 圈子里非常火。它能接 WhatsApp、Telegram、Slack，
      能自己发邮件、跑命令、管日历，带持久记忆，还能学新技能。
      代码量是数十万行级别。
```

**⚠️ 注意**：逐字稿的每句话长度会影响后续所有环节！

---

### 第 3 步：拆分镜表 🎞️ ⭐⭐⭐ 核心步骤

**目的**：将逐字稿拆解为可执行的分镜清单

**输出**：`ep1分镜表.md`

**这是整个工作流的核心！** 分镜表决定了：
- 每个镜头的**精确时长**（由 TTS 音频决定）
- 每个镜头的**画面类型**（动画/PPT/录频/截图）
- 每个镜头需要的**素材清单**
- 每个镜头的**字幕拆分方案**

#### 分镜表格式

```markdown
| 镜号 | 时长 | 画面类型 | 画面描述 | 字幕方案 | 素材 |
|------|------|----------|----------|----------|------|
| 01 | 4.14s | PPT | 标题页 | 单字幕 | 无 |
| 02 | 13.65s | 动画 | 功能列表逐个弹出 | 拆5段 | 各平台图标 |
| 03 | 5.29s | 动画 | 代码量对比图 | 单字幕 | GitHub截图 |
```

#### 为什么要先拆镜表？

**时序依赖关系**：

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  逐字稿文案  │ ──→ │  TTS 生成   │ ──→ │  获得时长   │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                                ↓
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  渲染视频   │ ←── │  合成动画   │ ←── │  拆镜表设计 │
└─────────────┘     └─────────────┘     └─────────────┘
```

**分镜表需要决策的问题**：

1. **画面类型选择**
   - **Remotion 动画**：流程图、对比图、序列图（复杂，耗时长）
   - **Remotion PPT**：标题、金句、列表（简单，快速）
   - **录频**：终端操作、界面演示（需提前录制）
   - **截图**：GitHub、文档、产品界面（需提前准备）

2. **字幕拆分策略**
   - 超过 5 秒的语音必须拆分为多段字幕
   - 在自然停顿处拆分（逗号、句号）
   - 每段字幕 3-5 秒，不超过 20 字

3. **动画节奏设计**
   - 动画的关键帧时间点必须与语音节奏匹配
   - 在长句子的停顿处设置画面切换或动画高潮

---

### 第 4 步：准备素材 🖼️

**目的**：根据分镜表的素材清单收集资源

**输出**：`assets/` 目录下的所有素材

**常见素材类型**：

| 类型 | 获取方式 | 存放位置 |
|------|----------|----------|
| GitHub 截图 | 浏览器截图 | `assets/github/` |
| 产品界面截图 | 官方文档/自己搭建 | `assets/screenshots/` |
| 图标（SVG/PNG）| Iconify/品牌官网 | `assets/icons/` |
| 终端录屏 | asciinema/手动录制 | `assets/recordings/` |
| 头像/Logo | 官方渠道 | `assets/brand/` |
| 封面图 | HTML 模板渲染 | `cover.png` |

#### 封面图生成

项目包含一个 HTML 封面模板（`cover.html`）和渲染脚本（`render-to-png.js`），用于生成视频封面图：

```bash
# 安装依赖（首次使用）
pnpm add puppeteer

# 渲染封面为 PNG
node render-to-png.js
```

生成的 `cover.png` 为 800x450（16:9）比例，2x 分辨率（1600x900 像素），确保清晰度。

**修改封面**：
- 编辑 `cover.html` 中的样式和内容
- 运行 `node render-to-png.js` 重新生成

---

### 第 5 步：制作动画 🎨

**目的**：按 TTS 时长制作 Remotion 动画

**输出**：`src/scenes/` 下的 React 组件

**⚠️ 关键原则：动画时长 = TTS 音频时长**

#### 获取场景时长

运行 TTS 生成后，查看 `src/lib/durations.ts`：

```typescript
export const SCENE_DURATIONS: Record<string, number> = {
  "Scene01-Title": 124,      // 4.14 秒 (124/30)
  "Scene02-Features": 409,   // 13.65 秒
  "Scene03-TooMuchCode": 158, // 5.29 秒
  // ...
};
```

#### 动画制作技巧

**使用 interpolate 控制动画节奏**：

```typescript
// 在 4.14 秒内完成入场动画
const opacity = interpolate(frame, [0, 30], [0, 1]); // 0-1秒淡入
const scale = interpolate(frame, [30, 90], [0.8, 1]); // 1-3秒缩放
```

**分段字幕的动画配合**：

```typescript
// Scene02-Features 拆分为 5 段字幕
// 对应 5 个功能项的依次弹出
const item1Progress = interpolate(frame, [0, 90], [0, 1]);   // 第1项 0-3秒
const item2Progress = interpolate(frame, [90, 180], [0, 1]); // 第2项 3-6秒
```

---

### 第 6 步：TTS 生成与视频渲染 🎵

**目的**：生成音频并渲染最终视频

#### 6.1 配置火山引擎

创建 `.env` 文件：

```bash
VOLCENGINE_APP_ID=你的AppID
VOLCENGINE_ACCESS_TOKEN=你的AccessToken
```

获取方式：
1. 访问 https://www.volcengine.com/ 注册账号
2. 开通「语音合成」服务
3. 在控制台「应用管理」获取凭证

#### 6.2 生成 TTS

```bash
python3 generate_tts.py
```

这会：
- 读取 `generate_tts.py` 中的 `SCENE_SCRIPTS`
- 调用火山引擎 API 生成音频
- 输出到 `public/audio/` 目录
- 生成时长配置 `durations.json`

#### 6.3 配置分段字幕

长场景需要在 `src/lib/subtitleSegments.ts` 中配置分段：

```typescript
'Scene02-Features': {
  segments: [
    { text: '最近在 AI Agent 圈子里非常火。', startFrame: 0, endFrame: 90 },
    { text: '它能接 WhatsApp、Telegram、Slack，', startFrame: 90, endFrame: 180 },
    // ...
  ],
}
```

#### 6.4 渲染视频

```bash
pnpm dev      # 开发预览
pnpm build    # 渲染最终视频 → out/EP1.mp4
```

---

## 🎙️ 字幕系统详解

### 为什么必须分段？

**不分段的问题**：
- 20 秒语音对应 50 字，字幕区域会占据画面 1/3
- 观众提前看到后面的文字，失去听下去的悬念
- 阅读速度和听的速度不匹配

**分段后的效果**：
- 每段 3-5 秒，10-15 字，字幕区域紧凑
- 字幕随语音同步出现，引导观众视线
- 可以在字幕切换时配合画面动画

### 两种字幕模式

#### 单字幕模式（< 5 秒场景）

```typescript
// src/lib/sceneScripts.ts
'Scene01-Title': '看这个项目——Clawdbot，现在改名叫 OpenClaw。'
```

#### 分段字幕模式（>= 5 秒场景）

```typescript
// src/lib/subtitleSegments.ts
'Scene02-Features': {
  segments: [
    { text: '最近在 AI Agent 圈子里非常火。', startFrame: 0, endFrame: 90 },
    { text: '它能接 WhatsApp、Telegram、Slack，', startFrame: 90, endFrame: 180 },
    { text: '能自己发邮件、跑命令、管日历，', startFrame: 180, endFrame: 270 },
    { text: '带持久记忆，还能学新技能。', startFrame: 270, endFrame: 340 },
    { text: '代码量是数十万行级别。', startFrame: 340, endFrame: 409 },
  ],
}
```

**帧数计算公式**：
```
帧数 = 时间(秒) × 30fps

0-3秒   → 0 到 90 帧
3-6秒   → 90 到 180 帧
6-9秒   → 180 到 270 帧
```

---

## 📁 项目结构

```
ep1/
├── src/
│   ├── scenes/              # 分镜动画组件
│   ├── components/
│   │   ├── Subtitle.tsx     # 字幕组件（支持分段）
│   │   └── AudioScene.tsx   # 音频场景包装
│   ├── lib/
│   │   ├── sceneScripts.ts      # 单字幕文案
│   │   ├── subtitleSegments.ts  # ⭐ 分段字幕配置
│   │   └── durations.ts         # 场景时长（TTS 生成）
│   └── Root.tsx            # Composition 配置
├── public/audio/           # TTS 音频（.gitignore）
├── assets/                 # 图片、录频等素材
├── cover.html              # 封面 HTML 模板
├── render-to-png.js        # 封面渲染脚本
├── cover.png               # 生成的封面图
├── generate_tts.py         # TTS 生成脚本
├── .env                    # 火山引擎凭证（.gitignore）
├── ep1逐字稿.md            # 视频逐字稿
└── ep1分镜表.md            # ⭐ 分镜表（核心！）
```

---

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
pip3 install python-dotenv requests  # TTS 脚本依赖
```

### 2. 配置火山引擎

创建 `.env` 文件：

```bash
VOLCENGINE_APP_ID=你的AppID
VOLCENGINE_ACCESS_TOKEN=你的AccessToken
```

### 3. 生成 TTS

```bash
python3 generate_tts.py
```

### 4. 开发预览

```bash
pnpm dev
```

### 5. 渲染视频

```bash
pnpm build
```

---

## 💡 常见问题

### Q: 修改了逐字稿，需要重新做哪些步骤？

A: 
1. 修改 `generate_tts.py` 中的 `SCENE_SCRIPTS`
2. 删除旧音频：`rm -f public/audio/*.mp3 public/audio/*.json`
3. 重新生成 TTS：`python3 generate_tts.py`
4. 如果时长变化，更新 `subtitleSegments.ts` 中的分段配置
5. 如果时长变化，调整对应场景的动画节奏
6. 重新渲染：`pnpm build`

### Q: 如何为一个新场景添加分段字幕？

A:
1. 运行 TTS 生成，获取时长（如 15 秒 = 450 帧）
2. 将语音拆分为 3-5 秒的句子
3. 在 `subtitleSegments.ts` 中添加配置
4. 在 Remotion Studio 中预览微调

### Q: 动画和语音对不上怎么办？

A:
- 检查 `durations.ts` 中的帧数是否与音频匹配
- 使用 `interpolate(frame, [start, end], [from, to])` 精确控制动画时间点
- 长句子拆分为多段字幕，动画配合字幕切换

---

## 🔗 相关链接

- [Remotion 官方文档](https://www.remotion.dev/)
- [火山引擎语音合成](https://www.volcengine.com/docs/6561/1598757)
- [熊老板i B站主页](https://space.bilibili.com/25484432)

---

**制作**：熊老板i  
**技术栈**：Remotion + React + TypeScript + Python
