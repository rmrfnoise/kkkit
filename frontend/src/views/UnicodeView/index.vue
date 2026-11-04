<script setup>
import {ref} from 'vue'
import CodecLayout from '@/components/CodecLayout/index.vue'
import ToolPage from '@/components/ToolPage/index.vue'

const inputText = ref('')
const outputText = ref('')

function toChinese() {
  if (!inputText.value) {
    ElMessage.warning('先输入 Unicode 转义，例如 \\u4f60\\u597d')
    return
  }
  try {
    outputText.value = JSON.parse(`"${inputText.value}"`)
  } catch {
    // 解析失败时清空结果，避免残留上一次的输出
    outputText.value = ''
    ElMessage.error('转义格式不对：\\u 后面要跟四位十六进制')
  }
}

const actions = [{label: '转中文', handler: toChinese}]
</script>


<template>
  <ToolPage narrow>
    <CodecLayout v-model:input-text="inputText"
                 v-model:output-text="outputText"
                 :actions="actions"
    />
  </ToolPage>
</template>
