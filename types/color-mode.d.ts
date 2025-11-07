// Declaración de tipos para useColorMode y otras utilidades de Nuxt
declare module '#imports' {
  export { useColorMode } from '@nuxtjs/color-mode/dist/runtime/composables/colorMode'
}

// Extender tipos de Nuxt para color-mode
declare module '@nuxt/schema' {
  interface RuntimeConfig {
    colorMode?: {
      classSuffix?: string
    }
  }
}