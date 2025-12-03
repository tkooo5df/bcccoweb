# BCOS Training Platform

A comprehensive training and course management platform built with React, TypeScript, and Supabase.

## 🚀 Features

- **Course Management**: Full CRUD operations for courses with HTML content editor
- **Enrollment System**: Unified enrollment forms with lead tracking
- **Admin Panel**: Complete admin dashboard for managing courses, enrollments, and content
- **Category System**: Organize courses by categories with custom icons and colors
- **Lead Management**: Track enrollment leads with status management (confirmé, à confirmer, etc.)
- **Responsive Design**: Modern UI/UX with Tailwind CSS and Shadcn UI components
- **French Localization**: Fully localized interface in French

## 🛠️ Technologies

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Shadcn UI, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **State Management**: React Query, React Router
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod validation

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

The project uses Supabase for backend services. Configuration is in:
- `src/lib/supabaseClient.ts` - Supabase client configuration
- `supabase-config.ts` - Type definitions

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin panel components
│   ├── ui/             # Shadcn UI components
│   └── ...             # Other components
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   └── ...             # Public pages
├── lib/                # Utilities and services
│   ├── supabaseClient.ts
│   └── supabaseSimple.ts
└── hooks/              # Custom React hooks
```

## 🗄️ Database Schema

### Tables
- `formations` - Course/formation data
- `categories` - Course categories
- `enrollments` - Student enrollments with lead tracking
- `users` - User accounts
- `client_references` - Client references/portfolio

## 🔐 Environment Variables

Create a `.env.local` file (not committed to git):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Features in Detail

### Course Management
- Create, edit, delete courses
- HTML content editor for course pages
- Automatic slug generation
- Category assignment
- Price and duration management

### Enrollment System
- Direct enrollment form on course pages
- Comprehensive enrollment form in modal
- Lead status tracking
- Commercial notes and follow-up dates

### Admin Panel
- Dashboard with statistics
- Course management interface
- Enrollment management with filtering
- User management
- Gallery management
- Reference management

## 🚀 Deployment

This project can be deployed to:
- Vercel
- Netlify
- Railway
- Any static hosting service

## 📄 License

Private project - All rights reserved

## 👨‍💻 Developer

Developed by Amine
