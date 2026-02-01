<script setup lang="ts">
import Search from "~/components/ui/Search.vue";

const { locales } = useI18n();
const isRtl = locales.value[0]?.code === "ar";
const direction = isRtl ? "rtl" : "ltr";
</script>

<template>
  <section class="mt-[112px]">
    <div
      class="container text-center flex flex-col items-center py-10 md:py-hero-py"
    >
      <div class="text-center">
        <h1 class="text-[28px] md:text-[46px] font-semibold max-w-184 mx-auto">
          {{ $t("HomePage.Hero.title") }}
        </h1>
        <p class="text-sm md:text-[18px] max-w-139.5 mx-auto mt-6">
          {{ $t("HomePage.Hero.description") }}
        </p>
      </div>
      <div class="search mt-12 w-full max-w-2xl mx-auto">
        <Search />
      </div>
    </div>
  </section>
</template>
