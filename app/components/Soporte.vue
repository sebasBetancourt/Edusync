<script setup lang="ts">
import { ref } from "vue"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Headphones, CheckCircle, Loader2 } from "lucide-vue-next"

const tipoSoporte = ref("técnico")
const nombre = ref("")
const correo = ref("")
const mensaje = ref("")
const enviado = ref(false)
const cargando = ref(false)

const enviarSolicitud = () => {
  if (!nombre.value || !correo.value || !mensaje.value) {
    alert("Por favor completa todos los campos antes de enviar.")
    return
  }

  cargando.value = true
  setTimeout(() => {
    cargando.value = false
    enviado.value = true
    nombre.value = ""
    correo.value = ""
    mensaje.value = ""
    setTimeout(() => (enviado.value = false), 4000)
  }, 1200)
}
</script>

<template>
  <div class="animate-fadeIn overflow-y-auto max-h-[70vh] space-y-6">
    <Card class="border border-border/40 shadow-sm backdrop-blur-md">
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-lg font-semibold">
          <Headphones class="w-5 h-5 text-primary" />
          Soporte y Ayuda
        </CardTitle>
      </CardHeader>

      <CardContent class="space-y-5">
        <!-- Tipo de soporte -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Tipo de soporte</label>
          <Select v-model="tipoSoporte">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="técnico">Soporte técnico</SelectItem>
              <SelectItem value="docente">Soporte docente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Nombre -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Nombre completo</label>
          <Input
            v-model="nombre"
            placeholder="Ejemplo: Laura Gómez"
            class="focus:ring-2 focus:ring-primary/70 transition"
          />
        </div>

        <!-- Correo -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Correo electrónico</label>
          <Input
            type="email"
            v-model="correo"
            placeholder="ejemplo@colegio.edu.co"
            class="focus:ring-2 focus:ring-primary/70 transition"
          />
        </div>

        <!-- Mensaje -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Describe tu problema o consulta</label>
          <Textarea
            v-model="mensaje"
            placeholder="Escribe los detalles del problema o la pregunta que tienes..."
            class="resize-none h-28 focus:ring-2 focus:ring-primary/70 transition"
          />
        </div>

        <!-- Botón de envío -->
        <Button
          class="w-full bg-primary hover:bg-primary/90 transition-colors"
          :disabled="cargando"
          @click="enviarSolicitud"
        >
          <Loader2 v-if="cargando" class="w-4 h-4 mr-2 animate-spin" />
          <span v-if="!cargando">Enviar solicitud</span>
          <span v-else>Enviando...</span>
        </Button>

        <!-- Mensaje de éxito -->
        <transition name="fade">
          <div
            v-if="enviado"
            class="flex items-center gap-2 mt-3 text-green-600 text-sm bg-green-100/50 px-3 py-2 rounded-md"
          >
            <CheckCircle class="w-4 h-4" />
            <span>Tu solicitud de soporte ha sido enviada. Te responderemos pronto.</span>
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
