<template>
  <svg :class="svgClass" :style="{ width: size + 'px', height: size + 'px', color: color }" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    name: { type: String, required: true }, // svg 图标名称
    className: { type: String, default: '' }, // 指定的类样式
    size: { type: Number, default: 28 }, // 图标尺寸
    color: { type: String, default: '#000' } // 图标颜色
  },
  computed: { // 计算属性
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1rem;
  height: 1rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
