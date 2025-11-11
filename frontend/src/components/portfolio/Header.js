import React from 'react';
import { mockSettings } from '../../mock';

const Header = () => {
  return (
    <header className="w-full py-6 md:py-8 px-6 bg-white border-b border-gray-100\">
      <div className="max-w-[2000px] mx-auto flex justify-center items-center">
        <img
          src={mockSettings.logo}
          alt={mockSettings.siteName}
          className="h-12 md:h-16 object-contain transition-opacity duration-300 hover:opacity-80"
        />
      </div>
    </header>
  );
};

export default Header;