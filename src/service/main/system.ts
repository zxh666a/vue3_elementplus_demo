import zxhRequest from "..";

export function getUserList(queryInfo: any) {
	return zxhRequest.post({
		url: '/users/list',
		data: queryInfo
	})
}

export function removeUserById(id: number) {
	return zxhRequest.delete({
		url: '/users/' + id
	})
}

export function getAllRoles() {
	return zxhRequest.post({
		url: '/role/list'
	})
}
export function getAlldepartment() {
	return zxhRequest.post({
		url: '/department/list'
	})
}

export function createNewUser(userInfo: any) {
	return zxhRequest.post({
		url: '/users',
		data: userInfo
	})
}
export function editUser(id: number, userInfo: any) {
	return zxhRequest.patch({
		url: '/users/' + id,
		data: userInfo
	})
}