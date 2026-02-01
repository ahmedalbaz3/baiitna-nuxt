export const getDeviceType = (): "IOS" | "Android" | "DESKTOP" => {
  if (typeof window === "undefined") return "DESKTOP"; // Fallback for SSR

  const ua = window.navigator.userAgent.toLowerCase();

  // Check for Android
  if (ua.includes("android")) {
    return "Android";
  }

  // Check for iOS (iPhone, iPad, iPod)
  // Note: Modern iPads sometimes report as "MacIntel", so we check for touch points
  if (
    /iphone|ipad|ipod/.test(ua) ||
    (ua.includes("mac") && navigator.maxTouchPoints > 1)
  ) {
    return "IOS";
  }

  // Default to Desktop
  return "DESKTOP";
};
