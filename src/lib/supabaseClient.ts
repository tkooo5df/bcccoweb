import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ffflrykazordaryhwrlr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZmxyeWthem9yZGFyeWh3cmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MzA0MzYsImV4cCI6MjA3ODUwNjQzNn0.go1MuwHFoJ-hJzQ7aIo3NXhfxoG08WRIeGm6oIbOwTo';

// Create a single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false // Disable session persistence to avoid auth issues
  }
});

export default supabase;

