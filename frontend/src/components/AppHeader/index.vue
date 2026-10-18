<script setup>
import ToolBoxIcon from '@/assets/icons/toolbox.svg'
import {useRouter} from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>


<template>
  <header>
    <div class="brand" role="button" tabindex="0" @click="goHome" @keydown.enter="goHome">
      <span class="icon-box">
        <ToolBoxIcon class="toolBoxIcon"/>
      </span>
      <span class="brand-name">咔咔工具箱</span>
      <span class="brand-tag">[ kkkit ]</span>
    </div>
  </header>
</template>


<style scoped>
header {
  display: flex;
  align-items: center;
  padding: 0 var(--page-padding);
  height: var(--header-height);
  background-color: var(--panel);
  border-bottom: 1px solid var(--border);

  .brand {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: 100%;
    cursor: pointer;
    user-select: none;

    /* 图标为 iconfont 风格（内部写死 fill），无法用 color 着色，
       改用淡绿底容器衬托，hover 时底色加深 */
    .icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      border-radius: var(--radius);
      background-color: var(--primary-bg);
      transition: background-color var(--duration) var(--ease);
    }

    .toolBoxIcon {
      width: 2.6rem;
      height: 2.6rem;
    }

    .brand-name {
      font-size: 2.2rem;
      letter-spacing: 0.05em;
    }

    .brand-tag {
      font-family: var(--font-mono);
      font-size: 1.2rem;
      color: var(--text-faint);
      transform: translateY(0.2rem);
    }

    &:hover .icon-box {
      background-color: var(--primary-bg-strong);
    }
  }
}

@media (max-width: 768px) {
  header {
    .brand {
      .brand-name {
        font-size: 1.9rem;
      }

      .brand-tag {
        display: none;
      }
    }
  }
}
</style>
