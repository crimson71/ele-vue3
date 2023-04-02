<template>
  <div class="login-container">
    <div class="login-header">
      <router-link :to="{ name: 'profile' }"
        ><svg-icon name="close"
      /></router-link>
    </div>
    <div class="login-body">
      <div class="login-title">密码登录</div>
      <input type="text" placeholder="手机/用户名" v-model="name"/>
      <div class="pwd_container">
        <input
          type="password"
          placeholder="密码"
          v-if="!showPwd"
          v-model="pwd"
        />
        <input type="text" placeholder="密码" v-else v-model="pwd" />
        <div class="captcha-wrapper">
          <input type="text" placeholder="请输入验证码" v-model="captcha">
          <img class="captcha-img" :src="captchaImg" alt="" @click="getCaptchaImg">

        </div>

        <div class="switch_show_pwd">
          <svg-icon name="eye" v-if="showPwd" @click="switchShowPwd"></svg-icon>
          <svg-icon name="no_eye" v-else @click="switchShowPwd"></svg-icon>
        </div>
      </div>

      <input type="button" value="登陆" class="login-btn" :class="checkInfo? 'active-btn' : ''" @click="login"/>

      <div class="login-handel">
        <router-link :to="{ name: 'phonelogin' }" class="link">
          手机号登陆</router-link
        >
        <a href="#" class="link">忘记密码</a>
      </div>
      <div class="allow">
        <input type="checkbox" name="" id="allow" />
        已阅读并同意
        <a href="#" class="link">《用户服务协议》 &nbsp;&nbsp;《隐私政策》</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getCaptcha } from '@/api/getData'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const name = ref('') // 用户名
const pwd = ref('') // 密码
const captcha = ref('')// 图形验证码
const captchaImg = ref('')
const showPwd = ref(false) // 控制密码的显示，false是不显示

const switchShowPwd = () => {
  showPwd.value = !showPwd.value
}
const getCaptchaImg = async () => {
  const { data } = await getCaptcha()
  captchaImg.value = data.code
}
// 检验信息是否完整
const checkInfo = computed(() => {
  let flag = false
  if (name.value && pwd.value && captcha.value) {
    flag = true
  } else {
    flag = false
  }
  return flag
})
// 登陆
const login = () => {
  if (name.value && pwd.value && captcha.value) {
    store.dispatch('getUserInfo', { username: name.value, password: pwd.value, captcha_code: captcha.value })
  }
  router.replace({ name: 'profile' })
}
onMounted(() => {
  getCaptchaImg()
})

</script>

<style lang="scss" scoped>
@import '../../../common/sass/mixin.scss';
.login-container {
  padding: .6rem;
  background: #fff;
  .active-btn {
    background: $blue;
    color:#fff;
  }
  .login-header {
    display: flex;
    justify-content: space-between;
    height: 3rem;
    line-height: 3rem;
    .psw-login {
      font-size: .9rem;
    }
  }
  .login-body {
    .login-title {
      height: 3rem;
      line-height: 3rem;
      font-size: 1.2rem;
      font-weight: 700;
    }
    .pwd_container {
      position: relative;
      .switch_show_pwd {
       @include ct;
       right: 0.2rem;
       top: 25%;

      }
    }
    input {
      display: block;
      width: 100%;
      height: 2rem;
      margin-bottom: 0.7rem;
      border-bottom: 1px solid #ccc;
      padding: 0 .7rem;
      font-size: .9rem;
      color: 1.2rem;
      font-weight: normal;
      outline: none;
    }
    .captcha-wrapper {
      position: relative;
      .captcha-img {
        position: absolute;
        top: 0;
        right: 0;
        width: 30%;
      }
    }
    .login-handel {
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      border-radius: 1.2rem;
      border: 0;
      color: #444;
      font-size: 1.1rem;
    }
    .allow {
      width: 100%;
      padding-top: 6rem;
      font-size: .9rem;
      color: #ccc;
      font-weight: normal;
      input {
        display: inline;
        @include wh(0.8rem, .8rem);
        margin-right: .3rem;
        vertical-align: baseline;
      }
    }
  }

  .link {
    color: $blue;
    font-size: .9rem;
  }
  .bold {
    font-weight: 700;
    font-size: 1.1rem;
  }
}
</style>
