<template>
  <el-table
    :data="userList"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column prop="id" label="主键" width="720" />
    <el-table-column prop="busy" label="是否忙碌" width="180" />
    <el-table-column prop="initiate" label="是否为发起者" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="inviteUser(scope.row)"
          >发起通话</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, toRefs } from 'vue';
import {
  SocketIoData,
  connectSocket,
  disconnectSocket,
  inviteUser,
  createSocket,
} from './SocketIo';
import { userDataInt } from './SocketIOType';
export default defineComponent({
  name: 'socketVue',
  setup() {
    onMounted(() => {
      createSocket({ type: 'Servlet' });
      connectSocket();
    });

    onUnmounted(() => {
      disconnectSocket();
    });

    const tableRowClassName = ({
      row,
      rowIndex,
    }: {
      row: userDataInt;
      rowIndex: number;
    }) => {
      if (row.busy) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    };
    return {
      ...toRefs(SocketIoData),
      inviteUser,
      tableRowClassName,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(#ee1212);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(#16c96f);
}
</style>
