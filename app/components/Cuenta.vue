<script setup lang="ts">
import { ref } from "vue"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

const nombre = ref("Alvaro Uribe")
const email = ref("uribista@gmail.com")
const curso = ref("11-1")
const promedio = ref(4.1)
const nombres = ref("Alvaro")
const apellidos = ref("Uribe")
</script>

<template>
  <div class="space-y-6 bg-gradient-to-b from-background to-muted/40 overflow-y-auto max-h-[70vh] space-y-6">
    <Card class="shadow-md border border-border/50">
      <CardHeader class="flex items-center gap-4">
        <Avatar class="h-16 w-16 ring-2 ring-primary/40">
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrbUFIX10_6HHn-4mbBVoRLwnx0RVmfGeJQ&s" />
          <AvatarFallback>SB</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle class="text-xl font-semibold">{{ nombre }}</CardTitle>
          <p class="text-sm text-muted-foreground">Estudiante del curso {{ curso }}</p>
        </div>
      </CardHeader>

      <CardContent class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <div>
          <Label>Correo institucional</Label>
          <Input v-model="email" type="email" readonly class="cursor-not-allowed opacity-50" />
        </div>
        <div>
          <Label>Promedio general</Label>
          <div class="flex items-center gap-2 mt-1">
            <div class="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                class="h-full bg-green-700 transition-all duration-700"
                :style="{ width: `${(promedio / 5) * 100}%` }"
              />
            </div>
            <span class="text-sm font-medium text-foreground">{{ promedio }}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- ⚙️ Opciones de cuenta -->
    <Card class="shadow-sm border border-border/50">
      <CardHeader>
        <CardTitle>Configuraciones personales</CardTitle>
      </CardHeader>

      <CardContent class="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Nombre de usuario</Label>
          <Input placeholder="Usuario" v-model="nombre" />
        </div>
        <div>
          <Label>Curso</Label>
          <Input type="text" v-model="curso" readonly class="cursor-not-allowed opacity-50" />
        </div>
        <div>
          <Label>Nombres</Label>
          <Input type="text" v-model="nombres" readonly class="cursor-not-allowed opacity-50" />
        </div>
        <div>
          <Label>Apellidos</Label>
          <Input type="text" v-model="apellidos" readonly class="cursor-not-allowed opacity-50" />
        </div>
      </CardContent>

      <div class="p-4 flex justify-end">
        <Button variant="default" class="rounded-full shadow-md">
          Guardar cambios
        </Button>
      </div>
    </Card>
  </div>
</template>
