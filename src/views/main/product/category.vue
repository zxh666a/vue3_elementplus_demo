<template>
	<div>
		<baseEchart :option="barChartOption" />
		<baseEchart :option="lineChartOption" />
	</div>
</template>

<script setup lang="ts">
import barOption from '@/views/main/product/chartOption/bar'
import lineOption from '@/views/main/product/chartOption/line'
import baseEchart from '@/components/base-echart/base-echart.vue'
import type { EChartsOption } from 'echarts'
const barChartOption: EChartsOption = barOption
const lineChartOption: EChartsOption = lineOption
</script>

<style scoped lang="less"></style>
