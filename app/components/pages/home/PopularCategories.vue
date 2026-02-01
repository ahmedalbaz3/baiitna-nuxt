<script setup lang="ts">
import type { GetPopularCategoriesQuery } from "#gql";

const { locale } = useI18n();

const isRtl = locale.value === "ar";
const {
  data: popularCategoriesData,
  pending: popularCategoriesLoading,
  error: popularCategoriesError,
} = await useAsyncData<GetPopularCategoriesQuery>("popular-categories", () =>
  GqlGetPopularCategories(),
);

const categories = computed(
  () => popularCategoriesData?.value?.featuredBoard?.data?.categories || [],
);
</script>

<template>
  <section class="bg-white pb-sm-section-py">
    <div class="container flex flex-col items-start">
      <h2 class="text-3xl font-semibold mb-6">
        {{ $t("HomePage.Categories.title") }}
      </h2>
      <div class="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 w-full">
        <NuxtLink
          v-for="category in categories.slice(0, 8)"
          :key="category.id"
          to="/"
          class="flex flex-col items-center justify-between gap-3 mb-2 me-2 py-7.5 px-6 bg-background hover:text-primary text-center rounded-2xl overflow-hidden"
        >
          <div
            class="image relative rounded-lg overflow-hidden w-[38px] h-[38px] md:w-[56px] md:h-[56px]"
          >
            <div
              class="relative w-full h-full overflow-hidden bg-[#f6f7f8] animate-shimmer"
            >
              <NuxtImg
                :src="`https://staging-api.baiitna.com/${category?.image?.file}`"
                :alt="isRtl ? category.nameAr : category.nameEn"
                fill
                sizes="(max-width: 768px) 36px, 56px"
                class="object-cover"
              />
            </div>
          </div>
          <span
            class="hover:text-primary text-center font-medium text-sm md:text-base"
          >
            {{ isRtl ? category.nameAr : category.nameEn }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
