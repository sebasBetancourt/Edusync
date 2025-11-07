<script setup lang="ts">

// @ts-expect-error definePageMeta es global de Nuxt
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Mis Cursos'
})
</script>

<template>
    <div></div>
</template>