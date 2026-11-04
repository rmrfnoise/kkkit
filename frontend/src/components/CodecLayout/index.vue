<script setup>
// 编解码类工具的公共布局：输入 → 操作 → 结果。
// Base64 / URL / Unicode 三个页面共用，新增同类工具只需传 actions。
import {ref} from 'vue'

const inputText = defineModel('inputText', {type: String, default: ''})
const outputText = defineModel('outputText', {type: String, default: ''})

const props = defineProps({
  // 操作按钮：[{label: '编码', handler: () => {}}, ...]
  actions: {type: Array, required: true}
})

const inputRef = ref(null)

function runFirstAction() {
  props.actions[0]?.handler()
}

// 焦点在输入框里按 Ctrl/⌘ + Enter 直接执行第一个动作
function onInputKeydown(event) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault()
    runFirstAction()
  }
}

async function copyOutput() {
  if (!outputText.value) return
  try {
    await navigator.clipboard.writeText(outputText.value)
    ElMessage.success('已复制')
  } catch {
    ElMessage.error('复制失败，请手动选择结果文本')
  }
}

function clearAll() {
  inputText.value = ''
  outputText.value = ''
  inputRef.value?.focus()
}
</script>


<template>
  <div class="codec">
    <section class="panel">
      <header class="panel-head">
        <span class="panel-title">输入</span>
        <div class="pane-tools">
          <button v-if="inputText" type="button" class="text-btn" @click="clearAll">清空</button>
          <span class="key-hint mono" aria-hidden="true">Ctrl + Enter</span>
        </div>
      </header>
      <div class="pane-body">
        <textarea
            ref="inputRef"
            v-model="inputText"
            class="codec-textarea"
            placeholder="把文本贴进来"
            aria-label="输入内容"
            spellcheck="false"
            @keydown="onInputKeydown"
        />
      </div>
    </section>

    <div class="codec-actions">
      <el-button
          v-for="action in actions"
          :key="action.label"
          type="primary"
          @click="action.handler()"
      >
        {{ action.label }}
      </el-button>
    </div>

    <section class="panel result-panel" :class="{'is-empty': !outputText}">
      <header class="panel-head">
        <span class="panel-title">结果</span>
        <button v-if="outputText" type="button" class="text-btn" @click="copyOutput">复制</button>
      </header>
      <div class="pane-body">
        <p v-if="!outputText" class="pane-empty mono">结果会出现在这里</p>
        <textarea
            v-else
            :value="outputText"
            class="codec-textarea"
            aria-label="结果"
            readonly
            spellcheck="false"
        />
      </div>
    </section>
  </div>
</template>


<style scoped>
.codec {
  display: grid;
  gap: 1.6rem;
}

.pane-body {
  padding: 0.6rem;
}

.codec-textarea {
  display: block;
  width: 100%;
  min-height: 18rem;
  padding: 1.4rem;
  border: 0;
  border-radius: var(--radius-sm);
  background-color: transparent;
  font: 1.5rem/1.75 var(--font-mono);
  color: var(--text);
  resize: vertical;
}

.codec-textarea::placeholder {
  color: var(--text-faint);
  font-family: var(--font-sans);
}

.codec-textarea:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

.result-panel .codec-textarea {
  background-color: var(--panel-soft);
  color: var(--text);
}

.codec-actions {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.pane-tools {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}

.text-btn {
  padding: 0.2rem 0;
  border: 0;
  background: none;
  font: 1.4rem var(--font-sans);
  color: var(--primary);
  cursor: pointer;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.4em;
}

.text-btn:hover {
  color: var(--primary-hover);
}

.key-hint {
  font-size: 1.2rem;
  color: var(--text-faint);
}

.is-empty .pane-body {
  display: grid;
  place-items: center;
  min-height: 18rem;
  border: 1px dashed var(--rule-strong);
  border-radius: var(--radius-sm);
  margin: 0.6rem;
}

.pane-empty {
  font-size: 1.3rem;
  color: var(--text-faint);
}

@media (max-width: 768px) {
  .codec-textarea {
    min-height: 14rem;
    font-size: 1.4rem;
  }

  .key-hint {
    display: none;
  }
}
</style>
