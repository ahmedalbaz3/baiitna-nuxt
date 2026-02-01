<script setup lang="ts">
import { Bookmark } from "lucide-vue-next";
import Button from "../ui/Button.vue";
import NavMenu from "../ui/NavMenu.vue";
import NotificationsDropDown from "../ui/NotificationsDropDown.vue";
import UserDropDown from "../ui/UserDropDown.vue";
import LanguageSwitcher from "../ui/LanguageSwitcher.vue";
import MobileMenu from "../ui/MobileMenu.vue";
import SearchHeader from "../ui/SearchHeader.vue";
import { useAuthStore } from "../../../store/auth";

const authStore = useAuthStore();
const { locales } = useI18n();

const isRtl = locales.value[0]?.code === "ar";

const token = ref(authStore.token);

watch(
  () => authStore.token,
  (newToken) => {
    token.value = newToken;
  },
);
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-background z-40">
    <div class="container py-7">
      <div class="left flex items-center gap-9">
        <NuxtLink
          to="/"
          rel="noopener noreferrer"
          class="w-27.5 md:w-37.5 pb-3"
          title=""
        >
          <NuxtImg
            src="/logo.svg"
            alt=""
            width="150"
            height="50"
            class="w-full h-auto"
          />
          <span class="sr-only">Baiitna Logo</span>
        </NuxtLink>
        <NavMenu title="Find provider" />
      </div>
      <SearchHeader />
      <div class="right hidden md:flex items-center gap-4">
        <div class="" v-if="token">
          <div
            class="py-3 px-5 rounded-2xl hover:bg-white cursor-pointer duration-150 font-semibold"
          >
            {{ $t("Header.requestQuote") }}
          </div>
        </div>

        <LanguageSwitcher type="desktop" />

        <div class="flex" v-if="token">
          <NuxtLink
            to="/favorites"
            class="p-3 hover:bg-white rounded-2xl duration-150"
          >
            <Bookmark />
          </NuxtLink>
          <NotificationsDropDown />
          <UserDropDown />
        </div>
        <div class="flex gap-4" v-else="">
          <NuxtLink to="/auth/sign-up">
            <Button
              :text="$t('Header.signup')"
              class="bg-transparent border text-foreground hover:bg-foreground hover:text-text-primary border-foreground"
            />
          </NuxtLink>
          <NuxtLink to="/auth/profile-setup">
            <Button
              :text="$t('Header.join')"
              class="hover:bg-hover text-text-primary bg-primary"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="flex gap-6 md:hidden">
        <LanguageSwitcher type="mobileHeader" class="md:hidden" />
        <MobileMenu />
      </div>
    </div>
  </header>
</template>
