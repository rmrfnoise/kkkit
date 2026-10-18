<script setup>
import {ref} from 'vue'
import CodecLayout from '@/components/CodecLayout/index.vue'

const inputText = ref('')
const outputText = ref('')

function toChinese() {
  try {
    outputText.value = JSON.parse(`"${inputText.value}"`)
  } catch {
    // 与 UrlView 保持一致：解析失败时清空结果，避免残留上一次的输出
    outputText.value = ''
    ElMessage.error('无效的 Unicode 编码格式')
  }
}

const actions = [{label: '转中文', handler: toChinese}]
</script>


<template>
  <CodecLayout v-model:input-text="inputText"
               v-model:output-text="outputText"
               :actions="actions"
  />
</template>