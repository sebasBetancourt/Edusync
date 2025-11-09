<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { 
  School, 
  Phone,
  Users,
  Briefcase,
  Building2,
  CircleDollarSign
} from "lucide-vue-next"
import Theme from '@/components/Theme.vue'
import NumberFlow from '@number-flow/vue'

const dataCard = ref({
  totalStudents: 0,
  totalTeachers: 0,
  totalDepartments: 0,
  budget: 0,
})

onMounted(() => {
  dataCard.value = {
    totalStudents: 1200,
    totalTeachers: 45,
    totalDepartments: 8,
    budget: 250000,
  }
})
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
                <BreadcrumbPage class="flex items-center gap-2 text-muted-foreground font-normal">
                  Dashboard Administrativo <School class="w-5" />
                </BreadcrumbPage>
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
              <CardDescription class="text-blue-600 font-bold">Total Estudiantes</CardDescription>
              <CardTitle class="text-xs font-semibold tabular-nums @[250px]/card:text-3xl flex justify-between items-center">
                <NumberFlow class="text-2xl" :value="dataCard.totalStudents" />
                  :value="dataCard.totalStudents"
                />
                <Users />
              </CardTitle>
            </CardHeader>
            <CardFooter class="flex-col items-start gap-1.5 text-sm">
              <div class="text-muted-foreground">
                Estudiantes matriculados actualmente
              </div>
            </CardFooter>
          </Card>

          <Card class="@container/card">
            <CardHeader>
              <CardDescription class="text-green-600 font-bold">Profesores</CardDescription>
              <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex justify-between items-center">
                <NumberFlow
                  :value="dataCard.totalTeachers"
                />
                <Briefcase />
              </CardTitle>
            </CardHeader>
            <CardFooter class="flex-col items-start gap-1.5 text-sm">
              <div class="text-muted-foreground">
                Personal docente activo
              </div>
            </CardFooter>
          </Card>

          <Card class="@container/card">
            <CardHeader>
              <CardDescription class="text-yellow-600 font-bold">Departamentos</CardDescription>
              <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex justify-between items-center">
                <NumberFlow
                  :value="dataCard.totalDepartments"
                />
                <Building2 />
              </CardTitle>
            </CardHeader>
            <CardFooter class="flex-col items-start gap-1.5 text-sm">
              <div class="text-muted-foreground">
                Total de departamentos académicos
              </div>
            </CardFooter>
          </Card>

          <Card class="@container/card">
            <CardHeader>
              <CardDescription class="text-purple-600 font-bold">Presupuesto Anual</CardDescription>
              <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex justify-between items-center">
                <NumberFlow
                  :value="dataCard.budget"
                  :prefix="'$'"
                />
                <CircleDollarSign />
              </CardTitle>
            </CardHeader>
            <CardFooter class="flex-col items-start gap-1.5 text-sm">
              <div class="text-muted-foreground">
                Presupuesto total asignado
              </div>
            </CardFooter>
          </Card>
        </div>

        <!-- Aquí irán más componentes específicos para administradores -->
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>