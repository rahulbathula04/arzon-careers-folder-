import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Play, ExternalLink, Maximize2 } from "lucide-react";
import type { MediaAsset } from "@/data/credibility/institutionalActivities";

interface MediaLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaList: MediaAsset[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  contextTitle?: string;
}

export function MediaLightboxModal({
  isOpen,
  onClose,
  mediaList,
  currentIndex,
  onSelectIndex,
  contextTitle,
}: MediaLightboxModalProps) {
  const currentMedia = mediaList[currentIndex];

  const handlePrev = useCallback(() => {
    if (mediaList.length <= 1) return;
    onSelectIndex((currentIndex - 1 + mediaList.length) % mediaList.length);
  }, [currentIndex, mediaList.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (mediaList.length <= 1) return;
    onSelectIndex((currentIndex + 1) % mediaList.length);
  }, [currentIndex, mediaList.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentMedia) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentMedia.caption || "Media viewer"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#081F38]/90 backdrop-blur-md p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] bg-[#081F38] border border-[#2563EB]/30 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#081F38]/80 text-white">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#2563EB]/30 text-[#60A5FA] border border-[#2563EB]/40">
              {currentIndex + 1} / {mediaList.length}
            </span>
            <span className="text-xs sm:text-sm font-semibold truncate text-slate-200">
              {contextTitle || "Arzon Credibility Archive"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentMedia.externalArticleUrl && (
              <a
                href={currentMedia.externalArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-xs text-[#60A5FA] hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10 transition-colors"
                title="Open published article source"
              >
                <span>{currentMedia.externalPublisher || "Article Source"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close media viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Canvas */}
        <div className="relative flex-1 flex items-center justify-center min-h-[260px] sm:min-h-[420px] max-h-[68vh] bg-black/60 overflow-hidden">
          {currentMedia.type === "video" ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              {currentMedia.videoEmbedUrl ? (
                <div className="w-full h-full max-h-[500px] aspect-video">
                  <iframe
                    src={currentMedia.videoEmbedUrl}
                    title={currentMedia.caption}
                    className="w-full h-full rounded-lg border border-white/10"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative w-full max-h-[460px] flex items-center justify-center">
                  <img
                    src={currentMedia.url}
                    alt={currentMedia.caption}
                    className="max-h-[60vh] max-w-full object-contain rounded"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="p-4 rounded-full bg-[#2563EB] text-white shadow-lg">
                      <Play className="w-8 h-8 fill-current" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img
              src={currentMedia.url}
              alt={currentMedia.caption}
              className="max-h-[65vh] max-w-full object-contain select-none"
              loading="eager"
            />
          )}

          {/* Navigation Controls */}
          {mediaList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#081F38]/80 text-white border border-white/20 hover:bg-[#2563EB] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#081F38]/80 text-white border border-white/20 hover:bg-[#2563EB] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Caption & Metadata Footer */}
        <div className="px-4 py-3 bg-[#081F38] border-t border-white/10 text-slate-300">
          <p className="text-sm font-medium leading-relaxed text-white">
            {currentMedia.caption}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
            {currentMedia.videoDuration && (
              <span className="text-[#60A5FA] font-mono">
                Duration: {currentMedia.videoDuration}
              </span>
            )}
            {currentMedia.externalArticleUrl && (
              <a
                href={currentMedia.externalArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#60A5FA] hover:underline inline-flex items-center gap-1 sm:hidden"
              >
                <span>View Source Article</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
