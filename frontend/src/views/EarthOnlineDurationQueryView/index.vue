<script setup>
import {computed, ref, watch} from 'vue'
import ToolPage from '@/components/ToolPage/index.vue'

const birthday = ref('')
const year = ref(0)
const month = ref(0)
const day = ref(0)

const hasBirthday = computed(() => birthday.value instanceof Date && !Number.isNaN(birthday.value.getTime()))

const birthdayText = computed(() => {
  if (!hasBirthday.value) return ''
  const d = birthday.value
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
})

watch(birthday, birthdayDate => {
  if (!(birthdayDate instanceof Date) || Number.isNaN(birthdayDate.getTime())) {
    year.value = 0
    month.value = 0
    day.value = 0
    return
  }
  const [birthYear, birthMonth, birthDay] = [
    birthdayDate.getFullYear(),
    birthdayDate.getMonth() + 1,
    birthdayDate.getDate()
  ]

  const now = new Date()
  const [currentYear, currentMonth, currentDay] = [
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  ]

  let yearDiff = currentYear - birthYear
  let monthDiff = currentMonth - birthMonth
  let dayDiff = currentDay - birthDay

  if (dayDiff < 0) {
    const daysInPrevMonth = new Date(currentYear, currentMonth - 1, 0).getDate()
    dayDiff += daysInPrevMonth
    monthDiff -= 1
  }

  if (monthDiff < 0) {
    monthDiff += 12
    yearDiff -= 1
  }

  if (yearDiff < 0) {
    ElMessage({message: '生日不能选未来的日期', type: 'warning'})
    year.value = 0
    month.value = 0
    day.value = 0
    return
  }

  year.value = yearDiff
  month.value = monthDiff
  day.value = dayDiff
})
</script>


<template>
  <ToolPage narrow>
    <div class="earth-layout">
      <section class="panel">
        <header class="panel-head">
          <span class="panel-title">你的生日</span>
        </header>
        <div class="panel-body date-body">
          <el-date-picker-panel v-model="birthday" :default-value="new Date(2000, 0, 1)"/>
          <p class="hint">选好日期，右边的数字会立刻更新。</p>
        </div>
      </section>

      <section class="panel duration">
        <div class="duration-body">
          <p class="lede">你已经在地球 online 上线</p>

          <div v-if="hasBirthday" class="figures" aria-live="polite">
            <div class="figure">
              <span class="figure-value mono">{{ year }}</span>
              <span class="figure-unit">年</span>
            </div>
            <div class="figure">
              <span class="figure-value mono">{{ month }}</span>
              <span class="figure-unit">个月</span>
            </div>
            <div class="figure">
              <span class="figure-value mono">{{ day }}</span>
              <span class="figure-unit">天</span>
            </div>
          </div>
          <p v-else class="figures-empty">选好生日，这里会显示你已经上线多久。</p>

          <p v-if="hasBirthday" class="foot mono">从 {{ birthdayText }} 算起</p>
        </div>
      </section>
    </div>
  </ToolPage>
</template>


<style scoped>
.earth-layout {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1.6rem;
  align-items: stretch;
}

.date-body {
  display: grid;
  gap: 1.6rem;
  justify-items: center;
}

/* EP 的日期面板自带描边和阴影，放进纸面板里会变成双层框 */
.date-body :deep(.el-date-picker) {
  border: 0;
  box-shadow: none;
  padding: 0;
}

.figures-empty {
  font-size: 1.5rem;
  color: var(--primary);
  opacity: 0.75;
}

.hint {
  font-size: 1.3rem;
  color: var(--text-faint);
}

.duration {
  display: flex;
  align-items: center;
  background-color: var(--primary-bg);
  border-color: var(--primary-border);
}

.duration-body {
  display: grid;
  gap: 2.4rem;
  padding: 3.2rem;
}

.lede {
  font-size: 1.6rem;
  color: var(--primary);
}

.figures {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 2.4rem;
}

.figure {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.figure-value {
  font-size: clamp(4.4rem, 6vw, 6.4rem);
  line-height: 1;
  color: var(--primary);
}

.figure-unit {
  font-size: 1.5rem;
  color: var(--primary);
}

.foot {
  font-size: 1.3rem;
  color: var(--text-weak);
}

@media (max-width: 900px) {
  .earth-layout {
    grid-template-columns: 1fr;
  }

  .duration-body {
    padding: 2.4rem;
  }
}
</style>
