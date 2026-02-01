<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";
import Button from "~/components/ui/Button.vue";
import { getDeviceType } from "../../../lib/utils";
import { emailRegex, passwordRegex } from "../../..//lib/regex";
import { useAuthStore } from "../../../store/auth";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  linkWithPopup,
  OAuthProvider,
} from "firebase/auth";

definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const validEmail = ref(true);
const validPassword = ref(true);
const emailMessage = ref("");
const passwordMessage = ref("");

const deviceType = getDeviceType();

// const popUp = ref({
//   show: false,
//   type: "",
// });

// Functions
const handleBlurEmail = () => {
  if (!emailRegex.test(email.value)) {
    validEmail.value = false;
    emailMessage.value = "Please enter a valid email address.";
  } else {
    validEmail.value = true;
    emailMessage.value = "";
  }
};

const handleBlurPassword = () => {
  if (!passwordRegex.test(password.value)) {
    validPassword.value = false;
    passwordMessage.value =
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
  } else {
    validPassword.value = true;
    passwordMessage.value = "";
  }
};

const handleSubmit = async () => {
  try {
    // Call the generated Gql mutation directly
    const result = await GqlMutateLogin({
      email: email.value,
      password: password.value,
      deviceName: "web",
      deviceType: deviceType,
    });

    console.log("Login Successful:", result);
    // Redirect user here (e.g., navigateTo('/dashboard'))

    if (result.userLogin.success === false) {
      passwordMessage.value =
        result.userLogin.message || "Login failed. Please try again.";
    } else if (result.userLogin.success && result.userLogin.data) {
      authStore.setUser(result.userLogin.data);
      navigateTo("/");
    }
  } catch (err) {
    console.error("Login Failed:", err);
    // Show error message to user
  }
};
const googleLogin = async () => {
  console.log("Button clicked!");
  const { $auth } = useNuxtApp();

  if (!$auth) {
    console.error("Auth helper is missing.");
    return;
  }

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup($auth, provider);
    console.log("User:", result.user);
  } catch (error) {
    console.error("Login Error:", error);
  }
};

const { popUp, socialLogin } = useSocialAuth(deviceType);
</script>

<template>
  <div class="h-72">
    <div class="login w-full">
      <div class="conatiner grid place-items-center w-full min-h-screen">
        <form
          action=""
          class="auth-screen bg-white p-10 rounded-4xl w-full max-w-162.5"
          @submit.prevent="handleSubmit"
        >
          <h1 class="text-[25px] font-semibold mb-3">
            {{ $t("Auth.existingHeading") }}
          </h1>
          <p class="text-base">
            {{ $t("Auth.noAccount") }}
            <NuxtLink to="/auth/sign-up" class="text-primary font-semibold">
              {{ $t("Auth.joinButton") }}
            </NuxtLink>
          </p>
          <div class="my-5">
            <label htmlFor="email" class="label-block">
              {{ $t("Auth.emailLabel") }}
            </label>
            <input
              type="email"
              id="email"
              class="input-field"
              :class="
                !validEmail
                  ? 'border-red-600 focus:border-red-600'
                  : 'focus:border-primary'
              "
              v-model="email"
              @input="handleBlurEmail"
            />
            <p class="text-red-600 text-sm mt-1">{{ emailMessage }}</p>
          </div>
          <div class="my-5">
            <label htmlFor="password" class="label-block">
              {{ $t("Auth.passwordLabel") }}
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                :class="`input-field  ${!validPassword ? 'border-red-600 focus:border-red-600' : 'focus:border-primary'}`"
                v-model="password"
                @input="handleBlurPassword"
              />
              <Eye
                :class="` absolute top-1/2 -translate-y-1/2 end-3.75 duration-200 cursor-pointer hover:text-black/50 ${showPassword ? 'hidden' : 'block'}`"
                @click="showPassword = true"
              />
              <EyeOff
                :class="` absolute top-1/2 -translate-y-1/2 end-3.75 duration-200 cursor-pointer hover:text-black/50  ${showPassword ? 'block' : 'hidden'}`"
                @click="showPassword = false"
              />
            </div>
            <p class="text-red-600 text-sm mt-1">{{ passwordMessage }}</p>
          </div>
          <NuxtLink
            to="/auth/forget-password"
            class="font-semibold text-sm cursor-pointer"
          >
            {{ $t("Auth.forgotPassword") }}
          </NuxtLink>
          <Button
            :text="$t('Auth.signInButton')"
            class="w-full mt-5 hover:bg-primary/50 bg-primary"
            type="submit"
          />

          <Button
            @click="socialLogin"
            :text="$t('Auth.googleButton')"
            class="w-full mt-5 hover:bg-gray-200/50 bg-gray-200 text-black"
            type="button"
          >
            <svg
              viewBox="0 0 256 262"
              xmlns="http://www.w3.org/2000/svg"
              class="inline-block me-2 size-5"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              />
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              />
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              />
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              />
            </svg>
          </Button>
          <Button
            :text="$t('Auth.appleButton')"
            class="w-full mt-5 hover:bg-gray-200/50 bg-gray-200 text-black"
            type="button"
          >
            <svg
              viewBox="0 0 384 512"
              xmlns="http://www.w3.org/2000/svg"
              class="inline-block me-2 size-6"
              fill="#000000"
            >
              <path
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              />
            </svg>
          </Button>
        </form>
      </div>

      <SocialModule
        v-show="popUp.show"
        :popUp="popUp"
        setPopUp="{setPopUp}"
        googleRegisterButton="{googleRegisterButton}"
      />
    </div>
  </div>
</template>
