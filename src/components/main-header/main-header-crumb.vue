<template>
	<div>
		<el-breadcrumb separator-icon="ArrowRight">
			<template v-for="item in breadcrumb">
				<el-breadcrumb-item :to="item.path">
					{{ item.name }}
				</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login'
import { mapPathToBreadcrums } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumb = computed(() => {
	return mapPathToBreadcrums(route.path, userMenus)
})
</script>

<style lang="scss" scoped></style>
