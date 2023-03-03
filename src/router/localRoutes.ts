const localRoutes = [
	{
		path: '/main/analysis/overview',
		component: () => import('../views/main/analysis/overview.vue')
	},
	{
		path: '/main/analysis/dashboard',
		component: () => import('../views/main/analysis/dashboard.vue')
	},
	{
		path: '/main/system/user',
		component: () => import('../views/main/system/user.vue')
	},
	{
		path: '/main/system/role',
		component: () => import('../views/main/system/role.vue')
	},
	{
		path: '/main/system/menu',
		component: () => import('../views/main/system/menu.vue')
	},
	{
		path: '/main/system/department',
		component: () => import('../views/main/system/department.vue')
	},
	{
		path: '/main/story/chat',
		component: () => import('../views/main/story/chat.vue')
	},
	{
		path: '/main/story/list',
		component: () => import('../views/main/story/list.vue')
	},
	{
		path: '/main/product/goods',
		component: () => import('../views/main/product/goods.vue')
	},
	{
		path: '/main/product/category',
		component: () => import('../views/main/product/category.vue')
	},
]
export default localRoutes