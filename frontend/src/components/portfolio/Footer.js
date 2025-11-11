import React from 'react';
import { Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { mockSettings } from '../../mock';

const Footer = () => {
  const { logo, siteName, footerDescription, socialLinks, quickLinks } = mockSettings;

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-[2000px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and description */}
          <div className="space-y-4">
            <img src={logo} alt={siteName} className="h-12 object-contain" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {footerDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-600 hover:text-[#b8d71b] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-[#b8d71b] text-gray-700 hover:text-black p-3 rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-[#b8d71b] text-gray-700 hover:text-black p-3 rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;