<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const open = defineModel<boolean>('open', { default: false })

const close = () => {
  open.value = false
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div class="bg-background rounded-xl shadow-xl p-4 w-full max-w-md relative">
        <Button
          variant="ghost"
          class="absolute top-3 right-3 p-3"
          @click="close"
        >
          ✕
        </Button>

        <Card class="border-none shadow-none">
          <CardHeader>
            <CardTitle class="text-xl">
              Registrate
            </CardTitle>
            <CardDescription>
              Ingresa tu información para crear una cuenta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div class="grid gap-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-2">
                  <Label for="first-name">Nombre</Label>
                  <Input id="first-name" placeholder="Max" required />
                </div>
                <div class="grid gap-2">
                  <Label for="last-name">Apellido</Label>
                  <Input id="last-name" placeholder="Adkins" required />
                </div>
              </div>
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div class="grid gap-2">
                <Label for="password">Contraseña</Label>
                <Input id="password" type="password" />
              </div>
              <Button type="submit" class="w-full">Crear una cuenta</Button>
              <Button variant="outline" class="w-full">Registrarse con GitHub</Button>
            </div>

            <div class="mt-4 text-center text-sm">
              ¿Ya tienes una cuenta?
              <a href="#" class="underline" @click="close">Iniciar sesión</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </teleport>
</template>
