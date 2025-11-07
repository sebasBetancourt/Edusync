<template>
  <div :class="{ 'dark': colorMode.value === 'dark' }" class="min-h-screen bg-background text-foreground">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'

const colorMode = useColorMode()
</script>