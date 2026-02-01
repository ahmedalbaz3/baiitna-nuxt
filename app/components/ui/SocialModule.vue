<script setup lang="ts">
interface PopUpData {
  firstName: string;
  lastName: string;
  email: string;
  providerId: string;
  token: string;
}

const props = defineProps<{
  popUp: {
    show: boolean;
    type: string;
    data: PopUpData;
  };
}>();

const handleSubmit = () => {
  //   googleRegisterButton({
  //     firstName: props.popUp.data.firstName!,
  //     lastName: props.popUp.data.lastName!,
  //     email: props.popUp.data.email!,
  //     providerId: props.popUp.data.providerId!,
  //     accessToken: props.popUp.data.token!,
  //   });
};

const hadndleClose = () => {
  props.popUp.show = false;
  props.popUp.type = "";
  props.popUp.data = {
    firstName: "",
    lastName: "",
    email: "",
    providerId: "",
    token: "",
  };
};
</script>

<template>
  <div
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white z-20 p-[60px] w-[688px]"
  >
    <div class="module-head mb-5 text-center">
      <NuxtImg
        src="/logo.svg"
        alt="Baiitna Logo"
        width="150"
        height="150"
        class="mx-auto mt-10 mb-7"
      />
      <p class="font-medium text-base">Complete your data</p>
    </div>
    <div class="module-body">
      <form action="" @submit.prevent="handleSubmit">
        <div class="my-5">
          <label htmlFor="first-name" class="label-block"> firstName </label>
          <input
            type="text"
            id="first-name"
            class="input-field"
            v-model="props.popUp.data.firstName"
          />
        </div>
        <div class="my-5">
          <label htmlFor="last-name" class="label-block"> lastName </label>
          <input
            type="text"
            id="last-name"
            class="input-field"
            v-model="props.popUp.data.lastName"
          />
        </div>
        <div class="my-5">
          <label htmlFor="email" class="label-block"> Email address </label>
          <input
            type="email"
            id="email"
            class="input-field"
            v-model="props.popUp.data.email"
          />
        </div>

        <div class="flex gap-4">
          <Button
            text="Cancel"
            class="w-full mt-5 hover:bg-gray-200/50 bg-gray-200 text-black"
            type="button"
            @click="hadndleClose"
          />
          <Button
            text="Save"
            class="w-full mt-5 hover:bg-primary/50 bg-primary"
            type="submit"
          />
        </div>
      </form>
    </div>
  </div>
  <div class="absolute top-0 left-0 w-full h-full bg-black/50"></div>
</template>
