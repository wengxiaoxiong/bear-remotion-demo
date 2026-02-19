// 字体加载配置
import { loadFont } from '@remotion/google-fonts/Inter';

// 加载 Inter 字体
export const { fontFamily } = loadFont('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

// 代码字体使用系统字体
export const codeFontFamily =
  '"JetBrains Mono", "Fira Code", "Source Code Pro", monospace';
