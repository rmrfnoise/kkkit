<script setup>
import VoiceIcon from './assets/voice.svg'
import {onMounted, useTemplateRef} from 'vue'

onMounted(() => {
  content.value.style.width = voiceDuration <= 3 ? '6rem' : 6 + voiceDuration * 0.15 + 'rem'
})

const emit = defineEmits(['remove'])
const {voiceDuration} = defineProps(['voiceDuration', 'isSelf', 'selectedUrl', 'chatName', 'isGroupChat'])
const content = useTemplateRef('content')
</script>


<template>
  <div>
    <div v-if="isSelf" class="voice-chat-right">
      <el-button link type="danger" class="delete-btn" style="left: 0" @click="emit('remove')">删除</el-button>
      <span class="content" ref="content">
      {{ voiceDuration }}<span style="transform: translateX(-30%) rotateY(60deg); margin-right: 0.1rem">"</span>
      <VoiceIcon/>
    </span>
      <el-avatar shape="square" :size="30" :src="selectedUrl"/>
    </div>
    <div v-else class="voice-chat-left">
      <el-button link type="danger" class="delete-btn" style="right: 0" @click="emit('remove')">删除</el-button>
      <el-avatar shape="square" :size="30" :src="selectedUrl"/>
      <div class="chat-message">
        <div v-if="isGroupChat" class="chat-name">{{ chatName }}</div>
        <span class="content" ref="content">
        <VoiceIcon style="transform: rotateZ(180deg); margin-right: 0.2rem"/>
        {{ voiceDuration }}<span style="transform: translateX(-30%) rotateY(60deg)">"</span>
      </span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.voice-chat-right, .voice-chat-left {
  position: relative;
  display: flex;
  padding: 3% 2%;
  line-height: 1.3;

  .content {
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

.voice-chat-right {
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

.voice-chat-left {
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