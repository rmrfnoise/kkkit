<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import ToolPage from '@/components/ToolPage/index.vue'

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
    ElMessage.error('先写一句要滚出来的话')
    return
  }
  isShowConfigContainer.value = false
  enterFullscreen()
}

function enterFullscreen() {
  // 浏览器可能因为缺少用户手势或权限拒绝全屏，失败时停留在页面内也能看
  document.documentElement.requestFullscreen?.().catch(() => {})
}

function exitBarrage() {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
  isShowConfigContainer.value = true
}
</script>


<template>
  <ToolPage narrow>
    <section v-show="isShowConfigContainer" class="panel">
      <header class="panel-head">
        <span class="panel-title">弹幕设置</span>
      </header>

      <div class="panel-body barrage-form">
        <label class="field">
          <span class="field-label">内容</span>
          <el-input
              v-model="barrageContent"
              maxlength="40"
              show-word-limit
              placeholder="想举着喊的那句话"
          />
        </label>

        <div class="slider-row">
          <span class="field-label">文字大小</span>
          <el-slider v-model="textSize" :min="10" :max="200"/>
          <span class="slider-value mono">{{ textSize }}px</span>
        </div>

        <div class="slider-row">
          <span class="field-label">滚动速度</span>
          <el-slider v-model="scrollSpeed" :min="1" :max="20"/>
          <span class="slider-value mono">{{ scrollSpeed }}</span>
        </div>

        <div class="color-row">
          <label class="field">
            <span class="field-label">文字颜色</span>
            <el-color-picker v-model="textColor" show-alpha/>
          </label>
          <label class="field">
            <span class="field-label">背景颜色</span>
            <el-color-picker v-model="bgColor" show-alpha/>
          </label>
        </div>

        <div class="barrage-actions">
          <el-button type="primary" size="large" @click="showBarrage">全屏显示</el-button>
          <span class="hint">按 Esc 退出全屏；手机上把屏幕横过来再举。</span>
        </div>
      </div>
    </section>

    <div v-show="!isShowConfigContainer" class="barrage-stage" :style="{backgroundColor: bgColor}">
      <button type="button" class="stage-exit mono" @click="exitBarrage">返回设置</button>
      <div
          class="barrage"
          :style="{
            fontSize: textSize + 'px',
            color: textColor,
            animationDuration: 21 - scrollSpeed + 's'
          }"
      >
        {{ barrageContent }}
      </div>
    </div>
  </ToolPage>
</template>


<style scoped>
.barrage-form {
  display: grid;
  gap: 2.4rem;
}

.field {
  display: grid;
  gap: 0.8rem;
}

.field-label {
  font-size: 1.2rem;
  letter-spacing: 0.12em;
  color: var(--text-faint);
}

.slider-row {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr) 5.6rem;
  align-items: center;
  gap: 1.6rem;
}

.slider-value {
  font-size: 1.3rem;
  color: var(--text-weak);
  text-align: right;
}

.color-row {
  display: flex;
  gap: 3.2rem;
}

.barrage-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
}

.hint {
  font-size: 1.3rem;
  color: var(--text-faint);
}

.barrage-stage {
  position: fixed;
  inset: 0;
  z-index: 60;
  overflow: hidden;
}

.stage-exit {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 2;
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(20, 24, 28, 0.18);
  border-radius: var(--radius-sm);
  background-color: rgba(255, 255, 255, 0.72);
  font-size: 1.3rem;
  color: var(--text-weak);
  cursor: pointer;
}

.stage-exit:hover {
  background-color: #FFFFFF;
  color: var(--text);
}

.barrage {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-100%);
  animation-name: movePC;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  white-space: nowrap;
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
  .slider-row {
    grid-template-columns: 7rem minmax(0, 1fr) 4.8rem;
  }

  .barrage-stage .barrage {
    top: 0;
    left: 50%;
    transform-origin: left top;
    transform: rotateZ(90deg) translateX(-100%) translateY(-50%);
    animation-name: moveMobile;
  }
}
</style>
