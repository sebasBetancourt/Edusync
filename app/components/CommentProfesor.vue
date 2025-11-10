<script setup lang="ts">
import { ref } from "vue"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { toast } from "vue-sonner"

const props = defineProps<{
  open: boolean
  profesor: { nombre: string }
}>()

const emit = defineEmits(["update:open"])

const comentario = ref("")

const enviarComentario = () => {
  toast.success(`Comentario enviado a ${props.profesor.nombre}`)
  comentario.value = ""
  emit("update:open", false)
}
</script>

<template>
  <Dialog v-model:open="props.open">
    <DialogContent class="max-w-md bg-background/90 backdrop-blur border-border/40 rounded-2xl">
      <DialogHeader>
        <DialogTitle>💬 Comentar a {{ profesor.nombre }}</DialogTitle>
        <DialogDescription>
          Deja tus observaciones o comentarios sobre las clases del profesor.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 mt-3">
        <Textarea
          v-model="comentario"
          placeholder="Escribe aquí tu comentario..."
          class="min-h-[120px] resize-none"
        />
        <div class="flex justify-end gap-3">
          <Button variant="outline" @click="emit('update:open', false)">Cancelar</Button>
          <Button @click="enviarComentario" :disabled="!comentario.trim()">Enviar</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
