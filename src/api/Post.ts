import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { getToken } from "../utils";
import { message } from "antd";

async function Post<TInput, TResponse>(url: string, data?: TInput, isToken: boolean = true): Promise<TResponse> {
  const authToken = getToken();
  const isFormData = data instanceof FormData;

  const config: AxiosRequestConfig = {
    method: "POST",
    url,
    headers: {
      ...(isToken ? { Authorization: authToken } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    data,
  };

  try {
    const response = await axios(config);
    const resData = response.data;

    if (response.status === 200) {
      message.success(resData.message || "Successful");
      return resData;
    } else {
      return resData as TResponse;
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>; // <--- set to `any` or a known error shape

    const responseData = axiosError.response?.data as { message?: string };

    const message = responseData?.message || axiosError.message || "Something went wrong";

    throw new Error(message);
  }
}

export default Post;
