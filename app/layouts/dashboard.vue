<script setup lang="ts">
import { ref } from 'vue'
import { watchEffect } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { School, Phone } from "lucide-vue-next"
import Theme from '@/components/Theme.vue'



import { useRoute } from 'vue-router'

const route = useRoute()

// Estado reactivo para el título del breadcrumb
const pageTitle = ref<string | Record<string, any>>("")

// 🧠 Cuando la ruta cambia, actualizamos el título
watchEffect(() => {
  // Si la página tiene un meta personalizado, úsalo
  pageTitle.value = route.meta?.breadcrumb || route.name || 'Página'
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center justify-between gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="/dashboard/student">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage class="flex items-center gap-2 text-muted-foreground font-normal">
                  {{ pageTitle }} <School class="w-5" />
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div class="flex nav-options gap-3 px-4">
          <Theme />
          <Button variant="outline" class="bg-white">
            <Phone /> Contacto
          </Button>
        </div>
      </header>

      <Separator orientation="horizontal" class="mr-2 h-2" />
      <main class="flex flex-1 flex-col gap-4 md:gap-8 pt-4">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
