<script setup>
import {total, nicknames} from '@/data/nicknames.json'
import {ref} from 'vue'

const nicknameTags = ref([])
// Element Plus 的 tag 类型用 danger，对应 Naive UI 的 error
const types = ['primary', 'info', 'success', 'warning', 'danger']

function getNickname() {
  const nickname = nicknames[Math.floor(Math.random() * total)]
  const type = types[Math.floor(Math.random() * types.length)]
  nicknameTags.value.unshift({nickname, type})
}

function handleClose(nickname) {
  nicknameTags.value = nicknameTags.value.filter(nicknameTag => nicknameTag.nickname !== nickname)
}
</script>

<template>
  <div class="nickname-generator-container">
    <h1>昵称生成器</h1>
    <p>点击按钮，立即获取一个随机昵称！</p>
    <el-button type="primary" size="large" @click="getNickname">一键生成昵称</el-button>
    <el-divider v-show="nicknameTags.length"/>
    <el-tag v-for="nicknameTag in nicknameTags"
            :key="nicknameTag.nickname"
            :type="nicknameTag.type"
            closable
            style="margin: 0.25rem"
            @close="handleClose(nicknameTag.nickname)"
    >
      {{ nicknameTag.nickname }}
    </el-tag>
  </div>
</template>

<style scoped>
.nickname-generator-container {
  margin: 10rem 0;
  text-align: center;

  h1 {
    color: var(--text);
    font-size: 4rem;
  }

  p {
    color: var(--text-weak);
  }
}
</style>