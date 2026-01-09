<script setup lang="ts">
import MainFooter from './components/MainFooter.vue';
import MainHeader from './components/MainHeader.vue';

</script>

<template>
  <MainHeader />

  <main>
    <RouterView />
  </main>

  <MainFooter />
</template>

<style scoped></style>
