<script setup>
import AudioIcon from './assets/audio.svg'
import VideoIcon from './assets/video.svg'
const emit = defineEmits(['remove'])
defineProps(['callType', 'callStatus', 'callDuration', 'isSelf', 'selectedUrl', 'chatName', 'isGroupChat'])
</script>


<template>
  <div>
    <div v-if="isSelf" class="message-container-right">
      <el-button link type="danger" class="delete-btn" style="left: 0" @click="emit('remove')">删除</el-button>
      <span class="content">
      <span style="margin-right: 0.5rem">{{ callStatus }}</span>
      <span>{{ callDuration }}</span>
      <AudioIcon v-if="callType === '语音通话'" style="margin-left: 0.5rem"/>
      <VideoIcon v-else style="margin-left: 0.5rem; transform: rotateY(180deg)"/>
    </span>
      <el-avatar shape="square" :size="30" :src="selectedUrl"/>
    </div>
    <div v-else class="message-container-left">
      <el-button link type="danger" class="delete-btn" style="right: 0" @click="emit('remove')">删除</el-button>
      <el-avatar shape="square" :size="30" :src="selectedUrl"/>
      <div class="chat-message">
        <div v-if="isGroupChat" class="chat-name">{{ chatName }}</div>
        <span class="content">
        <AudioIcon v-if="callType === '语音通话'" style="margin-right: 0.5rem"/>
        <VideoIcon v-else style="margin-right: 0.5rem"/>
        <span style="margin-right: 0.5rem">{{ callStatus }}</span>
        <span>{{ callDuration }}</span>
      </span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.message-container-right, .message-container-left {
  position: relative;
  display: flex;
  padding: 3% 2%;
  line-height: 1.3;

  .content {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.6rem 0.9rem;
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

.message-container-right {
  justify-content: right;

  .content {
    display: flex;
    justify-content: right;
    margin-right: 0.7rem;
    padding-right: 1rem;
    background-color: #95ec69;

    &::after {
      right: 0;
      background-color: #95ec69;
      transform: translateX(50%) rotateZ(45deg);
    }
  }
}

.message-container-left {
  .chat-message {
    max-width: 75%;

    .chat-name {
      margin-left: 0.7rem;
      margin-bottom: 0.1rem;
      font-size: 0.9rem;
      color: var(--text-weak);
    }

    .content {
      margin-left: 0.7rem;
      padding-left: 1rem;
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