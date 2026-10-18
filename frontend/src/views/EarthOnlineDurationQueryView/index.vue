<script setup>
import {ref, watch} from 'vue'

const birthday = ref('')
const year = ref(0)
const month = ref(0)
const day = ref(0)

watch(birthday, birthdayDate => {
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
    ElMessage({
      message: '生日日期不能超过当前日期，请重新选择',
      type: 'warning'
    })
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
  <div class="container">
    <el-text type="primary">请选择您的生日</el-text>
    <el-date-picker-panel v-model="birthday" :default-value="new Date(2000, 0, 1)"/>
    <div class="online-duration-ymd-stat">
      <el-statistic title="年" :value="year" :value-style="{color: 'var(--primary)'}"/>
      <el-statistic title="月" :value="month" :value-style="{color: 'var(--accent)'}"/>
      <el-statistic title="日" :value="day" :value-style="{color: 'var(--warning)'}"/>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 60vh;
  margin: 15vh auto;
}

.online-duration-ymd-stat {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 30rem;
  text-align: center;
}
</style>