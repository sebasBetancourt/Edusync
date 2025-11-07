<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { School, Phone } from "lucide-vue-next"
import Theme from '@/components/Theme.vue'
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
                <BreadcrumbLink href="#">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage class="flex items-center gap-2 text-muted-foreground font-normal">
                  Dashboard Estudiante <School class="w-5" />
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
