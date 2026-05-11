import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bymhmpsrxyqhfvkeuhmd.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bWhtcHNyeHlxaGZ2a2V1aG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NjA5MzQsImV4cCI6MjA5NDAzNjkzNH0.9bwOMW98NWoOO7TOtR2j10xbD4Ebymp5BfhUdeQJrso"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)