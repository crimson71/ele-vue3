<template>
  <div class="profile-container">
    <router-link class="login-box" :to="{ name: 'login' }">
      <div class="login-left">
        <svg-icon
          name="person"
          class="login-icon"
          style="width: 1.5rem; height: 1.5rem"
        ></svg-icon>
        <span>立即登陆</span>
      </div>
      <div class="login-right">
        <svg-icon
          name="setting"
          fill="#000"
          style="width: 1.5rem; height: 1.5rem"
        ></svg-icon>
        <svg-icon
          name="qa"
          fill="#000"
          style="width: 1.5rem; height: 1.5rem"
        ></svg-icon>
      </div>
    </router-link>
    <!-- 我的资产 -->
    <div class="zc-box">
      <div class="zc-left">
        <svg-icon name="wjj" style="margin: auto;"></svg-icon>
        <span style="margin-top: 0.3rem;">我的资产</span>
      </div>
      <div class="zc-right">
        <div class="right-item">
          <svg-icon
            name="hb"
            style="width: 3rem; height: 3rem"
            class="zc-icon"
          ></svg-icon>
          <span class="zc-title">红包</span>
          <span class="zc-detail">查看我的红包</span>
        </div>
        <div class="right-item">
          <svg-icon
            name="youhuijuan"
            style="width: 3rem; height: 3rem"
            class="zc-icon"
          ></svg-icon>
          <span class="zc-title">券包</span>
          <span class="zc-detail">查看我的券包</span>
        </div>
        <div class="right-item">
          <svg-icon
            name="kb"
            style="width: 3rem; height: 3rem"
            class="zc-icon"
          ></svg-icon>
          <span class="zc-title">卡包</span>
          <span class="zc-detail">查看我的卡包</span>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <nav class="nav-container">
      <ul class="nav-ul">
        <li>
          <svg-icon name="location" class="nav-icon"></svg-icon>
          <span class="nav-name">我的地址</span>
        </li>
        <li>
          <svg-icon name="service" class="nav-icon"></svg-icon>
          <span class="nav-name">我的客服</span>
        </li>
        <li>
          <svg-icon name="shopcart" class="nav-icon"></svg-icon>
          <span class="nav-name">购物车</span>
        </li>
        <li>
          <svg-icon name="follow" class="nav-icon"></svg-icon>
          <span class="nav-name">店铺关注</span>
        </li>
        <li>
          <svg-icon name="building" class="nav-icon"></svg-icon>
          <span class="nav-name">企业订餐</span>
        </li>
        <li>
          <svg-icon name="motto" class="nav-icon"></svg-icon>
          <span class="nav-name">邀友跑单</span>
        </li>
        <li>
          <svg-icon name="shop" class="nav-icon"></svg-icon>
          <span class="nav-name">开店合作</span>
        </li>
        <li>
          <svg-icon name="heart" class="nav-icon"></svg-icon>
          <span class="nav-name">公益3小时</span>
        </li>
        <li>
          <svg-icon name="attention" class="nav-icon"></svg-icon>
          <span class="nav-name">资质与规则</span>
        </li>
        <li>
          <svg-icon name="piaoju" class="nav-icon"></svg-icon>
          <span class="nav-name">发票助手</span>
        </li>
        <li>
          <svg-icon name="star" class="nav-icon"></svg-icon>
          <span class="nav-name">评价中心</span>
        </li>
        <li>
          <svg-icon name="eco" class="nav-icon"></svg-icon>
          <span class="nav-name">碳账户</span>
        </li>
      </ul>
    </nav>
  </div>

</template>

<script setup>

</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.profile-container {
  padding: 0 0.5rem;
  .login-box {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    margin-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;
    .login-icon {
      fill: $blue;
      vertical-align: middle;

    }
    span {
      font-size: 1rem;
      font-weight: 700;
      // margin-left: 0.8rem;
    }
    .login-right {
      .svg-icon {
        margin-left: 0.8rem;
        vertical-align: middle;
      }
    }
  }
  .zc-box {
    height: 5rem;
    width: 100%;
    display: flex;
    background: #fff;
    border-radius: 0.3rem;
    margin-bottom: 0.8rem;
    .zc-left {
      width: 30%;
      display: flex;
      flex-direction: column;
      margin: auto;
      text-align: center;
    }
    .zc-right {
      width: 70%;
      display: flex;
      justify-content: space-around;
      .right-item {
        display: flex;
        flex-direction: column;
        text-align: center;
        .zc-icon {
          margin: auto;
          fill: red;
          margin-bottom: .3rem;
        }
        .zc-title {
          color:#000;
          font-weight: 700;
          font-size: .6rem;
          margin-bottom: 0.2rem;
        }
        .zc-detail {
          color:#666;

          font-size: 0.6rem;

        }
      }
    }
  }
  .nav-container {
    width: 100%;
    background: #fff;
    .nav-ul {
      display: flex;
      flex-wrap: wrap;
      li {
        text-align: center;
        height: 3rem;
        display: flex;
        flex-direction: column;
        width: 25%;
        .nav-icon {
          margin:1.2rem auto;
          margin-bottom: 0.1rem;
          fill: #000;
        }
        .nav-name {
          font-size: 0.6rem;
        }
      }
    }
  }
}
</style>
