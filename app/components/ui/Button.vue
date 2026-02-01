<script setup lang="ts">
const props = defineProps<{
  text: string;
  class: string;
  type?: "button" | "submit" | "reset";
  social?: "google" | "apple";
}>();

const emits = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <button
    class="py-3 px-5 text-background rounded-2xl font-semibold duration-150 cursor-pointer flex items-center justify-center"
    :type="type ? type : 'button'"
    :class="class"
    @click="$emit('click', $event)"
  >
    <slot />
    {{ text }}
  </button>
</template>
