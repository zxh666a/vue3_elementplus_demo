<template>
	<div class="main-header">
		<div class="menu-icon" @click="iconClick">
			<el-icon size="25">
				<component :is="iconName" />
			</el-icon>
		</div>
		<div class="content">
			<div class="breadcrumb">
				<mainHeaderCrumb />
			</div>
			<div class="info">
				<mainHeaderInfo />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mainHeaderInfo from './main-header-info.vue'
import mainHeaderCrumb from './main-header-crumb.vue'
const emit = defineEmits(['iconClick'])
const iconName = ref<string>('Fold')
const iconClick = () => {
	iconName.value == 'Fold'
		? (iconName.value = 'Expand')
		: (iconName.value = 'Fold')
	emit('iconClick', iconName.value)
}
</script>

<style lang="less" scoped>
.main-header {
	height: 100%;
	display: flex;
	align-items: center;
	.el-icon {
		cursor: pointer;
	}
	.content {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
		padding: 0 18px;
	}
}
</style>
