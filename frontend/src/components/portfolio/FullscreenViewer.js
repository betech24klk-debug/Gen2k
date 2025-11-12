import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Play, Pause } from 'lucide-react';

const FullscreenViewer = ({ project, initialImageIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isIdle, setIsIdle] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [initialPinchDistance, setInitialPinchDistance] = useState(null);
  
  const idleTimerRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const imageRef = useRef(null);

  const images = project.images || [];
  const currentImage = images[currentIndex];

  // Auto-hide controls on idle
  const resetIdleTimer = useCallback(() => {
    setControlsVisible(true);
    setIsIdle(false);
    
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    
    idleTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
      setIsIdle(true);
    }, 3000);
  }, []);

  // Handle mouse/touch movement for auto-hide
  useEffect(() => {
    const handleActivity = () => resetIdleTimer();
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('keydown', handleActivity);
    
    resetIdleTimer();
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  // Auto slideshow after idle (only when not manually navigating)
  useEffect(() => {
    if (isIdle && !isPlaying && images.length > 1) {
      autoPlayTimerRef.current = setTimeout(() => {
        setIsPlaying(true);
      }, 5000);
    }
    
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isIdle, isPlaying, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Slideshow
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  // Preload adjacent images
  useEffect(() => {
    const preloadImages = () => {
      const indicesToPreload = [
        (currentIndex + 1) % images.length,
        (currentIndex + 2) % images.length,
        (currentIndex - 1 + images.length) % images.length
      ];
      
      indicesToPreload.forEach(idx => {
        if (images[idx]) {
          const img = new Image();
          img.src = images[idx].url;
        }
      });
    };
    preloadImages();
  }, [currentIndex, images]);

  // Reset zoom and position on image change
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setImageLoaded(false);
    setImageProgress(0);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsPlaying(false);
    resetIdleTimer();
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsPlaying(false);
    resetIdleTimer();
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 0.5, 1);
    setZoom(newZoom);
    if (newZoom <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleDoubleClick = () => {
    if (zoom > 1) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setZoom(2);
    }
  };

  // Pan boundaries calculation
  const constrainPosition = (newPos, currentZoom) => {
    if (currentZoom <= 1) return { x: 0, y: 0 };
    
    const imageElement = imageRef.current;
    if (!imageElement) return newPos;
    
    const maxX = (imageElement.offsetWidth * (currentZoom - 1)) / 2;
    const maxY = (imageElement.offsetHeight * (currentZoom - 1)) / 2;
    
    return {
      x: Math.max(-maxX, Math.min(maxX, newPos.x)),
      y: Math.max(-maxY, Math.min(maxY, newPos.y))
    };
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      const newPos = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      setPosition(constrainPosition(newPos, zoom));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handling for pinch zoom
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setInitialPinchDistance(getTouchDistance(e.touches));
    } else if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialPinchDistance) {
      const currentDistance = getTouchDistance(e.touches);
      const scale = currentDistance / initialPinchDistance;
      const newZoom = Math.max(1, Math.min(3, zoom * scale));
      setZoom(newZoom);
      setInitialPinchDistance(currentDistance);
    } else if (e.touches.length === 1 && isDragging && zoom > 1) {
      const newPos = {
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      };
      setPosition(constrainPosition(newPos, zoom));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setInitialPinchDistance(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      style={{ 
        animation: 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: controlsVisible ? 'default' : 'none'
      }}
    >
      {/* Controls with auto-hide */}
      <div
        className={`absolute top-6 right-6 z-10 transition-all duration-500 ${
          controlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <button
          onClick={onClose}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Close viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Zoom and Play controls */}
      <div
        className={`absolute top-6 left-6 z-10 flex items-center gap-3 transition-all duration-500 ${
          controlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className={`absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-500 hover:scale-110 ${
              controlsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className={`absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-500 hover:scale-110 ${
              controlsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image container */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* Loading indicator */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            {imageProgress > 0 && imageProgress < 100 && (
              <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${imageProgress}%` }}
                />
              </div>
            )}
          </div>
        )}
        
        {/* Image with scale-and-fade animation */}
        <img
          ref={imageRef}
          src={currentImage?.url}
          alt={currentImage?.caption || project.title}
          className={`max-w-[90vw] max-h-[90vh] object-contain transition-all select-none ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-out'
          }}
          onLoad={() => {
            setImageLoaded(true);
            setImageProgress(100);
          }}
          draggable={false}
        />
      </div>

      {/* Caption and counter */}
      <div
        className={`absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-2 px-6 transition-all duration-500 ${
          controlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {currentImage?.caption && (
          <p className="text-white text-center text-lg font-medium bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full max-w-2xl">
            {currentImage.caption}
          </p>
        )}
        <div className="text-white/80 text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default FullscreenViewer;
