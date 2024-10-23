<template>
  <div class="loading-container">
    <div class="loading">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="title">系统加载中,请等待...</div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.loading-container {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    width: 100%;
    text-align: center;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 600;
  }
  .loading {
    height: 90px;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .item {
    height: 90px;
    width: 7%;
    background: #1087d1;
    /* 加margin，使竖条之间有空隙 */
    margin: 0px 6px;
    /* 圆角 */
    border-radius: 10px;
    /* 动画：名称、时间、循环 */
    animation: loading 1s infinite;
  }

  @keyframes loading {
    0% {
      height: 0px;
    }
    50% {
      height: 90px;
    }
    100% {
      height: 0px;
    }
  }
  /* 为每一个竖条设置延时 */
  .item:nth-child(2) {
    animation-delay: 0.1s;
  }
  .item:nth-child(3) {
    animation-delay: 0.2s;
  }
  .item:nth-child(4) {
    animation-delay: 0.3s;
  }
  .item:nth-child(5) {
    animation-delay: 0.4s;
  }
  .item:nth-child(6) {
    animation-delay: 0.5s;
  }
  .item:nth-child(7) {
    animation-delay: 0.6s;
  }
  .item:nth-child(8) {
    animation-delay: 0.7s;
  }
  .item:nth-child(9) {
    animation-delay: 0.8s;
  }
  .item:nth-child(10) {
    animation-delay: 0.9s;
  }
  .item:nth-child(11) {
    animation-delay: 1s;
  }
  .item:nth-child(12) {
    animation-delay: 1.1s;
  }
  .item:nth-child(13) {
    animation-delay: 1.2s;
  }
}
</style>
