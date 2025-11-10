<script setup lang="ts">
import { ref } from "vue"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Lock, Mail, CheckCircle } from "lucide-vue-next"

const currentPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")
const emailRequestSent = ref(false)
const loading = ref(false)

// Cambiar contraseña
const changePassword = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert("Tu contraseña ha sido actualizada correctamente.")
    currentPassword.value = ""
    newPassword.value = ""
    confirmPassword.value = ""
  }, 1000)
}

// Solicitar cambio de correo
const requestEmailChange = () => {
  emailRequestSent.value = true
  setTimeout(() => (emailRequestSent.value = false), 5000)
}
</script>

<template>
  <div class="space-y-6  animate-fadeIn overflow-y-auto max-h-[70vh] space-y-6">
    <Card class="border border-border/40 shadow-sm backdrop-blur-md">
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-lg font-semibold">
          <Lock class="w-5 h-5 text-primary" /> Cambiar contraseña
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Contraseña actual</label>
          <Input
            type="password"
            v-model="currentPassword"
            placeholder="••••••••"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">Nueva contraseña</label>
          <Input
            type="password"
            v-model="newPassword"
            placeholder="••••••••"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">Confirmar nueva contraseña</label>
          <Input
            type="password"
            v-model="confirmPassword"
            placeholder="••••••••"
          />
        </div>

        <Button
          class="w-full mt-3 bg-primary hover:bg-primary/90 transition-colors"
          @click="changePassword"
          :disabled="loading"
        >
          {{ loading ? "Actualizando..." : "Actualizar contraseña" }}
        </Button>
      </CardContent>
    </Card>

    <!-- Sección cambio de correo -->
    <Card class="border border-border/40 shadow-sm backdrop-blur-md">
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-lg font-semibold">
          <Mail class="w-5 h-5 text-primary" /> Solicitar cambio de correo
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <p class="text-sm text-muted-foreground">
          Si deseas cambiar tu correo asociado, te enviaremos un enlace de
          verificación al nuevo correo que elijas.
        </p>

        <Button
          variant="outline"
          class="w-full hover:bg-primary/10 transition-colors"
          @click="requestEmailChange"
          :disabled="emailRequestSent"
        >
          {{ emailRequestSent ? "Solicitud enviada " : "Solicitar cambio de correo" }}
        </Button>

        <transition name="fade">
          <div
            v-if="emailRequestSent"
            class="flex items-center gap-2 mt-2 text-green-600 text-sm"
          >
            <CheckCircle class="w-4 h-4" />
            <span>Revisa tu bandeja de entrada para continuar.</span>
          </div>
        </transition>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
