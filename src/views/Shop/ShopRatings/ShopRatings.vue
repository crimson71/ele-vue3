<template>
  <div class="rating-container" >
    <div class="score-wrapper">
      <div class="overall-score">
        <span class="overall-score-text">{{
          useState.shopScore.overall_score.toFixed(1)
        }}</span>
        <div>
          <p>
            <span class="score-text"
              >高于附近{{
                (useState.shopScore.compare_rating * 100).toFixed(1)
              }}%的商家</span
            >
          </p>
          <rating-star :rating="useState.shopScore.overall_score"></rating-star>
        </div>
      </div>
      <div class="other-score">
        <span class="score-text">味道</span>
        <div>{{ useState.shopScore.food_score.toFixed(1) }}</div>
      </div>
      <div class="other-score">
        <span class="score-text">包装</span>
        <div>{{ useState.shopScore.service_score.toFixed(1) }}</div>
      </div>
      <div class="other-score">
        <span class="score-text">配送时间</span>
        <div>{{ useState.shopScore.deliver_time }}分钟</div>
      </div>
    </div>
    <div class="rating-tags-wrapper">
      <ul>
        <li
          class="tags"
          v-for="(tag, index) in useState.ratingTags"
          :key="index"
          @click="selectTag(tag.name,index)"
          :class="index === currentIndex ? 'selected' :''"

        >
          {{ tag.name }} {{ tag.count }}
        </li>

      </ul>
      <p class="text-grey-400 text-xs mb-4 flex" @click="realRatingContent = !realRatingContent">
          <svg-icon name="checkbox" style="width: .8rem;height: .8rem;" :class="realRatingContent ? 'fillBlue':'fillBlank'"></svg-icon>
          只看有内容的评价
        </p>
    </div>

    <div class="ratings-content-wrapper">
      <ul>
        <li v-for="(item, index) in ratingContent" :key="index">
          <div class="user-name">
            <svg-icon
              name="person"
              class="avatar"
              style="width: 2rem; height: 2rem"
            ></svg-icon>
            <div class="name-right">
              <p class="name">{{ item.username }}</p>
              <p class="rating-time">{{ item.rated_at }}</p>
            </div>
          </div>
          <p class="rating">
            <span>满意度 </span>
            <rating-star :rating="item.rating_star"></rating-star>
            <span>味道{{ item.rating_star }}星</span>
            <span>包装{{ item.rating_star }}星</span>
            <span>{{ item.time_spent_desc }}</span>
          </p>
          <p class="rating-text">
            {{ item.rating_text ? item.rating_text : '用户默认好评' }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import RatingStar from '@/components/RatingStar.vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import BScroll from '@better-scroll/core'
import { useStore } from 'vuex'
const store = useStore()
const useState = computed(() => {
  const shopScore = store.state.shopScore
  const ratingTags = store.state.shopRatingTags
  const ratingContent = store.state.ratingContent
  const shopId = store.state.shopId
  return {
    shopScore,
    ratingTags,
    ratingContent,
    shopId
  }
})
const realRatingContent = ref(false)
const ratingContent = computed(() => {
  let content = useState.value.ratingContent
  if (realRatingContent.value) {
    content = content.filter(item => item.rating_text !== '')
  }

  return content
})

const ratingScroll = ref()

const initRatingContent = (obj) => {
  store.dispatch('getRatingContent', obj, () => {
    nextTick(() => {
      ratingScroll.value = new BScroll('.rating-container', {
        click: true
      })
    })
  })
}
const currentIndex = ref(0)
const selectTag = (tagName, index) => {
  currentIndex.value = index
  initRatingContent({
    restaurant_id: useState.value.shopId,
    tag_name: tagName,
    offset: 0,
    limit: 100
  })
}

onMounted(() => {
  initRatingContent({
    restaurant_id: useState.value.shopId,
    limit: 100,
    offset: 0
  })
})

</script>
<style lang="scss" scoped>
@import '../../../common/sass/mixin.scss';

.rating-container {
  padding-top: 0.5rem;
  height: 100vh;
  overflow: hidden;
  .score-wrapper {
    display: flex;
    height: 3rem;
    vertical-align: bottom;
    .score-text {
      font-size: 0.5rem;
      color: #999;
    }
    .overall-score {
      display: flex;
      margin-right: 0.9rem;
      .overall-score-text {
        font-size: 1.5rem;
        color: #ff9a0d;
        padding-right: 0.1rem;
      }
    }
    .other-score {
      display: flex;
      flex-direction: column;
      font-size: 0.7rem;
      margin-right: 0.5rem;
      padding-top: 0.38rem;
    }
  }
  .rating-tags-wrapper {

    ul {
      display: flex;
      flex-wrap: wrap;
      .tags {
        @include sc(0.5rem, #444);
        @include borderRadius(2px);
        background: #dddd;
        padding: 0.4rem;
        margin: 0 0.5rem 0.5rem 0;
      }
      .selected {
        color: $blue;
        background: lightblue;
      }
    }
    .fillBlue {
      fill:$blue;
    }
    .fillBlank {
      fill:#ccc;
    }
  }
  .ratings-content-wrapper {
    ul {
      li {
        margin-bottom: 0.5rem;
        .user-name {
          display: flex;

          .avatar {
            fill: $blue;
          }
          .name-right {
            display: flex;
            flex-direction: column;
            margin-bottom: 0.5rem;
            .name {
              color: #444;
              font-weight: 700;
              font-size: 0.7rem;
            }
            .rating-time {
              font-size: 0.5rem;
              color: #999;
            }
          }
        }
        .rating {
          display: flex;

          span {
            font-size: 0.5rem;
            color: #999;
            margin-right: 0.5rem;
          }
        }
        .rating-text {
          font-size: 0.6rem;
          color: #444;
        }
      }
    }
  }
}
</style>
