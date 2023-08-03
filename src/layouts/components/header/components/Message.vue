<template>
  <div class="message">
    <el-popover placement="bottom" :width="310" trigger="click">
      <template #reference>
        <el-badge :value="5" class="item">
          <IconRemind class="cursor-pointer toolBar-icon" />
        </el-badge>
      </template>

      <el-tabs v-model="activeName">
        <el-tab-pane label="通知(5)" name="first">
          <div class="message-list">
            <div class="message-item">
              <img
                src="@/assets/images/msg01.png"
                alt=""
                class="message-icon"
              />
              <div class="message-content">
                <span class="message-title">一键三连 Cch-Admin 🧡</span>
                <span class="message-date">一分钟前</span>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="消息(5)" name="second">
          <div class="message-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无消息</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="代办(5)" name="third">
          <div class="message-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无代办</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import IconRemind from "@/components/icons/IconRemind.vue";
import { ref } from "vue";

const activeName = ref("first");
</script>

<style lang="scss" scoped>
.message-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
  line-height: 45px;
}

.message-list {
  display: flex;
  flex-direction: column;

  .message-item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-light);

    &:last-child {
      border: none;
    }

    .message-icon {
      width: 40px;
      height: 40px;
      margin: 0 20px 0 5px;
    }

    .message-content {
      display: flex;
      flex-direction: column;

      .message-title {
        margin-bottom: 5px;
      }

      .message-date {
        color: var(--el-text-color-secondary);
        font-size: 12px;
      }
    }
  }
}
</style>
