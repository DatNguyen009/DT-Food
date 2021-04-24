<template>
  <el-backtop  :bottom="100">
    <div class="backTop">
      <i class="el-icon-arrow-up"></i>
    </div>
  </el-backtop>
</template>

<script>
import ElementUI from 'element-ui'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export default {

}
</script>

<style>
.backTop{
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
    border-radius: 50%;
}
</style>