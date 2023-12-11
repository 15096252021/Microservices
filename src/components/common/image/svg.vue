<template>
    <div class="design">
        <div class="design-img">
            <img
                src="@/assets/images/svg/src_assets_logo.svg"
                id="design-svg-id" />
        </div>
        <div
            class="design-color-extract"
            :ref="extractRef"
            id="extract-id"></div>
        <div class="design-color-select-box">
            <div
                class="design-color-select-box-record"
                :ref="selecttRef"
                id="select-id"></div>
            <div class="design-color-select-box-focus">
                <div class="design-color-select-box-focus-color-value">
                    {{ colorValue }}
                </div>
                <div
                    class="design-color-select-box-focus-box"
                    id="select-color-box-id"></div>
            </div>
            <!-- <div class="design-color-select-box-svg-size">
                <a-input-number
                    id="inputNumber"
                    v-model:value="sizeValue"
                    :min="1"
                    :max="10"
                    class="design-color-select-box-svg-size-input" />
            </div> -->
        </div>
        <div class="design-color-quick-extract"></div>
    </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs, watch } from 'vue';
export default {
    name: 'DesignSvg',
    props: {},
    setup() {
        const state = reactive({
            sizeValue: ref(0),
            colorValue: ref('#'),
            colorArray: [
                'd81e06',
                'f4ea2a',
                '1afa29',
                '1296db',
                '13227a',
                'd4237a',
                'ffffff',
                'e6e6e6',
                'dbdbdb',
                'cdcdcd',
                'bfbfbf',
                '8a8a8a',
                '707070',
                '515151',
                '2c2c2c',
            ],
            colorSelected: [
                'e6e6e6',
                'dbdbdb',
                'cdcdcd',
                'bfbfbf',
                '8a8a8a',
                '707070',
                '515151',
                '2c2c2c',
            ],
            colorDomSelect: [],
            colorDomRecord: [],
        });
        const extractRef = ref(null);
        const selecttRef = ref(null);
        onMounted(() => {
            // 选择颜色
            initBoxColor();
            // 历史选择颜色
            initBoxSelected();
            // 选择的数组
            console.log('domSelect', state.colorDomSelect);
            console.log('domRecord', state.colorDomRecord);
            initClick();
        });
        // 获取颜色
        function initBoxColor() {
            state.colorArray.map((item) => {
                let singleBoxColor = document.createElement('div');
                singleBoxColor.className = 'box';
                singleBoxColor.style.background = '#' + item;
                state.colorDomSelect.push(singleBoxColor);
                document
                    .getElementById('extract-id')
                    .appendChild(singleBoxColor);
            });
        }
        // 容器记录选中的颜色
        function initBoxSelected() {
            state.colorSelected.map((item) => {
                let singleBoxColor = document.createElement('div');
                singleBoxColor.className = 'box';
                singleBoxColor.style.background = '#' + item;
                state.colorDomRecord.push(singleBoxColor);
                document
                    .getElementById('select-id')
                    .appendChild(singleBoxColor);
            });
        }
        // 添加事件 修改color
        function initClick() {
            state.colorDomSelect.map((item, index) => {
                item.addEventListener('click', function () {
                    // color
                    state.colorValue = '#' + state.colorArray[index];
                    document.getElementById(
                        'select-color-box-id'
                    ).style.background = `${state.colorValue}`;
                    // record
                    if (state.colorSelected.includes(state.colorArray[index])) {
                        console.log('have');
                    } else {
                        // 加入数组第一个
                        let length = state.colorSelected.length;
                        for (let loc = length - 1; loc > -1; --loc) {
                            if (loc === 0) {
                                // 第一个元素
                                state.colorSelected[loc] =
                                    state.colorArray[index];
                            } else {
                                // 后移一位
                                state.colorSelected[loc] =
                                    state.colorSelected[loc - 1];
                            }
                            // 替换颜色
                            state.colorDomRecord[loc].style.background =
                                '#' + state.colorSelected[loc];
                        }
                        // console.log("state.colorDomRecord", state.colorDomRecord);
                    }
                });
            });
        }
        // 监听颜色变化
        watch(
            () => state.colorValue,
            () => {
                if (state.colorValue) {
                    document.getElementById(
                        'design-svg-id'
                    ).style.transform = `translate(-500px)`;
                    document.getElementById(
                        'design-svg-id'
                    ).style.filter = `drop-shadow(500px 0 0 ${state.colorValue})`;
                }
            }
        );
        // 监听svg大小变化
        watch(
            () => state.sizeValue,
            () => {
                console.log(
                    'size',
                    document.getElementById('design-svg-id').style.transform
                );
                if (state.sizeValue > 0) {
                    let num = state.sizeValue * 0.1 + 1;
                    document.getElementById(
                        'design-svg-id'
                    ).style.transform = `scale(${num})`;
                } else {
                    state.sizeValue = 1;
                }
            }
        );
        return { ...toRefs(state), extractRef, selecttRef };
    },
};
</script>

<style>
.design {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(241, 193, 164, 0.603);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
}
.design-img {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 300px;
}
.design-color-extract {
    position: relative;
    display: flex;
    height: 60px;
}
.design-color-select-box {
    position: relative;
    display: flex;
}
.design-color-select-box-record {
    position: relative;
    display: flex;
    width: 50%;
    height: 60px;
}
.design-color-quick-extract {
    position: relative;
    height: 60px;
}
.design-color-select-box-focus {
    position: relative;
    margin-left: 10px;
    width: 110px;
    height: 50px;
    border: 1px solid #444;
    display: flex;
    background: #fff;

    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
}
.design-color-select-box-focus-box {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 25px;
    border: 1px solid #444;
    margin-left: 20px;
    width: 25px;
}
.design-color-select-box-focus-color-value {
    position: relative;
    width: 60px;
    margin-left: 2px;
    top: 50%;
    transform: translateY(-50%);
    height: 25px;
    border: 1px solid #444;
    text-align: left;
}
.design-color-select-box-svg-size {
    position: relative;
    margin-left: 10px;
    width: 100px;
    height: 50px;
    border: 1px solid #444;
    overflow: hidden;
    box-sizing: border-box;
}

.design-color-select-box-svg-size-input {
    position: relative;
    outline: none;
    text-align: center;
    width: 100%;
    height: 100%;
}
.box {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
}
</style>
