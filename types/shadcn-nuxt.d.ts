// Augment Nuxt types to include the `shadcn` module options so
// `nuxt.config.ts` doesn't show a TS error when specifying `shadcn: {}`.
import 'nuxt/schema'

declare module 'nuxt/schema' {
  interface NuxtConfig {
    /**
     * Options for the shadcn-nuxt module (shadcn-vue integration)
     */
    shadcn?: {
      /** Prefix for auto-imported components (defaults to '') */
      prefix?: string
      /** Directory where shadcn-generated components live */
      componentDir?: string
    }
  }

  // Also augment NuxtOptions used at runtime if needed
  interface NuxtOptions {
    shadcn?: {
      prefix?: string
      componentDir?: string
    }
  }
}
