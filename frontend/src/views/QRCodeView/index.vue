<script setup>
import {ref} from 'vue'
import QrcodeVue from 'qrcode.vue'

const qrCodeContent = ref('完美主义是陷阱')
// 默认色用主题主色 #047857。canvas 的 fillStyle 不解析 CSS 变量，
// 所以这里必须写字面量而不能写 var(--primary)
const qRCodeColor = ref('#047857')

function downloadQRCode() {
  const canvas = document.querySelector('canvas')
  if (canvas) {
    const url = canvas.toDataURL()
    const a = document.createElement('a')
    a.download = 'QRCode.png'
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
</script>

<template>
  <el-card class="card" shadow="never">
    <template #header>设置二维码内容及颜色</template>
    <div class="qr-code-container">
      <el-input v-model="qrCodeContent" placeholder="设置内容"/>
      <el-color-picker v-model="qRCodeColor"/>
      <el-tooltip content="点击下载" placement="bottom">
        <QrcodeVue :value="qrCodeContent"
                   :foreground="qRCodeColor"
                   :size="120"
                   level="H"
                   class="qr-code"
                   @click="downloadQRCode"
        />
      </el-tooltip>
    </div>
  </el-card>
</template>

<style scoped>
.card {
  margin: 10rem auto;
  width: 30vw;
  /* 固定 height 会在内容变化时裁剪溢出内容，改为 min-height 自适应 */
  min-height: 30rem;
  box-shadow: var(--shadow-2);
}

.qr-code-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  justify-items: center;
}

.qr-code {
  cursor: pointer;
}

@media (max-width: 768px) {
  .card {
    width: 75vw;
  }
}
</style>