<script setup lang="ts">
import { ref, computed, useTemplateRef } from "vue";
import { ChevronDown, SearchIcon } from "lucide-vue-next";
import { Search } from "lucide-vue-next";
import { Check } from "lucide-vue-next";
import type { GetCitiesQuery, GetSearchQuery } from "#gql";
import SearchResultsSkeleton from "./skeletons/SearchResultsSkeleton.vue";
import Skeleton from "./Skeleton.vue";
import { onClickOutside, refDebounced } from "@vueuse/core";
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();
const { locale } = useI18n();

const props = defineProps<{
  class?: string;
  type?: "hero" | "default" | "header";
}>();

const isRtl = computed(() => locale.value === "ar");

const searchInput = ref<string>("");
const selectedPlace = ref<{
  id: number;
  name: string;
  nameAr: string;
  countryId: number;
}>({ name: "Abu Dhabi", nameAr: "أبو ظبي", id: 1, countryId: 1 });

const selectedCategory = ref<string>("");
const setSelectedCategory = (category: string) => {
  selectedCategory.value = category;
};

const dropdownOpen = ref(false);
const resultType = ref<"services" | "providers">("services");
const inputRef = useTemplateRef<HTMLInputElement | null>("inputRef");
const screenOpen = ref(false);
const isScrolled = computed(() => y.value > 400);
const searchContainer = useTemplateRef<HTMLElement | null>("searchContainer");


const debouncedSearchInput = refDebounced(searchInput, 300);

//  ================= GraphQL Data Fetching ================= //
const {
  data: citiesData,
  pending: citiesLoading,
  error: citiesError,
} = await useAsyncData<GetCitiesQuery>("cities", () => GqlGetCities());

const {
  data: searchResults,
  pending: searchLoading,
  error: searchError,
} = await useAsyncData<GetSearchQuery>(
  `search-${new Date().getTime()}`,
  () =>
    GqlGetSearch({
      searchKey: debouncedSearchInput.value,
      limit: 10,
      cityId: selectedPlace.value.id,
    }),
  {
    watch: [debouncedSearchInput, selectedPlace],
  },
);

const {
  data: servicesData,
  pending: suggestedServicesLoading,
  error: suggestedServicesError,
} = await useAsyncData("services-list", () => GqlGetServices());

// ================= Computed Properties ================= //
const suggestedServices = computed(
  () =>
    servicesData.value?.services?.data?.items?.map((item) =>
      isRtl.value ? item?.nameAr : item?.nameEn,
    ) || [],
);

const services = computed(
  () => searchResults.value?.search?.data?.services || [],
);

const cities = computed(
  () =>
    citiesData.value?.getCities?.data ||
    ([] as GetCitiesQuery["getCities"]["data"]),
);

const providers = computed(
  () => searchResults.value?.search?.data?.providers || [],
);

// ================ Methods ================= //
const handleSelectCity = (place: {
  name: string;
  nameAr: string;
  id: number;
  countryId: number;
}) => {
  selectedPlace.value = place;
  dropdownOpen.value = false;
};

//       const handleEnterKey = (e: KeyboardEvent) => {
//     if (e.key === "Enter") {
//       const target = e.target as HTMLLIElement;
//       setSelectedCategory(target.textContent || "");
//       selectedPlace.value = target.textContent || selectedPlace;
//       setSearchInput(target.textContent || "");
//       inputRef?.focus();
//     }
//   };

const handleSelectCategory = (category: string) => {
  selectedCategory.value = category;
  searchInput.value = category;
  inputRef.value?.focus();
};

const emptySearchInput = () => {
  searchInput.value = "";
  selectedCategory.value = "";
};

// watch(
//   () => searchInput.value,
//   () => {
//     if (searchInput.value === "") {
//       selectedCategory.value = "";
//     }
//   },
// );

watch(
   searchInput,
  (newVal) => {
    console.log("Search Input Changed:", newVal);
    screenOpen.value = newVal.length > 0;
  },
);

onClickOutside(searchContainer, () => {
  screenOpen.value = false;
  dropdownOpen.value = false;
});
</script>

<template>
  <div
    :hidden="type=== 'header' && !isScrolled "
    ref="searchContainer"
    class="search-component w-full"
    :class="props.class + (type === 'header' ? ' max-md:hidden' : '')"
  >
    <form
      action=""
      class="flex items-center border rounded-xl bg-cream w-full relative"
      @submit.prevent
    >
      <button type="submit" class="p-2">
        <Search width="20" height="20" />
        <span class="sr-only">{{ $t("HomePage.Hero.searchButton") }}</span>
      </button>
      <input
        ref="inputRef"
        type="text"
        :placeholder="$t('HomePage.Hero.searchPlaceholder')"
        class="md:w-[320px] h-11.5 outline-0 flex-1 text-xs md:text-base relative z-30"
        v-model="searchInput"
      />
      <div class="select flex">
        <span>|</span>
        <div class="" @click="dropdownOpen = !dropdownOpen" tabindex="0">
          <span class="text-xs md:text-sm p-2 cursor-pointer font-medium">
            {{ isRtl ? selectedPlace.nameAr : selectedPlace.name }}
            <ChevronDown class="inline-block ml-1" />
          </span>
          <div
            class="dropdown absolute top-full mt-3 rounded-2xl bg-white w-60 shadow-lg duration-250 end-0"
            :class="dropdownOpen ? 'z-20' : 'h-0 overflow-hidden hidden'"
          >
            <ul class="py-3">
              <li
                v-for="item in cities"
                tabIndex="0"
                :key="item?.id"
                @click="() => (selectedPlace = item)"
                class="text-xs md:text-sm py-3 px-6 hover:text-primary cursor-pointer flex items-center justify-between gap-2 whitespace-nowrap"
                @focus="() => (selectedPlace = item)"
              >
                {{ isRtl ? item?.nameAr : item?.name }}
                <span class="text-primary">
                  <Check v-if="selectedPlace.id === item?.id" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
      v-if="screenOpen"
        class="search-screen absolute top-full left-1/2 -translate-x-1/2 xl:translate-x-0 xl:left-auto xl:right-0 mt-3 duration-300 shadow-2xl z-30 rounded-2xl bg-white w-4xl max-w-[96vw] overflow-hidden"

      >
        <div
          class="md:hidden flex items-center text-sm gap-4 px-6 border-b border-b-gray-300"
        >
          <span
            class="result-card py-3"
            :class="resultType === 'services' ? 'result-card focused' : ''"
            @click="
              () => {
                if (resultType !== 'services') resultType = 'services';
              }
            "
          >
            {{ $t("HomePage.Hero.search.service") }}
          </span>
          <span
            class="result-card"
            :class="resultType === 'providers' ? 'result-card focused' : ''"
            @click="
              () => {
                if (resultType !== 'providers') resultType = 'providers';
              }
            "
          >
            {{ $t("HomePage.Hero.search.provider") }}
          </span>
        </div>

        <ClientOnly>
          <SearchResultsSkeleton v-if="searchLoading" />

          <div
            v-else-if="services.length > 0 || providers.length > 0"
            class="grid md:grid-cols-2 h-[408px] overflow-hidden border border-gray-100 rounded-xl bg-white shadow-sm"
          >
            <div
              class="col flex flex-col p-6 h-full min-h-0 border-e border-gray-50"
              :class="resultType === 'services' ? '' : 'max-md:hidden'"
            >
              <div class="title shrink-0">
                <h3 class="text-start text-xl font-bold max-md:hidden">
                  {{ $t("HomePage.Hero.search.service") }}
                </h3>
                <div class="flex gap-1 mt-2 text-sm">
                  <span class="text-primary font-semibold">
                    {{ services.length }}
                  </span>
                  <p>
                    {{ $t("HomePage.Hero.search.results") }}
                  </p>
                </div>
              </div>

              <div
                class="results flex-1 mt-6 overflow-y-auto flex flex-col gap-4 custom-scrollbar"
              >
                <NuxtLink
                  v-if="services.length > 0"
                  v-for="service in services"
                  :to="`/services/${service.slug}`"
                  :key="service.id"
                  class="text-sm flex items-center hover:text-primary shrink-0 transition-colors"
                >
                  <SearchIcon :size="16" class="me-1.5" />
                  <span>{{ isRtl ? service.nameAr : service.nameEn }}</span>
                </NuxtLink>

                <div
                  v-else
                  class="py-10 text-center flex flex-col items-center justify-center"
                >
                  <NuxtImg
                    v-if="searchResults?.search.data?.services.length === 0"
                    src="/images/search-404.svg"
                    width="100"
                    height="80"
                    alt="no results"
                    class="mx-auto h-auto opacity-60"
                  />
                  <p class="text-xs mt-4 text-gray-500">
                    {{ $t("HomePage.Hero.search.noResults") }} "{{
                      searchInput
                    }}"
                  </p>
                </div>
              </div>
            </div>

            <div
              class="col flex flex-col p-6 h-full min-h-0"
              :class="resultType === 'providers' ? '' : 'max-md:hidden'"
            >
              <div class="title shrink-0">
                <h3 class="text-start text-xl font-bold max-md:hidden">
                  {{ $t("HomePage.Hero.search.provider") }}
                </h3>
                <div class="flex gap-1 mt-2 text-sm">
                  <span class="text-primary font-semibold">
                    {{ providers.length }}
                  </span>
                  <p>
                    {{
                      $t("HomePage.Hero.search.results") +
                      " " +
                      $t("HomePage.Hero.search.provider")
                    }}
                  </p>
                </div>
              </div>

              <div
                class="results flex-1 mt-6 overflow-y-auto flex flex-col gap-4 custom-scrollbar"
              >
                <NuxtLink
                  v-if="providers.length > 0"
                  v-for="provider in providers"
                  :key="provider.id"
                  :to="`/providers${provider?.slug?.slice(19)}`"
                  class="text-sm flex items-center hover:text-primary gap-3 shrink-0 group transition-colors"
                >
                  <div
                    class="border border-gray-200 rounded-md overflow-hidden shrink-0 group-hover:border-primary transition-colors"
                  >
                    <NuxtImg
                      :src="'/images/test-provider.png'"
                      :width="32"
                      :height="32"
                      class="object-cover"
                      :alt="
                        isRtl
                          ? provider.nameAr || 'شعار المزود'
                          : provider.nameEn || 'Provider Logo'
                      "
                      loading="lazy"
                    />
                  </div>
                  <span class="truncate">
                    {{ isRtl ? provider.nameAr : provider.nameEn }}
                  </span>
                </NuxtLink>
                <div
                  v-else
                  class="py-10 text-center flex flex-col items-center justify-center"
                >
                  <p class="text-xs text-gray-400 italic">No providers found</p>
                </div>
              </div>
            </div>
          </div>
        </ClientOnly>
        <div
          v-if="searchResults?.search.data?.providers.length === 0"
          class="p-10 text-center"
        >
          <NuxtImg
            :src="'/images/search-404.svg'"
            :width="100"
            :height="80"
            alt="no results"
            class="mx-auto h-auto"
          />
          <p class="text-xs mt-4">No search results for "{{ searchInput }}"</p>
        </div>
      </div>
    </form>
    <div
      class="mt-6 flex gap-4 items-center justify-center max-md:flex-col text-sm"
      :hidden="type === 'header'"
    >
      <p>{{ $t("HomePage.Hero.searchSuggest") }}</p>

      <ul class="flex gap-1.5 md:gap-3" ">
        <Skeleton
          v-if="suggestedServicesLoading"
          v-for="el in [1, 2, 3]"
          :key="el"
          class="w-23 h-6 rounded-lg"
        />

        <li
          v-else
          v-for="(item, index) in suggestedServices"
          :key="index"
          tabindex="0"
          class="text-xs font-semibold border rounded-lg py-1.5 max-md:px-1 px-3 cursor-pointer"
          :class="
            selectedCategory === item
              ? 'bg-black text-white border'
              : 'bg-transparent text-foreground border-border'
          "
          @click="() => handleSelectCategory(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- <div
      class="absolute top-0 left-0 z-20 w-dvw h-dvh bg-black opacity-0"
      :class="{
        hidden: !searchInput,
      }"
      @click="screenOpen = false"
    ></div> -->
  </div>
</template>
