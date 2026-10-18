<script setup>
import {shallowRef, onMounted} from 'vue'
import {useRouter} from 'vue-router'

const props = defineProps(['icon', 'title', 'path'])
const currentIcon = shallowRef(null)

onMounted(async () => {
  const module = await import(`./assets/${props.icon}.svg`)
  currentIcon.value = module.default
})

const router = useRouter()

function open() {
  router.push(props.path)
}
</script>


<template>
  <div class="container" role="button" tabindex="0" @click="open" @keydown.enter="open"
       @keydown.space.prevent="open">
    <span class="icon-box">
      <component :is="currentIcon" class="icon"/>
    </span>
    <h3>{{ title }}</h3>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-3);
  height: 13rem;
  background-color: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-1);
  cursor: pointer;
  transition: transform var(--duration) var(--ease),
  box-shadow var(--duration) var(--ease),
  border-color var(--duration) var(--ease);

  /* 图标为 iconfont 风格（内部写死 fill），无法用 color 着色，
     改用淡绿底容器衬托 */
  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5.6rem;
    height: 5.6rem;
    border-radius: var(--radius);
    background-color: var(--primary-bg);
    transition: background-color var(--duration) var(--ease);
  }

  .icon {
    width: 3.2rem;
    height: 3.2rem;
  }

  h3 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 400;
    color: var(--text);
  }

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-border);
    box-shadow: var(--shadow-3);

    .icon-box {
      background-color: var(--primary-bg-strong);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-1);
  }
}
</style>
