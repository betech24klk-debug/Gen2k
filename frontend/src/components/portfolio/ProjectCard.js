import React, { useState, useEffect, useRef } from 'react';
import { Images } from 'lucide-react';

const ProjectCard = ({ project, onClick, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const images = project.images || [];
  const currentImage = images[currentImageIndex] || {};
  const thumbnailOrientation = images[0]?.orientation || 'landscape';
  const currentOrientation = currentImage.orientation || 'landscape';
  
  // Detect if current image orientation differs from thumbnail
  const isMixedOrientation = thumbnailOrientation !== currentOrientation;

  // Calculate image dimensions for soft fade effect
  useEffect(() => {
    if (imgRef.current) {
      const updateDimensions = () => {
        if (imgRef.current) {
          setDimensions({
            width: imgRef.current.naturalWidth,
            height: imgRef.current.naturalHeight
          });
        }
      };
      
      if (imgRef.current.complete) {
        updateDimensions();
      } else {
        imgRef.current.addEventListener('load', updateDimensions);
        return () => {
          if (imgRef.current) {
            imgRef.current.removeEventListener('load', updateDimensions);
          }
        };
      }
    }
  }, [currentImageIndex]);

  // Handle hover/long-press image preview
  useEffect(() => {
    if (isHovered && images.length > 1) {
      timeoutRef.current = setTimeout(() => {
        setPreviewMode(true);
        let index = 0;
        intervalRef.current = setInterval(() => {
          index = (index + 1) % images.length;
          setCurrentImageIndex(index);
        }, 1400);
      }, 700);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPreviewMode(false);
      setCurrentImageIndex(0);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, images.length]);

  // Preload next image
  useEffect(() => {
    if (images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % images.length;
      const img = new Image();
      img.src = images[nextIndex]?.url;
    }
  }, [currentImageIndex, images]);

  // Mobile long-press support
  const handleTouchStart = (e) => {
    longPressTimerRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    setIsHovered(false);
  };

  const handleClick = () => {
    // Clear any ongoing preview
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    onClick(project, 0);
  };

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-700"
      style={{
        animation: `fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onClick={handleClick}
    >
      <div className="w-full relative overflow-hidden" style={{ aspectRatio: 'auto' }}>
        {/* Low quality placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
        
        {/* Main image container with soft fade for mixed orientations */}
        <div className="relative w-full">
          <img
            ref={imgRef}
            src={currentImage.url || project.thumbnail}
            alt={project.title}
            className={`w-full h-auto object-cover transition-all duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            style={{
              display: 'block',
              transition: previewMode 
                ? 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          
          {/* Soft fade overlay for mixed orientations */}
          {isMixedOrientation && previewMode && (
            <>
              {thumbnailOrientation === 'landscape' && currentOrientation === 'portrait' && (
                <>
                  <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-900/60 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-900/60 to-transparent pointer-events-none" />
                </>
              )}
              {thumbnailOrientation === 'portrait' && currentOrientation === 'landscape' && (
                <>
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-gray-900/60 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
                </>
              )}
            </>
          )}
        </div>
        
        {/* Image count badge - elegant fade */}
        <div
          className={`absolute top-4 right-4 bg-black/75 backdrop-blur-md text-white px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <Images className="w-4 h-4" />
          {project.imageCount}
        </div>

        {/* Preview progress indicators */}
        {previewMode && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 transition-opacity duration-500">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentImageIndex 
                    ? 'w-8 bg-white shadow-lg' 
                    : 'w-1.5 bg-white/60'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            ))}
          </div>
        )}

        {/* Overlay with title and description - elegant reveal */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-all duration-600 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3
              className={`text-xl font-bold mb-2 transition-all duration-500 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ 
                transitionDelay: '100ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {project.title}
            </h3>
            <p
              className={`text-sm text-gray-200 line-clamp-2 leading-relaxed transition-all duration-500 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ 
                transitionDelay: '200ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
