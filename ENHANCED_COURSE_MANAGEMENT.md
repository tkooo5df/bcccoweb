# Enhanced Course Management System - Architecture & Design

**Version**: 2.0  
**Date**: December 5, 2025  
**Status**: Production Enhancement

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current System Architecture](#current-system-architecture)
3. [Existing Database Schema](#existing-database-schema)
4. [Current Component Structure](#current-component-structure)
5. [API Services Overview](#api-services-overview)
6. [Enhanced System Design](#enhanced-system-design)
7. [Database Schema Additions](#database-schema-additions)
8. [New Components Design](#new-components-design)
9. [Service Layer Enhancements](#service-layer-enhancements)
10. [CRM Integration Architecture](#crm-integration-architecture)
11. [Implementation Roadmap](#implementation-roadmap)

---

## Executive Summary

### Current System
BCOS Training Platform is a React/TypeScript-based training management system with:
- Bilingual course management (French/Arabic)
- Admin panel for course creation
- Enrollment forms
- Supabase backend integration
- AI-powered content generation (Google Gemini)

### Enhancement Goals
Transform the existing system into an enterprise-grade platform with:
- **CRM Integration**: Automatic enrollment forwarding to external CRMs
- **Dynamic Form Builder**: Custom enrollment forms per course
- **Advanced Course Forms**: Enhanced bilingual course creation
- **Audit Trail**: Complete logging of CRM activities
- **Flexible Mapping**: Course-to-CRM field mapping

---

## Current System Architecture

### Technology Stack
```
Frontend:
├── React 18.3.1
├── TypeScript 5.6.2
├── Vite 5.4.2
├── TailwindCSS 3.4.1
├── Shadcn UI Components
└── React Router DOM 6.x

Backend:
├── Supabase (PostgreSQL)
├── Supabase Storage
├── Supabase Auth
└── Edge Functions (potential)

AI Integration:
└── Google Gemini API (gemini-3-pro-preview)

Deployment:
├── Netlify (primary)
└── Vercel (alternative)
```

### Project Structure
```
bcos-renewal-main/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── BilingualCourseForm.tsx   ✅ Existing
│   │   │   ├── CourseForm.tsx            ✅ Existing
│   │   │   ├── HTMLEditor.tsx            ✅ Existing
│   │   │   └── AdminLayout.tsx           ✅ Existing
│   │   ├── EnrollmentForm.tsx            ✅ Existing
│   │   ├── SimpleEnrollmentForm.tsx      ✅ Existing
│   │   └── ui/                           ✅ Shadcn Components
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Courses.tsx               ✅ Existing
│   │   │   ├── Categories.tsx            ✅ Existing
│   │   │   ├── EnrollmentsCRM.tsx        ✅ Existing
│   │   │   ├── Dashboard.tsx             ✅ Existing
│   │   │   └── Login.tsx                 ✅ Existing
│   │   └── BilingualCourseDetail.tsx     ✅ Existing
│   ├── lib/
│   │   ├── supabase.ts                   ✅ Service Layer
│   │   ├── aiService.ts                  ✅ AI Integration
│   │   └── utils.ts                      ✅ Utilities
│   └── hooks/
│       └── useSupabase.ts                ✅ Custom Hooks
├── migrations/
│   ├── 001_bilingual_formations.sql      ✅ Initial Schema
│   └── 001_bilingual_formations_adapted.sql ✅ Adapted Schema
└── supabase-config.ts                    ✅ Type Definitions
```

---

## Existing Database Schema

### Core Tables (Currently Implemented)

#### 1. **formations** (Courses)
```sql
formations (
  id UUID PRIMARY KEY,
  
  -- Legacy Fields
  title TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  content TEXT,
  
  -- Bilingual Fields
  title_fr TEXT,
  title_ar TEXT,
  description_fr TEXT,
  description_ar TEXT,
  content_fr TEXT,
  content_ar TEXT,
  objectives_fr TEXT[],
  objectives_ar TEXT[],
  prerequisites_fr TEXT,
  prerequisites_ar TEXT,
  program_fr TEXT,
  program_ar TEXT,
  target_audience_fr TEXT,
  target_audience_ar TEXT,
  
  -- Pricing
  price DECIMAL(10,2),
  price_ht DECIMAL(10,2),
  price_ttc DECIMAL(10,2),
  currency TEXT DEFAULT 'EUR',
  
  -- Metadata
  category_id UUID REFERENCES categories(id),
  duration TEXT,
  level TEXT,
  max_participants INTEGER,
  reference TEXT,
  tags TEXT[],
  cover_image_url TEXT,
  
  -- Flags
  is_published BOOLEAN DEFAULT true,
  is_online BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

#### 2. **categories**
```sql
categories (
  id UUID PRIMARY KEY,
  name TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  
  -- Bilingual
  name_fr TEXT,
  name_ar TEXT,
  description_fr TEXT,
  description_ar TEXT,
  
  -- Display
  icon TEXT,
  color TEXT,
  display_order INTEGER,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

#### 3. **enrollments**
```sql
enrollments (
  id UUID PRIMARY KEY,
  formation_id UUID REFERENCES formations(id),
  course_id UUID, -- Legacy
  
  -- User Info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  position TEXT,
  
  -- Details
  experience_level TEXT,
  motivation TEXT,
  preferred_date TEXT,
  how_did_you_hear TEXT,
  special_requirements TEXT,
  
  -- Status
  status TEXT DEFAULT 'new', -- new, to_confirm, confirmed, cancelled
  source TEXT,
  language_preference TEXT, -- fr, ar
  
  -- Notes
  notes TEXT,
  commercial_notes TEXT,
  
  -- Dates
  contact_date TIMESTAMPTZ,
  follow_up_date TIMESTAMPTZ,
  enrollment_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

#### 4. **landing_pages** (AI-Generated)
```sql
landing_pages (
  id UUID PRIMARY KEY,
  formation_id UUID REFERENCES formations(id),
  language TEXT, -- fr, ar
  title TEXT,
  meta_description TEXT,
  hero_content TEXT,
  features JSONB,
  testimonials JSONB,
  cta_text TEXT,
  seo_keywords TEXT[],
  is_active BOOLEAN DEFAULT true,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

---

## Current Component Structure

### Admin Components

#### **BilingualCourseForm** ✅
- **Purpose**: Advanced course creation with bilingual support
- **Features**:
  - Tabs: General, French, Arabic, Media
  - HTML content editors
  - AI content generation (Gemini API)
  - Image upload to Supabase Storage
  - Auto-slug generation
  - Price TTC calculation
- **Location**: `src/components/admin/BilingualCourseForm.tsx`

#### **Categories Management** ✅
- **Purpose**: CRUD operations for categories
- **Features**:
  - Create/edit/delete categories
  - Bilingual names/descriptions
  - Color picker
  - Display order management
- **Location**: `src/pages/admin/Categories.tsx`

#### **EnrollmentsCRM** ✅
- **Purpose**: CRM interface for enrollments
- **Features**:
  - List all enrollments
  - Filter by status, source, language
  - Update enrollment status
  - View details
  - Stats dashboard
- **Location**: `src/pages/admin/EnrollmentsCRM.tsx`

### Public Components

#### **BilingualCourseDetail** ✅
- **Purpose**: Public course detail page
- **Features**:
  - Language switcher (FR/AR)
  - Display course info based on language
  - Enrollment form
  - RTL support for Arabic
- **Location**: `src/pages/BilingualCourseDetail.tsx`

#### **EnrollmentForm** ✅
- **Purpose**: Course enrollment form
- **Features**:
  - User information collection
  - Company/position fields
  - Special requirements
  - Language preference tracking
- **Location**: `src/components/EnrollmentForm.tsx`

---

## API Services Overview

### SupabaseService (`src/lib/supabase.ts`)

#### Course Methods
```typescript
static async getFormations()
static async getFormationById(id: string)
static async getFormationBySlug(slug: string)
static async createFormation(formation: any)
static async updateFormation(id: string, updates: any)
static async deleteFormation(id: string)
```

#### Category Methods
```typescript
static async getCategories()
static async createCategory(category: any)
static async updateCategory(id: string, updates: any)
static async deleteCategory(id: string)
```

#### Enrollment Methods
```typescript
static async createEnrollment(enrollment: any)
static async getEnrollments(filters?: any)
static async updateEnrollmentStatus(id: string, status: string)
```

#### Storage Methods
```typescript
static async uploadFile(bucket: string, path: string, file: File)
static async getPublicUrl(bucket: string, path: string)
static async deleteFile(bucket: string, path: string)
```

### AIService (`src/lib/aiService.ts`)

#### Content Generation
```typescript
static async generateCourseContent(prompt: string, language: 'fr' | 'ar')
```
- Uses Google Gemini API
- Generates HTML-formatted course content
- Follows specific template structure
- Supports bilingual generation

---

## Enhanced System Design

### Goals
1. ✅ **CRM Integration**: Forward enrollments to external CRMs
2. ✅ **Dynamic Forms**: Custom enrollment forms per course
3. ✅ **Audit Trail**: Log all CRM activities
4. ✅ **Flexible Mapping**: Map course fields to CRM fields
5. ✅ **Retry Logic**: Handle failed CRM submissions

### Architecture Principles
- **Non-Blocking**: CRM forwarding won't block user experience
- **Auditable**: All CRM activities are logged
- **Configurable**: Easy to add new CRM integrations
- **Testable**: Connection testing before activation
- **Resilient**: Automatic retry for failed submissions

---

## Database Schema Additions

### New Tables for CRM Integration

#### 1. **crm_integrations**
```sql
CREATE TABLE crm_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('webhook', 'email', 'api')),
  provider TEXT, -- 'hubspot', 'salesforce', 'pipedrive', etc.
  config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_tested_at TIMESTAMPTZ,
  test_status TEXT CHECK (test_status IN ('success', 'failed', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example config for webhook:
{
  "endpoint": "https://api.example.com/webhook",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer xxx",
    "Content-Type": "application/json"
  },
  "timeout": 30000
}

-- Example config for email:
{
  "to": "sales@example.com",
  "cc": "info@example.com",
  "subject_template": "New Enrollment: {{course_title}}",
  "smtp_config": { ... }
}

-- Example config for API:
{
  "provider": "hubspot",
  "api_key": "xxx",
  "endpoint": "https://api.hubspot.com/crm/v3/objects/contacts"
}
```

#### 2. **formation_crm_mappings**
```sql
CREATE TABLE formation_crm_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formation_id UUID REFERENCES formations(id) ON DELETE CASCADE,
  crm_integration_id UUID REFERENCES crm_integrations(id) ON DELETE CASCADE,
  field_mappings JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(formation_id, crm_integration_id)
);

-- Example field_mappings:
{
  "full_name": "contact.name",
  "email": "contact.email",
  "phone": "contact.phone",
  "company": "company.name",
  "position": "contact.title",
  "course_title": "deal.product"
}
```

#### 3. **crm_logs**
```sql
CREATE TABLE crm_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  crm_integration_id UUID REFERENCES crm_integrations(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'pending')),
  request_data JSONB,
  response_data JSONB,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  next_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_crm_logs_enrollment ON crm_logs(enrollment_id);
CREATE INDEX idx_crm_logs_status ON crm_logs(status);
CREATE INDEX idx_crm_logs_next_retry ON crm_logs(next_retry_at) WHERE status = 'pending';
```

#### 4. **formations** (Add columns)
```sql
ALTER TABLE formations
ADD COLUMN IF NOT EXISTS inscription_form_fields JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS inscription_form_template TEXT;

-- Example inscription_form_fields:
[
  {
    "id": "field_1",
    "name": "full_name",
    "type": "text",
    "label_fr": "Nom complet",
    "label_ar": "الاسم الكامل",
    "required": true,
    "order": 1
  },
  {
    "id": "field_2",
    "name": "email",
    "type": "email",
    "label_fr": "Email",
    "label_ar": "البريد الإلكتروني",
    "required": true,
    "order": 2
  },
  {
    "id": "field_3",
    "name": "phone",
    "type": "phone",
    "label_fr": "Téléphone",
    "label_ar": "الهاتف",
    "required": true,
    "order": 3
  },
  {
    "id": "field_4",
    "name": "company",
    "type": "text",
    "label_fr": "Entreprise",
    "label_ar": "الشركة",
    "required": false,
    "order": 4
  },
  {
    "id": "field_5",
    "name": "motivation",
    "type": "textarea",
    "label_fr": "Motivation",
    "label_ar": "الدافع",
    "placeholder_fr": "Pourquoi souhaitez-vous suivre cette formation?",
    "placeholder_ar": "لماذا تريد متابعة هذا التدريب؟",
    "required": false,
    "order": 5
  },
  {
    "id": "field_6",
    "name": "how_did_you_hear",
    "type": "select",
    "label_fr": "Comment avez-vous connu BCOS?",
    "label_ar": "كيف سمعت عن BCOS؟",
    "options": [
      {"value": "google", "label_fr": "Google", "label_ar": "جوجل"},
      {"value": "social", "label_fr": "Réseaux sociaux", "label_ar": "وسائل التواصل الاجتماعي"},
      {"value": "referral", "label_fr": "Recommandation", "label_ar": "توصية"}
    ],
    "required": false,
    "order": 6
  }
]
```

### Database Functions

#### 1. **get_crm_integrations_for_formation**
```sql
CREATE OR REPLACE FUNCTION get_crm_integrations_for_formation(p_formation_id UUID)
RETURNS TABLE (
  integration_id UUID,
  integration_name TEXT,
  integration_type TEXT,
  provider TEXT,
  config JSONB,
  field_mappings JSONB,
  is_active BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ci.id,
    ci.name,
    ci.type,
    ci.provider,
    ci.config,
    fcm.field_mappings,
    fcm.is_active
  FROM crm_integrations ci
  INNER JOIN formation_crm_mappings fcm 
    ON ci.id = fcm.crm_integration_id
  WHERE fcm.formation_id = p_formation_id
    AND ci.is_active = true
    AND fcm.is_active = true;
END;
$$ LANGUAGE plpgsql;
```

#### 2. **log_crm_activity**
```sql
CREATE OR REPLACE FUNCTION log_crm_activity(
  p_enrollment_id UUID,
  p_crm_integration_id UUID,
  p_status TEXT,
  p_request_data JSONB,
  p_response_data JSONB,
  p_error_message TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO crm_logs (
    enrollment_id,
    crm_integration_id,
    status,
    request_data,
    response_data,
    error_message
  ) VALUES (
    p_enrollment_id,
    p_crm_integration_id,
    p_status,
    p_request_data,
    p_response_data,
    p_error_message
  ) RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql;
```

#### 3. **get_failed_crm_logs_for_retry**
```sql
CREATE OR REPLACE FUNCTION get_failed_crm_logs_for_retry(p_max_retries INTEGER DEFAULT 3)
RETURNS TABLE (
  log_id UUID,
  enrollment_id UUID,
  crm_integration_id UUID,
  retry_count INTEGER,
  request_data JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    id,
    enrollment_id,
    crm_integration_id,
    retry_count,
    request_data
  FROM crm_logs
  WHERE status = 'failed'
    AND retry_count < p_max_retries
    AND (next_retry_at IS NULL OR next_retry_at <= NOW())
  ORDER BY created_at ASC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;
```

### Triggers

#### Auto-update timestamps
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_crm_integrations_updated_at
BEFORE UPDATE ON crm_integrations
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_formation_crm_mappings_updated_at
BEFORE UPDATE ON formation_crm_mappings
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_crm_logs_updated_at
BEFORE UPDATE ON crm_logs
FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## New Components Design

### 1. **EnhancedCourseForm** (Upgrade existing BilingualCourseForm)

**Purpose**: Advanced course creation with form builder

**New Features**:
- ✅ Add "Form" tab for configuring enrollment form fields
- ✅ Drag-and-drop field ordering
- ✅ Field type selector (text, email, phone, textarea, select, checkbox, date)
- ✅ Bilingual labels and placeholders
- ✅ Required/optional toggle per field
- ✅ Preview mode for form

**Component Structure**:
```typescript
interface FormField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'date';
  label_fr: string;
  label_ar: string;
  required: boolean;
  placeholder_fr?: string;
  placeholder_ar?: string;
  options?: { value: string; label_fr: string; label_ar: string }[];
  order: number;
}
```

**Tabs**:
1. **General**: Title, slug, category, reference, tags, published status
2. **Content**: HTML editors for FR/AR content, objectives, prerequisites, program
3. **Form**: Custom enrollment form builder (**NEW**)
4. **Pricing**: Price HT/TTC, currency, duration, level, max participants

### 2. **DynamicEnrollmentForm** (New)

**Purpose**: Auto-generated enrollment form based on course configuration

**Features**:
- Render form based on `inscription_form_fields` JSON
- Support all field types
- Client-side validation
- Bilingual labels based on language selection
- Submit to Supabase + forward to CRM

**Props**:
```typescript
interface DynamicEnrollmentFormProps {
  course: Formation;
  language: 'fr' | 'ar';
  onSuccess?: () => void;
}
```

**Usage**:
```tsx
<DynamicEnrollmentForm
  course={course}
  language={selectedLanguage}
  onSuccess={() => toast.success('Inscription envoyée!')}
/>
```

### 3. **CRMIntegrationManager** (New Admin Page)

**Purpose**: Manage CRM integrations and mappings

**Features**:
- List all CRM integrations
- Add new integration (webhook, email, API)
- Test connection
- Configure field mappings per formation
- View CRM logs
- Retry failed submissions

**Sections**:
1. **Integrations List**: All configured CRMs
2. **Add Integration**: Form to add new CRM
3. **Field Mappings**: Map formation fields to CRM fields
4. **Logs**: Audit trail of CRM activities
5. **Retry Queue**: Failed submissions awaiting retry

---

## Service Layer Enhancements

### 1. **CRMService** (New)

**File**: `src/lib/crmService.ts`

**Purpose**: Handle enrollment forwarding to external CRMs

**Methods**:
```typescript
export class CRMService {
  // Main method: Forward enrollment to all active CRMs for a formation
  static async forwardEnrollment(
    enrollment: Enrollment,
    formationId: string
  ): Promise<void>

  // Test CRM connection
  static async testConnection(crmConfig: CRMConfig): Promise<boolean>

  // Forward via webhook
  private static async forwardViaWebhook(
    enrollment: Enrollment,
    config: any,
    mappings: any
  ): Promise<any>

  // Forward via email
  private static async forwardViaEmail(
    enrollment: Enrollment,
    config: any,
    mappings: any
  ): Promise<any>

  // Forward via API (HubSpot, Salesforce, etc.)
  private static async forwardViaAPI(
    enrollment: Enrollment,
    config: any,
    provider: string,
    mappings: any
  ): Promise<any>

  // Provider-specific methods
  private static async forwardToHubSpot(...)
  private static async forwardToSalesforce(...)
  private static async forwardToPipedrive(...)

  // Format data according to field mappings
  private static formatEnrollmentData(
    enrollment: Enrollment,
    mappings: any
  ): any

  // Retry failed submissions
  static async retryFailedSubmissions(): Promise<void>
}
```

**Usage Example**:
```typescript
// After creating enrollment
const enrollment = await SupabaseService.createEnrollment(data);

// Forward to CRM (non-blocking)
CRMService.forwardEnrollment(enrollment, formationId)
  .catch(err => console.error('CRM forwarding failed:', err));
```

### 2. **SupabaseServiceExtended** (Enhancement)

**File**: `src/lib/supabaseExtended.ts` or extend `src/lib/supabase.ts`

**New Methods**:
```typescript
// CRM Integration Methods
static async getCRMIntegrations()
static async getCRMIntegrationById(id: string)
static async createCRMIntegration(config: any)
static async updateCRMIntegration(id: string, updates: any)
static async deleteCRMIntegration(id: string)

// Formation CRM Mappings
static async getCRMIntegrationsForFormation(formationId: string)
static async mapFormationToCRM(
  formationId: string,
  crmIntegrationId: string,
  fieldMappings: any
)
static async removeCRMMapping(formationId: string, crmIntegrationId: string)

// CRM Logs
static async logCRMActivity(
  enrollmentId: string,
  crmIntegrationId: string,
  status: string,
  requestData: any,
  responseData: any,
  errorMessage?: string
)
static async getCRMLogsForEnrollment(enrollmentId: string)
static async getFailedCRMLogsForRetry()
static async updateCRMLogStatus(
  logId: string,
  status: string,
  responseData?: any,
  errorMessage?: string
)

// Formation Inscription Form
static async updateFormationInscriptionForm(
  formationId: string,
  formFields: FormField[]
)
static async getFormationWithInscriptionForm(formationId: string)
```

---

## CRM Integration Architecture

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       USER SUBMISSION                       │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│        1. Save Enrollment to Supabase (enrollments)         │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│    2. Get CRM Integrations for Formation (active only)      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│           3. For Each CRM Integration (async):              │
│              ├─ Format data using field mappings            │
│              ├─ Forward to CRM (webhook/email/API)          │
│              ├─ Log result to crm_logs table                │
│              └─ Handle errors gracefully                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
┌───────────────────────┐   ┌───────────────────────┐
│     SUCCESS           │   │     FAILURE           │
│  - Log success        │   │  - Log error          │
│  - Return 200         │   │  - Set retry_count    │
└───────────────────────┘   │  - Set next_retry_at  │
                            └───────────────────────┘
                                        │
                                        ▼
                            ┌───────────────────────┐
                            │  Background Job       │
                            │  (Retry Queue)        │
                            │  - Check failed logs  │
                            │  - Retry up to 3x     │
                            └───────────────────────┘
```

### CRM Types

#### 1. **Webhook**
Send HTTP POST to custom endpoint
```typescript
{
  type: 'webhook',
  config: {
    endpoint: 'https://api.example.com/enrollments',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer xxx',
      'Content-Type': 'application/json'
    },
    timeout: 30000
  }
}
```

#### 2. **Email**
Send formatted email
```typescript
{
  type: 'email',
  config: {
    to: 'sales@example.com',
    cc: 'info@example.com',
    subject_template: 'Nouvelle inscription: {{course_title}}',
    body_template: '...' // HTML template
  }
}
```

#### 3. **API (HubSpot, Salesforce, Pipedrive)**
Use provider-specific API
```typescript
{
  type: 'api',
  provider: 'hubspot',
  config: {
    api_key: 'xxx',
    endpoint: 'https://api.hubspot.com/crm/v3/objects/contacts'
  }
}
```

### Field Mapping Example

```json
{
  "source_to_target": {
    "full_name": "contact.name",
    "email": "contact.email",
    "phone": "contact.phone",
    "company": "company.name",
    "position": "contact.title",
    "course_title_fr": "deal.product_name",
    "course_reference": "deal.product_code",
    "price_ttc": "deal.amount",
    "enrollment_date": "deal.close_date"
  },
  "static_values": {
    "deal.pipeline": "training",
    "deal.stage": "new_lead",
    "contact.lead_source": "website_form"
  }
}
```

---

## Implementation Roadmap

### Phase 1: Database ✅ (READY)
- Create migration file `002_crm_integration.sql`
- Add tables: `crm_integrations`, `formation_crm_mappings`, `crm_logs`
- Add columns to `formations`: `inscription_form_fields`, `inscription_form_template`
- Create functions and triggers
- Test migration locally

### Phase 2: Backend Services ⏳ (NEXT)
- Create `CRMService` class
- Implement webhook forwarding
- Implement email forwarding
- Implement API forwarding (HubSpot, Salesforce, Pipedrive)
- Extend `SupabaseService` with CRM methods
- Add error handling and retry logic

### Phase 3: Admin Components ⏳
- Enhance `BilingualCourseForm` with Form Builder tab
- Create `CRMIntegrationManager` page
- Create field mapping UI
- Add CRM logs viewer
- Test connection functionality

### Phase 4: Public Components ⏳
- Create `DynamicEnrollmentForm` component
- Update `BilingualCourseDetail` to use dynamic form
- Test form rendering for different field types
- Validate client-side

### Phase 5: Integration & Testing ⏳
- Integrate CRM forwarding in enrollment flow
- Test webhook integration
- Test email forwarding
- Test API integrations (HubSpot, Salesforce)
- Load testing
- Error scenario testing

### Phase 6: Documentation & Deployment ⏳
- Complete documentation
- Create admin guide
- Create API documentation
- Deployment to production
- Monitor CRM logs

---

## Success Metrics

### After Implementation:
✅ Can create custom enrollment forms per course  
✅ Enrollments automatically forward to configured CRMs  
✅ All CRM activities are logged for audit  
✅ Failed submissions retry automatically (up to 3x)  
✅ Admin can test CRM connections before activation  
✅ Field mappings are flexible and configurable  
✅ System handles errors gracefully without blocking users  
✅ Performance impact is minimal (async processing)  

---

## Support & Maintenance

### Regular Tasks
- Monitor CRM logs for failures
- Review retry queue weekly
- Update CRM API credentials as needed
- Add new CRM providers as requested

### Troubleshooting
- Check `crm_logs` table for error messages
- Test CRM connection using built-in test feature
- Verify field mappings are correct
- Check rate limits for API providers

---

**Document Version**: 2.0  
**Last Updated**: December 5, 2025  
**Status**: Ready for Implementation  
**Next Step**: Create Phase 2 migration file

