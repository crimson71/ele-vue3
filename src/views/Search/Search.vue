<template>
  <div class="search-container">
    <div class="search-box">
      <router-link :to="{name:'msite'}" class="link">
        <svg-icon name="arrow-left" class="go-back" style="width: 1rem; height: 1rem;" />
      </router-link>
      <input type="text" placeholder="请输入搜索内容" v-model.trim="keyword" class="search-input"/>
      <button class="search-btn" @click="searchShop(keyword)">搜索</button>
    </div>
    <div class="search-history" v-if="handleShow">
      <div class="title ">历史搜索 <svg-icon name="clear" style="width: 1rem;height: 0.8rem; fill: #999;" @click="clearHsitory"/></div>
      <ul>
        <li class="history-li" v-for="(item,index) in useState.recentSearch" :key="index" @click="setKeyword(index,1)"> {{ item}}</li>
      </ul>
    </div>
    <div class="search-history" v-if="handleShow">
      <div class="title">搜索发现</div>
    <ul>
      <li class="history-li" v-for="(item,index) in useState.hotKeywords" :key="index" @click="setKeyword(index,2)">{{ item }}</li>
    </ul>
    </div>
    <div class="search-result" v-if="!handleShow">
      <ul>
        <router-link :to="{name:'shop',query:{id:item.id}}" custom v-slot="{ navigate }" v-for="(item,index) in useState.searchShops" :key="index">
          <li @click="navigate" role="link" class="shop-li">
            <div class="li-left">
              <img :src="imgBaseUrl + item.image_path" >
              <i class v-if="item.is_premium">品牌</i>
            </div>
            <div class="li-right">
              <h1 class="shop-name">{{item.name}}</h1>
              <h3 class="shop-info">
                <span>月售{{item.recent_order_num}} 起送￥{{ item.float_delivery_fee }}</span>
                <span class="info-right ellipsis ">{{ item.order_lead_time }} {{ item.distance }}</span>
              </h3>
              <h3 class="shop-score">{{item.rating}}分 <span v-if="item.rating > 4.5" class="is-great">超棒</span></h3>
              <h3 class="shop-actives" v-for="(activityItem,index) in item.activities" :key="index"><span>{{ activityItem.description }}</span></h3>

            </div>
          </li>
        </router-link>
        <li style="width: 80%;margin: 0 auto;" class="text-xs text-grey-500  flex" v-if="useState.searchShops.length <= 2 "><img src="@/assets/images/tips-dog.jpeg" class="w-6 h-6"> <span class="leading-6 bg-white h-6 pl-2 pr-2">搜索结果太少？换个关键词试试</span> </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const imgBaseUrl = '//elm.cangdu.org/img/'
// const router = useRouter()
const keyword = ref()
const store = useStore()
const useState = computed(() => {
  const recentSearch = store.state.recentSearch
  const searchShops = store.state.searchShops
  const hotKeywords = store.state.hotKeywords
  return {
    recentSearch,
    searchShops,
    hotKeywords
  }
})
const handleShow = ref(true)
const searchShop = (kw) => {
  if (kw) {
    store.dispatch('getSearchinfo', kw)
    keyword.value = ''
    handleShow.value = false
  }
}
// 设置搜索关键字
const setKeyword = (index, flag) => {
  // flag为1从搜索历史中获取关键字
  if (flag === 1) {
    keyword.value = useState.value.recentSearch[index]
  }
  // flag为2从热词中获取关键字
  if (flag === 2) {
    keyword.value = useState.value.hotKeywords[index]
  }
}
// 清空历史
const clearHsitory = () => {
  store.dispatch('clearSearchHistory')
}
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.search-container {
padding: .8rem 0;
  .search-box {
    margin-bottom: .8rem;
    padding: 0 .8rem;

    display: flex;
    .link {
      position: relative;
      width: 1.2rem;
 .go-back {
      fill:#444;
      margin-right:.5rem ;
     @include ct;

    }

    }
    .search-input {
      width: 75%;
      height: 1.5rem;
      @include borderRadius(.7rem);
      padding-left: 1rem;
      @include sc(.7rem,#999);
      margin-right: .8rem;
    }
    .search-btn {
      @include sc(.7rem,#000)
    }

  }
  .search-history {
    background: #fff;
    padding: 1rem .8rem;
    margin-bottom: .8rem;
    .title {
      width: 100%;
      position: relative;
      @include sc(1rem,#000);
      font-weight: 500;
      margin-bottom: .8rem;
      .svg-icon {
        @include ct;
        right: .2rem;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
        .history-li {
          padding: .3rem .5rem;
          @include borderRadius(40%);
          background: #eee;
          @include sc(.6rem,#444);
          margin-right: .5rem;
          margin-bottom: .5rem;
        }

      }
  }
  .search-result {

    ul {
      .shop-li {
        display: flex;
        margin-bottom: .5rem;
        background: #fff;
        .li-left {
          width: 20%;
          position: relative;
          margin-right: .5rem;
          img {
            width: 100%;
          }
          i {
            position: absolute;
            top: -.2rem;
            padding: .1rem;
            left: 0;
            background: $blue;
            @include sc(.5rem,#fff);
            font-weight: 700;

          }
        }
        .li-right {
          width: 80%;
          padding: .5rem;
          .shop-name {
            @include sc(1rem,#000);
            font-weight: 700;
          }
          .shop-info {
            @include sc(.5rem,#666);
            .info-right {
              float: right;
            }

          }
          .shop-score {
              @include sc(.7rem,orange);
              font-weight: 700;
              .is-great {
                @include sc(.7rem,orange);
              font-weight: 700;

              }
            }
            .shop-actives {
              @include sc(.5rem,red);
            }
        }
      }

    }
  }

}
</style>
