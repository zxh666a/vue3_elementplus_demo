<template>
	<div>
		<el-dialog
			@close="closeDialog"
			v-model="dialogTableVisible"
			:title="dialogTitle"
			width="30%"
		>
			<div class="form">
				<el-form
					ref="createFormRef"
					label-position="right"
					label-width="100px"
					:model="formData"
				>
					<el-form-item label="用户名：" prop="name">
						<el-input
							placeholder="请输入用户名"
							v-model="formData.name"
						></el-input>
					</el-form-item>
					<el-form-item label="真实姓名：" prop="realname">
						<el-input
							placeholder="请输入真实姓名"
							v-model="formData.realname"
						></el-input>
					</el-form-item>
					<el-form-item label="手机号码：" prop="cellphone">
						<el-input
							placeholder="请输入手机号码"
							v-model.number="formData.cellphone"
						></el-input>
					</el-form-item>
					<el-form-item label="密码：" prop="password" v-if="!isEditFlag">
						<el-input
							placeholder="请输入密码"
							v-model="formData.password"
						></el-input>
					</el-form-item>
					<el-form-item label="选择角色：" prop="roleId">
						<el-select
							v-model="formData.roleId"
							style="width: 100%"
							placeholder="请选择角色"
						>
							<template v-for="item in rolesList" :key="item.id">
								<el-option :value="item.id" :label="item.name"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="选择部门：" prop="departmentId">
						<el-select
							v-model="formData.departmentId"
							style="width: 100%"
							placeholder="请选择部门"
						>
							<template v-for="item in departmentList" :key="item.id">
								<el-option :value="item.id" :label="item.name"></el-option>
							</template>
						</el-select>
					</el-form-item>
				</el-form>
			</div>

			<template #footer>
				<el-button type="primary" @click="createOrEditUser"> 确定 </el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useSystemStore from '@/store/system'
import { storeToRefs } from 'pinia'
import type { ElForm } from 'element-plus'
const dialogTableVisible = ref<boolean>(false)
const createFormRef = ref<InstanceType<typeof ElForm>>()
let dialogTitle = ref<string>('新建用户')
// 表单数据
let formData = reactive<any>({
	name: '',
	cellphone: '',
	realname: '',
	roleId: '',
	departmentId: '',
	password: ''
})
// 是否是编辑状态的标识
const isEditFlag = ref<boolean>(false)
const editItemId = ref<any>()
// 设置模态框状态
const setModalVisible = (isEdit: boolean = false, itemData?: any) => {
	if (isEdit && itemData) {
		for (const key in formData) {
			formData[key] = itemData[key]
		}
		dialogTitle.value = '编辑用户'
		editItemId.value = itemData.id
	} else {
		for (const key in formData) {
			formData[key] = ''
			dialogTitle.value = '新建用户'
		}

		editItemId.value = null
	}
	dialogTableVisible.value = true
	isEditFlag.value = isEdit
}
const systemStore = useSystemStore()
const { rolesList, departmentList } = storeToRefs(systemStore)
// 关闭弹窗
const closeDialog = () => {
	dialogTableVisible.value = false
	createFormRef.value?.resetFields()
}
const createOrEditUser = async () => {
	let res: any = null
	if (isEditFlag.value) {
		res = await systemStore.editUserFn(editItemId.value, formData)
	} else {
		res = await systemStore.createNewUserFn(formData)
	}
	if (res) {
		closeDialog()
	}
}
defineExpose({ setModalVisible })
</script>

<style lang="scss" scoped></style>
