import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getToken } from '../utils'

async function put<TInput, TResponse>(url: string, data?: TInput): Promise<TResponse> {
  const token = getToken()
  const isFormData = data instanceof FormData

  const config: AxiosRequestConfig = {
    method: 'PUT',
    url,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      Authorization: `Bearer ${token}`,
    },
    data,
  }

  try {
    const response = await axios(config)
    return response.data as TResponse
  } catch (error) {
    const axiosError = error as AxiosError<any>
    const responseData = axiosError.response?.data as { message?: string }
    const message = responseData?.message || axiosError.message || 'Something went wrong'
    throw new Error(message)
  }
}

export default put
