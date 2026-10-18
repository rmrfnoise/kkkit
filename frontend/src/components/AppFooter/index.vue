<script setup>
import ToolBoxIcon from '@/assets/icons/toolbox.svg'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="brand">
      <span class="icon-box">
        <ToolBoxIcon class="tool-box-icon"/>
      </span>
      <span class="brand-name">咔咔工具箱</span>
    </div>
    <p>省下的时间，留给重要的事。</p>
    <div class="copyright">© {{ currentYear }} 工具箱 All rights reserved</div>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
  margin: 10vh 0 0;
  padding-top: 5vh;
  width: 76vw;
  min-height: 26vh;
  border-top: 1px solid var(--border);

  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);

    /* 与 AppHeader 的 logo 保持同一套视觉：淡绿底容器 + 图标 */
    .icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.6rem;
      height: 3.6rem;
      border-radius: var(--radius);
      background-color: var(--primary-bg);
    }

    .tool-box-icon {
      width: 2.4rem;
      height: 2.4rem;
    }

    .brand-name {
      font-size: 1.6rem;
    }
  }

  & > p {
    margin-top: 3rem;
    margin-left: 1.8rem;
    font-size: 1.5rem;
    color: var(--text-weak);
  }

  & > .copyright {
    position: absolute;
    bottom: 4vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    color: var(--text-faint);
    font-size: 1.4rem;
    text-align: center;
  }
}
</style>
