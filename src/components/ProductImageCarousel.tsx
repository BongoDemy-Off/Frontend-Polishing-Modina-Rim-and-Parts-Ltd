import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageCarouselProps {
  productId: number;
  productName: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
}

export function ProductImageCarousel({
  productId,
  productName,
  imageWidth = 600,
  imageHeight = 400,
  imageClassName = ""
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images = [
    `https://picsum.photos/seed/modina-${productId}-v2-1/${imageWidth}/${imageHeight}`,
    `https://picsum.photos/seed/modina-${productId}-v2-2/${imageWidth}/${imageHeight}`,
    `https://picsum.photos/seed/modina-${productId}-v2-3/${imageWidth}/${imageHeight}`,
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newDirection = index > currentIndex ? 1 : -1;
    if (index !== currentIndex) {
      setDirection(newDirection);
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative w-full h-full group/carousel overflow-hidden bg-modina-bg-alt">
      {/* Image Wrapper for Scaling without affecting controls */}
      <div className={`w-full h-full ${imageClassName}`}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${productName} view ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={(e) => paginate(-1, e)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur border border-modina-border/50 text-modina-heading flex items-center justify-center shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white hover:text-modina-red z-10 focus:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={(e) => paginate(1, e)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur border border-modina-border/50 text-modina-heading flex items-center justify-center shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white hover:text-modina-red z-10 focus:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => handleDotClick(idx, e)}
            className={`transition-all duration-300 rounded-full shadow-sm ${
              currentIndex === idx 
                ? "bg-white w-4 h-1.5 opacity-100" 
                : "bg-white/70 w-1.5 h-1.5 opacity-50 hover:opacity-100 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
