<template>
    <div class="Home_Page_Body">
        <div></div>
        <!-- <div style="height: 500px; width: 500px; background-color: aliceblue">
      <imageVue :filepath="filepath" />
    </div> -->
        <div style="height: 500px; width: 500px; background-color: aliceblue">
            <MyQrCode />
        </div>
        <div style="height: 500px; width: 500px; background-color: aliceblue">
            <video controls>
                <source
                    src="http://192.168.44.8:8080/SWZDH/File/streamVideo?video_path=UpFile/20231011665212big_buck_bunny.mp4 "
                    type="video/mp4" />
            </video>
        </div>
        <div style="height: 500px; width: 500px; background-color: aliceblue">
            <el-date-picker
                v-model="tm"
                type="datetime"
                placeholder="时间选择器" />
            <el-text class="mx-1" size="large">{{ showtm }}</el-text>
            <br />
            <el-input v-model="tm1" placeholder="请输入日期"></el-input>
            <el-text class="mx-1" size="large">{{ showtm1 }}</el-text>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Viedo from '../Viedo/Viedo.vue';
import MyQrCode from '@/components/QrCode/QrCode.vue';
import imageVue from '@/components/common/image/image.vue';

import dayjs from 'dayjs';
export default defineComponent({
    name: 'Home_page',
    setup() {
        let filepath = ref('UpFile/20230411328659R.jpg');
        let msg = ref('测试');
        let tm = ref('');
        let tm1 = ref('');
        let showtm = computed(() => {
            if (!tm.value) {
                return '';
            }
            // 传递函数
            return dayjs(tm.value).format('MM-DD HH:mm');
        });
        let showtm1 = computed(() => {
            if (!tm1.value) {
                return '';
            }
            // 传递函数
            return dayjs(tm1.value).format('MM-DD HH:mm');
        });

        return {
            msg,
            filepath,
            tm,
            showtm,
            tm1,
            showtm1,
        };
    },

    components: {
        Viedo,
        imageVue,
        MyQrCode,
    },
});
</script>

<style lang="scss" scoped>
.Home_Page_Body {
    width: 100%;
    height: 100%;
    background-color: #f0f;
    display: flex;
}
</style>
