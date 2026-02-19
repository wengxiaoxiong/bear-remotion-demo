# TTS 与字幕快速参考

## 🚀 快速配置

### 1. 复制环境变量模板

```bash
cp .env.example .env
```

### 2. 填写火山引擎凭证

编辑 `.env` 文件：

```bash
VOLCENGINE_APP_ID=你的AppID
VOLCENGINE_ACCESS_TOKEN=你的AccessToken
```

获取方式：https://www.volcengine.com/docs/6561/1598757

### 3. 生成 TTS

```bash
python3 generate_tts.py
```

## 📝 重新生成 TTS

```bash
# 1. 修改 generate_tts.py 中的 SCENE_SCRIPTS
# 2. 删除旧音频
rm -f public/audio/*.mp3 public/audio/*.json

# 3. 重新生成
python3 generate_tts.py

# 4. 如果时长变化，更新字幕分段配置
# 编辑 src/lib/subtitleSegments.ts
```

## 🎬 查看分镜时长

```bash
cat public/audio/durations.json
```

或在 `src/lib/durations.ts` 中查看。

## 📖 详细文档

查看 [README.md](./README.md) 获取完整工作流说明。
