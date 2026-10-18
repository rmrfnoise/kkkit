<script setup>
import ToolItem from './components/ToolItem/index.vue'
</script>


<template>
  <div class="toolItemContainer">
    <ToolItem title="Base64 编解码" icon="base64" path="/base64"/>
    <ToolItem title="URL 编解码" icon="url" path="/url"/>
    <ToolItem title="Unicode 转中文" icon="unicode" path="/unicode"/>
    <ToolItem title="身份证号码解析" icon="idCard" path="/idCard"/>
    <ToolItem title="手持弹幕" icon="barrage" path="/barrage"/>
    <ToolItem title="HEX <-> RGB" icon="color" path="/color"/>
    <ToolItem title="微信对话生成器" icon="wechat-chat" path="/wechat-chat"/>
    <ToolItem title="地球online在线时长查询" icon="earth-online" path="/earth-online-duration-query"/>
    <ToolItem title="时间戳转换器" icon="timestamp" path="/timestamp"/>
    <ToolItem title="二维码生成器" icon="qr-code" path="/qr-code"/>
    <ToolItem title="昵称生成器" icon="nickname" path="/nickname-generator"/>
    <ToolItem title="微信朋友圈生成器" icon="wechat-moments" path="/wechat-moments"/>
  </div>
</template>


<style scoped>
.toolItemContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  justify-content: space-between;
  grid-gap: 4rem;
}
</style>