<script setup lang="ts">
import type { SidebarProps } from './ui/sidebar'

import {
  BookOpen,
  CalendarDays,
  LibraryBig,
  Users,
  LifeBuoy,
  IdCard,
  GraduationCap,
  Send,
  ClipboardMinus,
  CreditCard,
} from "lucide-vue-next"
import NavMain from './NavMain.vue'
import NavProjects from './NavProjects.vue'
import NavSecondary from './NavSecondary.vue'
import NavUser from './NavUser.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from './ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: "inset",
})

const data = {
  user: {
    name: "Alvaro Uribe",
    email: "uribista@gmail.com",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrbUFIX10_6HHn-4mbBVoRLwnx0RVmfGeJQ&s",
  },
  navMain: [
    {
      title: "Materias",
      url: "#",
      icon: LibraryBig,
      isActive: true,
      items: [
        {
          title: "Matematicas",
          url: "#",
        },
        {
          title: "Ingles",
          url: "#",
        },
        {
          title: "Quimica",
          url: "#",
        },
        {
          title: "Español",
          url: "#",
        },
        {
          title: "Ciencias Sociales",
          url: "#",
        },
        {
          title: "Religion",
          url: "#",
        },
      ],
    },
    {
      title: "Calendario",
      url: "#",
      icon: CalendarDays,
      items: [
        {
          title: "Ver mi Calendario",
          url: "#",
        },
        {
          title: "Eventos",
          url: "#",
        },
        {
          title: "Citaciones",
          url: "#",
        },
      ],
    },
    {
      title: "Notas",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Ver Mis Notas",
          url: "#",
        },
        {
          title: "Tareas",
          url: "#",
        },
        {
          title: "Quizzes",
          url: "#",
        },
        {
          title: "Talleres",
          url: "#",
        },
        {
          title: "Examenes",
          url: "#",
        },
      ],
    },
    {
      title: "Reportes",
      url: "#",
      icon: ClipboardMinus,
      items: [
        {
          title: "Reporte de Notas",
          url: "#",
        },
        {
          title: "Reporte de Pagos",
          url: "#",
        },
        {
          title: "Reporte de Comportamiento",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Soporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Comentarios",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Curso",
      url: "#",
      icon: Users,
    },
    {
      name: "Profesores",
      url: "#",
      icon: GraduationCap,
    },
    {
      name: "Asistencia",
      url: "#",
      icon: IdCard,
    },
    {
      name: "Pagos",
      url: "#",
      icon: CreditCard,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <a href="#">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img src="https://img.freepik.com/vector-gratis/diseno-logotipo-escuela-secundaria-degradado_23-2149626932.jpg?semt=ais_hybrid&w=740&q=80" class="rounded-lg" alt="">
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">EduSync</span>
                <span class="truncate text-xs">Estudiante</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>
