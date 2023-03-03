import zxhRequest from "../index"
// 账号登录
export function accountlogin(account: any) {
	return zxhRequest.post({
		url: '/login',
		data: account
	})
}
// 获取用户信息
export function getUserInfoById(id: number) {
	return zxhRequest.get({
		url: '/users/' + id
	})
}
// 获取用户的权限菜单
export function getUserMenus(id: number) {
	return zxhRequest.get({
		url: '/role/' + id + '/menu'
	})
}