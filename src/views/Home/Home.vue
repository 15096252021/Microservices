<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="common-layout" v-loading="loading">
    <el-container>
      <el-header class="header-c">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <router-link to="Viedo">测试</router-link>
        </el-aside>
        <el-main>
          <router-view></router-view>
          <h2>{{ name }}</h2>
          <button @click="chageName">改变name</button>
        </el-main>
      </el-container>
    </el-container>
</div>
</template>

<script lang="ts">


import { defineComponent, ref } from 'vue'
import Header from "@/views/Home/Header.vue"
import { storeToRefs } from 'pinia'
import { useStore } from '@/store';
import { showLoading } from '@/utils/Loading';
export default defineComponent({
  setup() {
    const store = useStore();
    const { name } = storeToRefs(store);
    const chageName = () => {
      name.value = "大厦大家撒谎的骄傲和时间";
    }
    const loading = ref(true);
    showLoading(loading);
    return {
      name, chageName, loading
    }
  },
  components: {
    Header
  }
})
</script>

<style lang="scss" scoped>
.header-c {
  background-color: #f0f0f0;
}
</style>