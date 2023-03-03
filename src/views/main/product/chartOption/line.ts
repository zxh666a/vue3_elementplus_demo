import type { EChartsOption } from 'echarts'
const option: EChartsOption = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value'
	},
	series: [
		{
			data: [150, 230, 224, 218, 135, 147, 260],
			type: 'line'
		}
	]
}
export default option