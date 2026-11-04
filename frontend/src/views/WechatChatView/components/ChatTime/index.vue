<script setup>
const emit = defineEmits(['remove'])
defineProps(['chatTime'])
</script>


<template>
  <div class="container">
    <el-button link type="danger" class="delete-btn" @click="emit('remove')">删除</el-button>
    {{ chatTime }}
  </div>
</template>


<style scoped>
.container {
  position: relative;
  text-align: center;
  color: #828282;
  font-size: 1.1rem;
  line-height: 3.3;

  &:hover {
    background-color: var(--border);
  }

  &:hover > .delete-btn {
    opacity: 1;
  }

  & > .delete-btn {
    opacity: 0;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font: 1.3rem AlimamaShuHeiTi;
  }
}
</style>