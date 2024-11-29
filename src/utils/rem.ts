//判断是否是移动端
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
// 基准大小
const baseSize: number = isMobile ? 37.5 : 192

// 设置 rem 函数
function setRem(): void {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale: number = (document.documentElement.clientWidth / baseSize) * 10
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}

// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
