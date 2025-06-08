import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "../config";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "@/lib/utils";



// Base API URL



const API_BASE_URL =BASE_URL;
   
// Create an Axios instance
const httpService = axios.create({
    baseURL: API_BASE_URL,
    // timeout: 10000, // Set timeout for API requests
});


//  Request Interceptor (Runs before every request)
httpService.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Add Authorization token if available
        const freshToken = getAccessToken();
        if (freshToken) {
          if (config.headers) {
            const headers = config.headers as AxiosHeaders;
            headers.set("Authorization", `Bearer ${freshToken}`);
          } else {
            config.headers = new AxiosHeaders({
              Authorization: `Bearer ${freshToken}`,
            });
          }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//  Response Interceptor (Runs after receiving a response)
httpService.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const newRfreshToken = getRefreshToken();
      if (error.response?.status === 401 && newRfreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
            refreshToken:newRfreshToken,
          });

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          // Update tokens
          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);
       

          // Retry the original request
          if (error.config) {
            const headers = error.config.headers as AxiosHeaders;
            headers.set("Authorization", `Bearer ${newAccessToken}`);
            return httpService.request(error.config);
          }
        } catch (refreshError) {
          // Clear tokens if refresh fails
          setAccessToken(null);
          setRefreshToken(null);
       
          //need to redirect the user to login page
          console.error("Token refresh failed:", refreshError);
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );



export default httpService;
