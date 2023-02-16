<template>

  <el-row :gutter="20">
    <el-col :span="10">  <div class="grid-content ep-bg-purple" ><img src="@/assets/logo.png" /></div>    
    </el-col>
    <el-col :span="7"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="7"><div class="grid-content ep-bg-purple" /></el-col>

  </el-row>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  setup() {


    return {}
  }
})
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  height: 3.75rem;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  padding-left: 0px !important;
}

.grid-content {
  border-radius: 4px;
  height:3.75rem;
  background-color: red;
}
.grid-content img{
  height: 100%;
  width: 100%;
}
</style>