<script setup>
import {ref} from 'vue'
import {isHexColor} from '@/utils/string.js'

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
    ElMessage.error('无效的 HEX 颜色')
    return
  }
  hex.value = color.toUpperCase()
  r.value = parseInt(color.substring(1, 3), 16)
  g.value = parseInt(color.substring(3, 5), 16)
  b.value = parseInt(color.substring(5, 7), 16)
}

function toHexColor() {
  if (!isIntegerIn0To255(r.value) || !isIntegerIn0To255(g.value) || !isIntegerIn0To255(b.value)) {
    ElMessage.error('无效的 RGB 颜色')
    return
  }
  const R = parseInt(r.value)
  const G = parseInt(g.value)
  const B = parseInt(b.value)
  hex.value = ('#' + R.toString(16).padStart(2, '0')
      + G.toString(16).padStart(2, '0')
      + B.toString(16).padStart(2, '0')).toUpperCase()
}

const hex = ref()
const r = ref()
const g = ref()
const b = ref()
</script>


<template>
  <div class="container">
    <el-button-group>
      <el-button type="primary" @click="toRgbColor">HEX 转 RGB</el-button>
      <el-button type="primary" @click="toHexColor">RGB 转 HEX</el-button>
    </el-button-group>
    <el-input v-model="hex" placeholder="请输入" class="prepend-align">
      <template #prepend>HEX</template>
    </el-input>
    <el-input v-model="r" placeholder="请输入" class="prepend-align">
      <template #prepend>R</template>
    </el-input>
    <el-input v-model="g" placeholder="请输入" class="prepend-align">
      <template #prepend>G</template>
    </el-input>
    <el-input v-model="b" placeholder="请输入" class="prepend-align">
      <template #prepend>B</template>
    </el-input>
  </div>
</template>


<style scoped>
.container {
  display: grid;
  row-gap: 1.5rem;
  align-content: center;
  width: 40vw;
  min-height: 70vh;
  margin: 0 auto;

  button {
    width: 50%;
  }
}

:deep(.prepend-align .el-input-group__prepend) {
  width: 10rem;
}

:deep(.prepend-align:nth-last-child(3) .el-input-group__prepend) {
  background-color: rgba(255, 0, 0, 0.15);
}

:deep(.prepend-align:nth-last-child(2) .el-input-group__prepend) {
  background-color: rgba(0, 255, 0, 0.15);
}

:deep(.prepend-align:nth-last-child(1) .el-input-group__prepend) {
  background-color: rgba(0, 0, 255, 0.15);
}

@media (max-width: 768px) {
  .container {
    width: 80vw;
  }

  :deep(.prepend-align .el-input-group__prepend) {
    width: 50px;
  }
}
</style>