<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import ToolIcon from '@/components/ToolIcon/index.vue'
import {TOOL_COUNT, TOOLS} from '@/data/tools.js'

const router = useRouter()

const query = ref('')
const searchInput = ref(null)

// 12 条数据，浏览器里直接过滤就够了，不需要索引或请求
const matches = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return []
  return TOOLS
    .filter(tool => `${tool.title}${tool.desc}`.toLowerCase().includes(keyword))
    .slice(0, 6)
})

function focusSearch() {
  searchInput.value?.focus()
}

function clearQuery() {
  query.value = ''
  focusSearch()
}

// 输入法组字过程中的回车不能当成「直达」
function openFirst(event) {
  if (event.isComposing) return
  if (!query.value.trim()) return
  if (matches.value[0]) router.push(matches.value[0].path)
}

// 按 / 直接把光标送进搜索框
function onKeydown(event) {
  if (event.metaKey || event.ctrlKey || event.altKey) return
  const target = event.target
  if (target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable="true"]')) return
  if (event.key === '/') {
    event.preventDefault()
    focusSearch()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>


<template>
  <div class="home">
    <section class="hero">
      <div class="container hero-inner">
        <h1>要用的小工具，<br>都在这儿。</h1>
        <p class="hero-lede">
          打开就能用的在线小工具，一共 {{ TOOL_COUNT }} 个。不用注册，没有广告，用完关掉就行。
        </p>

        <div class="search-wrap">
          <form class="search" role="search" @submit.prevent="openFirst">
            <span class="search-prompt mono" aria-hidden="true">$</span>
            <input
                ref="searchInput"
                v-model="query"
                class="search-input"
                type="search"
                placeholder="输入工具名，回车直达"
                aria-label="搜索工具"
                autocomplete="off"
                spellcheck="false"
                @keydown.esc="clearQuery"
            >
            <kbd v-if="!query" class="search-kbd mono" aria-hidden="true">/</kbd>
            <button v-else type="button" class="search-clear" aria-label="清空搜索" @click="clearQuery">×</button>
          </form>

          <div v-if="query.trim()" class="search-results" aria-label="匹配的工具">
            <RouterLink
                v-for="tool in matches"
                :key="tool.id"
                :to="tool.path"
                class="search-result"
            >
              <span class="search-result-icon">
                <ToolIcon :name="tool.icon"/>
              </span>
              <span class="search-result-title">{{ tool.title }}</span>
              <span class="search-result-arrow mono" aria-hidden="true">→</span>
            </RouterLink>
            <p v-if="!matches.length" class="search-result-empty">
              没有匹配的工具，换个词试试。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="tools" class="directory" aria-labelledby="directory-title">
      <div class="container">
        <div class="directory-head">
          <h2 id="directory-title">工具目录</h2>
          <p class="directory-count mono">{{ TOOL_COUNT }} 个工具</p>
        </div>

        <ul class="rows">
          <li v-for="tool in TOOLS" :key="tool.id">
            <RouterLink :to="tool.path" class="row">
              <span class="row-icon">
                <ToolIcon :name="tool.icon"/>
              </span>
              <span class="row-text">
                <span class="row-title">{{ tool.title }}</span>
                <span class="row-desc">{{ tool.desc }}</span>
              </span>
              <span class="row-arrow mono" aria-hidden="true">→</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>


<style scoped>
/* --- Hero：纸面 + 极淡网格，网格向下淡出，不喧宾夺主 --- */
.hero {
  position: relative;
  background-color: var(--panel);
  border-bottom: 1px solid var(--rule);
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
      linear-gradient(rgba(4, 120, 87, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(4, 120, 87, 0.08) 1px, transparent 1px);
  background-size: 2.4rem 2.4rem;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.3) 52%, transparent 82%);
  mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.3) 52%, transparent 82%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  padding-block: 9.6rem 7.2rem;
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(3.6rem, 5.2vw, 5.6rem);
  line-height: 1.12;
  letter-spacing: 0.01em;
}

.hero-lede {
  max-width: 46ch;
  margin-top: 2.4rem;
  font-size: 1.8rem;
  color: var(--text-weak);
}

/* --- 搜索：做成一条命令行，终端感来自它真的能执行 --- */
.search-wrap {
  position: relative;
  max-width: 46rem;
  margin-top: 3.2rem;
}

.search {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 5.2rem;
  padding: 0 1.4rem;
  background-color: var(--panel);
  border: 1px solid var(--rule-strong);
  border-radius: var(--radius);
  transition: border-color var(--duration) var(--ease), box-shadow var(--duration) var(--ease);
}

.search:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.12);
}

.search-prompt {
  font-size: 1.6rem;
  color: var(--primary);
  user-select: none;
}

.search-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  font: 1.6rem var(--font-sans);
  color: var(--text);
}

.search-input::placeholder {
  color: var(--text-faint);
}

.search-input::-webkit-search-cancel-button,
.search-input::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

.search-kbd {
  padding: 0.1rem 0.7rem;
  border: 1px solid var(--rule);
  border-bottom-color: var(--rule-strong);
  border-radius: var(--radius-sm);
  background-color: var(--panel-soft);
  font-size: 1.2rem;
  color: var(--text-faint);
}

.search-clear {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--text-faint);
  cursor: pointer;
}

.search-clear:hover {
  color: var(--text);
  background-color: var(--rule);
}

/* 输入即见匹配：结果贴在命令行下方，不用再往下滚 */
.search-results {
  position: absolute;
  top: calc(100% + 0.8rem);
  right: 0;
  left: 0;
  z-index: 30;
  padding: 0.6rem;
  background-color: var(--panel);
  border: 1px solid var(--rule-strong);
  border-radius: var(--radius);
  box-shadow: var(--shadow-3);
}

.search-result {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 1.2rem;
  border-radius: var(--radius-sm);
  font-size: 1.5rem;
  transition: background-color var(--duration) var(--ease);
}

.search-result:hover {
  background-color: var(--primary-bg);
}

.search-result-icon {
  flex: none;
  width: 2.4rem;
  height: 2.4rem;
}

.search-result-title {
  flex: 1;
  min-width: 0;
}

.search-result-arrow {
  color: var(--text-faint);
}

.search-result-empty {
  padding: 1.4rem 1.2rem;
  font-size: 1.4rem;
  color: var(--text-faint);
}

/* --- 工具目录：一条清单到底，顺序就是 tools.js 里的顺序 --- */
.directory {
  padding-block: 8rem 6.4rem;
}

.directory-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.6rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid var(--rule);
}

.directory-head h2 {
  font-family: var(--font-display);
  font-size: 2.6rem;
}

.directory-count {
  font-size: 1.3rem;
  color: var(--text-faint);
}

.rows {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 5.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.rows li:first-child .row {
  border-top: 0;
}

.row {
  position: relative;
  display: grid;
  grid-template-columns: 4.4rem minmax(0, 1fr) 2.4rem;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem 0;
  border-top: 1px solid var(--rule);
  z-index: 0;
}

/* hover 底色比行内容多出一点内缩，行首规则线仍与标题对齐 */
.row::before {
  content: "";
  position: absolute;
  inset: -0.1rem -1.2rem;
  border-radius: var(--radius);
  background-color: transparent;
  transition: background-color var(--duration) var(--ease);
  z-index: -1;
}

.row:hover::before {
  background-color: var(--panel);
}

.row-icon {
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  padding: 0.6rem;
  border: 1px solid var(--rule);
  border-radius: var(--radius-sm);
  background-color: var(--panel);
}

.row-text {
  display: grid;
  gap: 0.3rem;
  min-width: 0;
}

.row-title {
  font-size: 1.6rem;
  color: var(--text);
}

.row-desc {
  font-size: 1.4rem;
  line-height: 1.6;
  color: var(--text-faint);
}

.row-arrow {
  justify-self: end;
  color: var(--text-faint);
  transition: transform var(--duration) var(--ease), color var(--duration) var(--ease);
}

.row:hover .row-arrow {
  color: var(--primary);
  transform: translateX(0.3rem);
}

@media (max-width: 820px) {
  .rows {
    grid-template-columns: 1fr;
    column-gap: 0;
  }

  /* 单列时第一行也要有分隔线，否则和目录标题粘在一起 */
  .rows li:first-child .row {
    border-top: 1px solid var(--rule);
  }
}

@media (max-width: 768px) {
  .hero-inner {
    padding-block: 6.4rem 5.2rem;
  }

  h1 {
    font-size: 3.6rem;
  }

  .hero-lede {
    margin-top: 1.8rem;
    font-size: 1.6rem;
  }

  .search-wrap {
    margin-top: 2.6rem;
  }

  .search {
    height: 4.8rem;
  }

  .search-kbd {
    display: none;
  }

  .directory {
    padding-block: 5.6rem 4.8rem;
  }

  .directory-head h2 {
    font-size: 2.2rem;
  }

  .row {
    grid-template-columns: 4rem minmax(0, 1fr) 2rem;
    gap: 1.2rem;
    padding: 1.4rem 0;
  }

  .row::before {
    inset: -0.1rem -0.8rem;
  }

  .row-icon {
    width: 4rem;
    height: 4rem;
  }
}
</style>
