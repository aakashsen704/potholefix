# 🚀 PotholeFix Setup Guide

Complete step-by-step guide to get your PotholeFix platform running.

---

## Step 1: Prerequisites

Before you begin, make sure you have:

- [ ] Node.js 18+ installed ([Download](https://nodejs.org))
- [ ] npm (comes with Node.js)
- [ ] A Supabase account ([Sign up](https://supabase.com))
- [ ] A code editor (VS Code recommended)

---

## Step 2: Project Setup

### 2.1 Extract the Project

```bash
cd path/to/potholefix-complete
```

### 2.2 Install Dependencies

```bash
npm install
```

This will install all required packages. Takes about 1-2 minutes.

---

## Step 3: Supabase Configuration

### 3.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: PotholeFix (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for setup

### 3.2 Run Database Migration

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Open the file `supabase-migration.sql` in this project
3. Copy ALL the SQL code
4. Paste into Supabase SQL Editor
5. Click "Run" button
6. You should see success messages

### 3.3 Create Storage Bucket

1. Click **Storage** in Supabase sidebar
2. Click **"New bucket"**
3. Fill in:
   - **Name**: `pothole-images`
   - **Public bucket**: ✅ **YES, check this box**
4. Click "Create bucket"

### 3.4 Get API Credentials

1. Click **Settings** (gear icon) in Supabase sidebar
2. Click **API** in settings menu
3. Find and copy:
   - **Project URL** (looks like: https://xxx.supabase.co)
   - **anon/public key** (long string starting with `eyJ...`)

---

## Step 4: Environment Variables

### 4.1 Create .env File

1. In the project root, create a file named `.env` (note the dot)
2. Copy this template and fill in your values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_MUNICIPAL_EMAIL=your-email@gmail.com
```

### 4.2 Fill in Values

- **VITE_SUPABASE_URL**: Paste your Project URL from Step 3.4
- **VITE_SUPABASE_ANON_KEY**: Paste your anon/public key from Step 3.4
- **VITE_MUNICIPAL_EMAIL**: Your email (for testing notifications)

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
VITE_MUNICIPAL_EMAIL=john@example.com
```

---

## Step 5: Run the Application

### 5.1 Start Development Server

```bash
npm run dev
```

### 5.2 Open in Browser

Go to: http://localhost:5173

You should see the PotholeFix landing page!

---

## Step 6: Test the Platform

### Test 1: Report a Pothole

1. Click **"Report a Pothole"** button
2. Click **"Use My Current Location"** (or click on map)
3. Click the upload button and select an image
4. Choose a severity level
5. Click **"Submit Report"**
6. You should see a success message!

### Test 2: View on Map

1. Go to **Map** page (navbar)
2. You should see your report as a marker
3. Click the marker to see details

### Test 3: Admin Dashboard

1. Go to **Admin** page (navbar)
2. Enter password: `admin123`
3. Click "Login"
4. You should see your report in the table
5. Try changing the status dropdown

---

## Step 7: Verify Database

1. Go back to Supabase dashboard
2. Click **Table Editor** in sidebar
3. Click **pothole_reports** table
4. You should see your test report!

---

## ✅ Setup Complete!

Your PotholeFix platform is now running. Here's what works:

- ✅ Submit pothole reports with photos
- ✅ View reports on interactive map
- ✅ Admin dashboard to manage reports
- ✅ AI/ML model showcase page
- ✅ Mobile-responsive design

---

## 🎨 Customization (Optional)

### Change Default Location

Edit `src/components/report/MapPicker.tsx` (line ~60):

```typescript
center={[40.7128, -74.0060]} // Change to your city's coordinates
```

Also edit `src/components/map/PotholeMap.tsx` (line ~64)

### Change Admin Password

Edit `src/pages/Admin.tsx` (line ~14):

```typescript
if (password === 'your_new_password') {
```

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#3b82f6', // Change this hex color
  },
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Free)

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Build and deploy:
   ```bash
   npm run build
   vercel --prod
   ```
4. Add environment variables in Vercel dashboard

### Deploy to Netlify (Free)

1. Create account at [netlify.com](https://netlify.com)
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```
4. Add environment variables in Netlify dashboard

---

## 🐛 Common Issues

### "Failed to fetch" errors
- Check `.env` file is in project root
- Verify Supabase URL and key are correct
- Make sure Supabase project is active

### Images won't upload
- Verify storage bucket is named exactly `pothole-images`
- Check bucket is set to **public**
- Try a smaller image (< 5MB)

### Map doesn't load
- Clear browser cache
- Check browser console for errors
- Verify internet connection

### Can't see reports
- Check Supabase Table Editor
- Verify database migration ran successfully
- Try submitting another test report

---

## 📧 Need Help?

1. Check the README.md file
2. Review code comments
3. Check browser console for errors
4. Verify all steps were completed

---

## 🎉 Next Steps

1. Customize the platform for your city
2. Add your ML model detection samples
3. Set up email notifications (see README)
4. Deploy to production
5. Share with your community!

---

**Happy Coding! 🚧**
