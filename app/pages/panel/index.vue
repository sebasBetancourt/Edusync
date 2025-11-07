<script setup lang="ts">
const rutas = [
  { nombre: 'Materias', ruta: '/panel/materias', descripcion: 'Administrar materias y cursos' },
  { nombre: 'Profesores', ruta: '/panel/profesores', descripcion: 'Gestionar profesores' }
]
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Panel de Control</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <NuxtLink 
        v-for="item in rutas" 
        :key="item.ruta"
        :to="item.ruta" 
        class="p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <h3 class="text-lg font-semibold">{{ item.nombre }}</h3>
        <p class="text-gray-600 dark:text-gray-400 mt-1">{{ item.descripcion }}</p>
      </NuxtLink>
    </div>
  </div>
</template>