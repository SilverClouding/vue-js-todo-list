<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="align-middle mx-auto w-full max-w-2xl">
      <h1 class="text-center font-bold text-3xl mt-10">To-Do List App</h1>
      <nav class="flex flex-row justify-center gap-x-4 mt-6">
          <RouterLink to="/">All Notes</RouterLink>
          <RouterLink to="/create-note">Create Note</RouterLink>
      </nav>
    </div>
    <div class="align-middle mx-auto w-full max-w-2xl">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
