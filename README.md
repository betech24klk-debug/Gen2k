# Architect Portfolio Gallery

🎨 A modern, elegant portfolio gallery application for architects with stunning animations, Supabase backend, and production-ready deployment.

## ✨ Features

### Frontend
- **Elegant UI/UX**: Minimalist design with architectural motion principles
- **Masonry Grid Layout**: Responsive grid that adapts to screen sizes
- **Category Navigation**: Center-aligned, smooth scrolling category bar
- **Interactive Project Cards**:
  - Hover slideshow preview with smooth crossfade
  - Mobile long-press support
  - Image orientation detection with soft fade overlays
  - Lazy loading and intelligent prefetching
- **Advanced Fullscreen Viewer**:
  - Auto-hide controls with elegant fade in/out
  - Keyboard navigation (←, →, Esc, Space)
  - Pinch-to-zoom on mobile
  - Pan with boundaries
  - Double-tap/click to reset zoom
  - Auto slideshow after idle
  - Progressive image loading with blur-up effect
  - Seamless transitions between images
- **Admin Panel**: Full CRUD for projects, categories, and settings
- **Responsive Design**: Perfect on mobile, tablet, and desktop

### Backend
- **FastAPI**: High-performance Python API
- **Supabase Integration**: PostgreSQL database + Storage
- **RESTful API**: Clean, documented endpoints
- **Admin Authentication**: Secure password-based login
- **CORS Support**: Configurable for production domains

### Performance
- **Lazy Loading**: Images load only when needed
- **Smart Prefetching**: Next images preloaded in background
- **Progressive Hydration**: Instant first paint
- **Optimized Animations**: GPU-accelerated, 60fps
- **Production Build**: Minified and optimized

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router v7
- Tailwind CSS
- Axios
- Supabase JS Client
- Lucide Icons
- Sonner (Toast notifications)

### Backend
- FastAPI (Python)
- Supabase (PostgreSQL)
- Pydantic (Data validation)
- CORS Middleware

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- Supabase account (free tier works!)
- yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   cd /app
   ```

2. **Set up Supabase**
   - Run SQL schema from `SUPABASE_SCHEMA.sql` in Supabase SQL Editor
   - Note your Supabase URL and API key

3. **Configure Environment Variables**
   
   Backend (`.env` in `/app/backend/`):
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key
   CORS_ORIGINS=*
   ADMIN_PASSWORD=your-secure-password
   ```
   
   Frontend (`.env` in `/app/frontend/`):
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8001
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_KEY=your-anon-key
   ```

4. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   
   # Frontend
   cd ../frontend
   yarn install
   ```

5. **Start Development Servers**
   ```bash
   # Backend (terminal 1)
   cd backend
   uvicorn server:app --reload --host 0.0.0.0 --port 8001
   
   # Frontend (terminal 2)
   cd frontend
   yarn start
   ```

6. **Open Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8001/api
   - Admin: http://localhost:3000/admin/login

## 📋 API Documentation

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/categories` - List all categories
- `GET /api/projects` - List all projects (filter by category)
- `GET /api/projects/{slug}` - Get project by slug
- `GET /api/settings` - Get site settings

### Admin Endpoints (Auth Required)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/{id}` - Update project
- `DELETE /api/admin/projects/{id}` - Delete project
- `POST /api/admin/projects/{id}/images` - Add project image
- `DELETE /api/admin/projects/images/{id}` - Delete image
- `PUT /api/admin/settings` - Update settings

## 📦 Deployment

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for complete deployment instructions including:
- Supabase setup
- cPanel deployment
- Domain configuration
- SSL setup
- Production optimization
- Troubleshooting

### Quick Deploy to cPanel

1. **Build Frontend**
   ```bash
   cd frontend
   yarn build
   ```

2. **Upload to cPanel**
   - Upload `build/` contents to `public_html/`
   - Upload `backend/` to server
   - Configure Python app in cPanel

3. **Configure Environment**
   - Update `.env` files with production values
   - Set CORS to your domain
   - Enable SSL

## 🎨 Customization

### Changing Colors
Edit `/app/frontend/tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#b8d71b', // Your brand color
    }
  }
}
```

### Admin Password
Set in backend `.env`:
```env
ADMIN_PASSWORD=your-secure-password
```

### Site Settings
Update via Admin Panel or directly in Supabase `settings` table.

## 📝 Project Structure

```
/app/
├── backend/
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend environment variables
├── frontend/
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── portfolio/     # Portfolio components
│   │   │   └── ui/            # UI components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context
│   │   ├── lib/               # Utilities
│   │   ├── App.js             # Main app component
│   │   └── index.js           # Entry point
│   ├── package.json           # Node dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   └── .env                   # Frontend environment variables
├── SUPABASE_SCHEMA.sql        # Database schema
├── DEPLOYMENT_GUIDE.md        # Deployment instructions
└── README.md                  # This file
```

## 🐛 Known Issues & Solutions

### CORS Errors
Update backend `.env`:
```env
CORS_ORIGINS=https://yourdomain.com
```

### Images Not Loading
Check Supabase Storage bucket is public and CORS is enabled.

### Admin Login Fails
Verify `ADMIN_PASSWORD` matches in backend `.env`.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 📧 Support

For issues or questions:
1. Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Review Supabase logs
3. Check browser console
4. Review cPanel error logs

## ⭐ Features Checklist

- ✅ Responsive masonry grid
- ✅ Category filtering
- ✅ Hover slideshow preview
- ✅ Mobile long-press support
- ✅ Fullscreen viewer with zoom
- ✅ Keyboard navigation
- ✅ Touch gestures (pinch zoom)
- ✅ Auto-hide controls
- ✅ Auto slideshow on idle
- ✅ Progressive image loading
- ✅ Lazy loading
- ✅ Smart prefetching
- ✅ Admin panel
- ✅ Supabase integration
- ✅ Production-ready build
- ✅ cPanel deployment support
- ✅ SSL ready
- ✅ SEO friendly

---

**Built with ❤️ for architects and creative professionals**
