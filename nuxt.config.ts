// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  nitro: {
    prerender: {
      failOnError: false, // ⚠️ Ignora errores 404 en prerender
    },
  },
  css: ['~/assets/css/tailwind.css'],
  // Ensure Nuxt auto-registers components
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * By default the module expects `./components/ui` but this project places UI
     * components under `app/components/ui`, so point the module there.
     */
    componentDir: './app/components/ui'
  },
})