// Replace these values with the URL and anon/public key from Supabase > Project Settings > API.
// Never put a service_role key or an admin password in browser code.
window.SALLA7LY_SUPABASE_CONFIG = {
  url: "https://igqetcaundyyosvjpfuk.supabase.co",
  anonKey: "sb_publishable__yb5_ToISnboPnCGcVJE5w_ZCsmarNA"
};

window.salla7lySupabase = window.supabase.createClient(
  window.SALLA7LY_SUPABASE_CONFIG.url,
  window.SALLA7LY_SUPABASE_CONFIG.anonKey
);
