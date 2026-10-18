<script setup>
import ToolList from './components/ToolList/index.vue'
import AppFooter from '@/components/AppFooter/index.vue'
</script>


<template>
  <div class="home-intro">
    <p class="prompt">$ kkkit --about</p>
    <h1>在线工具平台</h1>
    <h1>让工作更简单</h1>
    <p class="desc">提供丰富实用的在线工具，快速解决工作、学习和生活中的各种需求。</p>
  </div>
  <el-divider/>
  <ToolList class="tool-list"/>
  <AppFooter/>
</template>


<style scoped>
.home-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-2);
  margin: 5vh 0;
  padding: var(--space-6) var(--space-4);
  height: 30vh;
  border-radius: var(--radius-lg);
  background-color: var(--panel);
  border: 1px solid var(--border);
  /* 极淡网格：终端/终端机质感，透明度压到 0.05 以下避免干扰阅读 */
  background-image:
      linear-gradient(rgba(4, 120, 87, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(4, 120, 87, 0.05) 1px, transparent 1px);
  background-size: 2rem 2rem;

  .prompt {
    margin: 0 0 var(--space-2);
    font-family: var(--font-mono);
    font-size: 1.4rem;
    color: var(--primary);
  }

  h1 {
    margin: 0;
    font-size: 5rem;
    line-height: 1.15;
    letter-spacing: 0.02em;
  }

  .desc {
    margin: var(--space-3) 0 0;
    font-size: 1.6rem;
    color: var(--text-weak);
  }
}

.tool-list {
  margin-top: 10vh;
}

@media (max-width: 768px) {
  .home-intro {
    height: auto;
    text-align: center;
    margin-bottom: 0;
    padding: var(--space-5) var(--space-3);

    h1 {
      font-size: 3.6rem;
    }
  }

  .tool-list {
    margin-top: 7vh;
  }
}
</style>
