import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqbHl2c2J2d2ZxZHlmcGF4c2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MjYyOTUsImV4cCI6MjA1MDEwMjI5NX0.8DYCYOKEg9-gYzJ_2ygWmhOlyWrh8iWQhe5hT-mkL_Y';

export const supabase = createClient(supabaseUrl, supabaseKey);
