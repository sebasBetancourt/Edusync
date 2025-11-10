<script setup lang="ts">
import { ref } from "vue"
import {
  Mail, Star, BookOpen, Clock, User, MessageSquare,
  Contact
} from "lucide-vue-next"
import CommentProfesor from "@/components/CommentProfesor.vue"
import ContactProfesor from "@/components/ContactProfesor.vue"


// @ts-expect-error definePageMeta es global de Nuxt
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Profesores'
})
const profesores = ref([
  {
    nombre: "Carlos Pérez",
    materia: "Matemáticas",
    correo: "carlos.perez@colegio.edu",
    horario: "Martes 9:00 - 10:00 AM",
    promedio: 4.8,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    descripcion: "Explica con ejemplos prácticos y resuelve dudas con paciencia. Sus clases son muy dinámicas."
  },
  {
    nombre: "Ivan Duque",
    materia: "Química",
    correo: "ivan.duque@colegio.edu",
    horario: "Jueves 10:00 - 11:30 AM",
    promedio: 4.5,
    avatar: "https://www.wradio.com.co/resizer/v2/27KKO5I2NJHHVHYKTKXZCEH5Y4.jpeg?auth=415e33ec1816c60d89c7d78826f364f5fee6e10522bf3073310e618dfdfa3034&width=650&height=488&quality=70&smart=true",
    descripcion: "Utiliza experimentos y laboratorios virtuales para reforzar el aprendizaje de conceptos complejos."
  },
  {
    nombre: "Connor McGregor",
    materia: "Educación Física",
    correo: "john.smith@colegio.edu",
    horario: "Viernes 8:00 - 9:00 AM",
    promedio: 4.6,
    avatar: "https://imageio.forbes.com/specials-images/imageserve/5ecc702ffd6d6700060f85d1/0x0.jpg?format=jpg&crop=1652,1653,x1215,y37,safe&height=416&width=416&fit=bounds",
    descripcion: "Fomenta la participación oral y el aprendizaje con proyectos colaborativos en inglés."
  },
  {
    nombre: "Gustavo Petro",
    materia: "Ciencias Sociales",
    correo: "john.smith@colegio.edu",
    horario: "Viernes 8:00 - 9:00 AM",
    promedio: 3.0,
    avatar: "https://s.france24.com/media/display/ecba521e-cbc4-11ec-bac6-005056bf8594/w:1280/p:1x1/05-04-21%20Petro.jpg",
    descripcion: "Fomenta la participación oral y el aprendizaje con proyectos colaborativos en sociales."
  }
])
const profesorSeleccionado = ref(null)
const abrirComentario = ref(false)
const abrirContacto = ref(false)
</script>

<template>
  <section class="p-8 min-h-screen from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
    <div class="max-w-6xl mx-auto">
      <header class="text-center mb-10">
        <h1 class="text-4xl font-bold flex items-center justify-center gap-3">
          <User class="w-8 h-8 text-primary" />
          Mis Profesores
        </h1>
        <p class="text-muted-foreground text-sm mt-2">
          Consulta la información y desempeño de tus profesores asignados este periodo.
        </p>
      </header>

      <!-- 📚 Cards de profesores -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="profesor in profesores"
          :key="profesor.nombre"
          class="hover:shadow-lg transition-all duration-300 border rounded-2xl bg-background/80 backdrop-blur"
        >
          <CardHeader class="flex flex-col items-center justify-center text-center">
            <Avatar class="w-20 h-20 mb-2">
              <AvatarImage :src="profesor.avatar" />
              <AvatarFallback>{{ profesor.nombre[0] }}</AvatarFallback>
            </Avatar>
            <CardTitle class="text-lg font-semibold">{{ profesor.nombre }}</CardTitle>
            <Badge variant="outline" class="mt-1 flex items-center gap-1">
              <BookOpen class="w-4 h-4" />
              {{ profesor.materia }}
            </Badge>
          </CardHeader>

          <CardContent class="space-y-2 text-sm text-center">
            <p class="text-muted-foreground">{{ profesor.descripcion }}</p>
            <Separator class="my-3" />
            <div class="flex items-center justify-center gap-2 text-xs">
              <Clock class="w-4 h-4 text-primary" />
              <span>{{ profesor.horario }}</span>
            </div>
            <div class="flex items-center justify-center gap-1 text-yellow-500 mt-2">
              <Star v-for="n in 5" :key="n" :class="{'fill-yellow-400': n <= Math.round(profesor.promedio)}" class="w-4 h-4" />
              <span class="text-xs text-muted-foreground ml-1">({{ profesor.promedio.toFixed(1) }})</span>
            </div>
          </CardContent>

          <CardFooter class="flex justify-between px-5 py-3 border-t">
            <Button size="sm" variant="outline" class="flex items-center gap-2" @click="profesorSeleccionado = profesor; abrirContacto = true">
              <Mail class="w-4 h-4" /> Contactar
            </Button>
            <Button size="sm" class="flex items-center gap-2"  @click="profesorSeleccionado = profesor; abrirComentario = true">
              <MessageSquare class="w-4 h-4" /> Comentar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </section>

  <CommentProfesor v-if="profesorSeleccionado" v-model:open="abrirComentario" :profesor="profesorSeleccionado" />
  <ContactProfesor v-if="profesorSeleccionado" v-model:open="abrirContacto" :profesor="profesorSeleccionado" />
</template>
