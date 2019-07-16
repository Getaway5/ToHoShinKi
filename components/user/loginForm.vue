<template>
  <el-form :model="form" :rules="rules" ref="form" class="form">
    <el-form-item prop="username" class="form-item">
      <el-input type="username" v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-form-item>
      <el-button type="primary" class="submit" @click="handelLog">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
          username:'13800138000',
          password:'123456'
      },
    //   表单校验规则
      rules:{
              username:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
              password:[{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
      handelLog(){
          this.$refs['form'].validate((valid)=>{
              if(valid){
                 this.$store.dispatch('user/login',this.form)
                 .then(res=>{
                    //  console.log(res);
                    this.$message({
                        message: "登录成功",
                        type: "success"
                    });
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1000);
                 })
              }
          })
      }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding:25px;
}

.form-item {
  margin-bottom:20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
