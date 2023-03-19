<template>
  <div class="countdown-contaniner">
    <div class="hour">{{h}}</div> &nbsp;:&nbsp;
    <div class="minute">{{ m }}</div> &nbsp; :&nbsp;
    <div class="seconds">{{ s }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const h = ref(0)
const m = ref(0)
const s = ref(0)
let rafId = null
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const day = now.getDate() + 1
const endTime = new Date(`${year}/${month}/${day} 00:00:00`)
const countDown = () => {
  const nowTime = new Date()
  const remainTime = (parseInt(endTime.getTime()) - parseInt(nowTime.getTime())) / 1000
  h.value = formateTime(parseInt(remainTime / 3600 % 24))
  m.value = formateTime(parseInt(remainTime / 60 % 60))
  s.value = formateTime(parseInt(remainTime % 60))

  if (remainTime > 0) {
    rafId = window.requestAnimationFrame(countDown)
  } else {
    cancelAnimationFrame(rafId)
  }
}
const formateTime = (time) => {
  time = time < 10 ? '0' + time : time
  return time
}
onMounted(() => {
  countDown()
})
</script>

<style lang="scss" scoped>
.countdown-contaniner {
  height: 0.9rem;
  line-height: 0.9rem;

  display: flex;
  color:red;
  font-size: 0.5rem;
  .hour,
  .minute,
  .seconds {
    padding:0px 0.1rem;
    height: 0.9rem;
    line-height: .9rem;

    border-radius: 0.3rem;

    background: red;
    color: #fff;

  }

}

</style>
