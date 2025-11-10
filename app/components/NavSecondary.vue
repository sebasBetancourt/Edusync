<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next"
import { ref } from "vue"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'
import SettingsDialog from './SettingsDialog.vue'

const props = defineProps<{
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}>()
const showSettings = ref(false)

</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title" @click="showSettings = true">
          <SidebarMenuButton as-child size="sm">
            <a :href="item.url">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
  <SettingsDialog v-model:open="showSettings" />
</template>
