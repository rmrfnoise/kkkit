<script setup>
import {total, nicknames} from '@/data/nicknames.json'
import {ref} from 'vue'
import ToolPage from '@/components/ToolPage/index.vue'

const nicknameTags = ref([])
let nextNicknameId = 0

function getNickname() {
  const nickname = nicknames[Math.floor(Math.random() * total)]
  nicknameTags.value.unshift({id: nextNicknameId++, nickname})
}

function handleClose(id) {
  nicknameTags.value = nicknameTags.value.filter(nicknameTag => nicknameTag.id !== id)
}
</script>

<template>
  <ToolPage narrow>
    <section class="panel">
      <header class="panel-head">
        <span class="panel-title">随机昵称</span>
        <span class="panel-title">共 {{ total }} 个</span>
      </header>

      <div class="panel-body nickname-body">
        <div class="nickname-actions">
          <el-button type="primary" size="large" @click="getNickname">来一个昵称</el-button>
          <span class="hint">抽到满意为止，关掉的不会回来。</span>
        </div>

        <div v-if="nicknameTags.length" class="nickname-list">
          <el-tag
              v-for="(tag, index) in nicknameTags"
              :key="tag.id"
              class="nickname-tag"
              :class="{'is-new': index === 0}"
              closable
              @close="handleClose(tag.id)"
          >
            {{ tag.nickname }}
          </el-tag>
        </div>

        <p v-else class="nickname-empty">还没有抽过。点上面的按钮，第一抽马上出来。</p>
      </div>
    </section>
  </ToolPage>
</template>

<style scoped>
.nickname-body {
  display: grid;
  gap: 2.4rem;
}

.nickname-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
}

.hint {
  font-size: 1.3rem;
  color: var(--text-faint);
}

.nickname-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding-top: 2rem;
  border-top: 1px solid var(--rule);
}

.nickname-tag {
  height: auto;
  padding: 0.6rem 1.2rem;
  border-color: var(--rule);
  background-color: var(--panel-soft);
  font-size: 1.4rem;
  color: var(--text-weak);
}

.nickname-tag.is-new {
  border-color: var(--primary-border);
  background-color: var(--primary-bg);
  color: var(--primary);
}

.nickname-empty {
  padding-top: 2rem;
  border-top: 1px solid var(--rule);
  font-size: 1.4rem;
  color: var(--text-faint);
}
</style>
