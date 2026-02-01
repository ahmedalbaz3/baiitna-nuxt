<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
import OTPCheck from '~/components/ui/OTPCheck.vue';

definePageMeta({
  layout: "auth",
});

const formState = ref({
  email: { value: "", error: "", isValid: true },
  password: { value: "", error: "", isValid: true },
  confirmPassword: { value: "", error: "", isValid: true },
});
const codeSent = ref(false);
const code = ref(new Array(4).fill(""));
const codeVerified = ref(false);
const remainTime = ref(0);

// Email Validation Helpers
const validateEmail = (val: string) => {};

const handleEmailChange = () => {};

const handleBlurEmail = () => {};

// Handlers
const handleSendCode = () => {};

const handleVerifyCode = () => {};

// const handleChange = (
//   e: React.ChangeEvent<HTMLInputElement>,
//   index: number,
// ) => {
//   const val = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
//   const newValues = [...code];
//   newValues[index] = val.slice(-1);
//   setCode(newValues);

//   if (val && index < 3) {
//     inputRefs.current[index + 1]?.focus();
//   }
// };

// const handleKeyDown = (
//   e: React.KeyboardEvent<HTMLInputElement>,
//   index: number,
// ) => {
//   if (e.key === "Backspace" && !code[index] && index > 0) {
//     inputRefs.current[index - 1]?.focus();
//   }
// };

const handlePasswordChange = () => {};

const handleBlurPassword = () => {};

const handleConfirmPasswordChange = () => {};

const handleBlurConfirmPassword = () => {};

// Helper for Digital Clock Format
const formatTime = (time: number) => {
  const mins = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const secs = (time % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

const handleSubmit = () => {};
</script>

<template>

    <div class="login w-full min-h-screen ">
      <div class="conatiner grid place-items-center min-h-screen w-full">
        <form
          class="auth-screen bg-white p-10 rounded-4xl w-full max-w-162.5"
            @submit.prevent="handleSubmit"
        >
          <h1 class="text-[25px] font-semibold mb-3">
           {{codeSent && !codeVerified
              ? "Check your email inbox"
              : !codeVerified
                ? "Forgot your password?"
                : "Reset your password"}}


          </h1>

          <p class="text-base">

              <div v-if="codeSent && !codeVerified">
                We’ve sent an email to
                <span class="font-semibold">{{formState.email.value}}</span>
                containing a 4-digit code. Please check your email inbox and
                enter the verification code below.
              </div>
   
              <div v-else-if="!codeVerified" >Enter the email address you used when you signed up for baiitna. We will send a verification code to this email so you can reset your password.</div>

          </p>

          <div v-show="!codeSent" :class="`my-5`">
            <label htmlFor="email" class="label-block">
              {{$t("Auth.emailLabel")}}
            </label>
            <input
              type="email"
              id="email"
              :class='`input-field ${!formState.email.isValid ? "border-red-600" : "focus:border-primary"}`  '
              @change="handleEmailChange"
              :value="formState.email.value"
              @blur="handleBlurEmail"
            />
            <p class="text-red-600 text-sm mt-1">{{formState.email.error}}</p>
          </div>

          <div v-show="codeSent && !codeVerified">
             <OTPCheck v-model="code" />
          </div>

          <div v-show="codeVerified" :class="`my-5 `">
            <div class="">
              <label htmlFor="password" class="label-block">
                New Password
              </label>
              <input
                type="password"
                id="password"
                :class="`input-field ${!formState.password.isValid ? 'border-red-600' : 'focus:border-primary'}`"
                @change="handlePasswordChange"
                :value="formState.password.value"
                @blur="handleBlurPassword"
              />
              <p class="text-red-600 text-sm mt-1">
                {{formState.password.error}}
              </p>
            </div>
            <div class="">
              <label htmlFor="confirmPassword" class="label-block">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                :class="`input-field ${!formState.confirmPassword.isValid ? 'border-red-600' : 'focus:border-primary'}`"
                @change="handleConfirmPasswordChange"
                :value="formState.confirmPassword.value"
                @blur="handleBlurConfirmPassword"
              />
              <p class="text-red-600 text-sm mt-1">
                {{formState.confirmPassword.error}} 
              </p>
            </div>
          </div>

            <Button
                v-if="codeSent && !codeVerified"
              text="Continue"
              class="w-full mt-5 bg-primary hover:bg-primary/90"
              type="submit"
            />

            <Button
                v-else-if="!codeVerified"
              text="Send me code"
              class="w-full mt-5 bg-primary hover:bg-primary/90"
              type="submit"
            />


                
            <Button
                v-else
              text="Save new password"
              class="w-full mt-5 bg-primary hover:bg-primary/90"
              type="submit"
            />


          <div :hidden="!codeSent || codeVerified" class="flex items-center justify-center">
            <div >
                <Button
                  @click="remainTime === 0 ? handleSendCode : undefined"
                  text="Resend code"
                  :class='`mt-5 bg-white ${remainTime > 0 ? "text-gray-400 cursor-default! w-fit" : "text-primary w-full"}`'
                  type="button"
                />
                <div v-show="remainTime > 0 " class="mt-5 text-primary">
                  in {{ formatTime(remainTime) }}
               
               
               
                </div>
              </div>

        </div>


            <NuxtLink to="/auth/" v-show="!codeSent">
              <Button
                text="Back to Login"
                class="w-full mt-5 bg-transparent text-black hover:bg-gray-200/50"
                type="button"
              />
            </NuxtLink>

        </form>
      </div>
    </div>

</template>
