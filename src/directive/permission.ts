import { ref, type DirectiveBinding } from "vue"
import useLoginStore from "@/store/login"
// 根据权限判断按钮的显示隐藏
export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const loginStore = useLoginStore()
		const { permissions } = loginStore
		const { value } = binding
		let permissionFlag = ref<boolean>(false)
		permissions.forEach(item => {
			if (item == value) {
				permissionFlag.value = true
			}
		})
		if (!permissionFlag.value) {
			el.parentNode?.removeChild(el)
		}
	}
}