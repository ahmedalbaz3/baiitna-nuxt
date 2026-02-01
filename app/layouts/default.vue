<script setup lang="ts">
import Footer from "~/components/layout/Footer.vue";
import Header from "~/components/layout/Header.vue";
const { locale } = useI18n();

// This sets the global SEO defaults for pages using this layout
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Baiitna` : "Baiitna - Real Estate";
  },
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === "ar" ? "rtl" : "ltr",
  },
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

useSeoMeta({
  title: $t("HomePage.title"),
  ogTitle: "Baiitna - Real Estate Platform",
  description: $t("HomePage.description"),
  ogDescription:
    "Find your dream home with Baiitna. The leading real estate platform.",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <Html :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <Header />
    <slot />
    <Footer />
  </Html>
</template>
