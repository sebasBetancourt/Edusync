<script setup lang="ts">
import { ref } from "vue"
import { CalendarDays, Banknote, Download } from "lucide-vue-next"

// @ts-expect-error
definePageMeta({
  layout: "dashboard",
  breadcrumb: "Reporte de Pagos"
})

const recibos = ref([
  {
    id: "R-001",
    mes: "Febrero",
    fecha: "2025-02-10",
    valor: 350000,
    pagado: true
  },
  {
    id: "R-002",
    mes: "Marzo",
    fecha: "Pendiente",
    valor: 350000,
    pagado: false
  },
  {
    id: "R-003",
    mes: "Junio",
    fecha: "2025-06-05",
    valor: 350000,
    pagado: true
  },
  {
    id: "R-004",
    mes: "Octubre",
    fecha: "2025-10-12",
    valor: 350000,
    pagado: true
  },
])
</script>

<template>
  <div class="space-y-6 animate-fadeIn">
    <Card class="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle class="text-white text-xl flex items-center gap-2">
          <CalendarDays class="text-blue-400 w-6 h-6" />
          Historial de Pagos y Recibos
        </CardTitle>
      </CardHeader>

      <CardContent class="divide-y divide-white/10">
        <div
          v-for="recibo in recibos"
          :key="recibo.id"
          class="flex justify-between items-center py-3"
        >
          <div class="flex flex-col">
            <h3 class="text-white font-medium flex items-center gap-2">
              <Banknote class="w-4 h-4 text-green-400" />
              {{ recibo.mes }}
            </h3>
            <p class="text-sm text-gray-400">Recibo: {{ recibo.id }}</p>
            <p class="text-sm text-gray-400">Valor: {{ recibo.valor.toLocaleString('es-CO') }} COP</p>
          </div>

          <div class="flex flex-col items-end gap-1">
            <Badge :variant="recibo.pagado ? 'success' : 'destructive'">
              {{ recibo.pagado ? 'Pagado' : 'Pendiente' }}
            </Badge>
            <p class="text-xs text-gray-400">{{ recibo.fecha }}</p>
            <button
              v-if="recibo.pagado"
              class="mt-1 flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
            >
              <Download class="w-4 h-4" /> Descargar recibo
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
