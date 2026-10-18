<template>
  <div class="not-found">
    <img src="./assets/404.png" alt="404 not found">
    <p class="not-found-tip">$ 404: page not found</p>
    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>


<style scoped>
.not-found {
  text-align: center;
}

img {
  display: block;
  margin: 5vh auto 0;
  /* 原图 1024×1024 正方形，用 min() 同时约束宽/高两个方向，
     保证任何视口下都不会因图片过高而产生滚动条 */
  width: min(22vw, 50vh);
}

/* 终端风提示行：等宽字体 + 弱化文字色 */
.not-found-tip {
  margin: var(--space-5) 0;
  font-family: var(--font-mono);
  color: var(--text-faint);
}

@media (max-width: 768px) {
  img {
    width: min(70vw, 45vh);
  }
}
</style>
