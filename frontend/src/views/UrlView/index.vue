<script setup>
import {ref} from 'vue'
import CodecLayout from '@/components/CodecLayout/index.vue'

const inputText = ref('')
const outputText = ref('')

function urlEncode() {
  outputText.value = Array.from(new TextEncoder().encode(inputText.value))
      .map(byte => {
        const hex = byte.toString(16).padStart(2, '0').toUpperCase()
        return '%' + hex
      })
      .join('')
}

function urlDecode() {
  try {
    outputText.value = decodeURIComponent(inputText.value)
  } catch {
    outputText.value = ''
    ElMessage.error('无效的 URL 编码格式')
  }
}

const actions = [
    {label: '编码', handler: urlEncode},
    {label: '解码', handler: urlDecode}
]
</script>


<template>
  <CodecLayout v-model:input-text="inputText"
               v-model:output-text="outputText"
               :actions="actions"
  />
</template>