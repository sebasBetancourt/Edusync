<script setup lang="ts">
import { ref } from "vue"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { toast } from "vue-sonner"

const props = defineProps<{
  open: boolean
  profesor: { nombre: string, correo: string }
}>()

const emit = defineEmits(["update:open"])

const asunto = ref("")
const mensaje = ref("")

const enviarMensaje = () => {
  toast.success(`Mensaje enviado a ${props.profesor.nombre}`)
  asunto.value = ""
  mensaje.value = ""
  emit("update:open", false)
}
</script>

<template>
  <Dialog v-model:open="props.open">
    <DialogContent class="max-w-md bg-background/90 backdrop-blur border-border/40 rounded-2xl">
      <DialogHeader>
        <DialogTitle>📧 Contactar a {{ profesor.nombre }}</DialogTitle>
        <DialogDescription>
          Envía un mensaje directamente al correo del profesor ({{ profesor.correo }}).
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 mt-3">
        <Input v-model="asunto" placeholder="Asunto del mensaje" />
        <Textarea
          v-model="mensaje"
          placeholder="Escribe aquí tu mensaje..."
          class="min-h-[120px] resize-none"
        />
        <div class="flex justify-end gap-3">
          <Button variant="outline" @click="emit('update:open', false)">Cancelar</Button>
          <Button @click="enviarMensaje" :disabled="!mensaje.trim()">Enviar</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
