<script setup lang="ts">
import Footer from "~/components/layout/Footer.vue";
import LanguageSwitcher from "~/components/ui/LanguageSwitcher.vue";
const { locale } = useI18n();

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
    <header class="fixed top-0 left-0 w-full bg-background z-40">
      <div class="container mx-auto! py-7! flex! items-center justify-between">
        <NuxtLink
          to="/"
          rel="noopener noreferrer"
          class="w-27.5 md:w-37.5 pb-3"
          :title="$t('Header.logoTitle')"
        >
          <NuxtImg
            src="/logo.svg"
            :alt="$t('Header.logoAlt')"
            width="150"
            height="50"
            class="h-auto"
          />
          <span class="sr-only">Baiitna Logo</span>
        </NuxtLink>
        <LanguageSwitcher type="mobileHeader" />
      </div>
    </header>
    <main class="auth-container h-[70vh] bg-background">
      <slot />
    </main>
  </Html>
</template>
