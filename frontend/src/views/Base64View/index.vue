<script setup>
import {ref} from 'vue'
import {encode, decode} from 'js-base64'
import {isBase64} from '@/utils/string.js'
import CodecLayout from '@/components/CodecLayout/index.vue'
import ToolPage from '@/components/ToolPage/index.vue'

const inputText = ref('')
const outputText = ref('')

function base64Encode() {
  if (!inputText.value) {
    ElMessage.warning('先输入要编码的内容')
    return
  }
  outputText.value = encode(inputText.value)
}

function base64Decode() {
  if (!isBase64(inputText.value)) {
    ElMessage.error('这不像是有效的 Base64，检查一下结尾的 = 和长度')
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
  <ToolPage narrow>
    <CodecLayout v-model:input-text="inputText"
                 v-model:output-text="outputText"
                 :actions="actions"
    />
  </ToolPage>
</template>
