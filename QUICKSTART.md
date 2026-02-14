# ⚡ Quick Start Guide - Get Running in 5 Minutes!

## Step 1: Extract & Install (1 min)

```bash
# Extract the archive
tar -xzf potholefix-complete.tar.gz
cd potholefix-complete

# Install dependencies
npm install
```

## Step 2: Supabase Setup (2 min)

1. Go to https://supabase.com → Create new project
2. Copy `supabase-migration.sql` contents → Paste in SQL Editor → Run
3. Storage → Create bucket → Name: `pothole-images` → **Make it PUBLIC**
4. Settings → API → Copy **Project URL** and **anon key**

## Step 3: Configure Environment (1 min)

Create `.env` file:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
VITE_MUNICIPAL_EMAIL=your@email.com
```

## Step 4: Run! (1 min)

```bash
npm run dev
```

Visit: http://localhost:5173

## Test It!

1. Click "Report a Pothole"
2. Upload image, click map, submit
3. Go to Map page - see your report!
4. Go to Admin page - password: `admin123`

---

## 🎯 File Checklist

Your project should have these 35 files:

### Configuration (7 files)
- ✅ `.env` (you create this)
- ✅ `.env.example`
- ✅ `.gitignore`
- ✅ `package.json`
- ✅ `tsconfig.json`
- ✅ `tsconfig.node.json`
- ✅ `vite.config.ts`
- ✅ `tailwind.config.js`
- ✅ `postcss.config.js`

### HTML & Styles (2 files)
- ✅ `index.html`
- ✅ `src/index.css`

### Main App (2 files)
- ✅ `src/main.tsx`
- ✅ `src/App.tsx`

### Library Files (4 files)
- ✅ `src/lib/supabase.ts`
- ✅ `src/lib/types.ts`
- ✅ `src/lib/database.types.ts`
- ✅ `src/lib/utils.ts`

### Components (13 files)
- ✅ `src/components/common/Navbar.tsx`
- ✅ `src/components/common/Footer.tsx`
- ✅ `src/components/common/LoadingSpinner.tsx`
- ✅ `src/components/landing/Hero.tsx`
- ✅ `src/components/report/ReportForm.tsx`
- ✅ `src/components/report/MapPicker.tsx`
- ✅ `src/components/report/ImageUpload.tsx`
- ✅ `src/components/report/SeveritySelector.tsx`
- ✅ `src/components/map/PotholeMap.tsx`
- ✅ `src/components/map/MapFilters.tsx`
- ✅ `src/components/showcase/ModelShowcase.tsx`
- ✅ `src/components/admin/Dashboard.tsx`

### Pages (6 files)
- ✅ `src/pages/Home.tsx`
- ✅ `src/pages/Report.tsx`
- ✅ `src/pages/Map.tsx`
- ✅ `src/pages/Showcase.tsx`
- ✅ `src/pages/Admin.tsx`
- ✅ `src/pages/About.tsx`

### Database & Docs (3 files)
- ✅ `supabase-migration.sql`
- ✅ `README.md`
- ✅ `SETUP_GUIDE.md`

---

## 🚨 Common Issues

**"Module not found"**
```bash
npm install
```

**"Failed to fetch"**
- Check `.env` file exists in project root
- Verify Supabase URL and key are correct

**Images won't upload**
- Bucket must be named exactly `pothole-images`
- Bucket must be PUBLIC

**Map blank**
- Wait a few seconds for tiles to load
- Check internet connection

---

## 🎨 Key Features

✅ Report potholes with photos
✅ Interactive map with all reports
✅ Admin dashboard (password: admin123)
✅ ML model showcase page
✅ Mobile responsive
✅ Live statistics
✅ Severity levels & status tracking

---

## 📱 Pages

- `/` - Landing page with stats
- `/report` - Submit new pothole
- `/map` - View all reports on map
- `/showcase` - AI/ML model details
- `/admin` - Management dashboard
- `/about` - Platform information

---

## 🔐 Admin Access

**Default Password:** `admin123`

Change in `src/pages/Admin.tsx` line 14

---

## 🎯 Next Steps

1. Test all features locally
2. Customize for your city
3. Deploy to Vercel/Netlify
4. Share with community!

---

**Need detailed help? Check `SETUP_GUIDE.md` or `README.md`**
