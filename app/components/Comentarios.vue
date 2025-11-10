<script setup lang="ts">
import { ref } from "vue"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { MessageSquare, CheckCircle, AlertCircle } from "lucide-vue-next"

const tipo = ref("opinión")
const comentario = ref("")
const enviado = ref(false)
const cargando = ref(false)

const caracteresMax = 300

const enviarComentario = () => {
  if (!comentario.value.trim()) return alert("Por favor, escribe un comentario antes de enviar.")
  cargando.value = true
  setTimeout(() => {
    cargando.value = false
    enviado.value = true
    comentario.value = ""
    setTimeout(() => (enviado.value = false), 4000)
  }, 1200)
}
</script>

<template>
  <div class="space-y-6 animate-fadeIn">
    <Card class="border border-border/40 shadow-sm backdrop-blur-md">
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-lg font-semibold">
          <MessageSquare class="w-5 h-5 text-primary" /> Enviar comentarios
        </CardTitle>
      </CardHeader>

      <CardContent class="space-y-5">
        <!-- Tipo de comentario -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Tipo de comentario</label>
          <Select v-model="tipo">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="opinión">Opinión general</SelectItem>
              <SelectItem value="sugerencia">Sugerencia de mejora</SelectItem>
              <SelectItem value="error">Reporte de error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Campo de comentario -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Tu mensaje</label>
          <Textarea
            v-model="comentario"
            placeholder="Escribe aquí tus comentarios o reporta algún problema..."
            class="resize-none h-28 focus:ring-2 focus:ring-primary/70 transition"
            :maxlength="caracteresMax"
          />
          <div class="text-xs text-muted-foreground text-right">
            {{ comentario.length }} / {{ caracteresMax }} caracteres
          </div>
        </div>

        <!-- Botón de envío -->
        <Button
          class="w-full bg-primary hover:bg-primary/90 transition-colors"
          :disabled="cargando"
          @click="enviarComentario"
        >
          <span v-if="!cargando">Enviar comentario</span>
          <span v-else>Enviando...</span>
        </Button>

        <!-- Mensaje de confirmación -->
        <transition name="fade">
          <div
            v-if="enviado"
            class="flex items-center gap-2 mt-3 text-green-600 text-sm bg-green-100/50 px-3 py-2 rounded-md"
          >
            <CheckCircle class="w-4 h-4" />
            <span>¡Gracias por tu opinión! Tu comentario ha sido enviado correctamente.</span>
          </div>
        </transition>

        <!-- Mensaje de aviso si es un reporte de error -->
        <transition name="fade">
          <div
            v-if="tipo === 'error'"
            class="flex items-center gap-2 mt-2 text-amber-600 text-sm bg-amber-100/40 px-3 py-2 rounded-md"
          >
            <AlertCircle class="w-4 h-4" />
            <span>Si el error persiste, por favor incluye detalles como el navegador o la acción que realizabas.</span>
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
