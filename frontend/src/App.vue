<script setup>
import AppHeader from '@/components/AppHeader/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>


<template>
  <el-config-provider :locale="zhCn">
    <AppHeader/>
    <main>
      <router-view/>
    </main>
  </el-config-provider>
</template>


<style scoped>
main {
  padding: 0 var(--page-padding);
}
</style>
