<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = defineProps<{
  title: string;
}>();

const { locale } = useI18n();

// 1. Ensure the key is unique to the locale to prevent data collisions
const { data: categoriesData, pending } = await useAsyncData(
  `categories-${locale.value}`,
  () => GqlGetAllCategories({ limit: 8 }),
  {
    watch: [locale], // This will re-run the fetcher when locale changes
  },
);

// 2. Map data inside computed to handle localization & fallbacks
const categories = computed(() => {
  const items = categoriesData.value?.Allcategories?.data?.items || [];

  return items.map((item) => ({
    ...item,
    displayName: locale.value === "ar" ? item?.nameAr : item?.nameEn,
    // Map services inside the item as well
    localizedServices:
      item?.companyServices?.map((service) => ({
        ...service,
        displayName: locale.value === "ar" ? service.nameAr : service.nameEn,
      })) || [],
  }));
});

const open = ref(false);
const titleHover = ref(false);

// const handleMouseEnter = () => {
//   open.value = true;

//   titleHover.value = true;
// };

// const handleMouseLeave = () => {
//   open.value = false;

//   titleHover.value = false;
// };
</script>

<template>
  <div class="xl:relative max-lg:hidden z-40 group">
    <div class="pb-2">
      <p
        class="hover:bg-white py-3 px-5 rounded-2xl cursor-pointer duration-150 font-semibold group-hover:bg-white"
      >
        {{ $t("Header.findProvider") }}
        <ChevronDown class="inline-block ml-2" />
      </p>
    </div>

    <div
      class="bg-white rounded-2xl w-7xl max-w-dvw xl:max-w-[80dvw] absolute min-w-fit top-full p-8 flex flex-col gap-2 shadow-2xl start-0 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
      :class="open ? 'opacity-100 visible' : ''"
    >
      <div class="header">
        <p class="text-2xl font-semibold whitespace-nowrap">
          {{ $t("Header.navDropDown.title") }}
        </p>
      </div>

      <div class="body grid grid-cols-3 whitespace-nowrap gap-8 py-6">
        <ul
          v-for="(item, index) in categories"
          :key="item.id || index"
          class="flex flex-col gap-4"
        >
          <li class="flex flex-col gap-2">
            <strong class="flex items-center gap-1.5">
              <NuxtImg
                src="/images/category_image-1.png"
                alt=""
                width="30"
                height="24"
              />
              {{ item.displayName }}
            </strong>
            <ul class="flex flex-col gap-1 text-sm">
              <li v-for="service in item.localizedServices" :key="service.id">
                <NuxtLink to="/" class="hover:text-primary">
                  {{ service.displayName }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="footer flex gap-8 whitespace-nowrap">
        <NuxtLink
          to="/"
          class="text-primary font-semibold underline flex items-center gap-1 text-sm"
        >
          <span>{{ $t("Header.navDropDown.viewCategories") }}</span>
          <component
            :is="locale === 'ar' ? ChevronLeft : ChevronRight"
            class="w-5 h-5"
          />
        </NuxtLink>

        <NuxtLink
          to="/"
          class="text-primary font-semibold underline flex items-center gap-1 text-sm"
        >
          <span>{{ $t("Header.navDropDown.viewProviders") }}</span>
          <component
            :is="locale === 'ar' ? ChevronLeft : ChevronRight"
            class="w-5 h-5"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
