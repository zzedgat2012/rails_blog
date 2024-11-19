export const API_URL =
  process.env.NODE_ENV === "test"
    ? "http://mocked-api.test"
    : import.meta.env.VITE_API_URL;
