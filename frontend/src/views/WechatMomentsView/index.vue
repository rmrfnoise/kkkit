<script setup>
import {ref, computed, onMounted} from 'vue'
import MoreIcon from './assets/more.svg'
import LikeIcon from './assets/like.svg'
import {nicknames, total} from '@/data/nicknames.json'
import {Delete} from '@element-plus/icons-vue'

const avatarUrl = ref('')

// Element Plus 的 on-change 签名是 (uploadFile, uploadFiles)，原始 File 在 .raw 上
function handleAvatarUpload(uploadFile, uploadFiles) {
  const selectedFile = uploadFiles[uploadFiles.length - 1]
  avatarUrl.value = selectedFile ? URL.createObjectURL(selectedFile.raw) : ''
}

const nickname = ref('草莓酸奶不加冰')
const text = ref('今日份随手拍，无滤镜，全是状态')

const picList = ref([
  'assets/default-wechat-moments-image-1.jpeg',
  'assets/default-wechat-moments-image-2.jpeg',
  'assets/default-wechat-moments-image-3.jpeg',
  'assets/default-wechat-moments-image-4.jpeg',
  'assets/default-wechat-moments-image-5.jpeg',
  'assets/default-wechat-moments-image-6.jpeg',
  'assets/default-wechat-moments-image-7.jpeg',
  'assets/default-wechat-moments-image-8.jpeg',
  'assets/default-wechat-moments-image-9.jpeg'
])

function handlePicUpload(uploadFile, uploadFiles) {
  picList.value = uploadFiles.map(item => URL.createObjectURL(item.raw))
}

const postTime = ref('昨天')
const likeListStr = ref('')

// 点赞列表按逗号切分为数组，避免直接对字符串做 v-for（会逐字符渲染）
const likeList = computed(() => String(likeListStr.value ?? '')
    .split(',')
    .map(name => name.trim())
    .filter(Boolean))

function initLikeList() {
  for (let i = 0; i < 20; i++) likeListStr.value += nicknames[Math.floor(Math.random() * total)] + ', '
  likeListStr.value = String(likeListStr.value).slice(0, -2)
}

onMounted(() => {
  initLikeList()
})

const nickname1 = ref('')
const nickname2 = ref('')
const nickname3 = ref('')
const comment1 = ref('')
const comment2 = ref('')
// 评论项没有天然唯一键，用自增 id 作为 v-for 的 key
let nextCommentId = 1
const commentList = ref([
  {
    id: nextCommentId++,
    type: 1,
    nickname: '不瓜迪',
    comment: '姐妹 美美哒'
  },
  {
    id: nextCommentId++,
    type: 1,
    nickname: '米米米妮呀',
    comment: '宝宝～太好看了叭'
  },
  {
    id: nextCommentId++,
    type: 2,
    nickname: ['草莓酸奶不加冰', '米米米妮呀'],
    comment: '嘿嘿'
  }
])

function postComment() {
  if (!String(nickname1.value).trim() || !String(comment1.value).trim()) return
  commentList.value.push({id: nextCommentId++, type: 1, nickname: nickname1.value, comment: comment1.value})
  nickname1.value = ''
  comment1.value = ''
}

function replyComment() {
  if (!String(nickname2.value).trim() || !String(nickname3.value).trim() || !String(comment2.value).trim()) return
  commentList.value.push({id: nextCommentId++, type: 2, nickname: [nickname2.value, nickname3.value], comment: comment2.value})
  nickname2.value = ''
  nickname3.value = ''
  comment2.value = ''
}

function delComment(comment) {
  commentList.value.splice(commentList.value.indexOf(comment), 1)
}

// Element Plus 的按钮尺寸只有 large / default / small
const size = window.innerWidth <= 768 ? 'small' : 'default'
</script>

<template>
  <div class="wechat-moments-generator">
    <div class="config-panel">
      <div>
        <el-upload :show-file-list="false" :auto-upload="false" :on-change="handleAvatarUpload">
          <el-button type="primary">点击上传头像</el-button>
        </el-upload>
      </div>
      <div>
        <el-input v-model="nickname" placeholder="设置昵称">
          <template #prepend>设置昵称</template>
        </el-input>
      </div>
      <div class="field-row">
        <span class="field-label">设置文案</span>
        <el-input v-model="text" type="textarea" placeholder="设置文案" class="field-control"/>
      </div>
      <div>
        <el-upload list-type="picture-card" :auto-upload="false" :on-change="handlePicUpload" multiple :limit="9">
          <span class="upload-text">上传图片</span>
        </el-upload>
      </div>
      <div>
        <el-input v-model="postTime" placeholder="设置发布时间">
          <template #prepend>设置发布时间</template>
        </el-input>
      </div>
      <div class="field-row">
        <span class="field-label">设置点赞列表</span>
        <el-input v-model="likeListStr" type="textarea" placeholder="设置点赞列表" class="field-control"/>
      </div>
      <div class="post-comment">
        <el-button type="primary" @click="postComment" :size="size">发布评论</el-button>
        <el-input placeholder="昵称" v-model="nickname1" :size="size"/>
        <el-input placeholder="评论" v-model="comment1" :size="size"/>
      </div>
      <div class="reply-comment">
        <el-button type="primary" @click="replyComment" :size="size">回复评论</el-button>
        <el-input placeholder="昵称" v-model="nickname2" :size="size"/>
        <el-button :size="size">回复</el-button>
        <el-input placeholder="昵称" v-model="nickname3" :size="size"/>
        <el-input placeholder="评论" v-model="comment2" :size="size"/>
      </div>
    </div>
    <div class="preview-area">
      <div style="display: flex">
        <div>
          <el-avatar :src="avatarUrl || 'assets/default-avatar.jpeg'" size="default" shape="square"/>
        </div>
        <div style="margin-left: 1rem">
          <div class="nickname" style="font-size: 1.7rem; font-weight: bold">{{ nickname || '未设置昵称' }}</div>
          <div class="text">{{ text || '未设置文案' }}</div>
          <div class="image-group" :style="{gridTemplateColumns: picList.length === 1 ? '1fr' : '1fr 1fr 1fr'}">
            <el-image v-for="pic in picList"
                      :key="pic"
                      :src="pic"
                      fit="cover"
                      :style="{
                        width: picList.length === 1 ? '55%' : '100px',
                        height: picList.length === 1 ? 'auto' : '100px'
                      }"
            />
          </div>
          <div :style="{position: 'relative', marginTop: picList.length ? '1.2rem' : '-0.3rem'}">
            <div class="post-time">{{ postTime || '未设置发布时间' }}</div>
            <div class="more">
              <MoreIcon style="transform: translateY(0.3rem)"/>
            </div>
          </div>
          <div class="interactive-area">
            <div v-if="likeListStr" class="like">
              <LikeIcon style="transform: translateY(0.2rem); margin-right: 0.5rem"/>
              <span v-for="(like, index) in likeList" :key="index" class="nickname">
                {{ like + (index < likeList.length - 1 ? ', ' : '') }}
              </span>
            </div>
            <div v-if="commentList.length" class="comment-area"
                 :style="{borderTop: likeListStr ? '1px solid #E2E0E1' : 'none'}">
              <div v-for="comment in commentList" :key="comment.id" class="comment">
                <el-button circle type="danger" class="del-comment-btn" size="small" @click="delComment(comment)">
                  <el-icon>
                    <Delete/>
                  </el-icon>
                </el-button>
                <div v-if="comment.type === 1">
                  <span class="nickname">{{ comment.nickname }}</span><span>: {{ comment.comment }}</span>
                </div>
                <div v-else>
                  <span class="nickname">{{ comment.nickname[0] }}</span>回复<span
                    class="nickname">{{ comment.nickname[1] }}</span><span>: {{ comment.comment }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wechat-moments-generator {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  gap: 10rem;
  width: 75vw;
  /* 与微信对话生成器一致：整体下移，避免贴头部栏 */
  margin-top: 3rem;

  .config-panel {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    /* align-items 默认 stretch 会把 el-input 从 32px 拉伸到行高，
       而 el-button 有固定高度不被拉伸，导致两行按钮与输入框底部不齐 */
    .post-comment {
      display: grid;
      grid-template-columns: 1fr 3fr 6fr;
      align-items: center;
    }

    .reply-comment {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr 3fr 6fr;
      align-items: center;
    }

    /* Element Plus 的 textarea 不支持 prepend 插槽，用外层容器模拟原 n-input-group-label 的观感。
       各项取值对齐 EP 原生 .el-input-group__prepend 的 computed 值，否则与相邻的
       「设置昵称 / 设置发布时间」两行（走原生 prepend）在标签宽度、字号、描边上全线错位：
         padding    0 20px（原生）vs 0 12px（手写）
         font-size  14px  （原生）vs 16px  （手写，继承自 body）
         描边        inset box-shadow（原生，不占布局高度）vs 真实 border: 1px（手写） */
    .field-row {
      display: flex;
      align-items: stretch;

      .field-label {
        display: flex;
        align-items: center;
        flex: none;
        padding: 0 20px;
        background-color: var(--el-fill-color-light);
        border: none;
        border-radius: var(--el-input-border-radius) 0 0 var(--el-input-border-radius);
        box-shadow: 1px 0 0 0 var(--el-border-color) inset,
                    0 1px 0 0 var(--el-border-color) inset,
                    0 -1px 0 0 var(--el-border-color) inset;
        color: var(--el-text-color-secondary);
        font-size: var(--el-font-size-base);
        white-space: nowrap;
      }

      .field-control {
        flex: 1;
        display: flex;
      }
    }

    .upload-text {
      font-size: 1.2rem;
      color: #8c939d;
    }
  }

  .preview-area {
    font-family: HONORSansCN, sans-serif;
    padding: 2rem;

    .nickname {
      color: #5B6D95;
    }

    .text {
      margin-top: 0.2rem;
      width: 30.5rem;
      font-size: 1.7rem;
    }

    .image-group {
      width: 305px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 0.25rem;
      margin-top: 1.2rem;
    }

    .post-time {
      font-size: 1.3rem;
      color: #B3B1B4;
    }

    .more {
      background-color: #F8F8FA;
      position: absolute;
      top: -0.7rem;
      right: -0.7rem;
      transform: rotateZ(90deg);
      padding: 0.5rem 0;
      border-radius: 0.3rem;
    }

    .interactive-area {
      width: 30.5rem;
      font-size: 1.5rem;
      background-color: #F7F7F7;
      margin-top: 1rem;
      transform-origin: left;
      transform: scale(1.048);

      .like, .comment-area {
        font-size: 1.4rem;
      }

      .like {
        padding: 0.6rem 0.6rem 0.3rem 0.6rem;
      }

      .comment-area {
        padding: 0.3rem 0.6rem 0.6rem 0.6rem;

        .comment {
          position: relative;
          margin-bottom: 0.3rem;

          &:last-of-type {
            margin-bottom: 0;
          }

          &:hover .del-comment-btn {
            opacity: 1;
          }

          /* 原尺寸 1rem（10px）装不下图标，放大到 1.6rem 保证可见可点 */
          .del-comment-btn {
            position: absolute;
            top: 0.2rem;
            right: 0;
            width: 1.6rem;
            height: 1.6rem;
            opacity: 0;
          }
        }
      }
    }
  }
}

/* :deep() 必须写在嵌套块之外（与 WechatChatView 同款教训）：嵌进原生 CSS 嵌套会被编译成
   [data-v] 开头的嵌套选择器，浏览器直接丢弃，规则静默失效。这里做圆角缝合——左侧手写标签
   右角是直角，textarea 左角也必须是直角，否则接缝处露出一道圆形缺口；height 100% 兜底保证
   标签与输入框底边齐平（当前 flex stretch 已自然对齐，属防御性规则）。 */
.wechat-moments-generator .config-panel .field-row .field-control :deep(.el-textarea__inner) {
  height: 100%;
  min-height: 100%;
  border-radius: 0 var(--el-input-border-radius) var(--el-input-border-radius) 0;
}

/* 朋友圈头像改为带圆角的矩形（微信里通讯录/公众号头像是圆角矩形），
   同样必须顶层写，不能嵌进 .preview-area 的嵌套块 */
.preview-area :deep(.el-avatar) {
  border-radius: 0.6rem;
}

@media (max-width: 768px) {
  .wechat-moments-generator {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 90vw;
    margin: 3rem auto;
    display: flex;
    flex-direction: column-reverse;
    gap: 0;

    .preview-area {
      padding: 0;
      transform-origin: top left;
      transform: scale(0.9);
    }

    .config-panel {
      .reply-comment {
        margin-bottom: 10vh;
      }
    }
  }
}
</style>