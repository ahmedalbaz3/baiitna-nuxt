import { GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";

import { useAuthStore } from "~~/store/auth";

// Define the action types
const CHECK_TYPE = {
  REGISTER: "REGISTER",
  MERGE: "MERGE",
} as const;

export const useSocialAuth = (deviceType: string = "Web Browser") => {
  //   const { $auth } = useNuxtApp();
  const router = useRouter();
  const userStore = useAuthStore();

  const popUp = reactive({
    show: false,
    type: "" as "register" | "merge" | "",
    data: {
      firstName: "",
      lastName: "",
      email: "",
      providerId: "",
      token: "",
    },
  });

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
      //   console.log("User:", result.user);
      return result;
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const googleLoginMutation = async ({
    providerId,
  }: {
    providerId: string;
  }) => {
    try {
      // Call the generated Gql mutation directly
      console.log({
        providerId,
        deviceName: "web",
        device: deviceType,
      });
      const result = await GqlSocialLogin({
        providerId,
        deviceName: "web",
        device: deviceType,
      });

      //   console.log("Login Successful:", result);
      return result;
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  const checkSocial = async ({
    providerId,
    email,
    token,
  }: {
    providerId: string;
    email: string;
    token: string;
  }) => {
    try {
      const response = await GqlCheckSocial({
        providerId,
        email,
        token,
      });

      console.log("Check Social Response:", response);
    } catch (error) {}
  };

  const googleRegister = async ({
    firstName,
    lastName,
    email,
    providerId,
    token,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    providerId: string;
    token: string;
  }) => {
    try {
      const response = await GqlSocialRegister({
        firstName,
        lastName,
        email,
        providerId,
        device: "",
        deviceName: "web",
        isManuallyEntered: false,
        token,
      });
      console.log("Registration Successful:", response);
    } catch (error) {}
  };

  const socialMerge = async ({
    providerId,
    device,
    deviceName,
    email,
    token,
  }: {
    providerId: string;
    device: string;
    deviceName: string;
    email: string;
    token: string;
  }) => {
    try {
      const response = await GqlSocialMerge({
        providerId,
        device,
        deviceName,
        email,
        token,
      });
    } catch (error) {}
  };

  const finishAuth = (userData: any) => {
    userStore.setUser(userData); // Set user in Pinia/State
    popUp.show = false;
    router.push("/");
  };

  const main = async () => {
    const firebaseResponse = await googleLogin();
    const user = firebaseResponse.user;
    const oauthIdToken = firebaseResponse["_tokenResponse"].oauthIdToken;
    const providerId =
      JSON.parse(firebaseResponse["_tokenResponse"].rawUserInfo).id ||
      JSON.parse(firebaseResponse["_tokenResponse"].rawUserInfo).sub;

    const nameParts = user.displayName?.split(" ") || ["User", ""];

    console.log("Firebase User:", user);
    console.log("OAuth ID Token:", oauthIdToken);
    console.log("Provider ID:", providerId);

    const loginMutationResult = await googleLoginMutation({
      providerId,
    });

    if (loginMutationResult?.socialLogin.success) {
      finishAuth(loginMutationResult.socialLogin.data);
      return;
    }

    const checkSocialResponse = await checkSocial({
      providerId,
      email: user.email || "",
      token: oauthIdToken,
    });

    console.log("Check Social Response:", checkSocialResponse);
    console.log(
      "Check Social Provider Result:",
      checkSocialResponse?.checkSocialProviderStatus.data?.actionRequired,
    );

    if (
      checkSocialResponse?.checkSocialProviderStatus?.data?.actionRequired ===
      CHECK_TYPE.REGISTER
    ) {
      console.log("Proceeding to Registration...");

      popUp.show = true;
      popUp.type = "register";
      popUp.data.firstName = nameParts[0] || "User";
      popUp.data.lastName = nameParts[1] || "";
      popUp.data.email = user.email || "";
      popUp.data.providerId = providerId;
      popUp.data.token = oauthIdToken;
    } else if (
      checkSocialResponse?.checkSocialProviderStatus?.data?.actionRequired ===
      CHECK_TYPE.MERGE
    ) {
      console.log("Account Merge Required - Not Implemented");
      popUp.show = true;
      popUp.type = "register";
      popUp.data.firstName = nameParts[0] || "User";
      popUp.data.lastName = nameParts[1] || "";
      popUp.data.email = user.email || "";
      popUp.data.providerId = providerId;
      popUp.data.token = oauthIdToken;
    } else {
      console.log("No action required or unrecognized response.");
    }

    console.log(
      "Login Mutation Result:",
      loginMutationResult?.socialLogin.success,
    );
  };

  return {
    popUp,
    socialLogin: main,
  };
};
