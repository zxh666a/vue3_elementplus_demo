<template>
	<div>
		<div class="echarts" ref="echartRef"></div>
	</div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
const echartRef = ref<HTMLElement>()
interface Echart {
	option: EChartsOption
}
const props = defineProps<Echart>()
onMounted(() => {
	const echartInstance = echarts.init(echartRef.value!, 'light', {
		renderer: 'canvas'
	})
	echartInstance.setOption(props.option)
})
</script>

<style lang="less" scoped>
.echarts {
	height: 250px;
}
</style>
