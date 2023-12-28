import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mpafrxyswyoyqactbzvv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWZyeHlzd3lveXFhY3RienZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4OTgwNjEsImV4cCI6MjAxODQ3NDA2MX0.zLUNSBrnRsWmAKCOvJo7mC_9viQ1N7Fn6qD2n9d7-5I';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
