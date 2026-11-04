<script setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import AppHeader from '@/components/AppHeader/index.vue'
import AppFooter from '@/components/AppFooter/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const route = useRoute()
// 用 path 作为 key，让每页切换时走一次克制的入场动效
const pageKey = computed(() => route.path)
</script>


<template>
  <el-config-provider :locale="zhCn">
    <a class="skip-link" href="#main">跳到主要内容</a>
    <AppHeader/>
    <main id="main" class="site-main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="pageKey"/>
        </transition>
      </router-view>
    </main>
    <AppFooter/>
  </el-config-provider>
</template>


<style scoped>
.site-main {
  min-height: 60vh;
}

.skip-link {
  position: fixed;
  top: 1.2rem;
  left: 1.6rem;
  z-index: 100;
  padding: 1rem 1.6rem;
  background-color: var(--panel);
  border: 1px solid var(--primary);
  border-radius: var(--radius);
  color: var(--primary);
  font-size: 1.4rem;
  transform: translateY(-200%);
  transition: transform 0.16s var(--ease);
}

.skip-link:focus-visible {
  transform: none;
}
</style>
