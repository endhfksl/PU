import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

export function ImageModal({ isOpen, onClose, images, initialIndex = 0 }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when modal opens with new images
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen) return null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getLabel = (index: number) => {
    switch (index) {
      case 0: return '기본 / 통상';
      case 1: return '흡연 / 일탈';
      case 2: return '탈의 / 은밀함';
      default: return `이미지 ${index + 1}`;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-xl p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full h-full max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 md:-top-10 md:-right-10 text-slate-400 hover:text-white transition-colors bg-black/50 md:bg-transparent rounded-full z-10"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center group">
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 md:-left-12 p-3 text-slate-300 hover:text-white bg-black/50 hover:bg-indigo-600/80 rounded-full transition-all backdrop-blur-md z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          <div className="relative h-full flex flex-col items-center justify-center w-full">
            <div className="relative w-full h-full min-h-[50vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`Preview ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  // Fallback if image doesn't exist (e.g. placeholder)
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x1200/1a1a2e/ffffff?text=Image+Not+Found';
                }}
              />
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/70 backdrop-blur-md rounded-full text-sm font-medium text-slate-200 tracking-wider">
              {currentIndex + 1} / {images.length} — {getLabel(currentIndex)}
            </div>
          </div>

          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 md:-right-12 p-3 text-slate-300 hover:text-white bg-black/50 hover:bg-indigo-600/80 rounded-full transition-all backdrop-blur-md z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
