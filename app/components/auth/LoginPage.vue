<script lang="ts">
export const description
  = "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."
export const iframeHeight = "800px"
export const containerClass = "w-full h-full p-4 lg:p-0"
</script>

<script setup lang="ts">
import { ref } from "vue"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import RegisterPage from './RegisterPage.vue'
  

const showRegister = ref(false)

// ✅ Emite un evento hacia el padre (App.vue)
const emit = defineEmits(['login-success'])

function handleLogin() {
  // Aquí podrías validar usuario y contraseña
  // Pero por ahora solo emitimos el evento:
  emit('login-success')
}
</script>

<template>
  <RegisterPage v-model:open="showRegister" />
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
            Entrar
          </h1>
          <p class="text-balance text-muted-foreground">
            Ingresa tu email para poder acceder a tu cuenta.
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Contraseña</Label>
              <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full" @click="handleLogin">
            <router-link to="/panel" class="w-full h-full"> Entrar </router-link>
          </Button>
          <Button variant="outline" class="w-full">
            Entrar con Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          No tienes una cuenta?
          <a href="#" class="underline" @click.prevent="showRegister = true">
            Regístrate
          </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://media.licdn.com/dms/image/v2/D4D12AQEBuaU6zZs4ng/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1667871656185?e=2147483647&v=beta&t=7RKqinVQSIg9gBPrmmdm4i5h-du-Z_ymUYThc0w4Qpo"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  </div>
</template>
