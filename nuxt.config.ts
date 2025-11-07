// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
    ],
  },
  // Ensure Nuxt auto-registers components placed under `app/components`
  components: [
    {
      path: '~/app/components',
      pathPrefix: false,
    },
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