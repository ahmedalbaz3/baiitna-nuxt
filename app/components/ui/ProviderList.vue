<script setup lang="ts">
import type { GetAllProvidersQuery } from "#gql";
import ServiceCard from "./ServiceCard.vue";
import ProviderCardSkeleton from "./skeletons/ProviderCardSkeleton.vue";

const props = defineProps<{
  serviceId: string;
}>();

const {
  data: providersData,
  pending,
  error,
} = await useAsyncData<GetAllProvidersQuery>(
  "all-providers",
  () =>
    GqlGetAllProviders({
      serviceId: props.serviceId,
      limit: 4,
      cityName: "Abu Dhabi",
    }),

  {
    watch: [() => props.serviceId],
  },
);

const providers = computed(
  () => providersData?.value?.allProviders.data?.items || [],
);

console.log(providers.value);
</script>

<template>
  <div class="min-h-[456px] w-full mx-auto">
    <div
      v-if="pending"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full"
    >
      <ProviderCardSkeleton v-for="index in 4" :key="index" />
    </div>

    <div
      v-else-if="providers.length === 0"
      class="bg-white grid place-content-center gap-4 text-center mt-12.5 w-fit mx-auto"
    >
      <NuxtImg
        src="/images/no-companies.svg"
        alt="No companies available"
        :width="150"
        :height="150"
        class="mx-auto"
      />
      <h2 class="text-2xl font-bold">No services providers available.</h2>
      <p class="max-w-md mx-auto text-gray-600">
        Sorry, no service providers are available at this time.
      </p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full"
    >
      <ServiceCard
        v-for="provider in providers"
        :key="provider?.id"
        :titleEn="provider?.businessNameEn"
        :titleAr="provider?.businessNameAr"
        :descriptionEn="provider?.sloganEn"
        :descriptionAr="provider?.sloganAr"
        :imageUrl="
          provider?.cover ? provider?.cover.file : '/images/service-card-1.jpeg'
        "
        :providerLogo="
          provider?.logo ? provider?.logo.file : '/images/provider-logo.png'
        "
        :phone="provider?.phones?.[0]"
        :whatsapp="provider?.whatsapp"
        :email="provider?.businessEmail"
        :profileLink="`/providers/${provider?.slug?.slice(20)}`"
      />
    </div>
  </div>
</template>
