<script setup lang="ts">
import { ChevronLeft, ChevronRight, Mail, Phone } from "lucide-vue-next";

const props = defineProps<{
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl?: string;
  providerLogo?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  profileLink?: string;
}>();

const { locale } = useI18n();
const isRtl = locale.value === "ar";
</script>

<template>
  <div
    class="service-card flex flex-col shadow-md rounded-xl overflow-hidden bg-white min-h[456px]"
  >
    <NuxtLink to="/" class="relative block h-[264px] w-full">
      <div
        class="relative w-full h-full overflow-hidden bg-[#f6f7f8] animate-shimmer"
      >
        <NuxtImg
          :src="`https://staging-api.baiitna.com/${imageUrl}`"
          alt="Home Smart System"
          fill
          class="object-cover"
          sizes="(max-width: 768px) 100vw, 360px"
        />
      </div>
    </NuxtLink>

    <div class="desc flex flex-col justify-between flex-1 p-4 pb-0 relative">
      <div
        class="absolute top-[-30px] left-4 border-2 border-background rounded-2xl overflow-hidden size-[60px]"
      >
        <div
          class="relative w-full h-full overflow-hidden bg-[#f6f7f8] animate-shimmer"
        >
          <NuxtImg
            :src="`https://staging-api.baiitna.com/${providerLogo}`"
            alt="Service Provider"
            width="60"
            height="60"
            class="rounded-lg object-cover"
          />
        </div>
      </div>
      <div class="text space-y-1 pt-7">
        <NuxtLink
          :to="`${profileLink}`"
          class="text-base font-semibold text-gray-900 cursor-pointer hover:text-primary duration-150"
        >
          {{ isRtl ? titleAr : titleEn }}
        </NuxtLink>
        <p class="text-sm text-gray-500">
          {{
            isRtl
              ? descriptionAr?.length > 40
                ? descriptionAr.slice(0, 40) + "..."
                : descriptionAr
              : descriptionEn?.length > 40
                ? descriptionEn.slice(0, 40) + "..."
                : descriptionEn
          }}
        </p>
      </div>

      <div class="bottom flex justify-between items-center">
        <ul class="flex gap-3 py-5">
          <NuxtLink :to="`tel:${phone}`">
            <li class="service-card-icons">
              <Phone />
              <span class="sr-only">phone</span>
            </li>
          </NuxtLink>
          <NuxtLink
            :to="`https://wa.me/${whatsapp}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li class="service-card-icons">
              <svg
                viewBox="0 0 32 32"
                class="whatsapp-ico w-7.5"
                fill="currentColor"
              >
                <path
                  d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">whatsapp</span>
            </li>
          </NuxtLink>
          <NuxtLink :to="`mailto:${email}`">
            <li class="service-card-icons">
              <Mail />
              <span class="sr-only">email</span>
            </li>
          </NuxtLink>
        </ul>

        <NuxtLink
          :to="`${profileLink}`"
          class="profile-link text-primary font-semibold flex items-center gap-1 cursor-pointer xl:text-sm opacity-0 hover:opacity-100 duration-200"
        >
          {{ $t("HomePage.Card.viewProfile") }}
          <ChevronLeft v-if="isRtl" :size="18" />
          <ChevronRight v-else :size="18" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
