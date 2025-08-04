import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getToken } from "../utils";

async function Delete<T>(url: string): Promise<T> {
  const token = getToken();
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>; // <--- set to `any` or a known error shape

    const responseData = axiosError.response?.data as { message?: string };

    const message = responseData?.message || axiosError.message || "Something went wrong";

    throw new Error(message);
  }
}

export default Delete;
