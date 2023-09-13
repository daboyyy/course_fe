import axios from "axios";
import authServices from "../../services/auth";
import { errorCode } from "../../consts/errorCode";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (
      error?.response?.data?.errorCode === errorCode.invalidToken &&
      !config?.sent
    ) {
      config.sent = true;

      const data = await authServices.refreshToken();
      if (!data.error) {
        return axios(config);
      }
    }

    return Promise.reject(error);
  }
);

export { instance };
