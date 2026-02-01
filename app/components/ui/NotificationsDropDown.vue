<script setup lang="ts">
import { Bell } from "lucide-vue-next";

const dropDownOpen = ref(false);
const setDropdownOpen = () => {
  dropDownOpen.value = !dropDownOpen.value;
};
</script>

<template>
  <div class="relative">
    <div
      class="hover:bg-white rounded-2xl p-3 cursor-pointer duration-150"
      @click="setDropdownOpen"
    >
      <Bell class="" />
    </div>
    <div
      class="absolute top-full right-0 mt-2 rounded-2xl bg-white p-6 w-md shadow-lg"
      :class="{ hidden: !dropDownOpen }"
    >
      <p class="text-xl font-semibold">Notifications</p>
      <div class="py-10 text-center flex flex-col items-center justify-center">
        <NuxtImg
          src="/images/notifications.svg"
          alt=""
          width="{104}"
          height="{104}"
          class=""
        />
        <p class="text-xl font-semibold mt-3 mb-2">
          No notifications until now
        </p>
        <p class="text-sm">Your notifications will appear here.</p>
      </div>
    </div>
  </div>
</template>
