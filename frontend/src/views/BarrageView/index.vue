<script setup>
import {ref, onMounted, onUnmounted} from 'vue'

const barrageContent = ref('')
const isShowConfigContainer = ref(true)
const textSize = ref(100)
const scrollSpeed = ref(16)
// 默认文字色用主题主色 #047857 的 80% 透明度，与全站终端绿一致
const textColor = ref('rgba(4, 120, 87, 0.8)')
const bgColor = ref('rgba(255, 255, 255, 1.0)')

const handleFullScreenChange = () => {
  if (!document.fullscreenElement) {
    isShowConfigContainer.value = true
  }
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullScreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullScreenChange)
})

function showBarrage() {
  if (barrageContent.value.trim() === '') {
    ElMessage.error('弹幕内容不能为空！')
    return
  }
  isShowConfigContainer.value = false
  enterFullscreen()
}

function enterFullscreen() {
  document.documentElement.requestFullscreen()
}
</script>


<template>
  <div class="configContainer" v-show="isShowConfigContainer">
    <el-input v-model="barrageContent" placeholder="请输入弹幕内容"/>
    <div class="slider-row">
      <span>文字大小</span>
      <el-slider v-model="textSize" :min="10" :max="200"/>
    </div>
    <div class="slider-row">
      <span>滚动速度</span>
      <el-slider v-model="scrollSpeed" :min="1" :max="20"/>
    </div>
    <div>
      <span>文字颜色</span>
      <el-color-picker v-model="textColor" show-alpha/>
    </div>
    <div>
      <span>背景颜色</span>
      <el-color-picker v-model="bgColor" show-alpha/>
    </div>
    <el-button type="primary" @click="showBarrage">显示弹幕</el-button>
  </div>
  <div class="barrageShowArea" v-show="!isShowConfigContainer">
    <div class="barrage"
         :style="{fontSize: textSize + 'px', color: textColor, backgroundColor: bgColor, animationDuration: 21 - scrollSpeed + 's'}">
      {{ barrageContent }}
    </div>
  </div>
</template>


<style scoped>
.configContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 3vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 35vw;
  height: 40rem;

  span {
    margin-right: 3rem;
    color: var(--text);
  }

  /* el-slider 撑满剩余宽度，与左侧标签同行居中 */
  .slider-row {
    display: flex;
    align-items: center;

    .el-slider {
      flex: 1;
    }
  }
}

.barrageShowArea {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;

  .barrage {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-100%);
    animation-name: movePC;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    white-space: nowrap;
  }
}

@keyframes movePC {
  from {
    transform: translateY(-50%) translateX(-100%);
  }
  to {
    transform: translateY(-50%) translateX(100vw);
  }
}

@keyframes moveMobile {
  from {
    transform: rotateZ(90deg) translateX(-100%) translateY(-50%);
  }
  to {
    transform: rotateZ(90deg) translateX(100vh) translateY(-50%);
  }
}

@media (max-width: 768px) {
  .configContainer {
    width: 90vw;
  }

  .barrageShowArea {
    .barrage {
      top: 0;
      left: 50%;
      transform-origin: left top;
      transform: rotateZ(90deg) translateX(-100%) translateY(-50%);
      animation-name: moveMobile;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  }
}
</style>