# Quick Start Guide

## \ud83d\ude80 Get Your Portfolio Running in 5 Minutes!

### Step 1: Set Up Supabase Database (2 minutes)

1. **Go to Supabase SQL Editor**:
   - Open [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Navigate to your project: `jrkifkiczacbdmgvrdzi`
   - Click on **SQL Editor** in the left sidebar

2. **Run the Database Schema**:
   - Open the file `/app/SUPABASE_SCHEMA.sql` (in this project)
   - Copy ALL the content
   - Paste it into the Supabase SQL Editor
   - Click **Run** button (or press Ctrl/Cmd + Enter)
   - You should see "Success" message

3. **Verify Tables Were Created**:
   - Click on **Table Editor** in left sidebar
   - You should see 4 tables:
     - `categories`
     - `projects`
     - `project_images`
     - `settings`
   - Each table should have sample data

### Step 2: Test Backend Connection (1 minute)

Run this test command:

```bash
curl http://localhost:8001/api/health
```

Expected response:
```json
{"status": "healthy", "database": "supabase"}
```

### Step 3: Test Categories API (1 minute)

```bash
curl http://localhost:8001/api/categories
```

You should see a list of categories like:
```json
[
  {"id": "...", "name": "All Projects", "slug": "all", "order": 0},
  {"id": "...", "name": "Residential", "slug": "residential", "order": 1},
  ...
]
```

### Step 4: Start Frontend (1 minute)

The frontend should auto-reload. Just open your browser:

**Your Portfolio:** https://954d301b-581d-4eaf-8f21-7127e0c88535.preview.emergentagent.com

**Admin Login:** https://954d301b-581d-4eaf-8f21-7127e0c88535.preview.emergentagent.com/admin/login

**Default Admin Password:** `Admin@JVA-2025-Port-Gallary_123`

---

## \u2705 Quick Test Checklist

After Step 1 (Database Setup), verify:

- [ ] Backend health check works: `curl http://localhost:8001/api/health`
- [ ] Categories API works: `curl http://localhost:8001/api/categories`
- [ ] Projects API works: `curl http://localhost:8001/api/projects`
- [ ] Settings API works: `curl http://localhost:8001/api/settings`
- [ ] Frontend loads without errors
- [ ] Projects display on homepage
- [ ] Categories can be filtered
- [ ] Fullscreen viewer opens when clicking project
- [ ] Admin login works with password

---

## \ud83d\udc1b Troubleshooting

### "Could not find table 'categories'"
**Solution:** You haven't run the SUPABASE_SCHEMA.sql yet. Go back to Step 1.

### "Connection refused" or "Network error"
**Solution:** 
- Backend might not be running
- Check: `sudo supervisorctl status backend`
- Restart: `sudo supervisorctl restart backend`

### Frontend shows "Failed to load projects"
**Solution:**
1. Verify backend is running: `curl http://localhost:8001/api/health`
2. Check if tables exist in Supabase
3. Verify Supabase credentials in `/app/backend/.env`

### Admin login doesn't work
**Solution:**
- Default password: `Admin@JVA-2025-Port-Gallary_123`
- Check backend logs: `tail -f /var/log/supervisor/backend.err.log`

---

## \ud83c\udf89 All Set!

Once all tests pass, your portfolio is fully functional with:
- \u2705 Real Supabase database
- \u2705 All API endpoints working
- \u2705 Beautiful frontend with animations
- \u2705 Admin panel for content management
- \u2705 Production-ready architecture

### Next Steps:

1. **Customize Content**: Login to admin panel and add your own projects
2. **Change Password**: Update `ADMIN_PASSWORD` in `/app/backend/.env`
3. **Deploy to Production**: Follow `/app/DEPLOYMENT_GUIDE.md`
4. **Configure Domain**: Point your domain to the deployed app

---

## \ud83d\udcda Additional Resources

- **Full Deployment Guide**: `/app/DEPLOYMENT_GUIDE.md`
- **README**: `/app/README.md`
- **API Documentation**: See README API section
- **Supabase Dashboard**: [https://supabase.com/dashboard](https://supabase.com/dashboard)

**Need help?** Check the troubleshooting sections in DEPLOYMENT_GUIDE.md
