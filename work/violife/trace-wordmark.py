"""
Trace the Violife wordmark to vector.

No supplied photograph carries the mark at more than about 230px wide, so
any raster version is upscaled the moment it is shown at a useful size —
which is exactly the softness in the picker. Tracing removes the
resolution ceiling.

Order of operations matters. Masking has to happen at native resolution
and the *mask* gets upscaled, not the photograph: resampling colour first
makes Lanczos ring at the high-contrast edges of the cyan line, and the
overshoot lands in the white mask as a halo around every glyph.

The script and the cyan line are separate colours, so they are masked
exclusively, traced separately, and recombined as two paths.
"""

import os

import numpy as np
import potrace
from PIL import Image

SRC = '/root/.claude/uploads/04e99792-c25a-5125-950a-8ea6e3ff7ee7/6ce32ce1-IMG_8203.jpeg'
OUT = '/home/user/Midastech/public/violife/violife-wordmark.svg'
BOX = (378, 248, 612, 374)
UP = 8  # mask upsample: buys the tracer sub-pixel accuracy on 20px-tall text

CYAN = '#42C6D2'


def coverage(img, tol=90.0):
    """
    Continuous ink coverage per colour, 0..1 — not a binary mask.

    A binary mask thrown away at native resolution takes the sub-pixel edge
    position with it, and upscaling it afterwards can only produce stair
    steps on the original pixel grid. Antialiased coverage keeps that
    information, so the threshold after upscaling lands where the real edge
    was rather than on a pixel boundary.
    """
    a = np.asarray(img).astype(np.float32)
    bg = np.median(np.concatenate([a[:3].reshape(-1, 3), a[-3:].reshape(-1, 3)]), axis=0)
    ink = np.clip(np.abs(a - bg).max(axis=2) / tol, 0, 1)
    # White has r == g; cyan has g far above r. Everything between is an edge.
    cyanness = np.clip((a[..., 1] - a[..., 0]) / 70.0, 0, 1)
    return ink * (1 - cyanness), ink * cyanness


def upscale(cov, k=UP):
    """Resample the coverage, then threshold at half. Edges land sub-pixel."""
    im = Image.fromarray((cov * 255).astype(np.uint8))
    im = im.resize((im.width * k, im.height * k), Image.BICUBIC)
    return np.asarray(im).astype(np.float32) / 255 > 0.5


def pt(p):
    """potracer points expose .x/.y rather than unpacking."""
    return f'{p.x:.1f} {p.y:.1f}'


def to_path(mask, turd):
    # potracer reads the array as a greyscale image where DARK is ink, not
    # as a boolean mask — hand it a bool array and it traces the whole frame.
    bmp = potrace.Bitmap(np.where(mask, 0, 255).astype(np.uint8))
    path = bmp.trace(turdsize=turd, alphamax=1.0, opticurve=True, opttolerance=0.2)
    out = []
    for curve in path:
        d = [f'M{pt(curve.start_point)}']
        for seg in curve.segments:
            if seg.is_corner:
                d.append(f'L{pt(seg.c)}L{pt(seg.end_point)}')
            else:
                d.append(f'C{pt(seg.c1)} {pt(seg.c2)} {pt(seg.end_point)}')
        d.append('Z')
        out.append(''.join(d))
    return ' '.join(out)


img = Image.open(SRC).convert('RGB').crop(BOX)
white_n, cyan_n = coverage(img)
white, cyan = upscale(white_n), upscale(cyan_n)
h, w = white.shape

print(f'source {img.width}x{img.height} -> traced at {w}x{h}')
print(f'white px {white.sum():,}  cyan px {cyan.sum():,}')

# turdsize drops specks; scale it with the upsample or it deletes nothing.
d_white = to_path(white, turd=UP * UP * 2)
d_cyan = to_path(cyan, turd=UP * UP)

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="Violife">'
    f'<path fill="#FFFFFF" fill-rule="evenodd" d="{d_white}"/>'
    f'<path fill="{CYAN}" fill-rule="evenodd" d="{d_cyan}"/>'
    f'</svg>\n'
)
open(OUT, 'w').write(svg)
print(f'{OUT}  {os.path.getsize(OUT) // 1024}KB')
