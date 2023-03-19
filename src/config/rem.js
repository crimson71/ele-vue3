(function (doc, win) {
  // 获取html
  const docEl = doc.documentElement
  // 是否换了方向，横屏？ 调整窗口宽度->resize事件
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  // 计算rem的函数recalc
  const recalc = function () {
    // docEl.clientWidth是整个窗口的宽度
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    // 20 * (clientWidth / 320)是将屏幕分为16等份
    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  // DOMContentLoaded事件在DOM结构加载完成后就会触发，比loaded先触发，第三个参数为false， 冒泡。true是捕获事件
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
// 建立一个闭包，立即执行函数，传两个实参
