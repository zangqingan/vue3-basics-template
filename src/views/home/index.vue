<script setup lang="ts">
  import { useUserStore } from '@/store';
  const userStore = useUserStore();
  const { increment } = userStore;
</script>

<template>
  <div>
    <div>Home</div>
    <div>pinia: {{ userStore.count }}</div>
    <button type="button" @click="increment">change pinia</button>
  </div>
</template>

<style lang="scss" scoped></style>
