<script setup lang="ts">
const props = defineProps<{
  className?: string;
}>();
</script>

<template>
  <div
    class="bg-gray-200/80 animate-pulse rounded-md"
    :class="props.className"
  />
</template>
