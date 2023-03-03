<script setup lang="ts">
// 国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
	<div class="app">
		<el-config-provider :locale="zhCn">
			<RouterView />
		</el-config-provider>
	</div>
</template>

<style scoped lang="less">
.app {
	height: 100vh;
	width: 100vw;
}
</style>
