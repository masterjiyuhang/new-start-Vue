import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../_utils";

export default [
  {
    url: "/basic-api/auth/login",
    timeout: 200,
    method: "post",
    response: () => {
      return resultSuccess({
        accessToken: "mock-access-token-" + Date.now(),
        refreshToken: "mock-refresh-token-" + Date.now(),
        userId: "1",
      });
    },
  },
  {
    url: "/basic-api/auth/logout",
    timeout: 200,
    method: "post",
    response: () => {
      return resultSuccess({ success: true });
    },
  },
  {
    url: "/basic-api/auth/publicKey",
    timeout: 100,
    method: "get",
    response: () => {
      return resultSuccess({
        publicKey:
          "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Z3VS5JJcds3xfn/ygKpQ+H4xOmfV8Z1P8HfJr4gE3Fz/8M0a3rIM2F2gf3F5Yh8Z9Y3R4k6G7mN2O8jXlK9F0YR4pI2J7R5E8fL4a7bK3T9Q0Z1Y8f5L2a6bK4T7Q0Z3Y8f5L2a6bK4T7Q0Z3Y8f5L2a6bK4T7Q0Z3Y8f5L2a6bK4T7QwIDAQAB",
      });
    },
  },
  {
    url: "/basic-api/auth/refresh",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        accessToken: "mock-refreshed-token-" + Date.now(),
        refreshToken: "mock-new-refresh-token-" + Date.now(),
      });
    },
  },
] as MockMethod[];
