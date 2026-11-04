<script setup>
import {ref} from 'vue'
import CodecLayout from '@/components/CodecLayout/index.vue'
import ToolPage from '@/components/ToolPage/index.vue'

const inputText = ref('')
const outputText = ref('')

function urlEncode() {
  if (!inputText.value) {
    ElMessage.warning('先输入要编码的内容')
    return
  }
  outputText.value = Array.from(new TextEncoder().encode(inputText.value))
    .map(byte => '%' + byte.toString(16).padStart(2, '0').toUpperCase())
    .join('')
}

function urlDecode() {
  if (!inputText.value) {
    ElMessage.warning('先输入要解码的内容')
    return
  }
  try {
    outputText.value = decodeURIComponent(inputText.value)
  } catch {
    outputText.value = ''
    ElMessage.error('编码不完整：检查 % 后面是否少了两位十六进制')
  }
}

const actions = [
  {label: '编码', handler: urlEncode},
  {label: '解码', handler: urlDecode}
]
</script>


<template>
  <ToolPage narrow>
    <CodecLayout v-model:input-text="inputText"
                 v-model:output-text="outputText"
                 :actions="actions"
    />
  </ToolPage>
</template>
