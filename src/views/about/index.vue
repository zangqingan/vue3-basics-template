<script setup lang="ts">
import { useUserStore } from '@/store';
const userStore = useUserStore();
</script>

<template>
  <div>
    <div>关于页面</div>
    <div>子页面中的pinia数据:{{ userStore.count }}</div>
  </div>
</template>

<style  lang="scss"  scoped>
</style>