/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TITLE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_BASE_URL:String
  readonly VITE_TITLE:String
  readonly VITE_SKIP_LOGIN:String
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}