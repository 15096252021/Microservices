<template>
  <div class="aside">
    <h2>520{{name}}</h2>
    <button @click="chageName">改变name</button>
</div>
</template>
<script lang="ts">

import axios from "axios";
import { defineComponent, onMounted, reactive } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: "Aside",
  setup() {
    const mensList: any = [];
    let menus = reactive({ mensList });
    const app = useStore();
    const {name} = storeToRefs(app);
    const chageName = () =>{
      name.value = "特殊的吉萨大和"
    }
    return {
      name,chageName
    };
  },
});
</script>

<style lang="scss" scoped>
.el-menu-item.is-active {
  background-color: var(--el-menu-hover-bg-color);
}

.collpase-btn {
  text-align: center;
  width: 100%;
  padding: 10px 0px;
  cursor: pointer;

  .el-icon {
    color: white;
    font-size: 24px;
  }
}
</style>
