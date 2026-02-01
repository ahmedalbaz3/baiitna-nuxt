<script setup lang="ts">
import { ChevronLeft, ChevronRight, LogOut, Menu, X } from "lucide-vue-next";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import Button from "./Button.vue";
import { useAuthStore } from "../../../store/auth";

const authStore = useAuthStore();

const props = defineProps<{
  class?: string;
}>();

const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");

const open = ref(false);
const servicesOpen = ref(false);

const list = [
  { title: "About Us", titleAr: "عنّا", href: "/about" },
  {
    title: "Baiitna for business",
    titleAr: "بيتنا للأعمال",
    href: "/business",
  },
  { title: "Blog", titleAr: "المدونة", href: "/blog" },
  { title: "Contact", titleAr: "اتصل بنا", href: "/contact" },
  { title: "FAQ", titleAr: "الأسئلة الشائعة", href: "/faq" },
];
</script>

<template>
  <div class="md:hidden" :class="props.class">
    <Menu @click="() => (open = true)" class="cursor-pointer" />

    <div
      class="absolute top-0 end-0 duration-150 h-dvh"
      :class="open ? 'z-40' : 'opacity-0 -z-50 hidden'"
    >
      <div
        class="absolute top-0 left-0 bg-black opacity-50 h-dvh w-dvw -translate-x-full duration-150"
        @click="
          () => {
            open = false;
            servicesOpen = false;
          }
        "
      ></div>
      <div
        class="flex flex-col top-0 end-0 bg-white duration-150 h-dvh w-[75dvw] absolute overflow-y-auto"
      >
        <div
          class="head flex items-center justify-between px-4 py-6"
          :class="servicesOpen ? 'hidden' : ''"
        >
          <div class="w-27.5 md:w-37.5 pb-3">
            <NuxtImg
              src="/logo.svg"
              alt="Baiitna Logo"
              width="150"
              height="50"
              class="w-full h-auto"
            />
          </div>
          <X @click="() => (open = false)" class="cursor-pointer" />
        </div>
        <div class="border-b border-b-gray-300">
          <div
            class="flex items-center text-sm font-semibold px-4 py-6 cursor-pointer w-fit"
            @click="() => (servicesOpen = !servicesOpen)"
          >
            <ChevronLeft
              width="20"
              height="20"
              :class="servicesOpen ? '' : 'hidden'"
            />

            <span>{{ $t("MobileMenu.services") }}</span>

            <ChevronLeft
              v-if="isRtl"
              width="20"
              height="20"
              :class="servicesOpen ? 'hidden' : ''"
            />

            <ChevronRight
              v-else
              width="20"
              height="20"
              :class="servicesOpen ? 'hidden' : ''"
            />
          </div>
          <div
            class="p-4 text-base font-medium flex flex-col gap-8"
            :class="servicesOpen ? '' : 'hidden'"
          >
            <ul class="flex flex-col gap-5">
              <li>service 1</li>
              <li>service 1</li>
              <li>service 1</li>
              <li>service 1</li>
              <li>service 1</li>
              <li>service 1</li>
              <li>service 1</li>
            </ul>
            <NuxtLink to="/services" class="text-primary w-fit">
              {{ $t("MobileMenu.showAllServices") }}
            </NuxtLink>
          </div>
        </div>
        <ul
          class="text-sm font-semibold px-4 py-6 border-b border-b-gray-300 flex flex-col gap-5"
        >
          <li v-for="(item, index) in list" :key="index">
            <NuxtLink :to="item.href">
              {{ isRtl ? item.titleAr : item.title }}
            </NuxtLink>
          </li>
        </ul>
        <div :class="authStore.token ? '' : 'flex-1'">
          <div
            class="h-full flex flex-col gap-8 items-center justify-between px-4 py-6 border-t border-t-gray-300"
          >
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2 font-normal">
                <LanguageSwitcher class="flex-row-reverse" type="mobile" />
              </div>
              <p>{{ !isRtl ? "العربية" : "English" }}</p>
            </div>

            <div
              v-if="!authStore.user"
              class="actions flex flex-col gap-5 w-full"
            >
              <Button
                :text="$t('Header.join')"
                class="w-full hover:bg-hover text-text-primary bg-primary"
              />
              <Button
                :text="$t('Header.signup')"
                class="w-full bg-transparent border text-foreground hover:bg-foreground hover:text-text-primary border-foreground"
              />
              <Button
                :text="$t('Header.login')"
                class="w-full bg-transparent border text-foreground hover:bg-foreground hover:text-text-primary border-foreground"
              />
            </div>
          </div>
        </div>
        <div
          v-if="authStore.user"
          class="actions flex items-start flex-1 border-t w-full border-t-gray-300 text-red-500 py-6 px-4 hover:text-red-800 text-base"
        >
          <div class="flex items-center">
            <LogOut class="inline-block size-4! mx-2 cursor-pointer" />
            <span class="cursor-pointer" @click="authStore.clearUser">
              {{ $t("Header.userMenu.logout") }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
