# Formations System Upgrade - Implementation Guide

## Overview

This document describes the complete upgrade of the Formations/Courses system to support bilingual content (French/Arabic), enhanced admin management, and CRM integration.

## Features

### 1. Bilingual Support
- Full French and Arabic content fields
- Language switcher on public pages
- RTL support for Arabic
- Fallback to French if Arabic content is missing

### 2. Admin Management
- **Bilingual Course Form**: Create/edit courses with FR/AR content
- **Categories Management**: Full CRUD for categories with bilingual support
- **CRM Dashboard**: Manage enrollments with status tracking

### 3. Public Pages
- Bilingual course detail pages
- Language-aware content display
- Integrated enrollment forms

## Database Setup

### Step 1: Run Migration

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `migrations/001_bilingual_formations.sql`
3. Execute the migration
4. Verify tables were created/updated

### Step 2: Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Click "New bucket"
3. Name: `course-covers`
4. Set to Public
5. Configure policies:
   - Public read access
   - Authenticated write access

## Usage Guide

### Creating a Category

1. Navigate to `/admin/categories`
2. Click "Nouvelle Catégorie"
3. Fill in French name (required)
4. Optionally add Arabic name
5. Set color and icon
6. Save

### Creating a Course

1. Navigate to `/admin/courses`
2. Click "Nouveau Cours"
3. Fill in General tab:
   - Published status
   - Category
   - Reference and slug
   - Pricing (HT/TTC)
4. Fill in French tab:
   - Title (required)
   - Description
   - Content
   - Objectives
   - Prerequisites
   - Program
   - Target audience
5. Fill in Arabic tab (optional):
   - Same fields as French
6. Upload cover image in Media tab
7. Save

### Managing Enrollments

1. Navigate to `/admin/enrollments`
2. Filter by status, source, or language
3. Click eye icon to view details
4. Update status and add notes
5. Track commercial follow-up

## API Reference

### Categories

```typescript
// Get all categories
SupabaseService.getCategories()

// Create category
SupabaseService.createCategory(categoryData)

// Update category
SupabaseService.updateCategory(id, updates)

// Delete category
SupabaseService.deleteCategory(id)
```

### Formations

```typescript
// Get formation by slug
SupabaseService.getFormationBySlug(slug)

// Create formation
SupabaseService.createFormation(formationData)

// Update formation
SupabaseService.updateFormation(id, updates)
```

### Enrollments

```typescript
// Create enrollment
SupabaseService.createEnrollment(enrollmentData)

// Get enrollments
SupabaseService.getEnrollments(filters?)

// Update enrollment status
SupabaseService.updateEnrollmentStatus(id, updates)
```

### Storage

```typescript
// Upload file
SupabaseService.uploadFile('course-covers', path, file)

// Get public URL
SupabaseService.getPublicUrl('course-covers', path)
```

## Troubleshooting

### Images not uploading?
- Check bucket exists and is public
- Verify bucket policies allow authenticated uploads
- Check file size (max 5MB)

### Arabic text not displaying?
- Ensure `dir="rtl"` is set when Arabic selected
- Check font supports Arabic characters
- Verify UTF-8 encoding

### Enrollments not appearing?
- Check both `course_id` and `formation_id` are set
- Verify enrollment was saved (check database)
- Refresh enrollments page

## Migration Notes

- Existing data is automatically migrated
- Legacy fields are preserved for backward compatibility
- Both old and new field names work during transition period

## Support

For issues or questions, check:
1. Implementation summary document
2. TypeScript types in `supabase-config.ts`
3. Service methods in `src/lib/supabase.ts`

