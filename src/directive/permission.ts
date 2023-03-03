import type { DirectiveBinding } from "vue"

export default {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		console.log(el, binding)
		const { value } = binding
		const permissionFlag: string = 'system:users:create'
		if (permissionFlag != value) {
			console.log('我不通过')
			el.parentNode?.removeChild(el)
		}
	}
}