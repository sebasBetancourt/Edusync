<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CalendarDays, Users, BookOpen, CalendarIcon, Clock, TrendingUp } from 'lucide-vue-next'


const curso = ref({
  nombre: 'Curso 11-1',
  director: 'Laura Gómez',
  jornada: 'Mañana',
  estudiantes: 31,
  promedioGeneral: 4.3,
  materias: [
    { nombre: 'Matemáticas', profesor: 'Carlos Pérez', avance: 90 },
    { nombre: 'Inglés', profesor: 'John Smith', avance: 85 },
    { nombre: 'Quimica', profesor: 'Ana Torres', avance: 88 },
    { nombre: 'Español', profesor: 'Luis Martínez', avance: 95 },
    { nombre: 'Ciencias Sociales', profesor: 'Luis Martínez', avance: 95 },
    { nombre: 'Religion', profesor: 'María Rodríguez', avance: 80 },
  ],
})
// @ts-expect-error definePageMeta es global de Nuxt
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Mis Cursos'
})

const defaultValue = "item-1"

const accordionItems = [
  { value: "item-1", title: "Curso 11-1", content: "El curso 11-1 se caracteriza por su excelente convivencia y espíritu colaborativo. Los estudiantes participan activamente en proyectos académicos y actividades extracurriculares. Este grupo destaca por su compromiso en áreas como ciencias, arte y tecnología." },
  { value: "item-2", title: "Informacion General", content: "🧑‍🏫 Docente guía: Laura Gómez\n🕖 Horario: 7:00 AM - 1:00 PM\n🏢 Aula: 105\n👥 Estudiantes: 31" },
  { value: "item-3", title: "Rendimiento General del Salon", content: "Promedio general del curso: 4.3 / 5.0" },
]

const promedio = 4.3
const max = 5
const porcentaje = ref(0)

onMounted(() => {
  setTimeout(() => {
    porcentaje.value = (promedio / max) * 100
  },500)
})

const color = computed(() => {
  if (promedio >= 4.5) return "bg-black dark:bg-black/70"
  if (promedio >= 3.5) return "bg-black dark:bg-black/50"
  return "bg-red-900"
})
</script>

<template>
    <section class="p-10 from-indigo-50 to-white min-h-screen">
    <div class="max-w-6xl mx-auto">

      <div class="md:flex-row justify-between items-start md:items-center mb-10">
        <div class="flex flex-col justify-self-center-safe items-center justify-center">
          <h1 class="text-4xl font-extrabold flex items-center gap-3 ">
            Curso
          </h1>
          <p class="text-slate-500 mt-1 text-m font-bold">Información general del curso actual</p>
        </div>
        <HoverCard>
          <HoverCardTrigger as-child>
            <Card class="w-60 px-4 py-2 rounded-lg mt-4 md:mt-0">  
              <Badge class="w-full h-full bg-background dark:text-white text-black text-sm font-semibold">
                {{ curso.nombre }} – Jornada {{ curso.jornada }}
              </Badge>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent class="w-80">
            <div class="flex justify-around space-x-2">
              <Avatar class="w-20 h-20">
                <AvatarImage src="https://www.shutterstock.com/image-photo/students-sit-classroom-raise-their-600nw-1664259943.jpg" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">
                  {{ curso.nombre }}
                </h4>
                <p class="text-sm">
                 Jornada de la {{ curso.jornada }}
                </p>
                <div class="flex items-center pt-2">
                  <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
                  <span class="text-xs text-muted-foreground">
                    Año electivo: 2023
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div class="flex items-center justify-between mb-10 pr-4">
          <Accordion type="single" class="w-1/2" collapsible :default-value="defaultValue">
          <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
            <AccordionTrigger>{{ item.title }} <TrendingUp class="w-5 h-5 text-blue-600" /></AccordionTrigger>
            <AccordionContent class="whitespace-pre-line font-mono text-xs">
              {{ item.content }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      
        <div class="flex flex-col items-start gap-3 w-1/3 max-w-lg">
          <div class="flex justify-between w-full items-center">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Promedio general del curso
            </h3>
            <span class="font-mono text-xs text-gray-500 dark:text-gray-200">
              {{ promedio.toFixed(1) }} / {{ max.toFixed(1) }}
            </span>
          </div>
        
          <div class="relative w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden shadow-inner">
            <div
              class="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out shadow-md"
              :class="color"
              :style="{ width: porcentaje + '%' }"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        
          <span class="text-sm text-gray-600 dark:text-gray-300 mt-1 font-mono">
            {{ porcentaje.toFixed(0) }}%
          </span>
        </div>

      </div>

      <div class="my-10 border-t pt-10"></div>

      <h2 class="text-2xl font-semibold mb-6 flex items-center gap-5">
        <CalendarDays class="w-6 h-6" />
        Materias inscritas
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="materia in curso.materias"
          :key="materia.nombre"
          class="hover:shadow-xl transition rounded-2xl border"
        >
          <CardHeader>
            <CardTitle class="text-xl font-semibold flex items-center gap-2">
              <BookOpen class="w-5 h-5" /> {{ materia.nombre }}
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p><strong>Profesor:</strong> {{ materia.profesor }}</p>
            <p class="mt-3"><strong>Avance:</strong></p>

            <div class="relative w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden shadow-inner">
              <div
                class="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out shadow-md"
                :class="color"
                :style="{ width: porcentaje + '%' }"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>

            <p class="text-sm mt-1 font-mono">{{ materia.avance }}%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>