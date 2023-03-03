import { defineStore } from "pinia"
import router from "@/router"
import { accountlogin, getUserInfoById, getUserMenus } from "@/service/login/index";
import type { Account } from "@/types"
import { LOGIN_TOKEN, LOGIN_USER_INFO, LOGIN_USER_MENUS } from "@/global/constants"
import type { RouteRecord } from "vue-router";
import localRouters from "@/router/localRoutes"
import { mapMenuToPermissions, mapMenuToRoutes } from "@/utils/map-menus"
import useSystemStore from "./system";

interface LoginState {
	token: string
	userInfo: any
	userMenus: any,
	permissions: string[]
}
const useLoginStore = defineStore('login', {
	state: (): LoginState => ({
		token: '',
		userInfo: {},
		userMenus: [],
		permissions: []
	}),
	actions: {
		// 登录
		async loginAccount(account: Account) {
			// 获取token
			const res = await accountlogin(account)
			const id = res.data.id
			this.token = res.data.token
			localStorage.setItem(LOGIN_TOKEN, this.token)
			// 获取用户信息
			const userInfoRes = await getUserInfoById(id)
			this.userInfo = userInfoRes.data
			// 请求用户的权限
			const userMenu = await getUserMenus(this.userInfo.role.id)
			this.userMenus = userMenu.data
			// 数据缓存
			localStorage.setItem(LOGIN_USER_INFO, JSON.stringify(this.userInfo))
			localStorage.setItem(LOGIN_USER_MENUS, JSON.stringify(this.userMenus))
			// 获取按钮权限信息
			const permisson = mapMenuToPermissions(this.userMenus)
			this.permissions = permisson

			// 动态添加路由
			const localRouterList: any[] = localRouters
			// 匹配路由
			const routerList = mapMenuToRoutes(this.userMenus, localRouterList)
			routerList.forEach(item => router.addRoute('main', item))
			const systemStore = useSystemStore()
			systemStore.getRolesList()
			systemStore.getDepartmentList()
			router.push("/main")
		},

		loadLocalCache() {
			const token = localStorage.getItem(LOGIN_TOKEN)
			const userInfo = localStorage.getItem(LOGIN_USER_INFO)
			const userMenus = localStorage.getItem(LOGIN_USER_MENUS)
			if (token && userInfo && userMenus) {
				this.token = token
				this.userInfo = userInfo
				if (typeof userMenus == 'string') {
					this.userMenus = JSON.parse(userMenus)
				} else {
					this.userMenus = userMenus
				}
				// 获取角色、部门列表
				const systemStore = useSystemStore()
				systemStore.getRolesList()
				systemStore.getDepartmentList()
				// 获取按钮权限信息
				const permisson = mapMenuToPermissions(this.userMenus)
				this.permissions = permisson
				// 动态添加路由
				const localRouterList: any[] = localRouters
				// 匹配路由
				const routerList = mapMenuToRoutes(this.userMenus, localRouterList)
				routerList.forEach(item => router.addRoute('main', item))
			}
		}
	}
})

export default useLoginStore