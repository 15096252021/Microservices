<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="indexBodys" v-loading="loading">

    <!-- 背景视频 -->
    <video class="fullscreenvideo" poster="" id="bgvid" playsinline="true" autoplay="true" muted="true" loop="true">
      <source src="@/assets/images/mp4/Login.mp4" type="video/mp4">
    </video>
    <div class="loginBox">
      <h1>暗语后台管理系统</h1>
      <h4>Secret language background management system </h4>
      <div class="loginBox-input">
        <a class="loginTit">欢迎登录</a>
        <ul class="personnel">
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
        </ul>
        <div class="loginBox-inputs">
          <el-form ref="ruleFormRef" :model="LoginData" status-icon :rules="rules" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="LoginData.username" type="type" autocomplete="off" placeholder="请输入账号"
                class="loginBox-input-el" />
            </el-form-item>
            <el-form-item prop="userpwd">
              <el-input v-model="LoginData.userpwd" type="password" autocomplete="off" placeholder="请输入密码"
                class="loginBox-input-el" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="LoginSingin(ruleFormRef)" class="loginBox-input-btn">登录</el-button>
              <el-button @click="resetForm(ruleFormRef)" class="loginBox-input-btn">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>
</div>
</template>

<script lang="ts">






import { defineComponent, toRefs, reactive, ref, onMounted, onBeforeMount } from 'vue'
import "@/assets/css/Login/Login.css"
import { LoginDataClass } from '@/type/Login/Login'
import { FormInstance } from 'element-plus'
import { signin } from "@/api/Login/Login"
import ruoter from "@/router";
import { showLoading } from "@/utils/Loading"
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

export default defineComponent({
  setup() {
    // 页面加载遮罩
    const loading = ref(false);
    showLoading(loading);
    // 数据
    const data = reactive(new LoginDataClass());

    const ruleFormRef = ref<FormInstance>()
    // 校验规则

    const rules = reactive({
      username: [
        {
          require: true,
          message: "账号不能为空！",
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: "账号长度不达标,应在3~20之间",
          trigger: 'blur'
        }
      ],
      userpwd: [
        {
          require: true,
          message: "密码不能为空",
          trigger: 'blur'
        },
        {
          min: 6,
          max: 60,
          message: "密码长度不达标,应在6~20之间",
          trigger: 'blur'
        }
      ]
    })


    const LoginSingin = (formEl: FormInstance | undefined) => {
      console.log(formEl);

      if (!formEl) { return false } else {
        formEl.validate((valid) => {
          if (valid) {
            signin(data.LoginData).then((res) => {
              const token = res.data.token;
              // 保存token
              sessionStorage.setItem('token', token);
              // 刷新页面
              ruoter.push('/')
            }).catch((res) => {
              if (res) {
                if (res.msg) {
                  ElMessageBox.alert(`${res.msg}`)
                } else {
                  ElMessageBox.alert('登录失败')
                }
              } else {
                ElMessageBox.alert('登录失败')
              }
            })
          } else {
            return false
          }
        })
      }
    }
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    const changeLoading = () => {
      console.log(loading.value);
      loading.value = !loading.value

    }
    return {
      ...toRefs(data),
      ruleFormRef,
      rules,
      resetForm,
      LoginSingin,
      loading, changeLoading
    }
  }
})
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  .loginBox-input-el {
    margin: 5px auto;
    width: 80%;
    height: 3rem;
  }

  .loginBox-input-btn {
    margin-top: 5px;
    width: 39%;
    height: 40px;
  }

  .loginBox-input-btn:nth-child(1) {
    margin-left: 10%;
  }

  .loginBox-input-btn:nth-child(2) {
    margin-right: 10%;
  }
}
</style>
