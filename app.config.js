import "dotenv/config";

export default {
  name: "Euler",
  version: "1.0.0",
  extra: {
    MATHPIX_API_ENDPOINT: process.env.MATHPIX_API_ENDPOINT,
    MATHPIX_APP_ID: process.env.MATHPIX_APP_ID,
    MATHPIX_API_KEY: process.env.MATHPIX_API_KEY,
  },
};
