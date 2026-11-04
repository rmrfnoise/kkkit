<script setup>
import RmbIcon from './assets/rmb.svg'
import TransferIcon from './assets/transfer.svg'
import TransferSuccessIcon from './assets/transfer_success.svg'
import RefundIcon from './assets/refund.svg'
const emit = defineEmits(['remove'])
const {transferStatus} = defineProps(['transferStatus', 'amount', 'isSelf', 'selectedUrl', 'chatName', 'isGroupChat'])
const bg = transferStatus === '待朋友确认收钱' || transferStatus === '待你收款' ? '#fa9d3b' : '#fde1c3'
</script>


<template>
  <div>
    <div v-if="isSelf" class="message-container-right">
      <el-button link type="danger" class="delete-btn" style="left: 0" @click="emit('remove')">删除</el-button>
      <div class="content">
        <div class="message-container-right-top">
          <TransferIcon v-if="transferStatus === '待朋友确认收钱' || transferStatus === '待你收款'"
                        class="transfer-icon"/>
          <TransferSuccessIcon v-else-if="transferStatus === '已被接收' || transferStatus === '已收款'"
                               class="transfer-icon"/>
          <RefundIcon v-else/>
          <div class="info">
            <RmbIcon/>
            <div class="amount">{{ amount }}</div>
            <div class="transfer-status">{{ transferStatus }}</div>
          </div>
        </div>
        <div class="message-container-right-bottom">
          微信转账
        </div>
      </div>
      <el-avatar shape="square" :size="30" :src="selectedUrl"/>
    </div>
    <div v-else class="message-container-left">
      <el-button link type="danger" class="delete-btn" style="right: 0" @click="emit('remove')">删除</el-button>
      <el-avatar shape="square" :size="30" :src="selectedUrl"/>
      <div class="chat-message">
        <div v-if="isGroupChat" class="chat-name">{{ chatName }}</div>
        <div class="content">
          <div class="message-container-right-top">
            <TransferIcon v-if="transferStatus === '待朋友确认收钱' || transferStatus === '待你收款'"
                          class="transfer-icon"/>
            <TransferSuccessIcon v-else-if="transferStatus === '已被接收' || transferStatus === '已收款'"
                                 class="transfer-icon"/>
            <RefundIcon v-else/>
            <div class="info">
              <RmbIcon/>
              <div class="amount">{{ amount }}</div>
              <div class="transfer-status">{{ transferStatus }}</div>
            </div>
          </div>
          <div class="message-container-right-bottom">
            微信转账
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.message-container-right, .message-container-left {
  position: relative;
  display: flex;
  padding: 3% 2%;
  line-height: 1.3;

  .content {
    display: grid;
    grid-template-rows: 4fr 1fr;
    position: relative;
    padding: 4px 8px;
    width: 16.5rem;
    height: 6.5rem;
    border-radius: 0.3rem;
    background-color: v-bind(bg);
    font-size: 1.3rem;
    color: #fff;

    &::after {
      content: '';
      position: absolute;
      top: 1.2rem;
      width: 0.5rem;
      height: 0.5rem;
    }

    .message-container-right-top {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .info {
        margin-left: 1rem;
        transform: translateY(-7%);

        .amount {
          display: inline-block;
        }

        .transfer-status {
          margin-top: 0.3rem;
          font-size: 1rem;
        }
      }
    }

    .message-container-right-bottom {
      padding-top: 0.2rem;
      font-size: 0.85rem;
    }
  }

  &:hover {
    background-color: var(--border);
  }

  .delete-btn {
    opacity: 0;
    position: absolute;
    top: 0;
    font: 1.3rem AlimamaShuHeiTi;
  }

  &:hover .delete-btn {
    opacity: 1;
  }
}

.message-container-right {
  justify-content: right;

  .content {
    margin-right: 0.7rem;

    &::after {
      right: 0;
      background-color: v-bind(bg);
      transform: translateX(50%) rotateZ(45deg);
    }
  }
}

.message-container-left {
  .chat-message {
    max-width: 75%;

    .chat-name {
      margin-left: 0.7rem;
      margin-bottom: 0.1rem;
      font-size: 0.9rem;
      color: var(--text-weak);
    }

    .content {
      margin-left: 0.7rem;

      &::after {
        left: 0;
        background-color: v-bind(bg);
        transform: translateX(-50%) rotateZ(45deg);
      }
    }
  }
}
</style>