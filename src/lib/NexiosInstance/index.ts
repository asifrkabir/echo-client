import envConfig from "@/config/envConfig";
import { getNewAccessToken } from "@/services/AuthService";
import { Nexios } from "nexios-http";
import { cookies } from "next/headers";

const nexiosInstance = new Nexios({
  baseURL: envConfig.baseApi,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

nexiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config!.headers!.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

nexiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log({ error });
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const res = await getNewAccessToken();
      const accessToken = res.data.accessToken;

      config.headers["Authorization"] = accessToken;

      cookies().set("accessToken", accessToken);

      return new Nexios(config);
    }

    return Promise.reject(error);
  }
);

export default nexiosInstance;
