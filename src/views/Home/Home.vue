<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-c" ><Header></Header></el-header>
      <el-container>
        <el-aside width="200px">11</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from "@/views/Home/Header.vue"

export default defineComponent({
  setup () {
    

    return {}
  },
  components:{
    Header
  }
})
</script>

<style lang="scss" scoped>
  .header-c{
    background-color: #f0f0f0;
  }
</style>