// Mock data for architect portfolio - will be replaced with Supabase integration

export const mockSettings = {
  logo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=80&fit=crop',
  siteName: 'Architect Studio',
  tagline: 'Designing spaces that inspire and endure',
  whatsappNumber: '+1234567890',
  whatsappMessage: 'Hello! I am interested in your architectural services.',
  footerDescription: 'Award-winning architectural firm specializing in sustainable and innovative design solutions.',
  socialLinks: {
    instagram: 'https://instagram.com/architectstudio',
    linkedin: 'https://linkedin.com/company/architectstudio',
    behance: 'https://behance.net/architectstudio',
    pinterest: 'https://pinterest.com/architectstudio'
  },
  quickLinks: [
    { label: 'About', url: '#about' },
    { label: 'Services', url: '#services' },
    { label: 'Contact', url: '#contact' }
  ]
};

export const mockCategories = [
  { id: '1', name: 'All Projects', slug: 'all', order: 0 },
  { id: '2', name: 'Residential', slug: 'residential', order: 1 },
  { id: '3', name: 'Commercial', slug: 'commercial', order: 2 },
  { id: '4', name: 'Interiors', slug: 'interiors', order: 3 },
  { id: '5', name: 'Renovations', slug: 'renovations', order: 4 },
  { id: '6', name: 'Urban Design', slug: 'urban-design', order: 5 }
];

export const mockProjects = [
  {
    id: '1',
    title: 'Modern Villa Residence',
    slug: 'modern-villa-residence',
    description: 'A contemporary villa featuring clean lines, open spaces, and seamless indoor-outdoor integration.',
    category: 'residential',
    tags: ['modern', 'villa', 'luxury', 'sustainable'],
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1200&fit=crop',
    images: [
      { id: 'img1', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1280&fit=crop', caption: 'Front facade with natural stone', orientation: 'landscape' },
      { id: 'img2', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1280&h=1920&fit=crop', caption: 'Interior living space', orientation: 'portrait' },
      { id: 'img3', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1280&fit=crop', caption: 'Pool and outdoor area', orientation: 'landscape' },
      { id: 'img4', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1280&fit=crop', caption: 'Kitchen design', orientation: 'landscape' },
      { id: 'img5', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1280&h=1920&fit=crop', caption: 'Master bedroom', orientation: 'portrait' }
    ],
    imageCount: 5,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Corporate Headquarters',
    slug: 'corporate-headquarters',
    description: 'Innovative office space designed to foster collaboration and creativity in a modern work environment.',
    category: 'commercial',
    tags: ['office', 'corporate', 'glass', 'modern'],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
    images: [
      { id: 'img6', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1280&fit=crop', caption: 'Glass tower exterior', orientation: 'landscape' },
      { id: 'img7', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1280&fit=crop', caption: 'Open office workspace', orientation: 'landscape' },
      { id: 'img8', url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1280&fit=crop', caption: 'Meeting room', orientation: 'landscape' },
      { id: 'img9', url: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1280&h=1920&fit=crop', caption: 'Lobby entrance', orientation: 'portrait' },
      { id: 'img10', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1280&fit=crop', caption: 'Rooftop terrace', orientation: 'landscape' },
      { id: 'img11', url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=1280&fit=crop', caption: 'Night view', orientation: 'landscape' }
    ],
    imageCount: 6,
    createdAt: '2024-02-10'
  },
  {
    id: '3',
    title: 'Minimalist Apartment',
    slug: 'minimalist-apartment',
    description: 'Refined interior design showcasing minimalist principles with natural materials and neutral tones.',
    category: 'interiors',
    tags: ['minimalist', 'apartment', 'interior', 'scandinavian'],
    thumbnail: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop',
    images: [
      { id: 'img12', url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&h=1280&fit=crop', caption: 'Living room', orientation: 'landscape' },
      { id: 'img13', url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1280&h=1920&fit=crop', caption: 'Dining area', orientation: 'portrait' },
      { id: 'img14', url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1920&h=1280&fit=crop', caption: 'Kitchen detail', orientation: 'landscape' },
      { id: 'img15', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1280&fit=crop', caption: 'Bedroom sanctuary', orientation: 'landscape' }
    ],
    imageCount: 4,
    createdAt: '2024-03-05'
  },
  {
    id: '4',
    title: 'Heritage Building Restoration',
    slug: 'heritage-restoration',
    description: 'Sensitive restoration and adaptive reuse of a historic building, preserving character while adding modern functionality.',
    category: 'renovations',
    tags: ['restoration', 'heritage', 'adaptive-reuse', 'historic'],
    thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=1200&fit=crop',
    images: [
      { id: 'img16', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1280&h=1920&fit=crop', caption: 'Restored facade', orientation: 'portrait' },
      { id: 'img17', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1280&fit=crop', caption: 'Original features preserved', orientation: 'landscape' },
      { id: 'img18', url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1920&h=1280&fit=crop', caption: 'Modern intervention', orientation: 'landscape' },
      { id: 'img19', url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1280&fit=crop', caption: 'Interior transformation', orientation: 'landscape' },
      { id: 'img20', url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1280&h=1920&fit=crop', caption: 'Detailed craftsmanship', orientation: 'portrait' }
    ],
    imageCount: 5,
    createdAt: '2024-01-28'
  },
  {
    id: '5',
    title: 'Urban Plaza Development',
    slug: 'urban-plaza',
    description: 'Public space design creating a vibrant community gathering point with sustainable landscaping and seating areas.',
    category: 'urban-design',
    tags: ['public-space', 'plaza', 'landscape', 'community'],
    thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop',
    images: [
      { id: 'img21', url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1280&fit=crop', caption: 'Plaza overview', orientation: 'landscape' },
      { id: 'img22', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1280&fit=crop', caption: 'Urban integration', orientation: 'landscape' },
      { id: 'img23', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1280&fit=crop', caption: 'Evening atmosphere', orientation: 'landscape' },
      { id: 'img24', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1280&h=1920&fit=crop', caption: 'Seating detail', orientation: 'portrait' },
      { id: 'img25', url: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=1920&h=1280&fit=crop', caption: 'Sustainable landscaping', orientation: 'landscape' }
    ],
    imageCount: 5,
    createdAt: '2024-02-20'
  },
  {
    id: '6',
    title: 'Boutique Hotel Design',
    slug: 'boutique-hotel',
    description: 'Luxury boutique hotel combining elegance with comfort, featuring bespoke furnishings and curated art.',
    category: 'commercial',
    tags: ['hotel', 'hospitality', 'luxury', 'boutique'],
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop',
    images: [
      { id: 'img26', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1280&fit=crop', caption: 'Hotel lobby', orientation: 'landscape' },
      { id: 'img27', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1280&h=1920&fit=crop', caption: 'Guest room', orientation: 'portrait' },
      { id: 'img28', url: 'https://images.unsplash.com/photo-1520483601560-73f43bf39a75?w=1920&h=1280&fit=crop', caption: 'Restaurant interior', orientation: 'landscape' },
      { id: 'img29', url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&h=1280&fit=crop', caption: 'Spa facilities', orientation: 'landscape' },
      { id: 'img30', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1280&fit=crop', caption: 'Rooftop bar', orientation: 'landscape' },
      { id: 'img31', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280&h=1920&fit=crop', caption: 'Signature suite', orientation: 'portrait' }
    ],
    imageCount: 6,
    createdAt: '2024-03-12'
  }
];

// Admin authentication
export const ADMIN_PASSWORD = 'Admin@JVA-2025-Port-Gallary_123';

// Helper functions
export const getProjectsByCategory = (categorySlug) => {
  if (categorySlug === 'all') return mockProjects;
  return mockProjects.filter(p => p.category === categorySlug);
};

export const getProjectById = (id) => {
  return mockProjects.find(p => p.id === id);
};

export const getCategoryBySlug = (slug) => {
  return mockCategories.find(c => c.slug === slug);
};