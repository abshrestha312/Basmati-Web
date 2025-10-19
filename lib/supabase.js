import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://qtrypzzcjebvfcihiynt.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cnlwenpjamVidmZjaWhpeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNjcyMDAsImV4cCI6MjAxOTY0MzIwMH0.example'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Database table names
export const TABLES = {
  PRODUCTS: 'products',
  USERS: 'users',
  SALES_FLYERS: 'sales_flyers'
}

// Storage bucket names
export const BUCKETS = {
  PRODUCT_IMAGES: 'product-images',
  FLYER_IMAGES: 'flyer-images'
}