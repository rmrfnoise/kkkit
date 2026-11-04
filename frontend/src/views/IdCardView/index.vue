<script setup>
import {ref} from 'vue'
import idCardRegion from '@/data/idcard_region.json'
import {isIdCard} from '@/utils/string.js'
import ToolPage from '@/components/ToolPage/index.vue'

const inputText = ref('')
const region = ref('')
const birthday = ref('')
const gender = ref('')
const isShow = ref(false)

// 将三级行政区划预建成「县级代码 -> 完整地区名」索引，
// 只需构建一次，避免每次解析都三层嵌套全量遍历 3000+ 条数据
let regionIndex = null

function buildRegionIndex() {
  const index = new Map()
  idCardRegion.forEach(level1 => {
    level1['children'].forEach(level2 => {
      level2['children'].forEach(level3 => {
        index.set(level3['code'], level1['name'] + level2['name'] + level3['name'])
      })
    })
  })
  return index
}

function parse() {
  const idCard = inputText.value.trim()
  if (!isIdCard(idCard)) {
    ElMessage.error('号码对不上：需要 18 位，前 6 位地区、中间 8 位生日，最后一位可以是 X')
    return
  }
  // 每次解析前清空上一次的结果，避免匹配不到地区时残留旧数据
  region.value = ''
  birthday.value = ''
  gender.value = ''
  isShow.value = true

  if (regionIndex === null) regionIndex = buildRegionIndex()
  region.value = regionIndex.get(idCard.substring(0, 6)) ?? '未知地区'
  birthday.value = `${idCard.substring(6, 10)} 年 ${idCard.substring(10, 12)} 月 ${idCard.substring(12, 14)} 日`
  gender.value = +idCard[16] % 2 ? '男' : '女'
}
</script>


<template>
  <ToolPage narrow>
    <section class="panel">
      <header class="panel-head">
        <span class="panel-title">身份证号</span>
        <span class="panel-title">18 位</span>
      </header>
      <div class="panel-body">
        <form class="idcard-form" @submit.prevent="parse">
          <el-input
              v-model="inputText"
              maxlength="18"
              placeholder="粘贴 18 位身份证号"
              aria-label="身份证号码"
          />
          <el-button type="primary" native-type="submit">解析</el-button>
        </form>
        <p class="privacy-note">解析只在本页完成，刷新后不保留。</p>
      </div>
    </section>

    <section v-if="isShow" class="panel result">
      <header class="panel-head">
        <span class="panel-title">解析结果</span>
      </header>
      <dl class="facts">
        <div class="fact">
          <dt>地区</dt>
          <dd>{{ region }}</dd>
        </div>
        <div class="fact">
          <dt>出生日期</dt>
          <dd class="mono">{{ birthday }}</dd>
        </div>
        <div class="fact">
          <dt>性别</dt>
          <dd>{{ gender }}</dd>
        </div>
      </dl>
    </section>

    <p v-else class="result-empty">
      解析结果会出现在这里：地区、出生日期、性别。
    </p>
  </ToolPage>
</template>


<style scoped>
.idcard-form {
  display: flex;
  gap: 1.2rem;
}

.idcard-form .el-input {
  flex: 1;
}

.privacy-note {
  margin-top: 1.2rem;
  font-size: 1.3rem;
  color: var(--text-faint);
}

.result {
  margin-top: 1.6rem;
}

.facts {
  display: grid;
  grid-template-columns: 1.6fr 1fr 0.6fr;
  margin: 0;
  padding: 2.4rem;
  gap: 2.4rem;
}

.fact dt {
  margin-bottom: 0.8rem;
  font-family: var(--font-mono);
  font-size: 1.2rem;
  letter-spacing: 0.12em;
  color: var(--text-faint);
}

.fact dd {
  margin: 0;
  font-size: 1.8rem;
  line-height: 1.4;
}

.result-empty {
  margin-top: 1.6rem;
  padding: 2rem 2.4rem;
  border: 1px dashed var(--rule-strong);
  border-radius: var(--radius-sm);
  font-size: 1.4rem;
  color: var(--text-faint);
}

@media (max-width: 768px) {
  .idcard-form {
    flex-direction: column;
  }

  .facts {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .fact dd {
    font-size: 1.6rem;
  }
}
</style>
