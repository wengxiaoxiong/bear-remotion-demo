import React from 'react';
import { Composition, Folder, Audio, staticFile, Series } from 'remotion';
import {
  Scene00_Intro,
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
import { Subtitle } from './components';
import { SCENE_SCRIPTS } from './lib/sceneScripts';
import { getSceneSubtitleSegments } from './lib/subtitleSegments';
import { 
  DEFAULT_DURATIONS, 
  TOTAL_DURATION_FRAMES, 
  FPS, 
  WIDTH, 
  HEIGHT 
} from './lib/durations';

/**
 * 带音频和字幕的场景包装组件
 * 优先使用分段字幕配置，如果没有则使用完整字幕文本
 */
const SceneWithAudio: React.FC<{
  sceneId: string;
  children: React.ReactNode;
  showSubtitle?: boolean;
}> = ({ sceneId, children, showSubtitle = true }) => {
  const audioSrc = staticFile(`audio/${sceneId}.mp3`);
  const subtitleText = SCENE_SCRIPTS[sceneId] || '';
  const segments = getSceneSubtitleSegments(sceneId);
  
  return (
    <>
      <Audio src={audioSrc} />
      {children}
      {showSubtitle && (
        <Subtitle 
          text={subtitleText} 
          segments={segments || undefined}
          highlightWords={false} 
        />
      )}
    </>
  );
};

// ==================== 带音频的场景组件 ====================

const Scene00_Intro_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene00-Intro"><Scene00_Intro /></SceneWithAudio>
);

const Scene01_Title_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene01-Title"><Scene01_Title /></SceneWithAudio>
);

const Scene02_Features_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene02-Features"><Scene02_Features /></SceneWithAudio>
);

const Scene03_TooMuchCode_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene03-TooMuchCode"><Scene03_TooMuchCode /></SceneWithAudio>
);

const Scene04_OnePercent_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene04-OnePercent"><Scene04_OnePercent /></SceneWithAudio>
);

const Scene05_NanoBotIntro_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene05-NanoBotIntro"><Scene05_NanoBotIntro /></SceneWithAudio>
);

const Scene06_ProactiveDemo_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene06-ProactiveDemo"><Scene06_ProactiveDemo /></SceneWithAudio>
);

const Scene07_CronVsAgent_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene07-CronVsAgent"><Scene07_CronVsAgent /></SceneWithAudio>
);

const Scene08_Question_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene08-Question"><Scene08_Question /></SceneWithAudio>
);

const Scene09_VsIntro_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene09-VsIntro"><Scene09_VsIntro /></SceneWithAudio>
);

const Scene10_11_Reasoning_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene10-11-Reasoning"><Scene10_11_Reasoning /></SceneWithAudio>
);

const Scene12_13_GitHubExample_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene12-13-GitHubExample"><Scene12_13_GitHubExample /></SceneWithAudio>
);

const Scene14_Summary1_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene14-Summary1"><Scene14_Summary1 /></SceneWithAudio>
);

const Scene15_16_Proactive_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene15-16-Proactive"><Scene15_16_Proactive /></SceneWithAudio>
);

const Scene17_18_Extensible_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene17-18-Extensible"><Scene17_18_Extensible /></SceneWithAudio>
);

const Scene19_ThreePillars_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene19-ThreePillars"><Scene19_ThreePillars /></SceneWithAudio>
);

const Scene20_21_WorkspaceIntro_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene20-21-WorkspaceIntro"><Scene20_21_WorkspaceIntro /></SceneWithAudio>
);

const Scene22_WorkspaceDesk_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene22-WorkspaceDesk"><Scene22_WorkspaceDesk /></SceneWithAudio>
);

const Scene23_24_WorkspacePath_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene23-24-WorkspacePath"><Scene23_24_WorkspacePath /></SceneWithAudio>
);

const Scene26_Memory_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene26-Memory"><Scene26_Memory /></SceneWithAudio>
);

const Scene27_Skills_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene27-Skills"><Scene27_Skills /></SceneWithAudio>
);

const Scene28_Assemble_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene28-Assemble"><Scene28_Assemble /></SceneWithAudio>
);

const Scene29_WorkspaceSummary_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene29-WorkspaceSummary"><Scene29_WorkspaceSummary /></SceneWithAudio>
);

const Scene30_MessageLife_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene30-MessageLife"><Scene30_MessageLife /></SceneWithAudio>
);

const Scene31_Entry_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene31-Entry"><Scene31_Entry /></SceneWithAudio>
);

const Scene32_Session_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene32-Session"><Scene32_Session /></SceneWithAudio>
);

const Scene33_Context_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene33-Context"><Scene33_Context /></SceneWithAudio>
);

const Scene34_Loop_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene34-Loop"><Scene34_Loop /></SceneWithAudio>
);

const Scene35_Exit_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene35-Exit"><Scene35_Exit /></SceneWithAudio>
);

const Scene36_LoopHighlight_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene36-LoopHighlight"><Scene36_LoopHighlight /></SceneWithAudio>
);

const Scene37_UnifiedPipeline_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene37-UnifiedPipeline"><Scene37_UnifiedPipeline /></SceneWithAudio>
);

const Scene38_ReviewIntro_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene38-ReviewIntro"><Scene38_ReviewIntro /></SceneWithAudio>
);

const Scene39_FourPillars_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene39-FourPillars"><Scene39_FourPillars /></SceneWithAudio>
);

const Scene40_OnePercentSummary_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene40-OnePercentSummary"><Scene40_OnePercentSummary /></SceneWithAudio>
);

const Scene41_Preview_WithAudio: React.FC = () => (
  <SceneWithAudio sceneId="Scene41-Preview"><Scene41_Preview /></SceneWithAudio>
);

// ==================== Root 组件 ====================

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 完整的 EP1 视频（带音频和字幕） */}
      <Composition
        id="EP1"
        component={EP1Full}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 完整的 EP1 视频（无音频，用于单独预览） */}
      <Composition
        id="EP1-NoAudio"
        component={EP1FullNoAudio}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 开场 Hook */}
      <Folder name="00-片头">
        <Composition id="Scene00-Intro" component={Scene00_Intro_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene00-Intro']} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>

      <Folder name="01-开场">
        <Composition id="Scene01-Title" component={Scene01_Title_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene01-Title']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene02-Features" component={Scene02_Features_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene02-Features']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene03-TooMuchCode" component={Scene03_TooMuchCode_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene03-TooMuchCode']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene04-OnePercent" component={Scene04_OnePercent_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene04-OnePercent']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene05-NanoBotIntro" component={Scene05_NanoBotIntro_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene05-NanoBotIntro']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene06-ProactiveDemo" component={Scene06_ProactiveDemo_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene06-ProactiveDemo']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene07-CronVsAgent" component={Scene07_CronVsAgent_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene07-CronVsAgent']} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>

      {/* Agent vs ChatBot 对比 */}
      <Folder name="02-对比">
        <Composition id="Scene08-Question" component={Scene08_Question_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene08-Question']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene09-VsIntro" component={Scene09_VsIntro_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene09-VsIntro']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene10-11-Reasoning" component={Scene10_11_Reasoning_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene10-11-Reasoning']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene12-13-GitHubExample" component={Scene12_13_GitHubExample_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene12-13-GitHubExample']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene14-Summary1" component={Scene14_Summary1_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene14-Summary1']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene15-16-Proactive" component={Scene15_16_Proactive_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene15-16-Proactive']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene17-18-Extensible" component={Scene17_18_Extensible_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene17-18-Extensible']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene19-ThreePillars" component={Scene19_ThreePillars_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene19-ThreePillars']} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>

      {/* Workspace 工作区 */}
      <Folder name="03-Workspace">
        <Composition id="Scene20-21-WorkspaceIntro" component={Scene20_21_WorkspaceIntro_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene20-21-WorkspaceIntro']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene22-WorkspaceDesk" component={Scene22_WorkspaceDesk_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene22-WorkspaceDesk']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene23-24-WorkspacePath" component={Scene23_24_WorkspacePath_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene23-24-WorkspacePath']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene26-Memory" component={Scene26_Memory_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene26-Memory']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene27-Skills" component={Scene27_Skills_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene27-Skills']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene28-Assemble" component={Scene28_Assemble_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene28-Assemble']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene29-WorkspaceSummary" component={Scene29_WorkspaceSummary_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene29-WorkspaceSummary']} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>

      {/* 消息生命周期 */}
      <Folder name="04-消息生命周期">
        <Composition id="Scene30-MessageLife" component={Scene30_MessageLife_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene30-MessageLife']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene31-Entry" component={Scene31_Entry_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene31-Entry']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene32-Session" component={Scene32_Session_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene32-Session']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene33-Context" component={Scene33_Context_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene33-Context']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene34-Loop" component={Scene34_Loop_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene34-Loop']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene35-Exit" component={Scene35_Exit_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene35-Exit']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene36-LoopHighlight" component={Scene36_LoopHighlight_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene36-LoopHighlight']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene37-UnifiedPipeline" component={Scene37_UnifiedPipeline_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene37-UnifiedPipeline']} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>

      {/* 回顾与预告 */}
      <Folder name="05-回顾预告">
        <Composition id="Scene38-ReviewIntro" component={Scene38_ReviewIntro_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene38-ReviewIntro']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene39-FourPillars" component={Scene39_FourPillars_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene39-FourPillars']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene40-OnePercentSummary" component={Scene40_OnePercentSummary_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene40-OnePercentSummary']} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Scene41-Preview" component={Scene41_Preview_WithAudio} durationInFrames={DEFAULT_DURATIONS['Scene41-Preview']} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>
    </>
  );
};

// ==================== 完整的 EP1 视频组件（带音频） ====================

const EP1Full: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene00-Intro']}><Scene00_Intro_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene01-Title']}><Scene01_Title_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene02-Features']}><Scene02_Features_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene03-TooMuchCode']}><Scene03_TooMuchCode_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene04-OnePercent']}><Scene04_OnePercent_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene05-NanoBotIntro']}><Scene05_NanoBotIntro_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene06-ProactiveDemo']}><Scene06_ProactiveDemo_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene07-CronVsAgent']}><Scene07_CronVsAgent_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene08-Question']}><Scene08_Question_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene09-VsIntro']}><Scene09_VsIntro_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene10-11-Reasoning']}><Scene10_11_Reasoning_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene12-13-GitHubExample']}><Scene12_13_GitHubExample_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene14-Summary1']}><Scene14_Summary1_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene15-16-Proactive']}><Scene15_16_Proactive_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene17-18-Extensible']}><Scene17_18_Extensible_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene19-ThreePillars']}><Scene19_ThreePillars_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene20-21-WorkspaceIntro']}><Scene20_21_WorkspaceIntro_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene22-WorkspaceDesk']}><Scene22_WorkspaceDesk_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene23-24-WorkspacePath']}><Scene23_24_WorkspacePath_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene26-Memory']}><Scene26_Memory_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene27-Skills']}><Scene27_Skills_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene28-Assemble']}><Scene28_Assemble_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene29-WorkspaceSummary']}><Scene29_WorkspaceSummary_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene30-MessageLife']}><Scene30_MessageLife_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene31-Entry']}><Scene31_Entry_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene32-Session']}><Scene32_Session_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene33-Context']}><Scene33_Context_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene34-Loop']}><Scene34_Loop_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene35-Exit']}><Scene35_Exit_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene36-LoopHighlight']}><Scene36_LoopHighlight_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene37-UnifiedPipeline']}><Scene37_UnifiedPipeline_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene38-ReviewIntro']}><Scene38_ReviewIntro_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene39-FourPillars']}><Scene39_FourPillars_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene40-OnePercentSummary']}><Scene40_OnePercentSummary_WithAudio /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene41-Preview']}><Scene41_Preview_WithAudio /></Series.Sequence>
    </Series>
  );
};

// ==================== 完整的 EP1 视频组件（无音频，用于预览） ====================

const EP1FullNoAudio: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene00-Intro']}><Scene00_Intro /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene01-Title']}><Scene01_Title /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene02-Features']}><Scene02_Features /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene03-TooMuchCode']}><Scene03_TooMuchCode /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene04-OnePercent']}><Scene04_OnePercent /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene05-NanoBotIntro']}><Scene05_NanoBotIntro /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene06-ProactiveDemo']}><Scene06_ProactiveDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene07-CronVsAgent']}><Scene07_CronVsAgent /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene08-Question']}><Scene08_Question /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene09-VsIntro']}><Scene09_VsIntro /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene10-11-Reasoning']}><Scene10_11_Reasoning /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene12-13-GitHubExample']}><Scene12_13_GitHubExample /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene14-Summary1']}><Scene14_Summary1 /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene15-16-Proactive']}><Scene15_16_Proactive /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene17-18-Extensible']}><Scene17_18_Extensible /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene19-ThreePillars']}><Scene19_ThreePillars /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene20-21-WorkspaceIntro']}><Scene20_21_WorkspaceIntro /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene22-WorkspaceDesk']}><Scene22_WorkspaceDesk /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene23-24-WorkspacePath']}><Scene23_24_WorkspacePath /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene26-Memory']}><Scene26_Memory /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene27-Skills']}><Scene27_Skills /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene28-Assemble']}><Scene28_Assemble /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene29-WorkspaceSummary']}><Scene29_WorkspaceSummary /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene30-MessageLife']}><Scene30_MessageLife /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene31-Entry']}><Scene31_Entry /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene32-Session']}><Scene32_Session /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene33-Context']}><Scene33_Context /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene34-Loop']}><Scene34_Loop /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene35-Exit']}><Scene35_Exit /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene36-LoopHighlight']}><Scene36_LoopHighlight /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene37-UnifiedPipeline']}><Scene37_UnifiedPipeline /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene38-ReviewIntro']}><Scene38_ReviewIntro /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene39-FourPillars']}><Scene39_FourPillars /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene40-OnePercentSummary']}><Scene40_OnePercentSummary /></Series.Sequence>
      <Series.Sequence durationInFrames={DEFAULT_DURATIONS['Scene41-Preview']}><Scene41_Preview /></Series.Sequence>
    </Series>
  );
};
