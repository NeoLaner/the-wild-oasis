import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cbaachccjnpmcutikpow.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiYWFjaGNjam5wbWN1dGlrcG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyMzY2MDYsImV4cCI6MjAwNjgxMjYwNn0.u64-7agU6hDNbO3UdV69-a6mIzXtGTGMwrwvHX4AaZ4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
