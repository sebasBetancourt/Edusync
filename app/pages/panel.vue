<script lang="ts">
export const description = "An inset sidebar with secondary navigation."
export const iframeHeight = "800px"
</script>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import  { 
  School, 
  Phone,
  TrendingUp as TrendingUpIcon,
  TrendingUp,
  TrendingDown as TrendingDownIcon,
  TrendingDown,
  Boxes,
  CreditCard,
  ClipboardList,
  NotebookPen

 } from "lucide-vue-next"
import Theme from '../components/Theme.vue'
import { useMediaQuery } from '@vueuse/core'
import NumberFlow from '@number-flow/vue'
import TotalVisitors from '@/components/TotalVisitors.vue'

const dataCard = ref({
  totalRevenue: 500,
  newCustomers: 0,
  activeAccount: 0,
  growthRate: 0,
})

onMounted(() => {
  dataCard.value = {
    totalRevenue: 4.5,
    newCustomers: 225,
    activeAccount: 5,
    growthRate: 85,
  }
})

const timeRange = ref('30d')

const isDesktop = useMediaQuery('(min-width: 768px)')
watch(isDesktop, () => {
  if (isDesktop.value) {
    timeRange.value = '30d'
  }
  else {
    timeRange.value = '7d'
  }
}, { immediate: true })

</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 justify-between">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage class="flex items-center gap-2 text-muted-foreground font-normal">Formacion <School class="w-5" /></BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
        </div>

        <div class="flex nav-options gap-3 px-4">
          <Theme />
          <Button variant="outline" class="bg-white"><Phone />Contacto</Button>
        </div>

      </header>
      <main class="@container/main flex flex-1 flex-col gap-4 md:gap-8 p-4">
         <div class="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 @5xl/main:grid-cols-4">
          <Card class="@container/card">
            <CardHeader>
              <CardDescription class="text-green-600 font-bold">Percentil Actual</CardDescription>
              <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex justify-between items-center">
                <NumberFlow
                  :value="dataCard.growthRate"
                  :suffix="'%'"
                />
                <NotebookPen />
              </CardTitle>
              <CardAction>
                <Badge variant="outline" class="gap-1 p-1">
                  <TrendingUpIcon />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter class="flex-col items-start gap-1.5 text-sm">
              <div class="line-clamp-1 flex gap-2 font-medium">
                Tu rendimiento supera al promedio del grupo. <TrendingUp class="size-4" />
              </div>
              <div class="text-muted-foreground">
                Tu desempeño está por encima del 85 % de los estudiantes de tu programa.
              </div>
            </CardFooter>
          </Card>
          <Card class="@container/card">
            <CardHeader>
              <CardDescription class="text-red-500 font-bold">Asistencia Promedio</CardDescription>
              <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex justify-between items-center">
                <NumberFlow
                  :value="dataCard.newCustomers"
                />
                <ClipboardList />
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingDown />
                  -8%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter class="flex-col items-start gap-1.5 text-sm">
              <div class="line-clamp-1 flex gap-2 font-medium">
                Numero de asistencias estables, pero podría mejorar. <TrendingDown class="size-4" />
              </div>
              <div class="text-muted-foreground">
                Tu asistencia se mantiene media, revisa las materias con menor frecuencia.
              </div>
            </CardFooter>
          </Card>
          <Card class="@container/card">
            <CardHeader>
              <CardDescription class="text-green-600 font-bold">Credito</CardDescription>
              <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex justify-between items-center">
                <div>
                  <NumberFlow
                    :value="dataCard.activeAccount"
                  />/12
                </div>
                <CreditCard />
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp />
                  +15%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter class="flex-col items-start gap-1.5 text-sm">
              <div class="line-clamp-1 flex gap-2 font-medium">
                Has completado el 71 % del plan de estudios. <TrendingUp class="size-4" />
              </div>
              <div class="text-muted-foreground">
                Estas al dia con tus pagos.
              </div>
            </CardFooter>
          </Card>
          <Card class="@container/card">
            <CardHeader>
              <CardDescription class="text-green-600 font-bold">Comparativa Promedio del Grupo</CardDescription>
              <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex justify-between items-center">
                <NumberFlow
                  :value="dataCard.totalRevenue"
                /> 
                <Boxes />
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp />
                  +7.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter class="flex-col items-start gap-1.5 text-sm">
              <div class="line-clamp-1 flex gap-2 font-medium">
                Rendimiento por encima del promedio <TrendingUp class="size-4" />
              </div>
              <div class="text-muted-foreground">
                Tu promedio es ligeramente superior al promedio general.
              </div>
            </CardFooter>
          </Card>
        </div>


        <Card class="@container/card">
          <CardHeader>
            <CardTitle>Rendimiento Academico</CardTitle>
            <CardDescription>
              <span className="hidden @[540px]/card:block">
                Rendimiento en los últimos 3 meses
              </span>
              <span className="@[540px]/card:hidden">Ultimos 3 meses</span>
            </CardDescription>
            <CardAction>
              <ToggleGroup
                v-model="timeRange"
                type="single"
                variant="outline"
                class="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
              >
                <ToggleGroupItem value="90d">
                  Ultimos 3 meses
                </ToggleGroupItem>
                <ToggleGroupItem value="30d">
                  Ultimos 30 dias 
                </ToggleGroupItem>
                <ToggleGroupItem value="7d">
                  Ultimos 7 dias
                </ToggleGroupItem>
              </ToggleGroup>
              <Select v-model="timeRange">
                <SelectTrigger
                  class="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                  size="sm"
                  aria-label="Select a value"
                >
                  <SelectValue placeholder="Last 3 months" />
                </SelectTrigger>
                <SelectContent class="rounded-xl">
                  <SelectItem value="90d" class="rounded-lg">
                    Last 3 months
                  </SelectItem>
                  <SelectItem value="30d" class="rounded-lg">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="7d" class="rounded-lg">
                    Last 7 days
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardAction>
          </CardHeader>
          <CardContent>
            <TotalVisitors :time-range="timeRange" />
          </CardContent>
        </Card>


      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
