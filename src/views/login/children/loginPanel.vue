<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" :stretch="true" v-model="tabName">
        <el-tab-pane name="account">
          <template #label>
            <div class="tabs-label">
              <el-icon size="20"><UserFilled /></el-icon>
              <span>账号登录</span>
            </div>
          </template>
          <el-form
            ref="accountForm"
            :rules="rules"
            :model="accountLoginForm"
            size="large"
          >
            <el-form-item label="帐号:" prop="name">
              <el-input v-model="accountLoginForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input show-password v-model="accountLoginForm.password"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="tabs-label">
              <el-icon size="20"><Iphone /></el-icon>
              <span>手机登录</span>
            </div>
          </template>
          <el-form ref="phoneForm" size="large">
            <el-form-item label="手机号:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="验证码:">
              <div class="phoneCode">
                <el-input></el-input>
                <el-button type="primary">获取验证码</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls" v-if="tabName == 'account'">
      <el-checkbox v-model="rememberPwd" label="记住密码" size="large"></el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <div v-else style="height: 40px; width: 100%"></div>
    <el-button type="primary" class="login-btn" @click="handleLogin">立即登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import type { Account } from "@/types";
import { ElMessage } from "element-plus";
import useLoginStore from "@/store/login";
import { LOGIN_ACCOUNT, LOGIN_PWD, LOGIN_REM } from "@/global/constants";

const loginStore = useLoginStore();
const rememberPwd = ref<boolean>(
  localStorage.getItem(LOGIN_REM) == "true" ? true : false
);
const tabName = ref<string>("account");
// 表单组件
const accountForm = ref<FormInstance>();
const phoneForm = ref<FormInstance>();

watch(rememberPwd, (newValue) => {
  localStorage.setItem(LOGIN_REM, JSON.stringify(newValue));
});

// 帐号登录表单
const accountLoginForm = reactive<Account>({
  name: localStorage.getItem(LOGIN_ACCOUNT) ?? "",
  password: localStorage.getItem(LOGIN_PWD) ?? "",
});
// 登录表单验证
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: "请输入6-20位账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "必须输入密码",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "密码必须是三位以上的数字或字母",
    },
  ],
});

// 登录按钮点击事件
const handleLogin = () => {
  if (tabName.value === "account") {
    if (!accountForm.value) return;
    // 登录成功的函数
    const success = () => {
      loginStore.loginAccount(accountLoginForm).then((res) => {
        // 记住密码
        if (rememberPwd.value) {
          localStorage.setItem(LOGIN_ACCOUNT, accountLoginForm.name);
          localStorage.setItem(LOGIN_PWD, accountLoginForm.password);
        } else {
          localStorage.removeItem(LOGIN_ACCOUNT);
          localStorage.removeItem(LOGIN_PWD);
        }
      });
    };
    // 失败函数
    const fail = () => {
      ElMessage.error("失败");
    };
    loginFn(accountForm, success, fail);
  } else {
    if (!phoneForm.value) return;
    // 登录成功的函数
    const success = () => {
      console.log("成功！");
    };
    // 失败函数
    const fail = () => {
      ElMessage.error("失败");
    };
    loginFn(phoneForm, success, fail);
  }
};
// 登录表单验证事件
const loginFn = (form: any, success: () => void, fail: () => void) => {
  if (!form.value) return;
  form.value.validate((valid: boolean) => {
    if (valid) {
      success();
    } else {
      fail();
    }
  });
};
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .controls {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    height: 40px;
  }
  .tabs {
    .tabs-label {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .phoneCode {
      display: flex;
      .el-button {
        margin-left: 5px;
      }
    }
  }
}
</style>
