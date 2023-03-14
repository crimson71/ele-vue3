<template>
  <div class="login-container">
    <div class="login-header">
      <router-link :to="{name:'profile'}" ><svg-icon name="close" /></router-link>

    </div>
    <div class="login-body">
    <div class="login-title">
      密码登录
    </div>
    <input type="text" placeholder="手机/用户名" >
    <input type="text" placeholder="密码" >
    <input type="button" value="登陆" class="login-btn">
    <div class="login-handel">
      <router-link :to="{name:'phonelogin'}" class="link"> 手机号登陆</router-link>
      <a href="#" class="link">忘记密码</a>
    </div>
    <div class="allow">
      <input type="checkbox" name="" id="allow">
      已阅读并同意
      <a href="#" class="link">《用户服务协议》 &nbsp;&nbsp;《隐私政策》</a>
    </div>
    </div>

  </div>

</template>

<script>
export default {

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
      display: block;
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
    .login-handel {
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      border-radius: 25px;
      border: 0;
      color: #444;
      font-size: 18px;

    }
    .allow {
      width: 100%;
      padding-top: 100px;

      color: #ccc;
      font-weight: normal;
      input {
        display: inline;
        @include wh(15px,15px);
        margin-right: 5px;
        vertical-align:baseline;
      }

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
