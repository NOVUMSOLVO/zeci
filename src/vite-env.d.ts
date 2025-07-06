/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYPAL_CLIENT_ID: string
  readonly VITE_PAYNOW_INTEGRATION_ID: string
  readonly VITE_PAYNOW_INTEGRATION_KEY: string
  readonly VITE_WHATSAPP_BUSINESS_API_URL: string
  readonly VITE_WHATSAPP_ACCESS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
