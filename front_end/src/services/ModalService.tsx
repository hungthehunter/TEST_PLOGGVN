import axiosClient from "../api/api";
import { type loginData, type signUpData } from "../types/types";

export interface ApiResponse<T = any> {
  status: string;
  message?: string
  access_token?: string;
  data?: T;
}

const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export const loginUser = async (data: loginData): Promise<ApiResponse> => {
  const res = await axiosClient.post<ApiResponse>(
    `${API_URL}/users/sign-in`,
    data
  );
  return res.data;
};

export const signupUser = async (data: signUpData): Promise<ApiResponse> => {
  const res = await axiosClient.post<ApiResponse>(
    `${API_URL}/users/sign-up`,
    data
  );
  return res.data;
};

export const refreshToken = async (refreshToken: string): Promise<ApiResponse | null> => {
  try {
    const res = await axiosClient.post<ApiResponse>(
      `${API_URL}/users/refresh-token`,
      {},
      {
        headers: {
          token: `Bearer ${refreshToken}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Refresh token error:", err);
    return null;
  }
};