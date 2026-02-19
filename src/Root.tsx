import React from 'react';
import { Composition, Folder } from 'remotion';
import {
  Scene01_Title,
  Scene02_Features,
  Scene03_TooMuchCode,
  Scene04_OnePercent,
  Scene05_NanoBotIntro,
  Scene06_ProactiveDemo,
  Scene07_CronVsAgent,
  Scene08_Question,
  Scene09_VsIntro,
  Scene10_11_Reasoning,
  Scene12_13_GitHubExample,
  Scene14_Summary1,
  Scene15_16_Proactive,
  Scene17_18_Extensible,
  Scene19_ThreePillars,
  Scene20_21_WorkspaceIntro,
  Scene22_WorkspaceDesk,
  Scene23_24_WorkspacePath,
  Scene26_Memory,
  Scene27_Skills,
  Scene28_Assemble,
  Scene29_WorkspaceSummary,
  Scene30_MessageLife,
  Scene31_Entry,
  Scene32_Session,
  Scene33_Context,
  Scene34_Loop,
  Scene35_Exit,
  Scene36_LoopHighlight,
  Scene37_UnifiedPipeline,
  Scene38_ReviewIntro,
  Scene39_FourPillars,
  Scene40_OnePercentSummary,
  Scene41_Preview,
} from './scenes';

// 帧率
const FPS = 30;

// 视频尺寸 (16:9)
const WIDTH = 1920;
const HEIGHT = 1080;

// 时长计算辅助函数
const seconds = (s: number) => s * FPS;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 完整的 EP1 视频 */}
      <Composition
        id="EP1"
        component={EP1Full}
        durationInFrames={seconds(515)} // 约 8:35
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 开场 Hook */}
      <Folder name="01-开场">
        <Composition
          id="Scene01-Title"
          component={Scene01_Title}
          durationInFrames={seconds(8)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene02-Features"
          component={Scene02_Features}
          durationInFrames={seconds(14)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene03-TooMuchCode"
          component={Scene03_TooMuchCode}
          durationInFrames={seconds(6)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene04-OnePercent"
          component={Scene04_OnePercent}
          durationInFrames={seconds(10)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene05-NanoBotIntro"
          component={Scene05_NanoBotIntro}
          durationInFrames={seconds(14)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene06-ProactiveDemo"
          component={Scene06_ProactiveDemo}
          durationInFrames={seconds(13)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene07-CronVsAgent"
          component={Scene07_CronVsAgent}
          durationInFrames={seconds(23)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* Agent vs ChatBot 对比 */}
      <Folder name="02-对比">
        <Composition
          id="Scene08-Question"
          component={Scene08_Question}
          durationInFrames={seconds(10)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene09-VsIntro"
          component={Scene09_VsIntro}
          durationInFrames={seconds(10)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene10-11-Reasoning"
          component={Scene10_11_Reasoning}
          durationInFrames={seconds(24)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene12-13-GitHubExample"
          component={Scene12_13_GitHubExample}
          durationInFrames={seconds(33)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene14-Summary1"
          component={Scene14_Summary1}
          durationInFrames={seconds(13)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene15-16-Proactive"
          component={Scene15_16_Proactive}
          durationInFrames={seconds(24)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene17-18-Extensible"
          component={Scene17_18_Extensible}
          durationInFrames={seconds(26)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene19-ThreePillars"
          component={Scene19_ThreePillars}
          durationInFrames={seconds(10)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* Workspace 工作区 */}
      <Folder name="03-Workspace">
        <Composition
          id="Scene20-21-WorkspaceIntro"
          component={Scene20_21_WorkspaceIntro}
          durationInFrames={seconds(22)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene22-WorkspaceDesk"
          component={Scene22_WorkspaceDesk}
          durationInFrames={seconds(14)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene23-24-WorkspacePath"
          component={Scene23_24_WorkspacePath}
          durationInFrames={seconds(36)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene26-Memory"
          component={Scene26_Memory}
          durationInFrames={seconds(20)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene27-Skills"
          component={Scene27_Skills}
          durationInFrames={seconds(8)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene28-Assemble"
          component={Scene28_Assemble}
          durationInFrames={seconds(16)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene29-WorkspaceSummary"
          component={Scene29_WorkspaceSummary}
          durationInFrames={seconds(10)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* 消息生命周期 */}
      <Folder name="04-消息生命周期">
        <Composition
          id="Scene30-MessageLife"
          component={Scene30_MessageLife}
          durationInFrames={seconds(13)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene31-Entry"
          component={Scene31_Entry}
          durationInFrames={seconds(10)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene32-Session"
          component={Scene32_Session}
          durationInFrames={seconds(9)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene33-Context"
          component={Scene33_Context}
          durationInFrames={seconds(18)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene34-Loop"
          component={Scene34_Loop}
          durationInFrames={seconds(18)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene35-Exit"
          component={Scene35_Exit}
          durationInFrames={seconds(6)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene36-LoopHighlight"
          component={Scene36_LoopHighlight}
          durationInFrames={seconds(12)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene37-UnifiedPipeline"
          component={Scene37_UnifiedPipeline}
          durationInFrames={seconds(17)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* 回顾与预告 */}
      <Folder name="05-回顾预告">
        <Composition
          id="Scene38-ReviewIntro"
          component={Scene38_ReviewIntro}
          durationInFrames={seconds(3)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene39-FourPillars"
          component={Scene39_FourPillars}
          durationInFrames={seconds(20)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene40-OnePercentSummary"
          component={Scene40_OnePercentSummary}
          durationInFrames={seconds(6)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Scene41-Preview"
          component={Scene41_Preview}
          durationInFrames={seconds(21)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>
    </>
  );
};

// 完整的 EP1 视频组件
import { Series } from 'remotion';

const EP1Full: React.FC = () => {
  return (
    <Series>
      {/* 开场 Hook */}
      <Series.Sequence durationInFrames={seconds(8)}>
        <Scene01_Title />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(14)}>
        <Scene02_Features />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(6)}>
        <Scene03_TooMuchCode />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(10)}>
        <Scene04_OnePercent />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(14)}>
        <Scene05_NanoBotIntro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(13)}>
        <Scene06_ProactiveDemo />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(23)}>
        <Scene07_CronVsAgent />
      </Series.Sequence>

      {/* Agent vs ChatBot 对比 */}
      <Series.Sequence durationInFrames={seconds(10)}>
        <Scene08_Question />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(10)}>
        <Scene09_VsIntro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(24)}>
        <Scene10_11_Reasoning />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(33)}>
        <Scene12_13_GitHubExample />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(13)}>
        <Scene14_Summary1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(24)}>
        <Scene15_16_Proactive />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(26)}>
        <Scene17_18_Extensible />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(10)}>
        <Scene19_ThreePillars />
      </Series.Sequence>

      {/* Workspace 工作区 */}
      <Series.Sequence durationInFrames={seconds(22)}>
        <Scene20_21_WorkspaceIntro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(14)}>
        <Scene22_WorkspaceDesk />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(36)}>
        <Scene23_24_WorkspacePath />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(20)}>
        <Scene26_Memory />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(8)}>
        <Scene27_Skills />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(16)}>
        <Scene28_Assemble />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(10)}>
        <Scene29_WorkspaceSummary />
      </Series.Sequence>

      {/* 消息生命周期 */}
      <Series.Sequence durationInFrames={seconds(13)}>
        <Scene30_MessageLife />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(10)}>
        <Scene31_Entry />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(9)}>
        <Scene32_Session />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(18)}>
        <Scene33_Context />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(18)}>
        <Scene34_Loop />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(6)}>
        <Scene35_Exit />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(12)}>
        <Scene36_LoopHighlight />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(17)}>
        <Scene37_UnifiedPipeline />
      </Series.Sequence>

      {/* 回顾与预告 */}
      <Series.Sequence durationInFrames={seconds(3)}>
        <Scene38_ReviewIntro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(20)}>
        <Scene39_FourPillars />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(6)}>
        <Scene40_OnePercentSummary />
      </Series.Sequence>
      <Series.Sequence durationInFrames={seconds(21)}>
        <Scene41_Preview />
      </Series.Sequence>
    </Series>
  );
};
