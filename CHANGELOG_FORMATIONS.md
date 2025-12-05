# Changelog - Bilingual Formations System

## [1.0.0] - 2025-12-03

### Added

#### Database
- Bilingual fields for `formations` table (title_fr, title_ar, description_fr, description_ar, etc.)
- Bilingual fields for `categories` table (name_fr, name_ar, description_fr, description_ar)
- Enhanced pricing fields (price_ht, price_ttc)
- New `enrollments` table with CRM fields
- New `landing_pages` table for AI-generated content
- Automatic `updated_at` triggers for all tables
- Performance indexes on key fields

#### TypeScript Types
- Extended `Formation` interface with bilingual fields
- Extended `Category` interface with bilingual fields
- New `Enrollment` interface
- New `LandingPage` interface
- Backward compatibility with legacy fields

#### Service Layer
- Category CRUD methods (`createCategory`, `updateCategory`, `deleteCategory`)
- Category reordering (`updateCategoryOrder`)
- File storage methods (`uploadFile`, `getPublicUrl`, `deleteFile`)
- Enrollment management (`createEnrollment`, `getEnrollments`, `updateEnrollmentStatus`)

#### Admin Components
- **BilingualCourseForm**: Complete course editor with tabs for General, French, Arabic, and Media
- **Categories Management Page**: Full CRUD interface with reordering
- **EnrollmentsCRM Page**: Professional CRM dashboard for managing enrollments

#### Public Pages
- **BilingualCourseDetail**: Public course page with language switcher
- RTL support for Arabic content
- Language-aware content display with fallbacks

#### Routing
- `/admin/categories` - Categories management
- `/admin/enrollments` - CRM enrollments (replaces old page)
- `/formation/:slug` - Updated to use BilingualCourseDetail
- `/course/:slug` - Alternative route for course detail

### Changed

- Updated `src/App.tsx` routing to include new pages
- Updated `supabase-config.ts` with new type definitions
- Extended `src/lib/supabase.ts` with new service methods

### Migration Notes

- All existing data is automatically migrated to new fields
- Legacy fields remain for backward compatibility
- Database migration required before deployment

### Security

- Storage bucket policies configured for public read, authenticated write
- Enrollment data includes proper validation
- Category deletion includes confirmation dialog

### Performance

- Added indexes on frequently queried fields
- Optimized queries with proper joins
- Efficient filtering on enrollment list

---

## Future Enhancements (Planned)

### v1.1.0
- AI landing page generation
- Email notifications on enrollment
- Advanced analytics dashboard

### v1.2.0
- Payment processing integration
- Certificate generation
- Student portal

### v1.3.0
- Multi-language support (beyond FR/AR)
- Content versioning
- Approval workflow

---

## Breaking Changes

None - All changes are backward compatible.

---

## Contributors

- Development team

## License

Same as parent project.

