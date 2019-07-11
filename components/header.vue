<template>
  <div class="container">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 导航栏 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div>
        <!-- 注册登录 -->
        <div class="denglu" v-if="false">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
        <!-- 用户 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
            略略略
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div></div>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="less" >
.container {
  box-shadow: 0 2px 2px #ddd;
}

.main {
  margin: 0 auto;
  height: 60px;
  width: 1000px;
  line-height: 60px;
}

.logo {
  margin-right: 20px;
  img {
    width: 156px;
    height: 43px;
    margin-top: 9px;
  }
}

.navs {
  flex: 1;
  a {
    display: block;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;

    &:hover {
      color: #409eff;
      border-bottom: 4px solid #409eff;
    }
  }

  .nuxt-link-exact-active {
    background-color: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}

.denglu {
  a {
    &:hover {
      color: #409eff;
    }
  }
}

.el-dropdown-link{
    img{
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}
</style>