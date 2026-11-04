<script setup>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue'
import {ElMessage} from 'element-plus'
import {CopyDocument} from '@element-plus/icons-vue'
import {isTimestamp} from '@/utils/string.js'
import ToolPage from '@/components/ToolPage/index.vue'

const currentTimestampMilliseconds = ref(Date.now())
const currentTimestampSeconds = computed(() => Math.floor(currentTimestampMilliseconds.value / 1000))

function updateCurrentTimestampMilliseconds() {
  currentTimestampMilliseconds.value = Date.now()
}

let timerId

onMounted(() => {
  timerId = setInterval(() => {
    updateCurrentTimestampMilliseconds()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timerId)
})

function padZero(n) {
  return String(n).padStart(2, '0')
}

// Element Plus 没有 <n-time> 的对等组件，改为自行格式化。
const currentTimeText = computed(() => {
  const d = new Date(currentTimestampMilliseconds.value)
  const date = `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`
  const time = `${padZero(d.getHours())}:${padZero(d.getMinutes())}:${padZero(d.getSeconds())}`
  return `${date} ${time}`
})

function copy(content) {
  if (window.isSecureContext && !!navigator.clipboard) {
    navigator.clipboard.writeText(String(content))
  } else {
    const tempTextArea = document.createElement('textarea')
    tempTextArea.value = content
    document.body.appendChild(tempTextArea)
    tempTextArea.focus()
    tempTextArea.select()
    // noinspection JSDeprecatedSymbols
    document.execCommand('copy')
    document.body.removeChild(tempTextArea)
  }
  ElMessage.success('已复制')
}

function copyCurrentTime() {
  copy(currentTimeText.value)
}

function copyCurrentTimestampMilliseconds() {
  copy(currentTimestampMilliseconds.value)
}

function copyCurrentTimestampSeconds() {
  copy(currentTimestampSeconds.value)
}

function copyOutputDatetime() {
  copy(outputDateTime.value)
}

function copyOutputTimestamp() {
  copy(outputTimestamp.value)
}

// el-input 没有 allow-input，改为在输入时过滤非数字字符
function onTimestampInput(value) {
  const cleaned = String(value ?? '').replace(/\D/g, '')
  if (cleaned !== value) ElMessage.warning('这里只能填数字')
  inputTimestamp.value = cleaned
}

const activeTab = ref('to-date')
const inputTimestamp = ref('')
const outputDateTime = ref(null)
const inputDateTime = ref(1767196800000)
const milliseconds = ref(0)

// value-format="x" 返回的是时间戳字符串，参与加法前必须转成数字，否则会变成字符串拼接
const outputTimestamp = computed(() => Number(inputDateTime.value ?? 0) + Number(milliseconds.value ?? 0))

function formatTimestampToDatetime() {
  let timestamp = inputTimestamp.value
  if (!isTimestamp(timestamp)) {
    ElMessage.warning('时间戳要么 10 位（秒），要么 13 位（毫秒）')
    return
  }
  if (timestamp.length === 10) timestamp += '000'
  const trailingMilliseconds = timestamp.slice(-3)
  timestamp = Number(timestamp)
  outputDateTime.value = new Date(timestamp).toLocaleString().replaceAll('/', '-').concat(' ' + trailingMilliseconds)
}
</script>


<template>
  <ToolPage narrow>
    <section class="panel readout-panel">
      <div class="readout">
        <div class="readout-item">
          <span class="readout-label mono">当前时间</span>
          <div class="readout-line">
            <span class="readout-value mono">{{ currentTimeText }}</span>
            <button type="button" class="icon-btn" aria-label="复制当前时间" @click="copyCurrentTime">
              <el-icon><CopyDocument/></el-icon>
            </button>
          </div>
        </div>

        <div class="readout-item">
          <span class="readout-label mono">毫秒时间戳</span>
          <div class="readout-line">
            <span class="readout-value mono">{{ currentTimestampMilliseconds }}</span>
            <button type="button" class="icon-btn" aria-label="复制毫秒时间戳" @click="copyCurrentTimestampMilliseconds">
              <el-icon><CopyDocument/></el-icon>
            </button>
          </div>
        </div>

        <div class="readout-item">
          <span class="readout-label mono">秒时间戳</span>
          <div class="readout-line">
            <span class="readout-value mono">{{ currentTimestampSeconds }}</span>
            <button type="button" class="icon-btn" aria-label="复制秒时间戳" @click="copyCurrentTimestampSeconds">
              <el-icon><CopyDocument/></el-icon>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="panel converter">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="时间戳转日期" name="to-date">
          <div class="ts-form">
            <el-input
                v-model="inputTimestamp"
                placeholder="10 位秒级，或 13 位毫秒级"
                aria-label="时间戳"
                @input="onTimestampInput"
                @keyup.enter="formatTimestampToDatetime"
            />
            <el-button type="primary" @click="formatTimestampToDatetime">转换</el-button>
          </div>

          <div v-if="outputDateTime" class="ts-result">
            <span class="ts-value mono">{{ outputDateTime }}</span>
            <button type="button" class="icon-btn" aria-label="复制结果" @click="copyOutputDatetime">
              <el-icon><CopyDocument/></el-icon>
            </button>
          </div>
          <p v-else class="ts-empty">转换结果会显示在这里</p>
        </el-tab-pane>

        <el-tab-pane label="日期转时间戳" name="to-ts">
          <div class="ts-form">
            <el-date-picker
                v-model="inputDateTime"
                type="datetime"
                clearable
                value-format="x"
                placeholder="选择日期时间"
            />
            <div class="ms-field">
              <el-input-number v-model="milliseconds" :min="0" :max="999" controls-position="right"/>
              <span class="mono ms-unit">ms</span>
            </div>
          </div>

          <div class="ts-result">
            <span class="ts-value mono">{{ outputTimestamp }}</span>
            <button type="button" class="icon-btn" aria-label="复制结果" @click="copyOutputTimestamp">
              <el-icon><CopyDocument/></el-icon>
            </button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </ToolPage>
</template>


<style scoped>
.readout {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
}

.readout-item {
  display: grid;
  gap: 0.8rem;
  padding: 2.4rem;
  min-width: 0;
}

.readout-item + .readout-item {
  border-left: 1px solid var(--rule);
}

.readout-label {
  font-size: 1.2rem;
  letter-spacing: 0.12em;
  color: var(--text-faint);
}

.readout-line {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 0;
}

.readout-value {
  font-size: 1.8rem;
  line-height: 1.35;
  color: var(--text);
  white-space: nowrap;
}

.converter {
  margin-top: 1.6rem;
}

.converter :deep(.el-tabs__header) {
  margin: 0;
  padding: 0 2.4rem;
}

.converter :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: var(--rule);
}

.converter :deep(.el-tabs__content) {
  padding: 2.4rem;
}

.ts-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;
}

.ts-form .el-input {
  flex: 1;
  min-width: 24rem;
}

.ms-field {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.ms-unit {
  font-size: 1.3rem;
  color: var(--text-faint);
}

.ts-result {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 2rem;
  padding: 1.6rem 2rem;
  border: 1px solid var(--rule);
  border-radius: var(--radius-sm);
  background-color: var(--primary-bg);
}

.ts-value {
  font-size: 2rem;
  line-height: 1.4;
  color: var(--primary);
  overflow-wrap: anywhere;
}

.ts-empty {
  margin-top: 2rem;
  padding: 1.6rem 2rem;
  border: 1px dashed var(--rule-strong);
  border-radius: var(--radius-sm);
  font-size: 1.3rem;
  color: var(--text-faint);
}

@media (max-width: 768px) {
  .readout {
    grid-template-columns: 1fr;
  }

  .readout-value {
    font-size: 1.6rem;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .readout-item {
    padding: 1.8rem 2rem;
  }

  .readout-item + .readout-item {
    border-left: 0;
    border-top: 1px solid var(--rule);
  }

  .converter :deep(.el-tabs__header) {
    padding: 0 2rem;
  }

  .converter :deep(.el-tabs__content) {
    padding: 2rem;
  }

  .ts-form {
    flex-direction: column;
    align-items: stretch;
  }

  .ts-form .el-input {
    min-width: 0;
  }

  .ms-field {
    justify-content: space-between;
  }
}
</style>
