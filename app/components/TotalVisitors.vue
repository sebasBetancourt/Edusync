<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BulletLegendItemInterface } from "@unovis/ts"
import { CurveType } from "@unovis/ts"

const props = defineProps({
  timeRange: {
    type: String,
    default: '7d',
  },
})

const studentPerformance = [
  { date: '2024-01-01', promedio: 3.2, asistencia: 1 },
  { date: '2024-01-08', promedio: 3.4, asistencia: 1 },
  { date: '2024-01-15', promedio: 3.5, asistencia: 0 },
  { date: '2024-01-22', promedio: 3.7, asistencia: 1 },
  { date: '2024-01-29', promedio: 3.8, asistencia: 1 },
  { date: '2024-02-05', promedio: 3.9, asistencia: 1 },
  { date: '2024-02-12', promedio: 4.0, asistencia: 1 },
  { date: '2024-02-19', promedio: 3.9, asistencia: 0 },
  { date: '2024-02-26', promedio: 4.1, asistencia: 1 },
  { date: '2024-03-04', promedio: 4.2, asistencia: 1 },
  { date: '2024-03-11', promedio: 4.1, asistencia: 1 },
  { date: '2024-03-18', promedio: 4.3, asistencia: 1 },
  { date: '2024-03-25', promedio: 4.4, asistencia: 1 },
  { date: '2024-04-01', promedio: 4.2, asistencia: 0 },
  { date: '2024-04-08', promedio: 4.3, asistencia: 1 },
  { date: '2024-04-15', promedio: 4.5, asistencia: 1 },
  { date: '2024-04-22', promedio: 4.4, asistencia: 1 },
  { date: '2024-04-29', promedio: 4.6, asistencia: 1 },
  { date: '2024-05-06', promedio: 4.5, asistencia: 1 },
  { date: '2024-05-13', promedio: 4.7, asistencia: 1 },
  { date: '2024-05-20', promedio: 2.6, asistencia: 0 },
  { date: '2024-05-27', promedio: 4.8, asistencia: 1 },
  { date: '2024-06-03', promedio: 4.7, asistencia: 1 },
  { date: '2024-06-10', promedio: 2.9, asistencia: 1 },
  { date: '2024-06-17', promedio: 4.8, asistencia: 1 },
  { date: '2024-06-24', promedio: 2.9, asistencia: 1 },
  { date: '2024-07-01', promedio: 2.7, asistencia: 0 },
  { date: '2024-07-08', promedio: 4.8, asistencia: 1 },
  { date: '2024-07-15', promedio: 4.9, asistencia: 1 },
  { date: '2024-07-22', promedio: 5.0, asistencia: 1 },
]


const filteredData = computed(() => {
  const referenceDate = new Date('2024-06-30')
  let daysToSubtract = 90
  if (props.timeRange === '30d') daysToSubtract = 30
  else if (props.timeRange === '7d') daysToSubtract = 7

  const startDate = new Date(referenceDate)
  startDate.setDate(startDate.getDate() - daysToSubtract)

  return studentPerformance.filter((item) => {
    const date = new Date(item.date)
    return date >= startDate
  })
})

const promedioGeneral = computed(() => {
  if (!filteredData.value.length) return 0
  const suma = filteredData.value.reduce((acc, d) => acc + d.promedio, 0)
  return parseFloat((suma / filteredData.value.length).toFixed(1))
})

const asistenciaTotal = computed(() => {
  if (!filteredData.value.length) return 0
  const totalAsistencias = filteredData.value.filter(d => d.asistencia === 1).length
  return parseInt(((totalAsistencias / filteredData.value.length) * 100).toFixed(1))
})


const categories = ['promedio', 'asistencia']
const colors = ['#2563eb', '#16a34a']

const legendItems = ref<BulletLegendItemInterface[]>(
  categories.map((category, i) => ({
    name: category,
    color: colors[i],
    inactive: false,
  }))
)

function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
  legendItems.value[i].inactive = !legendItems.value[i].inactive
}
</script>

<template>
  <div class="w-full h-[350px]">
    <AreaChart
      :data="filteredData"
      :categories="categories"
      index="date"
      :colors="colors"
      :curve-type="CurveType.MonotoneX"
      :show-gradient="true"
      v-model:legend-items="legendItems"
      @legend-item-click="handleLegendItemClick"
    />
  </div>

  <div class="mt-7 grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-200">
    <div class="bg-white/5 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <p class="font-semibold text-blue-600 dark:text-blue-400">Promedio general</p>
      <p class="text-2xl font-bold">
        {{ promedioGeneral }}
      </p>
    </div>


    <div class="bg-white/5 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <p class="font-semibold text-green-600 dark:text-green-400">Asistencia</p>
      <p class="text-2xl font-bold">
        {{ asistenciaTotal }}%
      </p>
    </div>

  </div>
</template>

