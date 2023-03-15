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
      <form>
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
        <input type="text" placeholder="验证码" />
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
      <p class="problem"><a href="#" class="link">遇到问题</a></p>
      <p>其他登陆方式</p>
      <p>
        原通过 <span class="bold">QQ</span>或
        <span class="bold">微博</span>登陆的用户可直接使用绑定手机号登录
      </p>
      <p class="account-icons">
        <svg-icon name="alipay" style="width: 25%; height: 50px"></svg-icon>
        <svg-icon name="taobao" style="width: 25%; height: 50px"></svg-icon>
        <svg-icon name="wechat" style="width: 25%; height: 50px"></svg-icon>
        <svg-icon name="apple" style="width: 25%; height: 50px"></svg-icon>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const phone = ref('') // 电话号码
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
</script>

<style lang="scss" scoped>
@import '../../../common/sass/mixin.scss';
.login-container {
  padding: 10px;
  background: #fff;
  .login-header {
    display: flex;
    justify-content: space-between;

    height: 50px;
    line-height: 50px;
    .psw-login {
      font-size: 20px;
    }
  }
  .login-body {
    .login-title {
      height: 50px;
      line-height: 50px;
      font-size: 25px;
      font-weight: 700;
    }
    input {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      padding: 0 10px;
      font-size: 20px;
      color: 20px;
      font-weight: normal;
      outline: none;
    }

    .phone {
      position: relative;
      width: 100%;
      .captcha {
        display: inline-block;
        right: 10px;
        position: absolute;
        background: #fff;
        width: 28%;
        height: 40px;
        @include borderRadius(20px);
        border: 1px solid #ccc;
        top: -8px;
        color: #ccc;
        line-height: 40px;
        text-align: center;

      }
      .right_phone {
        color: $blue;
        border: 1px solid $blue;
      }
    }

    .login-btn {
      @include wh(100%, 40px);
      border-radius: 25px;
      border: 0;
      color: #444;
      font-size: 18px;
    }
    .allow {
      width: 100%;

      color: #ccc;
      font-weight: normal;
      input {
        display: inline;
        @include wh(15px, 15px);
        margin-right: 5px;
        vertical-align: baseline;
      }
    }
  }
  .login-bottom {
    padding-top: 100px;

    text-align: center;
    color: #ccc;
    .problem {
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      margin-bottom: 20px;
    }
    .account-icons {
      display: flex;
      margin-top: 20px;
      padding: 0 50px;
    }
  }
  .link {
    color: $blue;
  }
  .bold {
    font-weight: 700;
    font-size: 18px;
  }
}
</style>
