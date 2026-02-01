<script setup lang="ts">
import Search from "./Search.vue";

const pathname = useRoute().path;

console.log("Current Pathname:", pathname);

const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/ar";
</script>

<template>
  <div>
    <Search
      v-show="isHomePage"
      className="max-xl:hidden max-w-[475px]"
      type="header"
    />
  </div>
</template>
