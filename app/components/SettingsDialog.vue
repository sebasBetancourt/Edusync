<script setup lang="ts">
import { ref, watch } from "vue"
import {
  Bell, LifeBuoy, Lock, MessageCircle, Settings, User
} from "lucide-vue-next"

import Notificaciones from "./Notificaciones.vue"
import Cuenta from './Cuenta.vue'
import Privacidad from './Privacidad.vue'
import Comentarios from './Comentarios.vue'
import Soporte from './Soporte.vue'
import Ajustes from './Ajustes.vue'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog'
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider
} from './ui/sidebar'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(["update:open"])

const localOpen = ref(props.open)
const activeSection = ref("Cuenta")

watch(() => props.open, (val) => { localOpen.value = val })
watch(localOpen, (val) => emit("update:open", val))

const data = {
  nav: [
    { name: "Cuenta", icon: User },
    { name: "Notificaciones", icon: Bell },
    { name: "Privacidad", icon: Lock },
    { name: "Comentarios", icon: MessageCircle },
    { name: "Soporte", icon: LifeBuoy },
    { name: "Ajustes", icon: Settings },
  ],
}
</script>

<template>
  <Dialog v-model:open="localOpen">
    <DialogContent
      class="rounded-xl p-0 bg-background shadow-2xl border border-border/20 
             w-[92%] sm:w-[85%] md:max-w-[700px] lg:max-w-[800px] 
             max-h-[85vh] flex flex-col overflow-hidden"
    >
      <DialogTitle class="sr-only">Configuraciones</DialogTitle>
      <DialogDescription class="sr-only">Personaliza tus ajustes aquí.</DialogDescription>

      <SidebarProvider class="flex flex-1 flex-col md:flex-row overflow-hidden">

        <!-- 📱 Menú superior móvil -->
        <nav
          class="flex md:hidden justify-start gap-0 overflow-x-auto scrollbar-none 
                 border-b border-border/30 bg-muted/20 py-2 sticky top-0 z-10"
        >
          <button
            v-for="item in data.nav"
            :key="item.name"
            @click="activeSection = item.name"
            class="flex flex-col items-center text-xs min-w-[70px] transition-all duration-200"
            :class="{
              'text-primary font-semibold scale-105': item.name === activeSection,
              'text-muted-foreground hover:text-foreground': item.name !== activeSection
            }"
          >
            <component :is="item.icon" class="h-5 w-5 mb-1" />
            {{ item.name }}
          </button>
        </nav>

        <!-- 🖥 Sidebar escritorio -->
        <Sidebar
          collapsible="none"
          class="hidden md:flex border-r border-border/40 bg-muted/20 flex-shrink-0"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem
                    v-for="item in data.nav"
                    :key="item.name"
                  >
                    <SidebarMenuButton
                      as-child
                      :is-active="item.name === activeSection"
                      @click="activeSection = item.name"
                      class="hover:bg-muted/70 transition-colors duration-200"
                    >
                      <button class="flex items-center gap-2 w-full text-left">
                        <component :is="item.icon" class="h-4 w-4" />
                        <span>{{ item.name }}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <!-- 💡 Contenido principal -->
        <main class="flex flex-col flex-1 overflow-hidden">
          <!-- Header visible solo en desktop -->
          <header
            class="hidden md:flex h-14 shrink-0 items-center gap-2 border-b border-border/30 px-3"
          >
            <h2 class="text-lg font-bold">{{ activeSection }}</h2>
          </header>

          <!-- 🔥 Aquí está la clave: el scroll SOLO aquí -->
          <section class="flex-1 px-4 py-4 space-y-4">
            <div v-if="activeSection === 'Cuenta'"><Cuenta /></div>
            <div v-else-if="activeSection === 'Notificaciones'"><Notificaciones /></div>
            <div v-else-if="activeSection === 'Privacidad'"><Privacidad /></div>
            <div v-else-if="activeSection === 'Comentarios'"><Comentarios /></div>
            <div v-else-if="activeSection === 'Soporte'"><Soporte /></div>
            <div v-else-if="activeSection === 'Ajustes'"><Ajustes /></div>
          </section>
        </main>
      </SidebarProvider>
    </DialogContent>
  </Dialog>
</template>
