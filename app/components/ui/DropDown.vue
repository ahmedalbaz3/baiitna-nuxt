<script setup lang="ts">
import { Check, ChevronDown } from "lucide-vue-next";

const props = defineProps<{
  class?: string;
}>();

const { locale } = useI18n();
const isRtl = locale.value === "ar";

const selectedPlace = ref<{
  name: string;
  nameAr: string;
  id: number;
}>({ name: "Abu Dhabi", nameAr: "أبو ظبي", id: 1 });

const dropdownOpen = ref(false);

const cities = [
  { name: "Abu Dhabi", nameAr: "أبو ظبي", id: 1 },
  { name: "Dubai", nameAr: "دبي", id: 2 },
  { name: "Sharjah", nameAr: "الشارقة", id: 3 },
  { name: "Ajman", nameAr: "عجمان", id: 4 },
  { name: "Fujairah", nameAr: "الفجيرة", id: 5 },
  { name: "Ras Al Khaimah", nameAr: "رأس الخيمة", id: 6 },
  { name: "Umm Al Quwain", nameAr: "أم القيوين", id: 7 },
];

const handleSelect = (place: { name: string; nameAr: string; id: number }) => {
  selectedPlace.value = place;
  dropdownOpen.value = false;
};
</script>

<template>
  <div
    class="inline-block relative"
    @click="() => (dropdownOpen = !dropdownOpen)"
  >
    <span class="cursor-pointer" :class="props.class">
      {{ isRtl ? selectedPlace.nameAr : selectedPlace.name }}
      <ChevronDown class="inline-block size-9.5!" />
    </span>
    <div
      class="dropdown absolute top-full max-md:start-0 md:end-0 mt-3 rounded-2xl z-20 text-xs md:text-base bg-white w-60 shadow-lg duration-250 max-h-fit min-w-fit"
      :class="dropdownOpen ? 'min-h-60' : 'h-0 overflow-hidden opacity-0'"
    >
      <ul class="py-3">
        <li
          v-for="item in cities"
          tabIndex="0"
          :key="item.id"
          @click="() => handleSelect(item)"
          class="py-3 px-6 hover:text-primary cursor-pointer flex items-center justify-between gap-2 whitespace-nowrap"
          @focus="() => handleSelect(item)"
        >
          {{ isRtl ? item.nameAr : item.name }}
          <span class="text-primary">
            <Check v-if="item.id === selectedPlace.id" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
