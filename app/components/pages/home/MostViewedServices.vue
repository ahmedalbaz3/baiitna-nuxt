<script setup lang="ts">
import type { GetMostViewedServicesQuery } from "#gql";
import Button from "~/components/ui/Button.vue";

const { locale } = useI18n();

const { data, pending, error } = await useAsyncData<GetMostViewedServicesQuery>(
  "most-viewed-services",
  () => GqlGetMostViewedServices(),
);

const services = computed(
  () => data?.value?.featuredBoard?.data?.services || [],
);
const isRtl = locale.value === "ar";
</script>

<template>
  <section class="bg-white pb-sm-section-py">
    <div class="container flex flex-col items-start">
      <h2 class="text-2xl font-semibold mb-6">
        {{ $t("HomePage.PopularServices.title") }}
      </h2>
      <div
        class="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3"
      >
        <div
          v-for="service in services"
          :key="service.id"
          class="image rounded-2xl overflow-hidden relative h-[270px] w-full cursor-pointer"
        >
          <div
            class="relative w-full h-full overflow-hidden rounded-2xl bg-[#f6f7f8] animate-shimmer"
          >
            <NuxtImg
              :src="`https://staging-api.baiitna.com/${service?.image?.file}`"
              :alt="isRtl ? service.nameAr : service.nameEn"
              fill
              class="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div
            class="relative w-full h-[60%] top-[40%] bg-cover bg-center bg-[linear-gradient(to_top,rgba(0,0,0,0.6)_0%,rgba(255,255,255,0)_40%)]"
          ></div>
          <p class="absolute bottom-0 p-4 text-white font-semibold text-base">
            {{ isRtl ? service.nameAr : service.nameEn }}
          </p>
        </div>
      </div>
      <NuxtLink href="/auth/profile-setup" class="self-center mt-10">
        <Button
          :text="$t('HomePage.PopularServices.viewAll')"
          class="hover:bg-hover text-text-primary bg-primary"
        />
      </NuxtLink>
    </div>
  </section>
</template>
