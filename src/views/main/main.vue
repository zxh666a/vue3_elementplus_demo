<template>
	<div class="main">
		<el-container class="main-content">
			<el-aside :width="asideWidth"><mainMenu :isFold="isFold" /></el-aside>
			<el-container>
				<el-header><mainHeader @iconClick="foldChange" /></el-header>
				<el-main>
					<!-- <el-card class="box-card"> -->
					<router-view />
					<!-- </el-card> -->
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
const asideWidth = ref<string>('200px')
const isFold = ref<boolean>(false)
const foldChange = (foldFlag: string) => {
	console.log(foldFlag)
	if (foldFlag == 'Fold') {
		asideWidth.value = '200px'
		isFold.value = false
	} else {
		asideWidth.value = '60px'
		isFold.value = true
	}
}
</script>
<style lang="less" scoped>
.main {
	height: 100%;
	.el-main {
		--el-main-padding: 15px !important;
		background-color: rgb(247, 245, 245);
	}
	.main-content {
		height: 100%;
		.el-aside {
			overflow-x: hidden;
			overflow-y: auto;
			text-align: left;
			cursor: pointer;
			transition: width 0.3s linear;
			scrollbar-width: none;
			-ms-overflow-style: none;
			transition: width 0.3s ease;
			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
}
</style>
