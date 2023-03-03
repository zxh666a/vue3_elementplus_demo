import { defineStore } from "pinia"

const useCounterStore = defineStore("counter", {
	state: () => ({
		counter: 100
	})
})

export default useCounterStore