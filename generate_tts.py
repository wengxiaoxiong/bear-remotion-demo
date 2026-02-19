#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TTS 音频批量生成脚本
使用字节跳动火山引擎 TTS API 为 EP1 所有分镜生成语音

环境变量配置：
- VOLCENGINE_APP_ID: 火山引擎 App ID
- VOLCENGINE_ACCESS_TOKEN: 火山引擎 Access Token

获取方式：
https://www.volcengine.com/docs/6561/1598757
"""

import base64
import json
import uuid
import requests
import os
import time
import sys
from pathlib import Path
from dotenv import load_dotenv

# 加载 .env 文件
load_dotenv()

# ==================== 环境变量配置 ====================

def get_env_or_exit(var_name: str, description: str) -> str:
    """获取环境变量，如果不存在则退出并提示"""
    value = os.getenv(var_name)
    if not value:
        print(f"❌ 错误：缺少环境变量 {var_name}")
        print(f"   {description}")
        print()
        print("请在项目根目录创建 .env 文件，内容如下：")
        print()
        print("VOLCENGINE_APP_ID=你的AppID")
        print("VOLCENGINE_ACCESS_TOKEN=你的AccessToken")
        print()
        print("获取方式：https://www.volcengine.com/docs/6561/1598757")
        sys.exit(1)
    return value

# 从环境变量读取账号配置
APP_ID = get_env_or_exit(
    "VOLCENGINE_APP_ID",
    "火山引擎 App ID，在控制台应用管理页面获取"
)

ACCESS_TOKEN = get_env_or_exit(
    "VOLCENGINE_ACCESS_TOKEN",
    "火山引擎 Access Token，在控制台应用管理页面获取"
)

CLUSTER = "volcano_tts"

# 音色配置
# 可用音色列表: https://www.volcengine.com/docs/6561/1257544
VOICE_TYPE = "zh_female_cancan_mars_bigtts"  # 标准大模型音色
SPEED_RATIO = 1.15  # 稍微加快语速，让视频更紧凑

# API 配置
HOST = "openspeech.bytedance.com"
API_URL = f"https://{HOST}/api/v1/tts"

# ==================== 分镜逐字稿 ====================

SCENE_SCRIPTS = {
    "Scene00-Intro": "嗨，我是熊老板i。",
    "Scene01-Title": "看这个项目——Clawdbot，现在改名叫 OpenClaw。",
    "Scene02-Features": "最近在 AI Agent 圈子里非常火。它能接 WhatsApp、Telegram、Slack，能自己发邮件、跑命令、管日历，带持久记忆，还能学新技能。代码量是数十万行级别。",
    "Scene03-TooMuchCode": "但今天我不是来带你读源码的——几十万行，读完黄花菜都凉了。",
    "Scene04-OnePercent": "我要做的事情是：用大概1%的代码量，把 Clawdbot 的核心架构复刻出来。",
    "Scene05-NanoBotIntro": "这个精简版叫 NanoBot。几千行代码，但 Clawdbot 最关键的能力——多通道接入、主动执行任务、声明式技能、分层上下文——全都保留了。",
    "Scene06-ProactiveDemo": "看，这是它在凌晨三点，没有任何人发消息的情况下，自己醒来，读了任务清单，跑了命令，把日报推到了 Telegram。",
    "Scene07-CronVsAgent": "你可能说——这不就是 cron job 吗？不一样。cron job 数据源挂了就直接报错退出。这个 Agent 会自己判断：换个 API 试试；还不行，就先把能拿到的部分整理好，告诉你「这块数据今天缺了，我明天再补」。",
    "Scene08-Question": "今天第一集，我们先搞清楚一个根本问题：Clawdbot 类架构的 Agent，为什么看起来「智能」？",
    "Scene09-VsIntro": "我们先把 Clawdbot 这类 Agent 和你平时用的 ChatBot 做个对比，你就能直观感受到差距。",
    "Scene10-11-Reasoning": "第一个维度，推理能力。ChatBot 是单轮问答：你问 A，它答 B，完事了。NanoBot 是多轮循环——它会想一步、做一步、看结果、再想下一步。这个循环可以跑很多轮，直到任务真的完成。",
    "Scene12-13-GitHubExample": "举个例子。你让它「帮我查一下昨天 GitHub 上有没有新 issue」。一个普通 ChatBot 只能说「我没有访问 GitHub 的能力」。但 NanoBot 会这样做：先调用 Shell 工具跑 gh issue list，拿到结果；然后读一遍——发现有三个新 issue；接着它会判断：要不要帮用户总结一下？要不要按优先级排个序？最后才把整理好的结果发给你。",
    "Scene14-Summary1": "这个过程可能走了三四轮「想→做→看→再想」的循环。这就是 Agent 和 ChatBot 的第一个本质区别——它不是一次调用就结束，而是能迭代、能纠错。",
    "Scene15-16-Proactive": "第二个维度，主动性。ChatBot 是被动的——你不说话，它就不动。NanoBot 是主动的——你可以给它设一个心跳周期，比如每 30 分钟检查一次任务清单；也可以设定时任务，比如每天早上 9 点发日报。不需要你一直盯着它。",
    "Scene17-18-Extensible": "第三个维度，扩展性。ChatBot 的能力是写死在代码里的。你想让它多做一件事，得改代码、重新部署。NanoBot 不一样——你只需要写一份 Markdown 文档，描述这个技能是什么、怎么用、依赖什么工具，扔到指定目录下，它就学会了。",
    "Scene19-ThreePillars": "这三件事加在一起——会推理、会主动、会扩展——就是 NanoBot 智能的来源。",
    "Scene20-21-WorkspaceIntro": "但是，光说「智能」太抽象了。我们来看看 Clawdbot 类架构的 Agent 运行的时候，到底在「看什么」。这就要聊到一个关键概念——Workspace，工作区。这是 Clawdbot 架构的核心设计之一，NanoBot 完整保留了它。",
    "Scene22-WorkspaceDesk": "你可以把 Workspace 理解成 Agent 的「办公桌」。上面放着它需要的所有东西：它的人格设定、行为规范、它对你的了解、长期记忆、可以用的技能清单，甚至还有一个待办事项文件。",
    "Scene23-24-WorkspacePath": "具体来说，Workspace 是一个目录，通常在 ~/.nanobot/workspace，结构长这样：最上面几个文件是「常驻文件」——每次对话都会被完整加载到 System Prompt 里：",
    "Scene26-Memory": "然后是记忆层：memory/MEMORY.md：长期记忆，这不是写死的配置文件——Agent 自己会往里面写东西。比如你说「以后周报只要摘要就行」，它会自己把这条信息写进 MEMORY.md。memory/HISTORY.md：事件日志，Agent 不会每次都读，而是需要的时候用 grep 去查。",
    "Scene27-Skills": "最后是技能目录 skills/——每个技能是一个子目录，里面放一个 SKILL.md。",
    "Scene28-Assemble": "这些文件，在每次对话开始时，会按照固定的顺序，被拼装成一条 System Prompt 发给大模型。这就是为什么 Agent 能「记住」你是谁、知道自己该怎么做、知道有哪些技能可以用。",
    "Scene29-WorkspaceSummary": "Workspace 就是 Agent 的上下文来源。它的智能程度，很大程度上取决于这个 Workspace 设计得好不好。",
    "Scene30-MessageLife": "好，现在你知道了 Agent 的「办公桌」长什么样。那当你发一条消息给它，整个流程是怎么走的？我们来走一遍「一条消息的一生」。",
    "Scene31-Entry": "第一步，进入。你在 Telegram 上发了一条消息。这条消息被 Telegram 的适配层接收，转成统一格式，放进消息队列。",
    "Scene32-Session": "第二步，会话。系统根据 session key 查找或创建一个会话，把历史对话加载出来。",
    "Scene33-Context": "第三步，上下文。核心步骤来了——系统按照分层策略拼 System Prompt。就是刚才说的：先放身份信息，再放行为规范、人格、用户信息，接着是长期记忆，最后是技能。然后把历史对话和你刚发的消息拼上去，一起发给 LLM。",
    "Scene34-Loop": "第四步，循环。LLM 回复了。如果回复里包含 tool calls——比如它想读个文件或者跑个命令——系统就执行工具，把结果塞回对话，再调一次 LLM。这个循环可以走很多轮，直到 LLM 给出最终回复。",
    "Scene35-Exit": "第五步，退出。保存会话，把回复通过 Telegram 发回给你。",
    "Scene36-LoopHighlight": "注意，最关键的是第四步——那个「想→做→看→再想」的循环。这就是 Agent 跟普通 ChatBot 最大的区别。ChatBot 只走一轮，Agent 走 N 轮。",
    "Scene37-UnifiedPipeline": "而且，这条管线不只服务用户消息。心跳任务、定时任务、子任务回报——所有触发源最终都走这同一条路。这意味着不管是你发消息让它做事，还是它自己到点醒来干活，执行逻辑完全一致。",
    "Scene38-ReviewIntro": "好，我们快速回顾一下。",
    "Scene39-FourPillars": "Clawdbot 类 Agent 之所以「智能」，不是因为它用了什么魔法模型，而是因为它在架构层面做了四件事：会推理——多轮思考-行动循环，能迭代、能纠错。会主动——心跳和定时任务，没人说话也能干活。会扩展——Skill 声明式技能系统，写文档就能教它新能力。看得准——分层上下文工程，让模型每次都能看到该看的信息。",
    "Scene40-OnePercentSummary": "而 NanoBot 用1%的代码量把这四件事全部跑通了。",
    "Scene41-Preview": "但是，「会主动」和「会扩展」这两个点，今天只是点到为止。下一集，我会深入拆解 Proactive 主动执行机制和 Skill 技能系统——心跳到底怎么唤醒 Agent？定时任务是怎么持久化和调度的？一个 Skill 从被发现到被使用，中间经历了什么？这是最有意思的部分，我们下集见.",
}


def generate_tts(scene_id: str, text: str, output_dir: Path) -> dict:
    """
    调用 TTS API 生成单个场景的语音
    
    Returns:
        dict: 包含 duration（秒）和 duration_in_frames（帧）的元数据
    """
    header = {"Authorization": f"Bearer;{ACCESS_TOKEN}"}
    
    request_json = {
        "app": {
            "appid": APP_ID,
            "token": "access_token",
            "cluster": CLUSTER
        },
        "user": {
            "uid": "388808087185088"
        },
        "audio": {
            "voice_type": VOICE_TYPE,
            "encoding": "mp3",
            "speed_ratio": SPEED_RATIO,
            "volume_ratio": 1.0,
            "pitch_ratio": 1.0,
        },
        "request": {
            "reqid": str(uuid.uuid4()),
            "text": text,
            "text_type": "plain",
            "operation": "query",
            "with_frontend": 1,
            "frontend_type": "unitTson"
        }
    }
    
    try:
        resp = requests.post(API_URL, json.dumps(request_json), headers=header)
        result = resp.json()
        
        if result.get("code") != 3000:
            raise Exception(f"API error: {result.get('message')} (code: {result.get('code')})")
        
        if "data" not in result:
            raise Exception("No audio data in response")
        
        # 保存音频文件
        audio_path = output_dir / f"{scene_id}.mp3"
        with open(audio_path, "wb") as f:
            f.write(base64.b64decode(result["data"]))
        
        # 获取时长（毫秒转为秒）
        duration_ms = int(result.get("addition", {}).get("duration", 0))
        duration_sec = duration_ms / 1000
        duration_frames = int(duration_sec * 30)  # 30fps
        
        metadata = {
            "scene_id": scene_id,
            "text": text,
            "duration": duration_sec,
            "duration_in_seconds": duration_sec,
            "duration_in_frames": duration_frames,
            "voice_type": VOICE_TYPE,
            "generated_at": time.strftime("%Y-%m-%dT%H:%M:%S")
        }
        
        # 保存元数据
        metadata_path = output_dir / f"{scene_id}.json"
        with open(metadata_path, "w", encoding="utf-8") as f:
            json.dump(metadata, f, ensure_ascii=False, indent=2)
        
        return metadata
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        raise


def main():
    """主函数：批量生成所有场景的 TTS"""
    
    print("🚀 EP1 TTS 批量生成脚本")
    print(f"🎙️  使用音色: {VOICE_TYPE}")
    print(f"⚡ 语速: {SPEED_RATIO}x")
    print()
    
    # 确保输出目录存在
    output_dir = Path(__file__).parent / "public" / "audio"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"📁 输出目录: {output_dir}")
    print()
    
    # 统计
    total_scenes = len(SCENE_SCRIPTS)
    success_count = 0
    failed_scenes = []
    total_duration = 0
    
    print(f"共 {total_scenes} 个分镜需要生成\n")
    
    # 逐个生成
    for idx, (scene_id, text) in enumerate(SCENE_SCRIPTS.items(), 1):
        print(f"[{idx}/{total_scenes}] 🎙️  {scene_id}")
        print(f"    文本: {text[:50]}{'...' if len(text) > 50 else ''}")
        
        # 检查是否已存在
        audio_path = output_dir / f"{scene_id}.mp3"
        metadata_path = output_dir / f"{scene_id}.json"
        
        if audio_path.exists() and metadata_path.exists():
            # 读取已存在的元数据
            with open(metadata_path, "r", encoding="utf-8") as f:
                metadata = json.load(f)
            print(f"    ⏭️  已存在 ({metadata['duration']:.2f}s, {metadata['duration_in_frames']} frames)")
            total_duration += metadata['duration']
            success_count += 1
            print()
            continue
        
        try:
            metadata = generate_tts(scene_id, text, output_dir)
            print(f"    ✅ 完成 ({metadata['duration']:.2f}s, {metadata['duration_in_frames']} frames)")
            total_duration += metadata['duration']
            success_count += 1
        except Exception as e:
            print(f"    ❌ 失败: {e}")
            failed_scenes.append(scene_id)
        
        print()
        
        # 添加延迟，避免请求过快
        time.sleep(0.5)
    
    # 输出汇总
    print("=" * 60)
    print("📊 生成汇总")
    print("=" * 60)
    print(f"成功: {success_count}/{total_scenes}")
    print(f"失败: {len(failed_scenes)}")
    
    if failed_scenes:
        print(f"\n失败的分镜:")
        for scene_id in failed_scenes:
            print(f"  - {scene_id}")
    
    print(f"\n⏱️  总时长: {total_duration:.2f} 秒 ({total_duration/60:.2f} 分钟)")
    print(f"🎬 总帧数 (30fps): {int(total_duration * 30)} 帧")
    
    # 生成时长配置文件供 Remotion 使用
    durations_config = {}
    for scene_id in SCENE_SCRIPTS.keys():
        metadata_path = output_dir / f"{scene_id}.json"
        if metadata_path.exists():
            with open(metadata_path, "r", encoding="utf-8") as f:
                metadata = json.load(f)
                durations_config[scene_id] = metadata["duration_in_frames"]
    
    config_path = output_dir / "durations.json"
    with open(config_path, "w", encoding="utf-8") as f:
        json.dump(durations_config, f, indent=2)
    
    print(f"\n💾 时长配置已保存: {config_path}")
    print("\n✨ 全部完成！")


if __name__ == "__main__":
    main()
