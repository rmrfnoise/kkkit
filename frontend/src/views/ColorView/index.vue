<script setup>
import {computed, ref} from 'vue'
import {isHexColor} from '@/utils/string.js'
import ToolPage from '@/components/ToolPage/index.vue'

function isIntegerIn0To255(n) {
  if (n === null || n === undefined || String(n).trim() === '') return false
  const num = Number(n)
  return Number.isInteger(num) && num >= 0 && num <= 255
}

// 将 3 位缩写（#abc）展开为 6 位（#aabbcc）
function normalizeHex(value) {
  const color = String(value ?? '').trim()
  if (/^#[0-9A-F]{3}$/i.test(color)) {
    return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
  }
  return color
}

function toRgbColor() {
  const color = normalizeHex(hex.value)
  if (!isHexColor(color)) {
    ElMessage.error('HEX 要是 # 加 3 位或 6 位十六进制，比如 #047857')
    return
  }
  hex.value = color.toUpperCase()
  r.value = parseInt(color.substring(1, 3), 16)
  g.value = parseInt(color.substring(3, 5), 16)
  b.value = parseInt(color.substring(5, 7), 16)
}

function toHexColor() {
  if (!isIntegerIn0To255(r.value) || !isIntegerIn0To255(g.value) || !isIntegerIn0To255(b.value)) {
    ElMessage.error('R、G、B 都必须是 0 到 255 之间的整数')
    return
  }
  const R = parseInt(r.value)
  const G = parseInt(g.value)
  const B = parseInt(b.value)
  hex.value = ('#' + R.toString(16).padStart(2, '0')
    + G.toString(16).padStart(2, '0')
    + B.toString(16).padStart(2, '0')).toUpperCase()
}

const hex = ref('#047857')
const r = ref(4)
const g = ref(120)
const b = ref(87)

const previewColor = computed(() => {
  const color = normalizeHex(hex.value)
  return isHexColor(color) ? color : null
})

// 色块上的文字要跟着底色明暗走，否则浅色块上的白字直接消失
const previewInk = computed(() => {
  if (!previewColor.value) return 'var(--text-faint)'
  const channel = offset => parseInt(previewColor.value.slice(offset, offset + 2), 16) / 255
  const linear = value => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  const luminance = 0.2126 * linear(channel(1)) + 0.7152 * linear(channel(3)) + 0.0722 * linear(channel(5))
  return luminance > 0.42 ? '#14181C' : '#FFFFFF'
})

const previewChannels = computed(() => {
  if (!previewColor.value) return '等待一个合法的颜色'
  const [red, green, blue] = [1, 3, 5].map(offset => parseInt(previewColor.value.slice(offset, offset + 2), 16))
  return `R ${red} · G ${green} · B ${blue}`
})
</script>


<template>
  <ToolPage narrow>
    <div class="color-layout">
      <section class="panel">
        <header class="panel-head">
          <span class="panel-title">输入</span>
        </header>
        <div class="panel-body color-form">
          <label class="field">
            <span class="field-label mono">HEX</span>
            <el-input v-model="hex" placeholder="#047857" maxlength="7" @keyup.enter="toRgbColor"/>
          </label>

          <div class="channels">
            <label class="field">
              <span class="field-label mono"><i class="ch ch--r" aria-hidden="true"></i>R</span>
              <el-input v-model="r" placeholder="0–255" @keyup.enter="toHexColor"/>
            </label>
            <label class="field">
              <span class="field-label mono"><i class="ch ch--g" aria-hidden="true"></i>G</span>
              <el-input v-model="g" placeholder="0–255" @keyup.enter="toHexColor"/>
            </label>
            <label class="field">
              <span class="field-label mono"><i class="ch ch--b" aria-hidden="true"></i>B</span>
              <el-input v-model="b" placeholder="0–255" @keyup.enter="toHexColor"/>
            </label>
          </div>

          <div class="color-actions">
            <el-button type="primary" @click="toRgbColor">HEX 转 RGB</el-button>
            <el-button @click="toHexColor">RGB 转 HEX</el-button>
          </div>
        </div>
      </section>

      <aside class="panel preview" :style="{backgroundColor: previewColor ?? 'var(--panel-soft)'}">
        <div class="preview-body">
          <span class="preview-hex mono" :style="{color: previewInk}">{{ previewColor ?? '—' }}</span>
          <span class="preview-rgb mono" :style="{color: previewInk}">{{ previewChannels }}</span>
        </div>
      </aside>
    </div>
  </ToolPage>
</template>


<style scoped>
.color-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28rem;
  gap: 1.6rem;
  align-items: stretch;
}

.color-form {
  display: grid;
  gap: 2rem;
}

.field {
  display: grid;
  gap: 0.8rem;
}

.field-label {
  display: inline-flex;
  align-items: center;
  font-size: 1.2rem;
  letter-spacing: 0.12em;
  color: var(--text-faint);
}

.ch {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.6rem;
  border-radius: 1px;
}

.ch--r {
  background-color: #DC2626;
}

.ch--g {
  background-color: #16A34A;
}

.ch--b {
  background-color: #2563EB;
}

.channels {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.color-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.preview {
  display: flex;
  align-items: flex-end;
  min-height: 22rem;
  border-color: var(--rule);
  transition: background-color 0.24s var(--ease);
}

.preview-body {
  display: grid;
  gap: 0.6rem;
  padding: 2.4rem;
}

.preview-hex {
  font-size: 2.4rem;
  line-height: 1.2;
}

.preview-rgb {
  font-size: 1.2rem;
  letter-spacing: 0.04em;
}

@media (max-width: 768px) {
  .color-layout {
    grid-template-columns: 1fr;
  }

  .preview {
    min-height: 14rem;
  }
}
</style>
