import React, { useState, useEffect } from 'react';
import { Home, MessageCircle, X, ArrowUp } from 'lucide-react';
import { mockSettings } from '../../mock';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(mockSettings.whatsappMessage);
    const url = `https://wa.me/${mockSettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Scroll to top button - appears independently */}
      {showScrollTop && !isOpen && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-28 right-6 sm:right-8 z-40 bg-gray-900/90 backdrop-blur-sm hover:bg-black text-white p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110"
          style={{ 
            animation: 'fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Main FAB menu */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        {/* Background overlay when open */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Expanded menu items */}
        <div className="relative">
          {isOpen && (
            <div
              className="absolute bottom-24 right-0 flex flex-col gap-4 mb-2"
              style={{ 
                animation: 'fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Home button */}
              <div className="relative group">
                <button
                  onClick={handleHome}
                  className="bg-white hover:bg-[#b8d71b] text-gray-800 hover:text-black p-4 rounded-full shadow-2xl transition-all duration-400 hover:scale-110"
                  style={{
                    animation: 'fadeInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  aria-label="Go to home"
                >
                  <Home className="w-6 h-6" />
                </button>
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl">
                  Home
                </span>
              </div>

              {/* WhatsApp button */}
              <div className="relative group">
                <button
                  onClick={handleWhatsApp}
                  className="bg-white hover:bg-[#25D366] text-gray-800 hover:text-white p-4 rounded-full shadow-2xl transition-all duration-400 hover:scale-110"
                  style={{
                    animation: 'fadeInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  aria-label="Contact via WhatsApp"
                >
                  <MessageCircle className="w-6 h-6" />
                </button>
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl">
                  WhatsApp
                </span>
              </div>
            </div>
          )}

          {/* Main FAB button */}
          <button
            onClick={handleToggle}
            className={`bg-[#b8d71b] hover:bg-[#a0c018] text-black p-5 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 ${
              isOpen ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X className="w-7 h-7 transition-transform duration-300" />
            ) : (
              <MessageCircle className="w-7 h-7 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingActionButton;