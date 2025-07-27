// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_API_KEY: string;
  // Add other variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
