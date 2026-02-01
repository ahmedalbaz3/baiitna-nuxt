<script setup lang="ts">
interface Props {
  modelValue: string[];
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const inputRefs = ref<HTMLInputElement[]>([]);

const handleChange = (e: Event, index: number) => {
  const target = e.target as HTMLInputElement;
  const val = target.value.replace(/[^0-9]/g, "");

  const newValues = [...props.modelValue];
  newValues[index] = val.slice(-1);

  // تحديث القيمة للأب (v-model)
  emit("update:modelValue", newValues);

  // Auto-focus next
  if (val && index < props.modelValue.length - 1) {
    inputRefs.value[index + 1]?.focus();
  }
};

const handleKeyDown = (e: KeyboardEvent, index: number) => {
  // Backspace logic
  if (e.key === "Backspace" && !props.modelValue[index] && index > 0) {
    inputRefs.value[index - 1]?.focus();
  }
};

// في Vue بنربط الـ Ref بمصفوفة كدا
const setRef = (el: any, index: number) => {
  if (el) inputRefs.value[index] = el;
};

onMounted(() => {
  // تركيز على أول حقل عند التركيب
  inputRefs.value[0]?.focus();
});
</script>

<template>
  <div class="my-5">
    <div class="grid grid-cols-4 gap-4">
      <input
        v-for="(digit, index) in modelValue"
        :key="index"
        :ref="(el) => setRef(el, index)"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="input-field text-center text-2xl font-semibold bg-white border rounded-lg h-14"
        :value="digit"
        @input="handleChange($event, index)"
        @keydown="handleKeyDown($event, index)"
      />
    </div>
  </div>
</template>
