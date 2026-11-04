<script setup>
import {ref} from 'vue'
import QrcodeVue from 'qrcode.vue'
import ToolPage from '@/components/ToolPage/index.vue'

const qrCodeContent = ref('完美主义是陷阱')
// canvas 的 fillStyle 不解析 CSS 变量，这里必须是字面量色值
const qRCodeColor = ref('#047857')
const qrRef = ref(null)

const presetColors = ['#047857', '#14181C', '#0E7490', '#B91C1C', '#7C3AED']

function downloadQRCode() {
  const canvas = qrRef.value?.$el?.querySelector('canvas')
  if (!canvas) return
  const link = document.createElement('a')
  link.download = 'qr-code.png'
  link.href = canvas.toDataURL('image/png')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>


<template>
  <ToolPage narrow>
    <div class="qr-layout">
      <section class="panel">
        <header class="panel-head">
          <span class="panel-title">设置</span>
        </header>
        <div class="panel-body qr-form">
          <label class="field">
            <span class="field-label mono">二维码内容</span>
            <el-input
                v-model="qrCodeContent"
                type="textarea"
                :rows="4"
                maxlength="500"
                show-word-limit
                placeholder="网址、一段文字、微信号都行"
            />
          </label>

          <div class="field">
            <span class="field-label mono">前景色</span>
            <div class="color-row">
              <el-color-picker v-model="qRCodeColor" :predefine="presetColors"/>
              <span class="mono color-value">{{ qRCodeColor }}</span>
            </div>
          </div>

          <p class="hint">扫出来就是上面这段文字。</p>
        </div>
      </section>

      <aside class="panel preview">
        <button type="button" class="qr-button" aria-label="下载二维码图片" @click="downloadQRCode">
          <QrcodeVue
              ref="qrRef"
              :value="qrCodeContent || ' '"
              :foreground="qRCodeColor"
              :size="200"
              level="H"
              class="qr-code"
          />
        </button>
        <el-button type="primary" @click="downloadQRCode">下载 PNG</el-button>
        <p class="hint mono">点击二维码也能下载</p>
      </aside>
    </div>
  </ToolPage>
</template>


<style scoped>
.qr-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 30rem;
  gap: 1.6rem;
  align-items: stretch;
}

.qr-form {
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

.color-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.color-value {
  font-size: 1.4rem;
  color: var(--text-weak);
}

.hint {
  font-size: 1.3rem;
  color: var(--text-faint);
}

.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 2.4rem;
  background-color: var(--panel-soft);
}

.qr-button {
  display: grid;
  place-items: center;
  padding: 1.6rem;
  border: 1px solid var(--rule);
  border-radius: var(--radius-sm);
  background-color: #FFFFFF;
  cursor: pointer;
  transition: border-color var(--duration) var(--ease), transform var(--duration) var(--ease);
}

.qr-button:hover {
  border-color: var(--primary-border);
  transform: translateY(-1px);
}

.qr-code {
  display: block;
  width: 20rem;
  height: 20rem;
}

@media (max-width: 768px) {
  .qr-layout {
    grid-template-columns: 1fr;
  }

  .preview {
    padding: 2rem;
  }
}
</style>
