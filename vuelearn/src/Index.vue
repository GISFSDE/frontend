<template>
  <el-container>
    <el-header>FG Front End</el-header>
    <el-main><el-row :gutter="20">

        <el-col :span="6">
          <div class="grid-content bg-purple"> <a
              href="https://cn.vuejs.org/guide/essentials/component-basics.html">VUE</a></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">ES6</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">HTML5</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">JQuery</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">TOOL</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">FRAME</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">UI</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">3D</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">GIS</div>
        </el-col>
      </el-row></el-main>
    <el-footer>GISFSDE</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  margin-top: 5%;
  border-radius: 4px;
  min-height: 360px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
