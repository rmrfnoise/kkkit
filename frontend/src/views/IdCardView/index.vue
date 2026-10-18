<script setup>
import {ref} from 'vue'
import idCardRegion from '@/data/idcard_region.json'
import {isIdCard} from '@/utils/string.js'

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
  const idCard = inputText.value
  if (!isIdCard(idCard)) {
    ElMessage.error('身份证号码格式不正确')
    return
  }
  // 每次解析前清空上一次的结果，避免匹配不到地区时残留旧数据
  region.value = ''
  birthday.value = ''
  gender.value = ''

  if (regionIndex === null) regionIndex = buildRegionIndex()
  region.value = regionIndex.get(idCard.substring(0, 6)) ?? '未知地区'
  birthday.value = `${idCard.substring(6, 10)}年${idCard.substring(10, 12)}月${idCard.substring(12, 14)}日`
  gender.value = +idCard[16] % 2 ? '男' : '女'
  isShow.value = true
}
</script>


<template>
  <el-input v-model="inputText" placeholder="请输入" class="inputText">
    <template #append>
      <el-button @click="parse">解析</el-button>
    </template>
  </el-input>
  <el-descriptions :column="1" border v-show="isShow" class="resShow">
    <el-descriptions-item label="地区:">{{ region }}</el-descriptions-item>
    <el-descriptions-item label="出生日期:">{{ birthday }}</el-descriptions-item>
    <el-descriptions-item label="性别:">{{ gender }}</el-descriptions-item>
  </el-descriptions>
</template>


<style scoped>
.inputText {
  margin-top: 9rem;
  margin-bottom: 3rem;
  width: 50%;
  font-size: 1.6rem;
  transform: translateX(50%);
}

.resShow {
  width: 50%;
  transform: translateX(50%);
}

@media (max-width: 768px) {
  .inputText {
    width: 100%;
    transform: translateX(0);
  }

  .resShow {
    width: 100%;
    transform: translateX(0);
  }
}
</style>