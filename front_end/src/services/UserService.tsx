import axios from "axios";

// Dữ liệu dùng để Đăng ký (Sign Up)
export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string; 
}


export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  status: string;       
  message?: string;     
  access_token?: string;
  data?: T;             
}

// -----------------------------------------------------------
// 2. Các hàm Service
// -----------------------------------------------------------

export const axiosJWT = axios.create();

// Lấy URL từ biến môi trường cho gọn
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

/**
 * Hàm đăng nhập người dùng
 * @param data LoginData (email, password)
 */
export const loginUser = async (data: LoginData): Promise<ApiResponse> => {
  const res = await axios.post<ApiResponse>(
    `${API_URL}/user/sign-in`,
    data
  );
  return res.data;
};

/**
 * Hàm đăng ký người dùng
 * @param data SignUpData (firstName, lastName, email, password)
 */
export const signupUser = async (data: SignUpData): Promise<ApiResponse> => {
  const res = await axios.post<ApiResponse>(
    `${API_URL}/user/sign-up`,
    data
  );
  return res.data;
};

/**
 * Hàm làm mới token (Refresh Token)
 * @param refreshToken chuỗi token
 */
export const refreshToken = async (refreshToken: string): Promise<ApiResponse | null> => {
  try {
    const res = await axios.post<ApiResponse>(
      `${API_URL}/user/refresh-token`,
      {},
      {
        headers: {
          token: `Bearer ${refreshToken}`, // Backend nhận header là 'token'
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Refresh token error:", err);
    return null;
  }
};