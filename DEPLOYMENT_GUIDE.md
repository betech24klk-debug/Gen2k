# Portfolio Gallery - Complete Deployment Guide

## Table of Contents
1. [Supabase Setup](#supabase-setup)
2. [Environment Configuration](#environment-configuration)
3. [Local Development](#local-development)
4. [cPanel Deployment](#cpanel-deployment)
5. [Domain Configuration](#domain-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Supabase Setup

### Step 1: Create Supabase Account (if not done)
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Your project is already created with:
   - URL: `https://jrkifkiczacbdmgvrdzi.supabase.co`
   - API Key: Already configured

### Step 2: Set Up Database Tables
1. In Supabase dashboard, navigate to **SQL Editor**
2. Copy the contents of `/app/SUPABASE_SCHEMA.sql` file
3. Paste into SQL Editor and click **Run**
4. This will create:
   - `categories` table
   - `projects` table
   - `project_images` table
   - `settings` table
   - Sample data
   - Necessary indexes and security policies

### Step 3: Configure Storage (Optional)
1. In Supabase dashboard, go to **Storage**
2. Create a new bucket named `portfolio-images`
3. Set bucket to **Public**
4. This allows you to upload images directly to Supabase

### Step 4: Insert More Project Images (Optional)
After running the schema, you can add more images:

```sql
-- Get project IDs first
SELECT id, slug FROM projects;

-- Then insert images (replace PROJECT_ID with actual UUID)
INSERT INTO project_images (project_id, url, caption, orientation, "order")
VALUES 
  ('PROJECT_ID', 'IMAGE_URL', 'Caption here', 'landscape', 1),
  ('PROJECT_ID', 'IMAGE_URL', 'Caption here', 'portrait', 2);
```

---

## Environment Configuration

### Backend Environment Variables
File: `/app/backend/.env`

```env
# Supabase Configuration
SUPABASE_URL=https://jrkifkiczacbdmgvrdzi.supabase.co
SUPABASE_KEY=your_supabase_anon_key

# Server Configuration  
CORS_ORIGINS=*

# Admin Authentication
ADMIN_PASSWORD=Admin@JVA-2025-Port-Gallary_123
```

### Frontend Environment Variables
File: `/app/frontend/.env`

```env
# Backend API URL (change for production)
REACT_APP_BACKEND_URL=https://your-domain.com

# Supabase Configuration (Frontend)
REACT_APP_SUPABASE_URL=https://jrkifkiczacbdmgvrdzi.supabase.co
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

---

## Local Development

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- yarn package manager

### Step 1: Install Dependencies

**Backend:**
```bash
cd /app/backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd /app/frontend
yarn install
```

### Step 2: Start Development Servers

**Backend:**
```bash
cd /app/backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Frontend:**
```bash
cd /app/frontend
yarn start
```

### Step 3: Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/api
- Admin Login: http://localhost:3000/admin/login

---

## cPanel Deployment

### Option 1: Static Frontend + API Backend

#### A. Deploy Frontend (Static Build)

1. **Build the frontend:**
   ```bash
   cd /app/frontend
   yarn build
   ```

2. **Upload to cPanel:**
   - In cPanel, go to **File Manager**
   - Navigate to `public_html` (or your domain folder)
   - Upload all contents from `/app/frontend/build/` folder
   - Make sure `.htaccess` is present for React routing

3. **Create `.htaccess` for React Router:**
   Create/update `.htaccess` in your domain root:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

#### B. Deploy Backend (Python FastAPI)

**Using Python App in cPanel:**

1. **Setup Python Application:**
   - In cPanel, go to **Setup Python App**
   - Click **Create Application**
   - Set:
     - Python version: 3.8+ (latest available)
     - Application root: `/home/username/backend`
     - Application URL: `api.yourdomain.com` or `/api`
     - Application startup file: `server.py`
     - Application Entry point: `app`

2. **Upload backend files:**
   - Upload `/app/backend/` folder contents to `/home/username/backend/`
   - Include `requirements.txt`, `server.py`, `.env`

3. **Install dependencies:**
   - In cPanel Python App, click **Run pip install**
   - Or use terminal:
     ```bash
     source /home/username/virtualenv/backend/bin/activate
     pip install -r requirements.txt
     ```

4. **Configure .htaccess for API routing:**
   Create `.htaccess` in backend directory:
   ```apache
   PassengerBaseURI /api
   PassengerAppRoot /home/username/backend
   PassengerAppType wsgi
   PassengerStartupFile server.py
   ```

5. **Update CORS in backend `.env`:**
   ```env
   CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

6. **Restart the application**

### Option 2: Using Node.js for Full Stack

If cPanel supports Node.js:

1. **Setup Node.js Application**
   - Create Node app in cPanel
   - Upload entire `/app/` directory
   - Set entry point to start script

2. **Use Process Manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start /app/backend/server.py --interpreter python3
   pm2 start /app/frontend --name frontend
   pm2 save
   ```

---

## Domain Configuration

### Step 1: Point Domain to cPanel
1. Go to your domain registrar
2. Update nameservers or A records to point to your cPanel server
3. Wait for DNS propagation (up to 48 hours)

### Step 2: Setup Subdomain for API (Optional)
1. In cPanel, go to **Subdomains**
2. Create subdomain: `api.yourdomain.com`
3. Point it to backend directory
4. This gives you clean API URLs: `https://api.yourdomain.com/categories`

### Step 3: SSL Certificate
1. In cPanel, go to **SSL/TLS Status**
2. Enable AutoSSL or install Let's Encrypt
3. This enables HTTPS for secure connections

### Step 4: Update Frontend Environment
Update `/app/frontend/.env` before building:
```env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
# or
REACT_APP_BACKEND_URL=https://yourdomain.com/api
```

Rebuild and redeploy frontend after changing.

---

## Troubleshooting

### Issue: "Failed to load projects"
**Solution:**
1. Check backend is running: visit `https://yourdomain.com/api/health`
2. Verify Supabase credentials in backend `.env`
3. Check CORS settings allow your frontend domain
4. Check browser console for detailed error messages

### Issue: "CORS Error"
**Solution:**
1. Update backend `.env`:
   ```env
   CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```
2. Restart backend server
3. Clear browser cache

### Issue: "Admin login not working"
**Solution:**
1. Verify `ADMIN_PASSWORD` in backend `.env`
2. Check backend API is accessible
3. Check browser network tab for API errors

### Issue: "Images not loading"
**Solution:**
1. Verify image URLs in Supabase database
2. Check Supabase Storage bucket is public (if using Storage)
3. Ensure CORS is enabled in Supabase Storage settings

### Issue: "502 Bad Gateway"
**Solution:**
1. Check Python application is running in cPanel
2. Verify `server.py` has correct permissions (755)
3. Check error logs in cPanel (Python app logs)
4. Ensure all dependencies are installed

### Issue: "Database connection error"
**Solution:**
1. Verify Supabase URL and API key are correct
2. Check Supabase project is active (not paused)
3. Ensure Row Level Security policies are set correctly
4. Test connection: `curl https://jrkifkiczacbdmgvrdzi.supabase.co/rest/v1/categories -H "apikey: YOUR_KEY"`

---

## Production Checklist

- [ ] Supabase database tables created
- [ ] Sample data inserted or real data added
- [ ] Environment variables configured (both frontend and backend)
- [ ] Frontend built for production (`yarn build`)
- [ ] Frontend deployed to cPanel
- [ ] Backend deployed to cPanel Python app
- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] CORS configured for production domain
- [ ] Admin password changed from default
- [ ] Test all functionality:
  - [ ] Homepage loads
  - [ ] Categories work
  - [ ] Projects display
  - [ ] Fullscreen viewer works
  - [ ] Admin login works
  - [ ] Mobile responsive

---

## Support

For issues:
1. Check Supabase dashboard for database errors
2. Check cPanel error logs for backend issues
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

## Performance Optimization

1. **Enable caching in `.htaccess`:**
   ```apache
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/webp "access plus 1 year"
     ExpiresByType text/css "access plus 1 month"
     ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

2. **Enable Gzip compression:**
   ```apache
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
   </IfModule>
   ```

3. **Optimize images before uploading to Supabase**

4. **Use CDN (optional)** for static assets

---

**Deployment complete! Your portfolio gallery is now live.** 🎉
