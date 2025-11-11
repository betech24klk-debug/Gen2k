import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const Header = () => {
  const [settings, setSettings] = useState({
    logo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=80&fit=crop',
    siteName: 'Architect Studio'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/settings`);
        setSettings(response.data);
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <header className="w-full py-6 md:py-8 px-6 bg-white border-b border-gray-100">
      <div className="max-w-[2000px] mx-auto flex justify-center items-center">
        <img
          src={settings.logo}
          alt={settings.siteName}
          className="h-12 md:h-16 object-contain transition-opacity duration-300 hover:opacity-80"
        />
      </div>
    </header>
  );
};

export default Header;
