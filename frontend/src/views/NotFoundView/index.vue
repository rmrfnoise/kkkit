<template>
  <div class="not-found">
    <div class="container container--narrow not-found-inner">
      <h1 class="sr-only">页面未找到</h1>
      <img src="./assets/404.png" alt="" width="1024" height="1024">
      <p class="code mono">404 · page not found</p>
      <p class="desc">这个地址没有对应的工具。可能链接被改过，也可能它已经搬走了。</p>
      <RouterLink to="/" class="home">回到工具目录</RouterLink>
    </div>
  </div>
</template>


<style scoped>
.not-found {
  padding: 9.6rem 0 6.4rem;
}

.not-found-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

img {
  display: block;
  width: min(26rem, 56vw);
  height: auto;
}

.code {
  margin-top: 3.2rem;
  font-size: 1.3rem;
  color: var(--text-faint);
}

.desc {
  max-width: 40ch;
  margin-top: 1.2rem;
  font-size: 1.5rem;
  color: var(--text-weak);
}

.home {
  display: inline-flex;
  align-items: center;
  height: 4rem;
  margin-top: 3.2rem;
  padding: 0 2rem;
  border: 1px solid var(--primary);
  border-radius: var(--radius);
  font-size: 1.5rem;
  color: var(--primary);
  transition: background-color var(--duration) var(--ease), color var(--duration) var(--ease);
}

.home:hover {
  background-color: var(--primary);
  color: #FFFFFF;
}

@media (max-width: 768px) {
  .not-found {
    padding: 6.4rem 0 4.8rem;
  }
}
</style>
