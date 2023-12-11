<template>
    <div class="qrcode-container">
        <!-- <QRCode :value="qrText" :width="500"></QRCode> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import QRCode from 'vue-qrcode';

export default defineComponent({
    setup() {
        // let qrText = 'http://localhost:5173/#/system/homepage';
        let qrText = ref('http://localhost:5173/#/system/homepage');
        return {
            qrText,
        };
    },
    components: {
        QRCode,
    },
});
</script>

<style lang="scss" scoped>
.qrcode-container {
    width: 100%;
    height: 100%;
}
</style>
