<script setup lang="ts">
import Skeleton from "../Skeleton.vue";
</script>

<template>
  <div
    class="flex flex-col shadow-md rounded-xl overflow-hidden bg-white min-h-[440px] border border-gray-100"
  >
    <Skeleton class="h-[264px] w-full rounded-none" />

    <div class="desc flex flex-col justify-between flex-1 p-4 pb-0 relative">
      <div
        class="absolute top-[-30px] left-4 border-2 border-white rounded-2xl overflow-hidden bg-white"
      >
        <Skeleton class="w-[60px] h-[60px] rounded-lg" />
      </div>

      <div class="space-y-1 pt-7">
        <Skeleton class="h-6 w-3/4" />
        <div class="space-y-2">
          <Skeleton class="h-5 w-full" />
        </div>
      </div>

      <div class="bottom flex justify-between items-center mt-auto">
        <ul class="flex gap-3 py-5">
          <Skeleton class="h-10 w-10 rounded-full" />
          <Skeleton class="h-10 w-10 rounded-full" />
          <Skeleton class="h-10 w-10 rounded-full" />
        </ul>

        <Skeleton class="h-5 w-24 rounded-sm" />
      </div>
    </div>
  </div>
</template>
