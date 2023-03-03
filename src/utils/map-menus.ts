import type { RouteRecordRaw } from "vue-router"
export let firstMenu: any = null
/**
 * 根据后台返回的菜单匹配用户菜单
 * @param menus 后台返回的菜单
 * @param localRouters 所有的动态菜单
 * @returns 根据权限匹配好的菜单
 */
export function mapMenuToRoutes(menus: any[], localRouters: any[]) {
	// 动态添加路由
	const localRouterList: any[] = localRouters
	const routes: RouteRecordRaw[] = []
	// 匹配路由
	for (const menu of menus) {
		for (const submenu of menu.children) {
			const route = localRouterList.find(item => item.path === submenu.url)
			routes.push(route)
			// 记录第一个匹配到的菜单
			if (!firstMenu && route) firstMenu = submenu
		}
	}
	return routes
}
/**
 * 根据路径匹配菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			if (submenu.url === path) {
				return submenu
			}
		}
	}
}
interface Breadcrums {
	name: string
	path?: string
}
export function mapPathToBreadcrums(path: string, userMenus: any[]) {
	const breadcrumbs: Breadcrums[] = []
	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			if (submenu.url === path) {
				breadcrumbs.push({ name: menu.name })
				breadcrumbs.push({ name: submenu.name, path: submenu.url })
			}
		}
	}
	return breadcrumbs
}

/**
 * 从菜单映射到按钮权限
 * @param menuList 菜单列表
 * @returns 权限数据
 */
export function mapMenuToPermissions(menuList: any) {
	const permisson: string[] = []
	function getPermission(menus: any) {
		for (const item of menus) {
			if (item.type == 3) {
				permisson.push(item.permission)
			} else {
				getPermission(item.children ?? [])
			}
		}
	}
	getPermission(menuList)
	return permisson
}