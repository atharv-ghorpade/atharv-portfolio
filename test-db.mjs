import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nnxkvfafuqrynwqkevdj.supabase.co'
const supabaseAnonKey = 'sb_publishable_3crgP9Yf3dLAYxfX-ooXkQ_JxnNpMPg'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log("Testing connection to Supabase...")
  const { data, error } = await supabase.from('assignments').select('id').limit(1)
  
  if (error) {
    console.error("Connection or Query Error:", error.message)
  } else {
    console.log("Database connected successfully! 'assignments' table exists.")
    console.log("Rows found:", data.length)
  }
}

testConnection()
