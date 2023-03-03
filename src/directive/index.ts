import type { App } from "vue";
import hasPermission from "./permission"
export function createAllDirective(app: App) {
	app.directive('hasPermission', hasPermission)
}