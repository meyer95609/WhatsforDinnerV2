// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://occqboivivsxdqgrfkgt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jY3Fib2l2aXZzeGRxZ3Jma2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODk2MjUsImV4cCI6MjA2NDQ2NTYyNX0.A2R0mXpdiRUil1sSZ8TpNiOgVpiAHyqB4dFgP-f4hG0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
