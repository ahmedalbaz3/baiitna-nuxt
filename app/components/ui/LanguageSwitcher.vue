<script setup lang="ts">
import { Globe } from "lucide-vue-next";
const { locale, setLocale } = useI18n();

const props = defineProps<{
  type: "desktop" | "mobile" | "mobileHeader";
  className?: string;
}>();

const isRtl = computed(() => locale.value === "ar");

const togglePageDirection = () => {
  const nextLocale = isRtl.value ? "en" : "ar";
  console.log("Switching to locale:", nextLocale);
  setLocale(nextLocale);
};
</script>

<template>
  <div
    class="lang hover:text-primary cursor-pointer duration-200 flex gap-1.5 text-base items-center"
    :class="className"
    tabIndex="0"
    @click="togglePageDirection"
  >
    <span v-if="type === 'desktop'">{{ $t("Header.lang") }}</span>
    <span v-else-if="type === 'mobileHeader'"></span>
    <span v-else>{{ isRtl ? "اللغة" : "Language" }}</span>
    <Globe v-if="type === 'desktop'" width="24" height="24" />
    <Globe v-else width="20" height="20" />
  </div>
</template>
