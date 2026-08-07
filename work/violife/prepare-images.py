"""
Turn the supplied pack shots into transparent cutouts.

The backgrounds are a flat near-white, so a flood fill inwards from the
frame edge lifts them cleanly without touching the light areas *inside*
the product (the cream lettering, the pale cheese). A threshold over the
whole image would eat those.
"""

from PIL import Image, ImageFilter
from collections import deque
import sys, os

SRC = '/root/.claude/uploads/04e99792-c25a-5125-950a-8ea6e3ff7ee7'
OUT = '/home/user/Midastech/public/violife'


def cutout(path, tol=26, feather=1.1, precrop=None):
    im = Image.open(path).convert('RGBA')
    # Some sources are screenshots and carry UI furniture at the frame edge
    # (a scrollbar, a rule). The flood fill leaves those behind, and they
    # then dominate the bounding box, so trim them before filling.
    if precrop:
        im = im.crop(precrop)
    w, h = im.size
    px = im.load()

    # Seed from every border pixel, then flood inwards while the colour
    # stays within tolerance of the background it started from.
    seeds = []
    for x in range(w):
        seeds += [(x, 0), (x, h - 1)]
    for y in range(h):
        seeds += [(0, y), (w - 1, y)]

    bg = px[0, 0][:3]
    seen = bytearray(w * h)
    q = deque()
    for s in seeds:
        q.append(s)

    def near(c):
        return abs(c[0] - bg[0]) <= tol and abs(c[1] - bg[1]) <= tol and abs(c[2] - bg[2]) <= tol

    while q:
        x, y = q.popleft()
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        if not near(px[x, y][:3]):
            continue
        px[x, y] = (255, 255, 255, 0)
        if x > 0:
            q.append((x - 1, y))
        if x < w - 1:
            q.append((x + 1, y))
        if y > 0:
            q.append((x, y - 1))
        if y < h - 1:
            q.append((x, y + 1))

    # Soften the cut so the edge does not alias against a dark field.
    a = im.getchannel('A').filter(ImageFilter.GaussianBlur(feather))
    im.putalpha(a)

    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    return im


def save(im, name, box):
    im = im.copy()
    im.thumbnail(box, Image.LANCZOS)
    # Pad to a square so every pack occupies the same artboard and the grid
    # does not jump between a tall pouch and a wide tub.
    side = max(im.size)
    canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    canvas.paste(im, ((side - im.width) // 2, (side - im.height) // 2))
    p = os.path.join(OUT, name)
    canvas.save(p, 'WEBP', quality=88, method=6)
    print(f'{name}  {canvas.size}  {os.path.getsize(p)//1024}KB')


def photo(path, name, box, quality=80):
    im = Image.open(path).convert('RGB')
    im.thumbnail(box, Image.LANCZOS)
    p = os.path.join(OUT, name)
    im.save(p, 'WEBP', quality=quality, method=6)
    print(f'{name}  {im.size}  {os.path.getsize(p)//1024}KB')


os.makedirs(OUT, exist_ok=True)

save(cutout(f'{SRC}/66a9c477-IMG_8201.jpeg', precrop=(0, 0, 1265, 887)), 'pack-creamy-original.webp', (900, 900))
save(cutout(f'{SRC}/6ce32ce1-IMG_8203.jpeg'), 'pack-grated-original.webp', (900, 900))
save(cutout(f'{SRC}/96e1a42d-IMG_8204.webp'), 'pack-slices-gouda.webp', (900, 900))

save(cutout(f'{SRC}/17a21d84-IMG_8218.webp'), 'pack-block-feta.webp', (900, 900))
save(cutout(f'{SRC}/0031ffa4-IMG_8222.jpeg'), 'pack-block-parmesan.webp', (900, 900))

photo(f'{SRC}/56f9fe42-IMG_8199.webp', 'dish-greek-white-pizza.webp', (1100, 1100))
photo(f'{SRC}/400e6ba0-IMG_8200.jpeg', 'dish-greek-white-orzo.webp', (1600, 1600))

