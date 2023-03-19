<template>
  <div class="login-container">
    <div class="login-header">
      <router-link :to="{ name: 'profile' }"
        ><svg-icon name="close"
      /></router-link>

      <router-link class="psw-login" :to="{ name: 'passwordlogin' }"
        >密码登陆</router-link
      >
    </div>
    <div class="login-body">
      <div class="login-title">手机号登录</div>
      <form @submit.prevent="login">
        <div class="phone">
          <input type="text" placeholder="请输入手机号" v-model="phone" />
          <button
            :disabled="!rightPhone"
            @click.prevent="getCode"
            class="captcha"
            :class="{ right_phone: rightPhone }"
          >
          {{countdownNum > 0 ? `${countdownNum}s后获取验证码` : '获取验证码'}}

          </button>
        </div>
        <br />
        <input type="text" placeholder="验证码" v-model="code" />
        <button class="login-btn">登陆</button>
        <div class="allow">
          <input type="checkbox" name="" id="allow" />
          <label for="allow"
            >未注册手机号登陆后将自动生成账号，且代表已经阅读并同意<a
              href="#"
              class="link"
              >《用户服务协议》&nbsp;&nbsp;《隐私政策》</a
            ></label
          >
        </div>
      </form>
    </div>
    <div class="login-bottom">
      <p class="problem"><a href="#" class="link text-sm">遇到问题</a></p>
      <p>其他登陆方式</p>
      <p>
        原通过 <span class="bold">QQ</span>或
        <span class="bold">微博</span>登陆的用户可直接使用绑定手机号登录
      </p>
      <p class="account-icons">
        <svg-icon name="alipay" style="width: 25%; height: 3rem"></svg-icon>
        <svg-icon name="taobao" style="width: 25%; height: 3rem"></svg-icon>
        <svg-icon name="wechat" style="width: 25%; height: 3rem"></svg-icon>
        <svg-icon name="apple" style="width: 25%; height: 3rem"></svg-icon>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { phoneLogin } from '@/api/getData'
const phone = ref('') // 电话号码
const code = ref('') // 验证码
const countdownNum = ref(0)
// 校验手机号码
const rightPhone = computed(() => {
  return /^1\d{10}$/.test(phone.value)
})
// 获取验证码
const getCode = () => {
  if (!countdownNum.value) {
    countdownNum.value = 30
    const timer = setInterval(() => {
      if (countdownNum.value > 0) {
        countdownNum.value--
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }
}

// 前台表单验证
const login = async () => {
  if (!rightPhone.value) {
    // 手机号不正确
    alert('手机号不正确')
  } else if (!/^\d{6}$/.test(code)) {
    // 验证码不正确
    alert('验证码不正确')
  }
  const result = await phoneLogin({ phone: phone, code: code })
  console.log(result)
}
</script>

<style lang="scss" scoped>
@import '../../../common/sass/mixin.scss';
.login-container {
  padding:.6rem;
  background: #fff;
  .login-header {
    display: flex;
    justify-content: space-between;

    height: 3rem;
    line-height: 3rem;
    .psw-login {
      font-size: 0.9rem;
    }
  }
  .login-body {
    .login-title {
      height: 3rem;
      line-height: 3rem;
      font-size: 1.3rem;
      font-weight: 700;
    }
    input {
      width: 100%;
      height: 3rem;
      margin-bottom: 0.6rem;
      border-bottom: 1px solid #ccc;
      padding: 0 .8rem;
      font-size: 0.9rem;
      color: 0.9rem;
      font-weight: normal;
      outline: none;
    }

    .phone {
      position: relative;
      width: 100%;
      .captcha {
        display: inline-block;
        font-size:.6rem ;
        right: .6rem;
        position: absolute;
        background: #fff;
        width: 28%;
        height: 1.5rem;
        @include borderRadius(0.9rem);
        border: 1px solid #ccc;
        top: 1rem;
        color: #ccc;
        line-height: 1.5rem;
        text-align: center;

      }
      .right_phone {
        color: $blue;
        border: 1px solid $blue;
      }
    }

    .login-btn {
      @include wh(100%, 3.5rem);
      border-radius: 1.5rem;
      border: 0;
      color: #444;
      font-size: 0.9rem;
    }
    .allow {
      width: 100%;
      font-size: .5rem;

      color: #ccc;
      font-weight: normal;
      input {
        display: inline;
        @include wh(0.5rem, 0.5rem);
        margin-right: 0.3rem;
        vertical-align: baseline;
      }
    }
  }
  .login-bottom {
    padding-top: 6rem;
    font-size: .7rem;

    text-align: center;
    color: #ccc;
    .problem {
      font-size: 1.1rem;
      height: 3rem;
      line-height: 3rem;
      margin-bottom: 0.9rem;
    }
    .account-icons {
      display: flex;
      margin-top: 0.9rem;
      padding: 0 3rem;
    }
  }
  .link {
    color: $blue;
  }
  .bold {
    font-weight: 700;
    font-size: 0.9rem;
  }
}
</style>
