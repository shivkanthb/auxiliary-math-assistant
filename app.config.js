import "dotenv/config";

export default {
  name: "Euler Assist",
  slug: "euler",
  version: "1.0.5",
  orientation: "portrait",
  icon: "./assets/euler.png",
  splash: {
    image: "./assets/splash-euler.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.shivkanth.euler",
    infoPlist: {
      NSCameraUsageDescription:
        "Euler Assist requires access to your camera to capture photos of mathematical content",
      NSPhotoLibraryUsageDescription:
        "Euler Assist needs to access your camera roll in order to process and evaluate the selected image",
      NSPhotoLibraryAddUsageDescription:
        "Euler Assist needs to access your camera roll so that you can upload images processed by Euler.",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    MATHPIX_API_ENDPOINT: process.env.MATHPIX_API_ENDPOINT,
    MATHPIX_APP_ID: process.env.MATHPIX_APP_ID,
    MATHPIX_API_KEY: process.env.MATHPIX_API_KEY,
    WOLFREEALPHA_API_ENDPOINT: process.env.WOLFREEALPHA_API_ENDPOINT,
  },
};
