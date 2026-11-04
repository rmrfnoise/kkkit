<script setup>
import ToolBoxIcon from '@/assets/icons/toolbox.svg'
import {TOOL_COUNT, TOOLS} from '@/data/tools.js'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand-row">
            <span class="brand-mark">
              <ToolBoxIcon class="brand-icon"/>
            </span>
            <span class="brand-name">咔咔工具箱</span>
          </div>
          <p class="tagline">省下的时间，留给重要的事。</p>
        </div>

        <nav class="footer-links" aria-labelledby="footer-links-title">
          <h2 id="footer-links-title">全部工具</h2>
          <ul>
            <li v-for="tool in TOOLS" :key="tool.id">
              <RouterLink :to="tool.path">{{ tool.title }}</RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="footer-bottom">
        <span>© {{ currentYear }} 咔咔工具箱</span>
        <span class="mono">{{ TOOL_COUNT }} 个工具 · 全部在浏览器本地完成</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 5.6rem 0 3.2rem;
  background-color: var(--panel);
  border-top: 1px solid var(--rule);
}

.footer-top {
  display: grid;
  grid-template-columns: minmax(24rem, 1fr) 2fr;
  gap: 6.4rem;
}

.brand-row {
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: var(--radius);
  background-color: var(--primary-bg);
}

.brand-icon {
  width: 2.4rem;
  height: 2.4rem;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 1.9rem;
  letter-spacing: 0.04em;
}

.tagline {
  margin-top: 1.6rem;
  font-size: 1.4rem;
  line-height: 1.7;
  color: var(--text-faint);
}

.footer-links h2 {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: var(--text-faint);
}

.footer-links ul {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem 1.6rem;
  margin: 1.6rem 0 0;
  padding: 0;
  list-style: none;
}

.footer-links a {
  display: inline-block;
  padding: 0.3rem 0;
  font-size: 1.4rem;
  color: var(--text-weak);
  transition: color var(--duration) var(--ease);
}

.footer-links a:hover {
  color: var(--primary);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  margin-top: 5.6rem;
  padding-top: 2.4rem;
  border-top: 1px solid var(--rule);
  font-size: 1.3rem;
  color: var(--text-faint);
}

@media (max-width: 900px) {
  .site-footer {
    padding: 4.8rem 0 2.4rem;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .footer-links ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.4rem 1.6rem;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    margin-top: 4rem;
  }
}
</style>
