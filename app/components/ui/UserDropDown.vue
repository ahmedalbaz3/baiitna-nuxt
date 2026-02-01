<script setup lang="ts">
import {
  ChevronDown,
  CircleUserRound,
  LogOut,
  MessageCircleMore,
  Settings,
  Ticket,
} from "lucide-vue-next";
import { useAuthStore } from "../../../store/auth";

const authStore = useAuthStore();

const menuOpen = ref(false);
// const userData = ref<{ fullName: string; email: string } | null>(null);
</script>

<template>
  <div class="relative">
    <div
      class="p-3 hover:bg-white rounded-2xl duration-150 flex items-center gap-1 cursor-pointer"
      :class="menuOpen && 'bg-white'"
      @click="menuOpen = !menuOpen"
    >
      <CircleUserRound />
      <ChevronDown class="inline-block size-4!" />
    </div>
    <div
      class="absolute top-full end-0 text-black py-6 w-70 mt-2 bg-white rounded-2xl shadow-lg z-20 overflow-hidden transition-all duration-200"
      :class="{ block: menuOpen, hidden: !menuOpen }"
    >
      <div class="px-5 pb-4 border-b">
        <div class="text-base font-semibold mb-0.5">
          {{ authStore.user?.fullName || "User Name" }}
        </div>
        <div class="text-xs">
          {{ authStore.user?.email || "user@example.com" }}
        </div>
      </div>
      <ul class="flex flex-col gap-4 mt-4 px-5 pb-4 border-b text-base">
        <NuxtLink to="/settings">
          <li
            class="flex items-center gap-3 hover:text-primary rounded-lg cursor-pointer"
          >
            <Settings />
            <span class="">{{ $t("Header.userMenu.settings") }}</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/quotes">
          <li
            class="flex items-center gap-3 hover:text-primary rounded-lg cursor-pointer"
          >
            <MessageCircleMore />
            <span class="">{{ $t("Header.userMenu.quote") }}</span>
          </li>
        </NuxtLink>
        <NuxtLink to="/support-tickets">
          <li
            class="flex items-center gap-3 hover:text-primary rounded-lg cursor-pointer"
          >
            <Ticket />
            <span class="">{{ $t("Header.userMenu.ticket") }}</span>
          </li>
        </NuxtLink>
      </ul>
      <div class="px-5 py-4 border-b flex flex-col gap-4 text-base">
        <NuxtLink to="/about" class="hover:text-primary">
          {{ $t("Header.userMenu.about") }}
        </NuxtLink>
        <NuxtLink to="/faq" class="hover:text-primary">
          {{ $t("Header.userMenu.faq") }}
        </NuxtLink>
      </div>
      <div
        class="pt-4 text-red-500 px-5 hover:text-red-800 text-base"
        @click="authStore.clearUser"
      >
        <LogOut class="inline-block size-4! mx-2 cursor-pointer" />
        <span class="cursor-pointer">
          {{ $t("Header.userMenu.logout") }}
        </span>
      </div>
    </div>
  </div>
  <div
    v-if="menuOpen"
    class="absolute top-full left-0 w-full h-screen bg-transparent z-10"
    @click="menuOpen = false"
  ></div>
</template>
