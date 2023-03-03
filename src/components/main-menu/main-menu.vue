<template>
	<div class="main-menu">
		<div class="logo">
			<img src="@/assets/image/logo.jpg" class="logo-img" />
			<transition>
				<h2 class="title" v-show="!isFold">后台管理系统</h2>
			</transition>
		</div>
		<div class="menu">
			<el-menu
				:default-active="defaultActive"
				:collapse="isFold"
				text-color="#b7bdc3"
				active-text-color="#fff"
				background-color="#001529"
			>
				<template v-for="item in userMenus" :key="item.id">
					<el-sub-menu :index="item.id + ''">
						<template #title>
							<el-icon>
								<component :is="item.icon.split('el-icon-')[1]" class="icon" />
							</el-icon>
							<span>{{ item.name }}</span>
						</template>
						<template v-for="c in item.children" :key="c.id">
							<el-menu-item :index="c.id + ''" @click="menuItemClick(c)">{{
								c.name
							}}</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
			</el-menu>
		</div>
	</div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'
const router = useRouter()
const route = useRoute()
const loginStore = useLoginStore()
const userMenus: any = ref([])
if (typeof loginStore.userMenus == 'string') {
	userMenus.value = JSON.parse(loginStore.userMenus)
} else {
	userMenus.value = loginStore.userMenus
}
const pathMenu = mapPathToMenu(route.path, userMenus.value)
const defaultActive = ref<string>(`${pathMenu.id}`)
const props = defineProps({
	isFold: {
		type: Boolean,
		default: false
	}
})
const menuItemClick = (item: any) => {
	router.push(item.url)
}
</script>

<style lang="less" scoped>
.main-menu {
	position: relative;
	height: 100%;
	background-color: #001529;

	.logo {
		padding-top: 5px;
		background-color: #001529;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;

		.logo-img {
			width: 40px;
			height: 40px;
		}

		.title {
			color: aliceblue;
		}
	}

	.menu {
		height: calc(100% - 45px);
		overflow-x: hidden;
		overflow-y: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}
}

.el-menu {
	border-right: none;
	user-select: none;
}

.el-sub-menu {
	.el-menu-item {
		padding-left: 50px !important;
		background-color: #0c2135;
	}

	.el-menu-item:hover {
		color: #fff;
	}

	.el-menu-item.is-active {
		background-color: #0a60bd !important;
	}
}
</style>
