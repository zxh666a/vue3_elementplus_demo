import type { AxiosRequestConfig, AxiosResponse } from "axios"
// 扩展接口
export interface myRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: {
		requestSuccessFn?: (config: any) => any
		requestFailureFn?: (err: any) => any
		responseSuccessFn?: (res: T) => T
		responseFailureFn?: (err: any) => any
	}
}