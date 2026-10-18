<script setup>
import ReturnIcon from './assets/return.svg'
import MoreHeaderIcon from './assets/more-header.svg'
import MoreFooterIcon from './assets/more-footer.svg'
import voiceIcon from './assets/voice.svg'
import expressionIcon from './assets/expression.svg'
import {ref, markRaw} from 'vue'
import ChatTime from './components/ChatTime/index.vue'
import TextChat from './components/TextChat/index.vue'
import {Delete, Plus, Select} from '@element-plus/icons-vue'
import VoiceChat from './components/VoiceChat/index.vue'
import AudioVideoCall from './components/AudioVideoCall/index.vue'
import Transfer from './components/Transfer/index.vue'

function addTransfer() {
  if (selectedUrl.value === '') {
    ElMessage({
      message: '未设置头像',
      type: 'warning',
      plain: true,
    })
    return
  }
  addMsg(Transfer, {
    transferStatus: transferStatus.value,
    amount: amount.value,
    isSelf: isSelf.value,
    selectedUrl: selectedUrl.value,
    chatName: chatName.value ? chatName.value : '未设置名字',
    isGroupChat: isGroupChat.value
  })
}

function addAudioVideoCall() {
  if (selectedUrl.value === '') {
    ElMessage({
      message: '未设置头像',
      type: 'warning',
      plain: true,
    })
    return
  }
  if (callStatus.value === '通话时长' && callDuration.value.trim() === '') {
    ElMessage({
      message: '未设置通话时长',
      type: 'warning',
      plain: true,
    })
    return
  }
  if (callStatus.value !== '通话时长') callDuration.value = ''
  addMsg(AudioVideoCall, {
    callType: callType.value,
    callStatus: callStatus.value,
    callDuration: callDuration.value,
    isSelf: isSelf.value,
    selectedUrl: selectedUrl.value,
    chatName: chatName.value ? chatName.value : '未设置名字',
    isGroupChat: isGroupChat.value
  })
}

function addVoiceChat() {
  if (selectedUrl.value === '') {
    ElMessage({
      message: '未设置头像',
      type: 'warning',
      plain: true,
    })
    return
  }
  addMsg(VoiceChat, {
    voiceDuration: voiceDuration.value,
    isSelf: isSelf.value,
    selectedUrl: selectedUrl.value,
    chatName: chatName.value ? chatName.value : '未设置名字',
    isGroupChat: isGroupChat.value
  })
}

function handleSelect(file) {
  selectedUrl.value = file.url
  if (!isGroupChat.value) isSelf.value = !isSelf.value
}

function handleFileChange(file, uploadFiles) {
  fileList.value = [...uploadFiles]
  selectedUrl.value = file.url
}

function handleRemove(file) {
  const index = fileList.value.findIndex(item => item.uid === file.uid)
  if (index !== -1) fileList.value.splice(index, 1)
}

// 消息以响应式数组保存，由模板 v-for 渲染，不再手动操作 DOM
const messages = ref([])
let nextMsgId = 0

function addMsg(component, props) {
  // markRaw 避免组件对象被响应式代理，消除 Vue 的 reactive component 警告
  messages.value.push({id: nextMsgId++, component: markRaw(component), props})
}

function removeMsg(id) {
  messages.value = messages.value.filter(msg => msg.id !== id)
}

function addTextChat() {
  if (text.value.trim() === '') {
    ElMessage({
      message: '不能发送空白信息',
      type: 'warning',
      plain: true,
    })
    text.value = ''
    return
  }
  if (selectedUrl.value === '') {
    ElMessage({
      message: '未设置头像',
      type: 'warning',
      plain: true,
    })
    return
  }
  addMsg(TextChat, {
    text: text.value,
    isSelf: isSelf.value,
    selectedUrl: selectedUrl.value,
    chatName: chatName.value ? chatName.value : '未设置名字',
    isGroupChat: isGroupChat.value
  })
  text.value = ''
}

function addChatTime() {
  const yearMonthDayStr = yearStr.value + monthStr.value + dayStr.value
  const chatTime = (yearMonthDayStr ? yearMonthDayStr + ' ' : '') + (week.value ? week.value + ' ' : '') + timeSlot.value + hourStr.value + ':' + minuteStr.value
  addMsg(ChatTime, {chatTime})
}

const chatTitle = ref('DEMO')
const yearStr = ref('')
const monthStr = ref('')
const dayStr = ref('')
const week = ref('')
const timeSlot = ref('')
const timeStr = new Date().toLocaleTimeString()
const hourStr = ref(timeStr.substring(0, 2))
const minuteStr = ref(timeStr.substring(3, 5))
const text = ref('')
const isSelf = ref(true)
const fileList = ref([])
const selectedUrl = ref('')
const chatName = ref('')
const isGroupChat = ref(false)
const voiceDuration = ref(1)
const callType = ref('视频通话')
const callStatus = ref('通话时长')
const callDuration = ref('')
const transferStatus = ref('待朋友确认收钱')
const amount = ref(0.01)
</script>


<template>
  <div class="container">
    <div class="config">
      <el-config-provider size="small">
        <el-collapse>
          <el-collapse-item title="设置聊天标题" name="1">
            <el-input v-model="chatTitle"/>
          </el-collapse-item>
          <el-collapse-item title="切换聊天模式" name="2">
            <el-switch
                v-model="isGroupChat"
                inline-prompt
                style="--el-switch-on-color: var(--primary); --el-switch-off-color: var(--accent)"
                active-text="群聊"
                inactive-text="单聊"
                size="large"
            />
          </el-collapse-item>
          <el-collapse-item title="添加聊天时间" name="3">
            <div class="chat-time">
              <el-button @click="addChatTime" type="primary">点击添加</el-button>
              <el-select v-model="yearStr" placeholder="">
                <el-option value=""></el-option>
                <el-option v-for="year in Array.from({ length: 20 }, (_, i) => 2011 + i)"
                           :key="year"
                           :value="year + '年'"
                />
              </el-select>
              <el-select v-model="monthStr" placeholder="">
                <el-option value=""></el-option>
                <el-option v-for="month in Array.from({ length: 12 }, (_, i) => 1 + i)"
                           :key="month"
                           :value="month + '月'"
                />
              </el-select>
              <el-select v-model="dayStr" placeholder="">
                <el-option value=""></el-option>
                <el-option v-for="day in Array.from({ length: 31 }, (_, i) => 1 + i)"
                           :key="day"
                           :value="day + '日'"
                />
              </el-select>
              <el-select v-model="week" placeholder="">
                <el-option value=""></el-option>
                <el-option value="昨天"></el-option>
                <el-option value="星期一"></el-option>
                <el-option value="星期二"></el-option>
                <el-option value="星期三"></el-option>
                <el-option value="星期四"></el-option>
                <el-option value="星期五"></el-option>
                <el-option value="星期六"></el-option>
                <el-option value="星期日"></el-option>
              </el-select>
              <el-select v-model="timeSlot" placeholder="">
                <el-option value=""></el-option>
                <el-option value="上午"></el-option>
                <el-option value="下午"></el-option>
                <el-option value="凌晨"></el-option>
              </el-select>
              <el-select v-model="hourStr" placeholder="">
                <el-option v-for="hour in Array.from({ length: 24 }, (_, i) => i)"
                           :key="hour"
                           :value="hour < 10 ? '0' + hour : hour.toString()"
                />
              </el-select>
              <el-select v-model="minuteStr" placeholder="">
                <el-option v-for="minute in Array.from({ length: 60 }, (_, i) => i)"
                           :key="minute"
                           :value="minute < 10 ? '0' + minute : minute.toString()"
                />
              </el-select>
            </div>
          </el-collapse-item>
          <el-collapse-item title="上传头像" name="4">
            <el-upload
                list-type="picture-card"
                :file-list="fileList"
                :auto-upload="false"
                :on-change="handleFileChange"
                multiple
            >
              <el-icon>
                <Plus/>
              </el-icon>
              <template #file="{ file }">
                <div :class="{ 'selected': fileList.length === 1 || selectedUrl === file.url }">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
                  <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <el-icon><Delete/></el-icon>
              </span>
              <span @click="handleSelect(file)">
                <el-icon><Select/></el-icon>
              </span>
            </span>
                </div>
              </template>
            </el-upload>
          </el-collapse-item>
          <el-collapse-item title="切换角色" name="5">
            <el-switch
                v-model="isSelf"
                inline-prompt
                style="--el-switch-on-color: var(--accent); --el-switch-off-color: var(--primary)"
                active-text="自己"
                inactive-text="对方"
                size="large"
            />
          </el-collapse-item>
          <el-collapse-item title="设置名字" name="6">
            <el-input v-model="chatName" placeholder="未设置名称（单聊无需设置，群聊请在此处设置）"/>
          </el-collapse-item>
          <el-collapse-item title="添加文字聊天" name="7">
            <el-input v-model="text">
              <template #prepend>
                <el-button @click="addTextChat">点击添加</el-button>
              </template>
            </el-input>
          </el-collapse-item>
          <el-collapse-item title="添加语音聊天" name="8">
            <div class="voice-chat-setting">
              <el-button type="primary" @click="addVoiceChat">点击添加</el-button>
              <el-input-number
                  v-model="voiceDuration"
                  :min="1"
                  :max="60"
                  controls-position="right"
              >
                <template #prefix>
                  <span>语音时长</span>
                </template>
              </el-input-number>
            </div>
          </el-collapse-item>
          <el-collapse-item title="添加语音或视频通话" name="9">
            <div class="audio-video-call-setting">
              <el-button type="primary" @click="addAudioVideoCall">点击添加</el-button>
              <el-select v-model="callType" placeholder="">
                <el-option value="视频通话"></el-option>
                <el-option value="语音通话"></el-option>
              </el-select>
              <el-select v-model="callStatus" placeholder="">
                <el-option value="通话时长"></el-option>
                <el-option value="对方无应答"></el-option>
                <el-option value="未应答"></el-option>
                <el-option value="对方已拒绝"></el-option>
                <el-option value="已拒绝"></el-option>
                <el-option value="已取消"></el-option>
                <el-option value="对方已取消"></el-option>
                <el-option value="已在其他设备接听"></el-option>
                <el-option value="已在其他设备拒绝"></el-option>
                <el-option value="通话中断"></el-option>
              </el-select>
              <el-input v-show="callStatus === '通话时长'" placeholder="通话时长" v-model="callDuration"/>
            </div>
          </el-collapse-item>
          <el-collapse-item title="添加转账" name="10">
            <div class="transfer-setting">
              <el-button type="primary" @click="addTransfer">点击添加</el-button>
              <el-select v-model="transferStatus">
                <el-option value="待朋友确认收钱"></el-option>
                <el-option value="待你收款"></el-option>
                <el-option value="已被退还"></el-option>
                <el-option value="已退还"></el-option>
                <el-option value="已被接收"></el-option>
                <el-option value="已收款"></el-option>
              </el-select>
              <el-input-number v-model="amount" :min="0.01" :max="200000" controls-position="right">
                <template #prefix>
                  <span>￥</span>
                </template>
              </el-input-number>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-config-provider>
    </div>
    <div class="show">
      <header>
        <ReturnIcon class="return-icon"/>
        <span>{{ chatTitle }}</span>
        <MoreHeaderIcon class="more-header-icon"/>
      </header>
      <section class="msg-list">
        <component
            v-for="msg in messages"
            :key="msg.id"
            :is="msg.component"
            v-bind="msg.props"
            @remove="removeMsg(msg.id)"
        />
      </section>
      <footer>
        <voiceIcon class="voice-icon"/>
        <div class="ipt"></div>
        <expressionIcon class="expression-icon"/>
        <moreFooterIcon class="more-footer-icon"/>
      </footer>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  width: fit-content;
  margin: 3rem auto 0;

  .config {
    padding: 5rem;
    width: 80rem;

    .chat-time {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 1rem;
    }

    .selected {
      border: 2px solid var(--primary);
      border-radius: var(--radius);
      box-shadow: 0 0 0 2px var(--primary-bg);
    }

    .voice-chat-setting {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 2rem;
    }

    .audio-video-call-setting {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 2rem;
    }

    .transfer-setting {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 2rem;
    }
  }

  .show {
    overflow: hidden;
    width: 30rem;
    height: 60rem;
    background-color: #ededed;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    font-family: sans-serif;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5%;
      border-bottom: 1px solid #e6e6e6;

      span {
        font-size: 1.2rem;
      }

      .return-icon {
        margin-left: 1rem;
      }

      .more-header-icon {
        margin-right: 1rem;
      }
    }

    section {
      height: 89%;
      overflow-y: auto;
      border-bottom: 1px solid #e6e6e6;
    }

    footer {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 6%;
      background-color: #f7f7f7;

      .expression-icon, .voice-icon {
        transform: scale(1.3);
      }

      .more-footer-icon {
        transform: scale(1.3) translateY(-1.5%);
      }

      .ipt {
        width: 70%;
        height: 75%;
        background-color: #fff;
      }
    }
  }
}

/* Element Plus 的 el-collapse header 默认没有水平内边距，文字会紧贴边框。
   这里补上间距，并给折叠面板加完整卡片边框。
   注意：必须写在嵌套块之外。`:deep()` 嵌进原生 CSS 嵌套时会被错误编译成
   `[data-v-xxx] .el-collapse`（要求 .el-collapse 有带 data-v 的后代，永不匹配），
   padding 那条曾因此侥幸生效、border 那条则完全失效，排查成本很高。 */
.container .config :deep(.el-collapse) {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.container .config :deep(.el-collapse-item__header) {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

.container .config :deep(.el-collapse-item__content) {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column-reverse;
    align-items: center;

    .config {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1.5rem;
      padding: 0;
      margin-bottom: 5rem;
      width: 90vw;
      height: auto;

      .chat-time {
        grid-template-columns: 1fr 1fr;
      }

      .voice-chat-setting {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      .audio-video-call-setting {
        grid-template-columns: 1fr 1fr;
      }

      .transfer-setting {
        grid-template-columns: 1fr 2fr;
      }
    }

    .show {
      margin-bottom: 5rem;
    }
  }
}
</style>