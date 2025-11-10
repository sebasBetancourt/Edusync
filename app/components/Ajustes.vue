<script setup lang="ts">
import { ref } from "vue"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Settings, Moon, Sun, Globe, Eye } from "lucide-vue-next"

const tema = ref("auto")
const idioma = ref("es")
const notificaciones = ref(true)
const altoContraste = ref(false)
const guardado = ref(false)

const guardarCambios = () => {
  guardado.value = true
  setTimeout(() => (guardado.value = false), 3000)
}
</script>

<template>
  <div class="animate-fadeIn">
    <Card class="border border-border/40 shadow-sm backdrop-blur-md">
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-lg font-semibold">
          <Settings class="w-5 h-5 text-primary" />
          Ajustes generales
        </CardTitle>
      </CardHeader>

      <CardContent class="space-y-6">
        <!-- 🌗 Tema -->
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium flex items-center gap-2">
              <Sun class="w-4 h-4" /> Tema de la interfaz
            </h4>
            <p class="text-sm text-muted-foreground">
              Cambia entre tema claro, oscuro o automático.
            </p>
          </div>
          <Select v-model="tema">
            <SelectTrigger class="w-[140px]">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Automático</SelectItem>
              <SelectItem value="light">Claro</SelectItem>
              <SelectItem value="dark">Oscuro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        

        <!-- 🔔 Notificaciones -->
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium flex items-center gap-2">
              <Eye class="w-4 h-4" /> Notificaciones
            </h4>
            <p class="text-sm text-muted-foreground">
              Activa o desactiva las notificaciones del sistema.
            </p>
          </div>
          <Switch v-model:checked="notificaciones" />
        </div>

        <!-- 👁️ Accesibilidad -->
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium flex items-center gap-2">
              <Moon class="w-4 h-4" /> Modo de alto contraste
            </h4>
            <p class="text-sm text-muted-foreground">
              Mejora la legibilidad de textos y elementos visuales.
            </p>
          </div>
          <Switch v-model:checked="altoContraste" />
        </div>

        <!-- 💾 Botón Guardar -->
        <Button
          class="w-full bg-primary  hover:bg-primary/90 mt-4"
          @click="guardarCambios"
        >
          Guardar cambios
        </Button>

        <!-- Mensaje de confirmación -->
        <transition name="fade">
          <p
            v-if="guardado"
            class="text-center text-green-600 text-sm mt-3 bg-green-100/50 px-3 py-2 rounded-md"
          >
            ✅ Ajustes guardados correctamente.
          </p>
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
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
