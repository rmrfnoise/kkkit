<script setup>
// 工具图标：按名字从 src/assets/icons/tools 下取 SVG 组件。
// 用 import.meta.glob 一次性登记，避免动态拼路径导致构建时漏打包。
import {computed} from 'vue'

const props = defineProps({
  name: {type: String, required: true}
})

const modules = import.meta.glob('../../assets/icons/tools/*.svg', {eager: true})

const iconMap = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => [
    path.split('/').pop().replace('.svg', ''),
    module.default
  ])
)

const icon = computed(() => iconMap[props.name] ?? null)
</script>

<template>
  <component :is="icon" v-if="icon" class="tool-icon" aria-hidden="true"/>
</template>

<style scoped>
.tool-icon {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
