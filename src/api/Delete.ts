import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getToken } from "../utils";
import { message } from "antd";

async function Delete<T, TInput>(url: string, data?: TInput): Promise<T> {
  const token = getToken();
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url,
    headers: {
      Authorization: token,
    },
    data,
  };

  try {
    const response = await axios(config);
    // return response.data;
    const resData = response.data;

    if (response.status === 200) {
      message.success(resData.message || "Successful");
      return resData;
    } else {
      return null as T;
    }
  } catch (error: any) {
    const axiosError = error as AxiosError<any>; // <--- set to `any` or a known error shape

    const responseData = axiosError.response?.data as { message?: string };

    const message = responseData?.message || axiosError.message || "Something went wrong";

    throw new Error(message);
  }
}

export default Delete;
