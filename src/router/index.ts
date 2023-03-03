import { createRouter, createWebHashHistory } from "vue-router"
import { LOGIN_TOKEN } from "@/global/constants"
import { firstMenu } from "@/utils/map-menus"
const route = {
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			redirect: '/main'
		},
		{
			path: "/login",
			component: () => import("../views/login/login.vue")
		},
		{
			path: "/main",
			component: () => import("../views/main/main.vue"),
			name: "main",
			children: []
		},
		{
			path: "/:pathMatch(.*)",
			component: () => import("../views/notFound/notFound.vue")
		},
	],

}


const router = createRouter(route)
// 路由守卫
router.beforeEach((to, from) => {
	const token = localStorage.getItem(LOGIN_TOKEN)
	if (to.path == '/main' && !token) {
		return '/login'
	}
	if (to.path == '/main') {
		return firstMenu.url
	}
})
export default router