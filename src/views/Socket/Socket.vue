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
    <div class="video-div">
        <video ref="video" id="videoHTml" autoplay mirror></video>
        <audio ref="audio" autoplay></audio>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, toRefs, ref } from 'vue';
import io from 'socket.io-client';
import {
    SocketIoData,
    connectSocket,
    disconnectSocket,
    inviteUser,
    createSocket,
    gainVideoStream,
} from './SocketIo';
import { userDataInt } from './SocketIOType';
export default defineComponent({
    name: 'socketVue',
    setup() {
        // onMounted(() => {
        //   createSocket({ type: 'Servlet' });
        //   connectSocket();
        //   gainVideoStream(
        //     document.getElementById('videoHTml') as HTMLVideoElement,
        //     video,
        //     audio
        //   );
        // });

        // onUnmounted(() => {
        //   disconnectSocket();
        // });

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
        let video = ref();
        let audio = ref();
        const connectionStatus = ref('Not connected');
        let socket;

        onMounted(() => {
            // 连接到 Socket.IO 服务器
            // socket = io('http://127.0.0.1:10084/WDCD'); // 服务器地址
            socket = io('http://192.168.44.8:10084', {
                path: '/WDCD',
                query: { token: '4522' },
                transports: ['websocket', 'polling'],
                // transports: [''],
                ackTimeout: 30000,
                reconnectionAttempts: 2,
                reconnectionDelay: 2000,
            });

            // 监听连接事件
            socket.on('connect', () => {
                connectionStatus.value = 'Connected';
            });

            // 监听断开连接事件
            socket.on('disconnect', () => {
                connectionStatus.value = 'Disconnected';
            });

            // 你可以在这里监听其他自定义事件
            // socket.on('customEvent', (data) => {
            //   console.log('Received custom event:', data);
            // });
        });

        return {
            ...toRefs(SocketIoData),
            inviteUser,
            tableRowClassName,
            video,
            audio,
        };
    },
});
</script>

<style lang="scss" scoped>
:root {
    .el-table .warning-row {
        --el-table-tr-bg-color: var(#ee1212);
    }
    .el-table .success-row {
        --el-table-tr-bg-color: var(#16c96f);
    }
}

.video-div {
    width: 31.25rem;
    height: 31.25rem;
    background-color: aquamarine;
}
.video-div video {
    transform: scaleX(-1);
}
</style>
