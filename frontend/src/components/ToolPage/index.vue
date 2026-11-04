<script setup>
// 工具页外壳：面包屑 → 标题 + 一句说明 → 工作区 → 「接下来」。
// 12 个工具页都套这一层，保证进入工具后知道自己在哪、能去哪。
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import ToolIcon from '@/components/ToolIcon/index.vue'
import {findToolByPath, relatedTools} from '@/data/tools.js'

defineProps({
  // 对话/朋友圈这类要并排放下控制台与手机预览的页面，放开容器宽度
  wide: {type: Boolean, default: false},
  // 文本编辑为主的工具把整页收到 88rem，避免一行长到读不下去
  narrow: {type: Boolean, default: false}
})

const route = useRoute()
const tool = computed(() => findToolByPath(route.path))
const related = computed(() => (tool.value ? relatedTools(tool.value.id) : []))
</script>

<template>
  <div class="tool-page">
    <div class="container" :class="{'container--wide': wide, 'container--narrow': narrow}">
      <nav class="crumbs" aria-label="面包屑">
        <RouterLink to="/#tools" class="crumb mono"><span aria-hidden="true">←</span> 工具目录</RouterLink>
      </nav>

      <header class="tool-head">
        <h1>{{ tool?.title ?? route.meta.title }}</h1>
        <p v-if="tool" class="tool-desc">{{ tool.desc }}</p>
      </header>

      <div class="tool-body">
        <slot/>
      </div>

      <aside v-if="related.length" class="next" aria-labelledby="next-title">
        <h2 id="next-title" class="next-title">接下来</h2>
        <ul class="next-list">
          <li v-for="item in related" :key="item.id">
            <RouterLink :to="item.path" class="next-link">
              <span class="next-icon"><ToolIcon :name="item.icon"/></span>
              <span>{{ item.title }}</span>
              <span class="next-arrow mono" aria-hidden="true">→</span>
            </RouterLink>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.tool-page {
  padding: 3.2rem 0 6.4rem;
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
}

.crumb {
  color: var(--text-weak);
  transition: color var(--duration) var(--ease);
}

.crumb:hover {
  color: var(--primary);
}

.tool-head {
  display: grid;
  gap: 1.2rem;
  margin-top: 2.4rem;
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(2.9rem, 3.6vw, 3.8rem);
  line-height: 1.16;
  letter-spacing: 0.01em;
}

.tool-desc {
  max-width: 62ch;
  font-size: 1.7rem;
  color: var(--text-weak);
}

.tool-body {
  margin-top: 3.2rem;
}

.next {
  margin-top: 8rem;
  padding-top: 2.4rem;
  border-top: 1px solid var(--rule);
}

.next-title {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  color: var(--text-faint);
}

.next-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
  margin: 1.6rem 0 0;
  padding: 0;
  list-style: none;
}

.next-link {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 100%;
  padding: 1.4rem 1.6rem;
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  background-color: var(--panel);
  font-size: 1.5rem;
  transition: border-color var(--duration) var(--ease),
  background-color var(--duration) var(--ease),
  transform var(--duration) var(--ease);
}

.next-link:hover {
  border-color: var(--primary-border);
  background-color: var(--primary-bg);
  transform: translateY(-1px);
}

.next-icon {
  flex: none;
  width: 2.4rem;
  height: 2.4rem;
}

.next-arrow {
  margin-left: auto;
  color: var(--text-faint);
  transition: transform var(--duration) var(--ease), color var(--duration) var(--ease);
}

.next-link:hover .next-arrow {
  color: var(--primary);
  transform: translateX(0.2rem);
}

@media (max-width: 768px) {
  .tool-page {
    padding: 2rem 0 6.4rem;
  }

  h1 {
    font-size: 2.8rem;
  }

  .tool-desc {
    font-size: 1.5rem;
  }

  .tool-body {
    margin-top: 2.4rem;
  }

  .next {
    margin-top: 5.6rem;
  }

  .next-list {
    grid-template-columns: 1fr;
  }
}
</style>
