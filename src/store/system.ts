import { createNewUser, editUser, getAlldepartment, getAllRoles, getUserList, removeUserById } from "@/service/main/system"
import { defineStore } from "pinia"
interface systemState {
	userList: any[]
	totalCount: number,
	departmentList: any[],
	rolesList: any[]
}
const useSystemStore = defineStore('system', {
	state: (): systemState => ({
		userList: [],
		totalCount: 0,
		departmentList: [],
		rolesList: []
	}),
	actions: {
		async getUserListAction(queryInfo: any) {
			const userList = await getUserList(queryInfo)
			this.userList = userList.data.list
			this.totalCount = userList.data.totalCount
		},
		async removeUserById(id: number) {
			await removeUserById(id)
		},
		async getRolesList() {
			const roles = await getAllRoles()
			this.rolesList = roles.data.list
		},
		async getDepartmentList() {
			const department = await getAlldepartment()
			this.departmentList = department.data.list
		},
		async createNewUserFn(userInfo: any) {
			const res = await createNewUser(userInfo)
			let flag: boolean = false
			if (res.data == '创建用户成功~') {
				this.getUserListAction({ offset: 0, size: 10 })
				flag = true
			}
			return flag
		},
		async editUserFn(id: number, formData: any) {
			const res = await editUser(id, formData)
			let flag: boolean = false
			if (res.data == '修改用户成功~') {
				this.getUserListAction({ offset: 0, size: 10 })
				flag = true
			}
			return flag
		}
	}
})

export default useSystemStore