# 🚧 PotholeFix - Civic Infrastructure Reporting Platform

> A modern web application that empowers citizens to report road potholes to municipal authorities, streamlining infrastructure maintenance and improving community engagement.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://your-demo-url.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

![PotholeFix Banner](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=PotholeFix+Platform)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

PotholeFix is a full-stack web application designed to bridge the gap between citizens and municipal authorities in infrastructure maintenance. The platform enables:

- **Citizens** to report road potholes instantly with photos and GPS locations
- **Municipal Officials** to track, prioritize, and manage infrastructure repairs
- **Communities** to monitor progress and hold authorities accountable

### Why PotholeFix?

- **🚀 Zero Friction**: No account creation required for reporting
- **📍 Precise Location**: Interactive maps with GPS integration
- **📊 Transparency**: Public dashboard shows all reported issues
- **⚡ Real-time Updates**: Instant notifications to officials
- **📱 Mobile First**: Optimized for on-the-go reporting
- **🔒 Secure**: Row-level security and data validation

---

## ✨ Features

### For Citizens

- **Quick Reporting**
  - Upload photos directly from mobile camera
  - Pin exact location on interactive map or use GPS
  - Select severity level (Minor/Moderate/Severe)
  - Optional description and contact information
  - No login required

- **Public Map View**
  - See all reported potholes in your area
  - Color-coded markers by severity
  - Filter by status (Reported/In Progress/Resolved)
  - Click markers to view details and photos
  - Track repair progress

- **Live Statistics**
  - Total potholes reported
  - Issues in progress
  - Resolved issues
  - Updated in real-time

### For Municipal Officials

- **Admin Dashboard**
  - Secure password-protected access
  - View all reports in tabular format
  - Sort by date, severity, or location
  - Filter by status or severity level
  - Update repair status in real-time

- **Report Management**
  - Change status: Reported → In Progress → Resolved
  - View reporter contact information
  - Click location to open in Google Maps
  - See uploaded photos and descriptions
  - Track time metrics

- **Analytics** (Future Enhancement)
  - Severity distribution charts
  - Resolution time metrics
  - Geographic heat maps
  - Trend analysis over time

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library for building component-based interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **Vite** - Next-generation frontend build tool for faster development
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router** - Client-side routing for single-page application
- **React Leaflet** - Interactive map components using OpenStreetMap

### Backend
- **Supabase** - Backend-as-a-Service platform providing:
  - **PostgreSQL Database** - Relational database with full SQL support
  - **Storage** - File storage for uploaded images
  - **Authentication** - User authentication (ready for future expansion)
  - **Row Level Security (RLS)** - Database-level access control
  - **Edge Functions** - Serverless functions for email notifications

### Additional Libraries
- **Lucide React** - Modern icon library
- **Leaflet** - Interactive maps library
- **clsx & tailwind-merge** - Utility for conditional className management

### Development Tools
- **ESLint** - Code linting for consistency
- **PostCSS** - CSS processing with Autoprefixer
- **TypeScript Compiler** - Type checking and compilation

---

## 📸 Screenshots

### Landing Page
*Hero section with live statistics and call-to-action*

### Report Form
*Interactive map picker and image upload interface*

### Public Map View
*All reported potholes with filtering options*

### Admin Dashboard
*Management interface for municipal officials*

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Supabase Account** (free tier available)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/potholefix.git

# Navigate to project directory
cd potholefix

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 💻 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/potholefix.git
cd potholefix
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- React ecosystem packages
- TypeScript and build tools
- Supabase client library
- Leaflet and mapping libraries
- UI component libraries

### Step 3: Database Setup

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Go to SQL Editor in Supabase dashboard
4. Copy contents of `supabase-migration.sql`
5. Paste and execute in SQL Editor

This creates:
- `pothole_reports` table with proper indexes
- `admin_users` table for authentication
- Row Level Security policies
- Database triggers and functions
- Analytics views

### Step 4: Storage Setup

1. Navigate to Storage in Supabase
2. Create new bucket: `pothole-images`
3. **Make it public** (check the public option)
4. Storage policies are automatically configured

### Step 5: Environment Configuration

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MUNICIPAL_EMAIL=officials@city.gov
```

Get credentials from Supabase:
- Dashboard → Settings → API
- Copy Project URL and anon/public key

### Step 6: Run Development Server

```bash
npm run dev
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ Yes |
| `VITE_MUNICIPAL_EMAIL` | Email for notifications | Optional |

### Admin Access

Default admin password: `admin123`

**Change this immediately!**

Edit `src/pages/Admin.tsx`:
```typescript
if (password === 'your_secure_password') {
```

For production, implement proper authentication using Supabase Auth.

### Map Configuration

Default map center (New York City):
- Latitude: `40.7128`
- Longitude: `-74.0060`

To change for your city, edit:
- `src/components/report/MapPicker.tsx` (line ~60)
- `src/components/map/PotholeMap.tsx` (line ~64)

---

## 📖 Usage

### Reporting a Pothole

1. Navigate to the Report page
2. Click "Use My Current Location" or click on map
3. Upload one or more photos
4. Select severity level
5. Add optional description
6. Submit (no login required)

### Viewing Reports

1. Navigate to Map page
2. Use filters to show specific severity or status
3. Click markers to see details and photos
4. Monitor resolution progress

### Admin Management

1. Go to `/admin` route
2. Enter admin password
3. View all reports in table format
4. Update status via dropdown
5. Click location to view in Google Maps

---

## 📁 Project Structure

```
potholefix/
├── public/                  # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── common/        # Shared components (Navbar, Footer)
│   │   ├── landing/       # Landing page components
│   │   ├── report/        # Report form components
│   │   ├── map/           # Map view components
│   │   └── admin/         # Admin dashboard components
│   ├── pages/             # Page components (routes)
│   │   ├── Home.tsx       # Landing page
│   │   ├── Report.tsx     # Report submission
│   │   ├── Map.tsx        # Public map view
│   │   ├── Admin.tsx      # Admin dashboard
│   │   └── About.tsx      # About page
│   ├── lib/               # Utility functions
│   │   ├── supabase.ts    # Supabase client setup
│   │   ├── types.ts       # TypeScript type definitions
│   │   ├── database.types.ts # Database schema types
│   │   └── utils.ts       # Helper functions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── supabase-migration.sql  # Database schema
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
├── tailwind.config.js     # Tailwind CSS config
└── README.md
```

---

## 🗄️ Database Schema

### `pothole_reports` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `created_at` | TIMESTAMP | Report creation time |
| `updated_at` | TIMESTAMP | Last modification time |
| `latitude` | DECIMAL(10,8) | GPS latitude coordinate |
| `longitude` | DECIMAL(11,8) | GPS longitude coordinate |
| `severity` | TEXT | 'minor', 'moderate', or 'severe' |
| `status` | TEXT | 'reported', 'in_progress', or 'resolved' |
| `description` | TEXT | Optional details from reporter |
| `reporter_name` | TEXT | Optional reporter name |
| `reporter_email` | TEXT | Optional contact email |
| `image_urls` | TEXT[] | Array of image URLs from storage |

### Indexes
- `idx_pothole_location` - Geospatial queries
- `idx_pothole_status` - Status filtering
- `idx_pothole_severity` - Severity filtering
- `idx_pothole_created_at` - Date sorting

### Row Level Security
- Public can read and insert reports
- Only authenticated admins can update/delete
- Email-based authorization for admin access

---

## 🔌 API Documentation

### Supabase Client Usage

**Fetch all reports:**
```typescript
const { data, error } = await supabase
  .from('pothole_reports')
  .select('*')
  .order('created_at', { ascending: false })
```

**Insert new report:**
```typescript
const { data, error } = await supabase
  .from('pothole_reports')
  .insert({
    latitude: 40.7128,
    longitude: -74.0060,
    severity: 'moderate',
    description: 'Large pothole on Main St',
    image_urls: ['https://...']
  })
```

**Update status:**
```typescript
const { error } = await supabase
  .from('pothole_reports')
  .update({ status: 'in_progress' })
  .eq('id', reportId)
```

**Upload image:**
```typescript
const { data, error } = await supabase.storage
  .from('pothole-images')
  .upload(fileName, file)

const { data: { publicUrl } } = supabase.storage
  .from('pothole-images')
  .getPublicUrl(fileName)
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Build and deploy:
```bash
npm run build
vercel --prod
```

3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_MUNICIPAL_EMAIL`

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

3. Add environment variables in Netlify dashboard

### Production Checklist

- [ ] Change admin password from default
- [ ] Set up proper authentication (Supabase Auth)
- [ ] Configure custom domain
- [ ] Set up email notifications (Resend/SendGrid)
- [ ] Enable HTTPS
- [ ] Add error monitoring (Sentry)
- [ ] Set up analytics (Google Analytics/Plausible)
- [ ] Create backup strategy for database
- [ ] Test on multiple devices and browsers

---

## 🗺️ Roadmap

### Phase 1: Core Features (Current)
- [x] Public pothole reporting
- [x] Interactive map view
- [x] Admin dashboard
- [x] Status management
- [x] Image upload

### Phase 2: Enhanced Features
- [ ] Email notifications via Resend/SendGrid
- [ ] User authentication for reporters
- [ ] Report history and tracking
- [ ] Advanced analytics dashboard
- [ ] Export reports to CSV/PDF
- [ ] Multi-language support

### Phase 3: Advanced Features
- [ ] Mobile application (React Native)
- [ ] Push notifications
- [ ] Integration with city GIS systems
- [ ] Automated severity detection (ML)
- [ ] Public API for third-party integrations
- [ ] Work order management system

### Phase 4: Scale & Optimization
- [ ] Multi-city support
- [ ] Role-based access control
- [ ] Performance optimization
- [ ] Offline mode (PWA)
- [ ] Real-time collaboration features

---

## 🤝 Contributing

Contributions are welcome! This project is designed to help cities improve infrastructure management.

### How to Contribute

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add comments for complex logic
- Test on multiple browsers
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Aakash Sen**
- GitHub: [@AakashSen](https://github.com/aakashsen704)
- LinkedIn: [My LinkedIn](https://www.linkedin.com/in/aakash-sen-480627331/)
- Email: senaakash237@gmail.com

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Backend by [Supabase](https://supabase.com)
- Maps by [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

## 📞 Contact

For municipal partnerships, internship opportunities, or questions:

**Email:** senaakash237@gmail.com

---

## 💡 Use Cases

### For Cities
- Streamline citizen engagement
- Prioritize infrastructure repairs
- Track maintenance efficiency
- Demonstrate transparency
- Reduce manual reporting overhead

### For Citizens
- Report issues without bureaucracy
- Track resolution progress
- Hold authorities accountable
- Contribute to community improvement

### For Developers
- Full-stack portfolio project
- Modern tech stack demonstration
- Real-world application example
- Open-source contribution opportunity

---

<div align="center">

**Built with ❤️ to make roads safer and communities better**

[Report Bug](https://github.com/yourusername/potholefix/issues) · [Request Feature](https://github.com/yourusername/potholefix/issues)

</div>
