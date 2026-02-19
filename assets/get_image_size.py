#!/usr/bin/env python3
"""获取 assets 目录下所有图像的像素尺寸，导出为 Markdown。依赖: pip install Pillow"""
from pathlib import Path
from PIL import Image

assets_dir = Path(__file__).parent
out_path = assets_dir / "image_sizes.md"
rows = []
for path in sorted(assets_dir.glob("*")):
    if path.suffix.lower() in (".png", ".jpg", ".jpeg", ".gif", ".webp"):
        w, h = Image.open(path).size
        rows.append((path.name, w, h))
with open(out_path, "w", encoding="utf-8") as f:
    f.write("| 文件名 | 宽 | 高 |\n|--------|----|----|\n")
    for name, w, h in rows:
        f.write(f"| {name} | {w} | {h} |\n")
print(f"已导出到 {out_path}")
