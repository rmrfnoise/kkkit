<script setup>
import {ref} from 'vue'
import {encode, decode} from 'js-base64'
import {isBase64} from '@/utils/string.js'
import CodecLayout from '@/components/CodecLayout/index.vue'

const inputText = ref('')
const outputText = ref('')

function base64Encode() {
  outputText.value = encode(inputText.value)
}

function base64Decode() {
  if (!isBase64(inputText.value)) {
    ElMessage.error('无效的 Base64 编码格式')
    return
  }
  outputText.value = decode(inputText.value)
}

const actions = [
    {label: '编码', handler: base64Encode},
    {label: '解码', handler: base64Decode}
]
</script>


<template>
  <CodecLayout v-model:input-text="inputText"
               v-model:output-text="outputText"
               :actions="actions"
  />
</template>