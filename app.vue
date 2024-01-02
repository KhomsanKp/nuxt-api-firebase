<template>
  <NuxtPage />
</template>

<script setup>
const store = useUserStore()
store.setUsers()
</script>