<script setup>
const emit = defineEmits(['remove'])
defineProps(['text', 'isSelf', 'selectedUrl', 'chatName', 'isGroupChat'])
</script>


<template>
  <div>
    <div v-if="isSelf" class="text-chat-right">
      <el-button link type="danger" class="delete-btn" style="left: 0" @click="emit('remove')">删除</el-button>
      <span class="text">{{ text }}</span>
      <el-avatar shape="square" :size="30" :src="selectedUrl"/>
    </div>
    <div v-else class="text-chat-left">
      <el-button link type="danger" class="delete-btn" style="right: 0" @click="emit('remove')">删除</el-button>
      <el-avatar shape="square" :size="30" :src="selectedUrl"/>
      <div class="chat-message">
        <div v-if="isGroupChat" class="chat-name">{{ chatName }}</div>
        <span class="text">{{ text }}</span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.text-chat-right, .text-chat-left {
  position: relative;
  display: flex;
  padding: 3% 2%;
  line-height: 1.3;

  .text {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.6rem;
    border-radius: 0.3rem;
    font-size: 1.3rem;

    &::after {
      content: '';
      position: absolute;
      top: 1.2rem;
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  &:hover {
    background-color: var(--border);
  }

  .delete-btn {
    opacity: 0;
    position: absolute;
    top: 0;
    font: 1.3rem AlimamaShuHeiTi;
  }

  &:hover .delete-btn {
    opacity: 1;
  }
}

.text-chat-right {
  justify-content: right;

  .text {
    margin-right: 0.7rem;
    max-width: 73%;
    background-color: #95ec69;

    &::after {
      right: 0;
      background-color: #95ec69;
      transform: translateX(50%) rotateZ(45deg);
    }
  }
}

.text-chat-left {
  .chat-message {
    max-width: 75%;

    .chat-name {
      margin-left: 0.7rem;
      margin-bottom: 0.1rem;
      font-size: 0.9rem;
      color: var(--text-weak);
    }

    .text {
      margin-left: 0.7rem;
      background-color: #fff;

      &::after {
        left: 0;
        background-color: #fff;
        transform: translateX(-50%) rotateZ(45deg);
      }
    }
  }
}
</style>