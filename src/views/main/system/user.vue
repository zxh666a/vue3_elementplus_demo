<template>
	<div class="user">
		<el-card>
			<div class="search">
				<el-form
					label-position="right"
					ref="searchFormCom"
					label-width="90px"
					:model="searchForm"
				>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="用户名：" prop="name">
								<el-input
									placeholder="请输入用户名"
									v-model="searchForm.name"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机号码：" prop="cellphone">
								<el-input
									placeholder="请输入手机号码"
									v-model="searchForm.cellphone"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="创建时间：" prop="createDate">
								<el-date-picker
									v-model="searchForm.createAt"
									type="daterange"
									range-separator="至"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="状态：" prop="enable">
								<el-select style="width: 100%" v-model="searchForm.enable">
									<el-option label="启用" value="1"></el-option>
									<el-option label="禁用" value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div class="searchBtns">
					<el-button type="primary" icon="Search" @click="search"
						>搜索</el-button
					>
					<el-button icon="Refresh" @click="refresh">重置</el-button>
				</div>
			</div>
		</el-card>

		<el-card style="margin-top: 10px; flex: 1">
			<div class="content">
				<div class="header">
					<h2>用户列表</h2>
					<el-button
						type="primary"
						@click="createNewUser"
						v-hasPermission="'system:users:create'"
					>
						新建用户
					</el-button>
				</div>
				<div class="table">
					<el-table :data="userList" style="width: 100%" border>
						<el-table-column type="selection" />
						<el-table-column type="index" label="序号" width="60px" />
						<el-table-column prop="realname" label="真实姓名" width="150" />
						<el-table-column prop="name" label="用户名" width="120" />
						<el-table-column
							prop="enable"
							label="状态"
							width="120"
							align="center"
						>
							<template #default="scope">
								<el-tag :type="scope.row.enable == 0 ? 'danger' : 'success'">{{
									stateComputed(scope.row)
								}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="cellphone" label="手机号码" />
						<el-table-column label="创建时间">
							<template #default="scope">
								<span>{{ createDateComputed(scope.row) }}</span>
							</template>
						</el-table-column>
						<el-table-column label="更新时间">
							<template #default="scope">
								<span>{{ createDateComputed(scope.row, 'updateAt') }}</span>
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作">
							<template #default="scope">
								<el-button
									type="primary"
									size="small"
									icon="Edit"
									@click="editForm(scope.row)"
								>
									编辑
								</el-button>
								<el-button
									type="danger"
									size="small"
									icon="Remove"
									@click="removeData(scope.row)"
									>删除</el-button
								>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="pagination">
					<el-pagination
						v-model:currentPage="currentPage"
						v-model:page-size="pageSize"
						:page-sizes="[10, 20, 30, 40]"
						:total="totalCount"
						layout="total, sizes, prev, pager, next, jumper"
						@current-change="currentChange"
						@page-size="pageSizeChange"
					/>
				</div>
			</div>
		</el-card>

		<userModal ref="userModalRef" />
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { DateModelType, ElForm } from 'element-plus'
import useSystemStore from '@/store/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import userModal from './children/user-modal.vue'
import useLoginStore from '@/store/login'
interface SearchFormType {
	name: string
	cellphone: string
	enable: string
	createAt: any
}
const systemStore = useSystemStore()
// 分页
const currentPage = ref(1)
const pageSize = ref(10)
// 获取用户列表数据
const fetchUserListData = (queryInfo: any = {}) => {
	const size = pageSize.value
	const offset = (currentPage.value - 1) * size
	systemStore.getUserListAction({ size, offset, ...queryInfo })
}
fetchUserListData()
const currentChange = () => {
	fetchUserListData()
}
const pageSizeChange = () => {}
const { userList, totalCount } = storeToRefs(systemStore)
const searchForm = reactive<SearchFormType>({
	name: '',
	cellphone: '',
	enable: '1',
	createAt: ''
})
const searchFormCom = ref<InstanceType<typeof ElForm>>()
// 搜索
const search = () => {
	fetchUserListData(searchForm)
}
// 重置
const refresh = () => {
	searchFormCom.value?.resetFields()
	fetchUserListData()
}
// 时间格式化
const createDateComputed = computed(() => {
	return function (row: any, tag: string = 'createAt') {
		return formatUTC(row[tag], 'YYYY-MM-DD HH:mm:ss')
	}
})
const stateComputed = computed(() => {
	return function (row: any) {
		return row.enable == 0 ? '禁用' : '启用'
	}
})
// 编辑数据
const editForm = (item: any) => {
	userModalRef.value?.setModalVisible(true, item)
}
// 删除数据
const removeData = (item: any) => {
	systemStore.removeUserById(item.id)
	fetchUserListData()
}
const userModalRef = ref<InstanceType<typeof userModal>>()
// 新建用户
const createNewUser = () => {
	userModalRef.value?.setModalVisible()
}
const loginStore = useLoginStore()
const { permissions } = loginStore
// 按钮权限
const isCreate = permissions.find((item) =>
	item.includes('system:users:create')
)
const isDelete = ref<boolean>(false)

// 监听action的执行
systemStore.$onAction((args) => {
	const { name, after } = args
	// after在action回调之后调用
	after(() => {
		if (name == 'createNewUserFn') {
			currentPage.value = 1
		}
	})
})
</script>

<style scoped lang="less">
.search {
	.el-form-item {
		padding: 20px 10px;
		margin-bottom: 0;
	}
	.searchBtns {
		display: flex;
		justify-content: flex-end;
		padding: 0 10px;
	}
}
.content {
	margin-bottom: 15px;
	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
}
.el-tag {
	border: 1px solid green;
}
.pagination {
	margin-top: 15px;
}
.user {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.pagination {
	display: flex;
	justify-content: flex-end;
}
</style>
