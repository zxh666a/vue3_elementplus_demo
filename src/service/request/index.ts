import axios from "axios"
import type { AxiosInstance } from "axios"
import type { myRequestConfig } from "./type"


class AxRequest {
	instance: AxiosInstance
	constructor(config: myRequestConfig) {
		this.instance = axios.create(config)
		// 全局拦截器
		this.instance.interceptors.request.use((config) => {
			return config
		}, err => {
			console.log(err)
			return err
		})
		this.instance.interceptors.response.use((res) => {
			return res.data
		}, err => {
			return err
		})
		// 针对某一个请求的拦截器
		if (config.interceptors) {
			this.instance.interceptors.request.use(
				config.interceptors.requestSuccessFn,
				config.interceptors.requestFailureFn,
			)
			this.instance.interceptors.response.use(
				config.interceptors.responseSuccessFn,
				config.interceptors.responseFailureFn,
			)
		}
	}
	// 对axios的二次封装，如果axios不再维护，直接修改这一个地方就可以了
	request<Type = any>(config: myRequestConfig<Type>) {
		/**  不能直接使用 this.instance.interceptors.request.use
		 因为调用后会加入到实例中
		 以后每次调用都会有拦截器 */
		if (config.interceptors?.requestSuccessFn) {
			config = config.interceptors.requestSuccessFn(config)
		}
		// 要加入泛型，不然回调的res是unknown类型
		return new Promise<Type>((resolve, reject) => {
			this.instance.request<any, Type>(config).then(res => {
				if (config.interceptors?.responseSuccessFn) {
					res = config.interceptors.responseSuccessFn(res)
				}
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
	get<Type = any>(config: myRequestConfig) {
		return this.request({ ...config, method: "GET" })
	}
	post<Type = any>(config: myRequestConfig) {
		return this.request({ ...config, method: "POST" })
	}
	delete<Type = any>(config: myRequestConfig) {
		return this.request({ ...config, method: "DELETE" })
	}
	patch<Type = any>(config: myRequestConfig) {
		return this.request({ ...config, method: "PATCH" })
	}
}
export default AxRequest