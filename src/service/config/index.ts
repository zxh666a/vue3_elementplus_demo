let BASE_URL:string
let production = import.meta.env.MODE
console.log(production)
if (production == 'production') {
	BASE_URL = "http://152.136.185.210:4000"
} else {
	BASE_URL = "http://152.136.185.210:5000"
}

export const TIME_OUT:number = 10000


export { BASE_URL }