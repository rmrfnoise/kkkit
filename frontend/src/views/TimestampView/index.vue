<script setup>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue'
import {ElMessage} from 'element-plus'
import {CopyDocument} from '@element-plus/icons-vue'
import {isTimestamp} from '@/utils/string.js'

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
// 顺带去掉了原先读取 n-time 内部属性 renderedTime 的隐式耦合。
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
  ElMessage.success('复制成功！')
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

// Element Plus 的 el-input 没有 Naive 的 allow-input，改为在输入时过滤非数字字符
function onTimestampInput(value) {
  const cleaned = String(value ?? '').replace(/\D/g, '')
  if (cleaned !== value) ElMessage.warning('仅支持输入数字，请勿输入其他字符')
  inputTimestamp.value = cleaned
}

const inputTimestamp = ref('')
const outputDateTime = ref(null)
const inputDateTime = ref(1767196800000)
const milliseconds = ref(0)

// value-format="x" 返回的是时间戳字符串，参与加法前必须转成数字，否则会变成字符串拼接
const outputTimestamp = computed(() => Number(inputDateTime.value ?? 0) + Number(milliseconds.value ?? 0))

function formatTimestampToDatetime() {
  let timestamp = inputTimestamp.value
  if (!isTimestamp(timestamp)) {
    ElMessage.warning('仅支持输入10位秒级或13位毫秒级时间戳')
    return
  }
  if (timestamp.length === 10) timestamp += '000'
  const milliseconds = timestamp.slice(-3)
  timestamp = Number(timestamp)
  outputDateTime.value = new Date(timestamp).toLocaleString().replaceAll('/', '-').concat(' ' + milliseconds)
}

const size = window.innerWidth < 768 ? 'small' : 'large'
</script>

<template>
  <div class="timestamp-statistics">
    <div>
      <el-statistic title="当前时间" :value="currentTimeText">
        <template #suffix>
          <el-tooltip content="复制" placement="top">
            <el-button link @click="copyCurrentTime">
              <el-icon>
                <CopyDocument/>
              </el-icon>
            </el-button>
          </el-tooltip>
        </template>
      </el-statistic>
    </div>
    <div>
      <el-statistic title="当前时间戳（毫秒）" :value="currentTimestampMilliseconds" group-separator="">
        <template #suffix>
          <el-tooltip content="复制" placement="top">
            <el-button link @click="copyCurrentTimestampMilliseconds">
              <el-icon>
                <CopyDocument/>
              </el-icon>
            </el-button>
          </el-tooltip>
        </template>
      </el-statistic>
    </div>
    <div>
      <el-statistic title="当前时间戳（秒）" :value="currentTimestampSeconds" group-separator="">
        <template #suffix>
          <el-tooltip content="复制" placement="top">
            <el-button link @click="copyCurrentTimestampSeconds">
              <el-icon>
                <CopyDocument/>
              </el-icon>
            </el-button>
          </el-tooltip>
        </template>
      </el-statistic>
    </div>
  </div>
  <el-tabs>
    <el-tab-pane label="时间戳转日期时间">
      <el-input v-model="inputTimestamp" placeholder="支持输入10位秒级或13位毫秒级时间戳" :size="size"
                @input="onTimestampInput">
        <template #prepend>
          <el-button type="primary" plain :size="size" @click="formatTimestampToDatetime">转换</el-button>
        </template>
      </el-input>
      <span class="output-datetime">{{ outputDateTime }}</span>
      <el-tooltip content="复制" placement="top">
        <el-button link v-show="outputDateTime" @click="copyOutputDatetime">
          <el-icon>
            <CopyDocument/>
          </el-icon>
        </el-button>
      </el-tooltip>
    </el-tab-pane>
    <el-tab-pane label="日期时间转时间戳">
      <div class="datetime-input-group">
        <el-date-picker v-model="inputDateTime" type="datetime" clearable value-format="x"
                        placeholder="选择日期时间" :size="size"/>
        <div class="milliseconds-input">
          <el-input-number v-model="milliseconds" :min="0" :max="999" :size="size" controls-position="right"/>
          <span class="milliseconds-suffix">ms</span>
        </div>
      </div>
      <div class="output-timestamp">
        <el-tag type="success">{{ outputTimestamp }}</el-tag>
        <el-tooltip content="复制" placement="top">
          <el-button link @click="copyOutputTimestamp">
            <el-icon>
              <CopyDocument/>
            </el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.timestamp-statistics {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 5rem 0;
  text-align: center;
}

/* Element Plus 没有 <n-gradient-text>，用背景裁剪模拟渐变文字。
   配色走主题 token（主色终端绿 → 辅助青），不再用偏离主题的红色 */
.output-datetime {
  display: inline-block;
  margin-top: 2rem;
  margin-right: 1rem;
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.datetime-input-group {
  display: flex;
  align-items: center;
}

.milliseconds-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
}

.milliseconds-suffix {
  color: var(--text-faint);
}

.output-timestamp {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: 2rem;

  /* EP tag 默认 12px 字 + 24px 固定高，直接放大字号会被裁切，
     height 必须一起设为 auto，padding 适当放大保持比例 */
  .el-tag {
    font-size: 1.6rem;
    height: auto;
    padding: 0.5rem 1.2rem;
  }
}

@media (max-width: 768px) {
  .timestamp-statistics {
    grid-template-columns: 1fr;
    text-align: left;
  }
}
</style>
