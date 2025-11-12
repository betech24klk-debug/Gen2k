# \ud83d\udee0\ufe0f Supabase Setup - Step by Step Instructions

## \u23f1\ufe0f Time Required: 3-5 minutes

Follow these exact steps to set up your Supabase database for the portfolio gallery.

---

## Step 1: Access Supabase Dashboard

1. Open your browser
2. Go to: **https://supabase.com/dashboard**
3. Log in with your Supabase account
4. You should see your project: **jrkifkiczacbdmgvrdzi**

---

## Step 2: Open SQL Editor

1. In the left sidebar, find and click on **"SQL Editor"**
2. You'll see a code editor interface
3. This is where we'll create our database tables

![SQL Editor Location](https://i.imgur.com/yourimageurl.png)

---

## Step 3: Copy the Database Schema

1. Open the file `/app/SUPABASE_SCHEMA.sql` in this project
2. You can use any text editor or view it in your IDE
3. **Select ALL the content** (Ctrl+A or Cmd+A)
4. **Copy it** (Ctrl+C or Cmd+C)

**The file starts with:**
```sql
-- Supabase Database Schema for Portfolio Gallery
-- Run this in Supabase SQL Editor to create tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
...
```

**Important:** Copy the ENTIRE file (around 230 lines)

---

## Step 4: Run the SQL Script

1. Go back to Supabase SQL Editor
2. **Paste** the copied SQL code (Ctrl+V or Cmd+V)
3. Click the **"Run"** button (or press Ctrl+Enter / Cmd+Enter)
4. Wait 2-3 seconds

### \u2705 Success Indicators:
- You should see a green success message
- Something like: "Success. No rows returned"
- Or: "Query executed successfully"

### \u274c If You See Errors:
- **"relation already exists"**: Tables were already created (this is OK!)
- **"syntax error"**: Make sure you copied the ENTIRE file
- **"permission denied"**: Check you're logged into the correct Supabase project

---

## Step 5: Verify Tables Were Created

1. In the left sidebar, click on **"Table Editor"**
2. You should now see 4 new tables:

   - \ud83d\udccb **categories** (6 rows)
   - \ud83c\udfa8 **projects** (6 rows)
   - \ud83d\uddbc\ufe0f **project_images** (will start with 2 rows)
   - \u2699\ufe0f **settings** (8 rows)

3. Click on each table to see the sample data

### Expected Data:

**categories table:**
- All Projects
- Residential
- Commercial
- Interiors
- Renovations
- Urban Design

**projects table:**
- Modern Villa Residence
- Corporate Headquarters
- Minimalist Apartment
- Heritage Building Restoration
- Urban Plaza Development
- Boutique Hotel Design

**settings table:**
- logo
- siteName
- tagline
- whatsappNumber
- etc.

---

## Step 6: Test the Connection

### Option A: Using Browser
Open this URL in your browser:
```
http://localhost:8001/api/categories
```

You should see JSON data with categories.

### Option B: Using Terminal
Run this command:
```bash
curl http://localhost:8001/api/categories
```

### \u2705 Expected Response:
```json
[
  {
    "id": "...",
    "name": "All Projects",
    "slug": "all",
    "order": 0
  },
  {
    "id": "...",
    "name": "Residential",
    "slug": "residential",
    "order": 1
  },
  ...
]
```

### \u274c If API Returns Error:
- Make sure backend is running: `sudo supervisorctl status backend`
- Restart backend: `sudo supervisorctl restart backend`
- Check backend logs: `tail -f /var/log/supervisor/backend.err.log`

---

## Step 7: Access Your Portfolio

Once tables are created and API is working:

**\ud83c\udf0d Frontend:**
```
https://954d301b-581d-4eaf-8f21-7127e0c88535.preview.emergentagent.com
```

**\ud83d\udd11 Admin Panel:**
```
https://954d301b-581d-4eaf-8f21-7127e0c88535.preview.emergentagent.com/admin/login
```

**Password:** `Admin@JVA-2025-Port-Gallary_123`

---

## \ud83c\udf89 Done!

Your portfolio gallery is now connected to Supabase and fully functional!

### What You Can Do Now:

1. **View your portfolio**: Browse projects, filter by category, open fullscreen viewer
2. **Login to admin**: Add/edit/delete projects and manage content
3. **Customize settings**: Update logo, site name, social links via admin panel
4. **Deploy to production**: Follow `DEPLOYMENT_GUIDE.md` for cPanel deployment

---

## \ud83d\udd27 Troubleshooting

### Problem: "Could not find the table 'categories'"

**Solution:**
- You haven't run the SQL schema yet
- Go back to Step 3 and make sure you run the ENTIRE SQL file
- Check Supabase Table Editor to confirm tables exist

### Problem: Tables exist but no data

**Solution:**
- The SQL script includes sample data
- If tables are empty, re-run the SQL script
- Or add data manually via Supabase Table Editor

### Problem: "Connection refused" or API errors

**Solution:**
1. Check Supabase URL and Key in `/app/backend/.env`:
   ```env
   SUPABASE_URL=https://jrkifkiczacbdmgvrdzi.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
2. Restart backend: `sudo supervisorctl restart backend`
3. Test API: `curl http://localhost:8001/api/health`

### Problem: Frontend shows "Failed to load projects"

**Solution:**
1. Backend must be running and accessible
2. Check browser console for errors (F12)
3. Verify backend URL in `/app/frontend/.env`
4. Make sure Supabase tables are created

---

## \ud83d\udcdd Additional Resources

- **Quick Start Guide**: `/app/QUICK_START.md`
- **Full README**: `/app/README.md`
- **Deployment Guide**: `/app/DEPLOYMENT_GUIDE.md`
- **Supabase Documentation**: https://supabase.com/docs

---

## \u2753 Need Help?

Run the verification script:
```bash
/app/verify_setup.sh
```

This will check:
- Environment variables
- Server status
- API connectivity
- Database connection

And tell you exactly what needs to be fixed!

---

**\u2728 Happy Building! Your portfolio gallery is ready to showcase your amazing work!**
