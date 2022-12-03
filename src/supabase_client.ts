import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://orktigushjmxmztfwmpd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ya3RpZ3VzaGpteG16dGZ3bXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwNTA2NTksImV4cCI6MTk4NTYyNjY1OX0.4XZvJi1jWbj5GWqRHB7Jgri7jnGMFGk-vkFKgeNDU0s';

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;