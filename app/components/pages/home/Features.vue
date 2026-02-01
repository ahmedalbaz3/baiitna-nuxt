<script setup lang="ts">
const { locale } = useI18n();
const isRtl = locale.value === "ar";
const steps = [
  {
    altText: "text for step 1 image",
    title: "Choose your service",
    image: "/images/step-1.svg",
    color: "bg-secondary",
  },
  {
    altText: "text for step 2 image",
    title: "Filter by location",
    image: "/images/step-2.svg",
    color: "bg-muted",
  },
  {
    altText: "text for step 3 image",
    title: "Browse and connect",

    image: "/images/step-3.svg",
    color: "bg-[#cca4ff]",
  },
];
</script>

<template>
  <section class="bg-white py-sm-section-py md:py-section-py">
    <div class="container w-full">
      <div class="text w-full text-start">
        <h2 class="text-[22px] md:text-[46px] max-w-207 font-semibold">
          {{ $t("HomePage.Feature.title") }}
        </h2>
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        >
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="relative flex md:h-[300px] rounded-[20px] p-6 font-semibold overflow-hidden"
            :class="step.color"
          >
            <div
              class="relative z-10 flex flex-col justify-between items-start"
            >
              <span class="w-full text-2xl md:text-5xl pb-10 md:pb-[84px]">
                0{{ index + 1 }}
              </span>
              <h3 class="max-w-[225px] text-2xl leading-tight md:text-[32px]">
                {{ step.title }}
              </h3>
            </div>

            <NuxtImg
              :src="step.image"
              :alt="step.altText || step.title"
              width="400"
              height="540"
              loading="lazy"
              class="absolute bottom-1/2 translate-y-1/2 max-h-[90%] max-w-[60%] object-contain transition-transform duration-300"
              :class="
                isRtl
                  ? 'left-0 object-left-bottom scale-x-[-1]'
                  : 'right-0 object-right-bottom'
              "
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
