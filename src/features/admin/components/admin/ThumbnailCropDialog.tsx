import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

/**
 * In-browser 16:9 crop step. Receives a File, returns a Blob (JPEG by default,
 * PNG when source has transparency) sized to a standard target width so every
 * uploaded thumbnail ships at the same dimensions.
 */

const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 720; // 16:9
const ASPECT = TARGET_WIDTH / TARGET_HEIGHT;

export interface ThumbnailCropResult {
  blob: Blob;
  contentType: "image/jpeg" | "image/png";
  ext: "jpg" | "png";
}

export function ThumbnailCropDialog({
  open,
  file,
  title,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  file: File | null;
  title: string;
  onCancel: () => void;
  onConfirm: (result: ThumbnailCropResult) => void;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);

  // Build/cleanup object URL for the source file.
  useEffect(() => {
    if (!file) {
      setImageUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setPixels(null);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setPixels(areaPixels);
  }, []);

  async function handleConfirm() {
    if (!imageUrl || !pixels || !file) return;
    setBusy(true);
    try {
      const result = await renderCroppedImage(imageUrl, pixels, file.type);
      onConfirm(result);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onCancel();
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crop thumbnail · {title}</DialogTitle>
          <DialogDescription>
            Drag to reposition, use the slider to zoom. Output is locked to 16:9 at {TARGET_WIDTH}×
            {TARGET_HEIGHT}.
          </DialogDescription>
        </DialogHeader>

        <div className="relative h-[360px] w-full overflow-hidden rounded-lg bg-[#0a0c10]">
          {imageUrl && (
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={ASPECT}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              objectFit="contain"
              showGrid
            />
          )}
        </div>

        <div className="flex items-center gap-3 px-1">
          <span className="font-mono text-micro uppercase tracking-wider text-muted-foreground">
            Zoom
          </span>
          <Slider
            value={[zoom]}
            min={1}
            max={4}
            step={0.05}
            onValueChange={(v) => setZoom(v[0] ?? 1)}
            className="flex-1"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={busy || !pixels}>
            {busy ? "Processing…" : "Use this crop"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

async function renderCroppedImage(
  imageUrl: string,
  pixels: Area,
  sourceType: string,
): Promise<ThumbnailCropResult> {
  const image = await loadImage(imageUrl);
  const canvas = document.createElement("canvas");
  canvas.width = TARGET_WIDTH;
  canvas.height = TARGET_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    image,
    pixels.x,
    pixels.y,
    pixels.width,
    pixels.height,
    0,
    0,
    TARGET_WIDTH,
    TARGET_HEIGHT,
  );

  // Preserve PNG only when the source was PNG (potentially transparent);
  // otherwise emit JPEG for smaller files.
  const usePng = sourceType === "image/png";
  const contentType: "image/jpeg" | "image/png" = usePng ? "image/png" : "image/jpeg";
  const quality = usePng ? undefined : 0.9;

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Canvas export failed"))),
      contentType,
      quality,
    );
  });

  return { blob, contentType, ext: usePng ? "png" : "jpg" };
}
