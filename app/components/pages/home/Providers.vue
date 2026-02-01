<script lang="ts" setup>
import type { GetAllServicesQuery } from "#gql";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { ref } from "vue";
import Button from "~/components/ui/Button.vue";
import DropDown from "~/components/ui/DropDown.vue";
import ProviderList from "~/components/ui/ProviderList.vue";
import Skeleton from "~/components/ui/Skeleton.vue";

const focused = ref({
  id: "",
});

const { locale } = useI18n();
const scrollBar = useTemplateRef<HTMLDivElement>("scrollBar");
const isRtl = locale.value === "ar";

const {
  data: servicesData,
  pending: servicesLoading,
  error: servicesError,
  execute,
} = await useAsyncData<GetAllServicesQuery>("get-providers-categories", () =>
  GqlGetAllServices(),
);

const services = computed(
  () => servicesData?.value?.services.data?.items || [],
);

watchEffect(() => {
  if (services.value.length > 0 && focused.value.id.length === 0) {
    focused.value.id = services.value[0]!.id;
  }
});

const handleScroll = async (direction: "left" | "right") => {
  if (scrollBar.value && direction === "right") {
    scrollBar.value.scrollBy({ left: 500, behavior: "smooth" });
  } else if (scrollBar.value && direction === "left") {
    scrollBar.value.scrollBy({ left: -500, behavior: "smooth" });
  }
};

const handleClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.tagName === "SPAN") {
    focused.value.id = target.id;
  }
};

console.log(servicesData.value);
</script>

<template>
  <section class="pb-sm-section-py bg-white">
    <div class="container flex flex-col items-start gap-[25px]">
      <h2
        class="md:text-[38px] text-xl max-w-[335px] md:max-w-[550px] font-semibold"
      >
        {{ $t("HomePage.Services.title") }}
        <DropDown class="inline-block text-primary" />
      </h2>

      <div class="relative container provider-scroll px-0">
        <div
          ref="scrollBar"
          class="flex gap-6 overflow-x-hidden w-full border-b border-gray-200 min-h-8.5"
          @click="handleClick"
        >
          <div v-if="servicesLoading && !services">
            <Skeleton
              v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]"
              :key="i"
              class="h-6 w-[calc(100vw/8)] min-w-[80px] mr-4"
            />
          </div>

          <span
            v-else
            v-for="item in services"
            class="whitespace-nowrap text-base font-semibold border-b-2 border-transparent pb-2 hover:border-primary hover:text-primary cursor-pointer"
            :class="
              focused.id === item?.id ? `border-primary! text-primary` : ``
            "
            :key="item?.id"
            :id="item?.id"
          >
            {{ isRtl ? item?.nameAr : item?.nameEn }}
          </span>
        </div>
        <div
          class="provider-icon left-0 text-black"
          @click="
            () => {
              handleScroll('left');
            }
          "
        >
          <ChevronLeft />
        </div>
        <div
          class="provider-icon right-0"
          @click="
            () => {
              handleScroll('right');
            }
          "
        >
          <ChevronRight />
        </div>
      </div>
      <ProviderList :serviceId="focused.id" />
      <NuxtLink to="/providers" class="self-center mt-10">
        <Button
          :text="$t('HomePage.Services.viewAll')"
          class="hover:bg-hover text-text-primary bg-primary"
        />
      </NuxtLink>
    </div>
  </section>
</template>
