<script setup lang="ts">
import Skeleton from "../Skeleton.vue";

const list = [1, 2, 3, 4, 5, 6];
</script>
<template>
  <div className="grid md:grid-cols-2 h-[450px]">
    <div className="col flex flex-col overflow-hidden p-6 h-full max-md:pb-25">
      <div className="title">
        <h3 className="text-start text-xl font-bold max-md:hidden">Services</h3>
        <div className="flex gap-1 mt-2 text-sm items-center">
          <Skeleton className="h-4 w-4" />
          <p>Results in services</p>
        </div>
      </div>
      <div
        className="results flex-1 mt-6 overflow-y-auto flex flex-col gap-4 pr-2 custom-scrollbar"
      >
        <div
          v-for="value in list"
          :key="value"
          className="text-sm flex items-center shrink-0"
        >
          <Skeleton className="h-4 w-4 mr-1.5 shrink-0" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>

    <div className="col flex flex-col overflow-hidden p-6 h-full max-md:pb-25">
      <div className="title">
        <h3 className="text-start text-xl font-bold max-md:hidden">
          Providers
        </h3>
        <div className="flex gap-1 mt-2 text-sm items-center">
          <Skeleton className="h-4 w-4" />
          <p>Results in providers</p>
        </div>
      </div>
      <div
        className="results flex-1 mt-6 overflow-y-auto flex flex-col gap-4 pr-2 custom-scrollbar"
      >
        <div
          v-for="value in list"
          :key="value"
          className="text-sm flex items-center gap-3 shrink-0"
        >
          <div
            className="border border-gray-200 rounded-md overflow-hidden shrink-0"
          >
            <Skeleton className="w-[30px] h-[30px]" />
          </div>
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </div>
  </div>
</template>
