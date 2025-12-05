import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../../supabase-config';

// Create Supabase client
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

// Database helper functions
export class SupabaseService {
  // Users
  static async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async createUser(user: any) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateUser(id: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteUser(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Categories
  static async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }

  static async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async createCategory(category: any) {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateCategory(id: string, updates: any) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteCategory(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  static async updateCategoryOrder(categories: { id: string; display_order: number }[]) {
    const updates = categories.map(cat => 
      supabase
        .from('categories')
        .update({ display_order: cat.display_order })
        .eq('id', cat.id)
    );
    
    const results = await Promise.all(updates);
    const errors = results.filter(r => r.error);
    
    if (errors.length > 0) {
      throw errors[0].error;
    }
  }

  // Formations
  static async getFormations() {
    const { data, error } = await supabase
      .from('formations')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getFormationsByCategory(categoryId: string) {
    const { data, error } = await supabase
      .from('formations')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getPopularFormations() {
    const { data, error } = await supabase
      .from('formations')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_popular', true)
      .eq('is_active', true)
      .order('rating', { ascending: false })
      .limit(6);
    
    if (error) throw error;
    return data;
  }

  static async getFormationBySlug(slug: string) {
    const { data, error } = await supabase
      .from('formations')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async createFormation(formation: any) {
    const { data, error } = await supabase
      .from('formations')
      .insert([formation])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateFormation(id: string, updates: any) {
    const { data, error } = await supabase
      .from('formations')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        category:categories(*),
        trainer:users(*)
      `)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteFormation(id: string) {
    const { error } = await supabase
      .from('formations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  static async getAllFormationsForAdmin() {
    const { data, error } = await supabase
      .from('formations')
      .select(`
        *,
        categories!left(id, name, slug, color),
        users!left(id, full_name, avatar_url)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Blog Categories
  static async getBlogCategories() {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }

  // Blog Articles
  static async getBlogArticles() {
    const { data, error } = await supabase
      .from('blog_articles')
      .select(`
        *,
        category:blog_categories(*),
        author:users(*)
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getFeaturedBlogArticles() {
    const { data, error } = await supabase
      .from('blog_articles')
      .select(`
        *,
        category:blog_categories(*),
        author:users(*)
      `)
      .eq('is_featured', true)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(2);
    
    if (error) throw error;
    return data;
  }

  static async getBlogArticlesByCategory(categoryId: string) {
    const { data, error } = await supabase
      .from('blog_articles')
      .select(`
        *,
        category:blog_categories(*),
        author:users(*)
      `)
      .eq('category_id', categoryId)
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getBlogArticleBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_articles')
      .select(`
        *,
        category:blog_categories(*),
        author:users(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Client References
  static async getClientReferences() {
    const { data, error } = await supabase
      .from('client_references')
      .select('*')
      .order('project_date', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getFeaturedClientReferences() {
    const { data, error } = await supabase
      .from('client_references')
      .select('*')
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(6);
    
    if (error) throw error;
    return data;
  }

  // Gallery
  static async getGalleryImages(category?: string) {
    let query = supabase
      .from('gallery')
      .select('*')
      .eq('status', 'active')
      .order('upload_date', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  }

  static async getTrainerImages() {
    return this.getGalleryImages('trainers');
  }

  // Consultations
  static async createConsultation(consultation: any) {
    const { data, error } = await supabase
      .from('consultations')
      .insert([consultation])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getConsultations() {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Contact Messages
  static async createContactMessage(message: any) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([message])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getContactMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Newsletter
  static async subscribeToNewsletter(email: string, source = 'website') {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, source }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getNewsletterSubscribers() {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('status', 'active')
      .order('subscribed_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Site Settings
  static async getSiteSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('is_public', true);
    
    if (error) throw error;
    return data;
  }

  static async getSiteSetting(key: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .eq('is_public', true)
      .single();
    
    if (error) throw error;
    return data?.value;
  }

  // Analytics
  static async trackPageView(pageData: any) {
    const { data, error } = await supabase
      .from('analytics')
      .insert([{
        page_path: pageData.path,
        user_agent: pageData.userAgent,
        referrer: pageData.referrer,
        session_id: pageData.sessionId,
        event_type: 'page_view'
      }]);
    
    if (error) console.error('Analytics tracking error:', error);
    return data;
  }

  static async trackEvent(eventData: any) {
    const { data, error } = await supabase
      .from('analytics')
      .insert([eventData]);
    
    if (error) console.error('Event tracking error:', error);
    return data;
  }

  // Storage
  static async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    return data;
  }

  static async getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  }

  static async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) throw error;
  }

  // Enrollments
  static async createEnrollment(enrollment: any) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([enrollment])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getEnrollments(filters?: {
    status?: string;
    source?: string;
    language?: string;
  }) {
    let query = supabase
      .from('enrollments')
      .select(`
        *,
        formation:formations(id, title, slug, price, currency, title_fr, title_ar)
      `)
      .order('enrollment_date', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.source) {
      query = query.eq('source', filters.source);
    }
    if (filters?.language) {
      query = query.eq('language_preference', filters.language);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  }

  static async updateEnrollmentStatus(id: string, updates: any) {
    const { data, error } = await supabase
      .from('enrollments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}
