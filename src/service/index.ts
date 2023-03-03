import { LOGIN_TOKEN } from "@/global/constants"
import { BASE_URL, TIME_OUT } from "./config"
import myRequest from "./request/index"
const zxhRequest = new myRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requestSuccessFn: (config) => {
			const token = localStorage.getItem(LOGIN_TOKEN)
			if (config.headers && token) {
				config.headers.Authorization = 'Bearer ' + token
			}
			return config
		}
	}
})
export default zxhRequest
