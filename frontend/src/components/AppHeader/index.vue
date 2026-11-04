<script setup>
import ToolBoxIcon from '@/assets/icons/toolbox.svg'
import {TOOL_COUNT} from '@/data/tools.js'
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand" aria-label="咔咔工具箱，回到首页">
        <span class="brand-mark">
          <ToolBoxIcon class="brand-icon"/>
        </span>
        <span class="brand-name">咔咔工具箱</span>
        <span class="brand-tag mono" aria-hidden="true">[ kkkit ]</span>
      </RouterLink>

      <nav class="header-nav" aria-label="全站">
        <RouterLink to="/#tools" class="nav-link">
          <span>工具目录</span>
          <span class="nav-count mono">{{ TOOL_COUNT }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: var(--panel);
  border-bottom: 1px solid var(--rule);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  height: 100%;
  user-select: none;
}

/* 图标是 iconfont 风格（内部写死 fill），无法用 color 着色，
   用淡绿底容器衬托 */
.brand-mark {
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: var(--radius);
  background-color: var(--primary-bg);
  transition: background-color var(--duration) var(--ease);
}

.brand-icon {
  width: 2.6rem;
  height: 2.6rem;
}

.brand:hover .brand-mark {
  background-color: var(--primary-bg-strong);
}

.brand-name {
  font-family: var(--font-display);
  font-size: 2.1rem;
  letter-spacing: 0.04em;
}

.brand-tag {
  align-self: flex-end;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: var(--text-faint);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--radius);
  font-size: 1.4rem;
  color: var(--text-weak);
  transition: color var(--duration) var(--ease), background-color var(--duration) var(--ease);
}

.nav-link:hover {
  color: var(--primary);
  background-color: var(--primary-bg);
}

.nav-count {
  padding: 0.1rem 0.5rem;
  border: 1px solid var(--rule);
  border-radius: var(--radius-sm);
  font-size: 1.1rem;
  color: var(--text-faint);
}

@media (max-width: 768px) {
  .brand-name {
    font-size: 1.9rem;
  }

  .brand-tag {
    display: none;
  }

  .brand-mark {
    width: 3.4rem;
    height: 3.4rem;
  }

  .brand-icon {
    width: 2.2rem;
    height: 2.2rem;
  }
}
</style>
