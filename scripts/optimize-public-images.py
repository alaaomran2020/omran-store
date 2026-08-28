from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public"

for path in sorted(ROOT.rglob("*")):
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    original = path.read_bytes()
    temp = path.with_suffix(path.suffix + ".optimized")
    with Image.open(path) as image:
        if path.suffix.lower() == ".png":
            image.save(temp, format="PNG", optimize=True, compress_level=9)
        else:
            rgb = image.convert("RGB") if image.mode not in {"RGB", "L"} else image
            rgb.save(temp, format="JPEG", quality=90, optimize=True, progressive=True)
    optimized = temp.read_bytes()
    if len(optimized) < len(original):
        path.write_bytes(optimized)
        print(f"optimized {path.relative_to(ROOT)}: {len(original)} -> {len(optimized)} bytes")
    else:
        print(f"kept {path.relative_to(ROOT)}: {len(original)} bytes")
    temp.unlink()
