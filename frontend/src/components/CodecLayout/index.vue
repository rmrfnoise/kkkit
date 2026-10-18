<script setup>
// 编解码类工具的公共布局：操作按钮 → 输入区 → 只读结果区
// Base64 / URL / Unicode 三个页面的模板与样式原本几乎逐字重复，统一收敛到这里；
// 新增同类工具只需传入 actions，不必再复制一套 textarea + 按钮模板。
const inputText = defineModel('inputText', {type: String, default: ''})
const outputText = defineModel('outputText', {type: String, default: ''})

defineProps({
    // 操作按钮：[{label: '编码', handler: () => {}}, ...]
    // 按钮在一行内等分容器宽度，故由数量自动决定各自宽度
    actions: {type: Array, required: true}
})
</script>


<template>
  <div class="codec-actions">
    <el-button v-for="action in actions"
               :key="action.label"
               type="primary"
               class="codec-btn"
               @click="action.handler()"
    >
      {{ action.label }}
    </el-button>
  </div>
  <el-input v-model="inputText"
            :rows="10"
            type="textarea"
            placeholder="请输入"
            class="codec-input"
  />
  <el-input v-model="outputText"
            :rows="10"
            type="textarea"
            placeholder="结果"
            class="codec-output"
            disabled
  />
</template>


<style scoped>
.codec-actions {
  display: flex;
  align-items: center; /* el-button 有固定高度，显式居中避免基线错位 */
  width: 50%;
  margin: 3rem 0;
}

.codec-btn {
  flex: 1;
  font-size: 1.6rem;
}

.codec-input, .codec-output {
  margin-bottom: 3rem;
  font-size: 1.6rem;
}

@media (max-width: 768px) {
  .codec-actions {
    width: 80%;
  }
}
</style>
