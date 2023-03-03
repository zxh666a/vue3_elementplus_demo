import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export function formatUTC(utcTime: string, format: string = "YYYY-MM-DD HH:mm:ss") {
	return dayjs.utc(utcTime).utcOffset(8).format(format)
}