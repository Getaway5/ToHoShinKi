<template>
  <el-form :model="form" :rules="rules" ref="form" class="form">
    <el-form-item prop="username" class="form-item">
      <el-input v-model="form.username" placeholder="手机号码"></el-input>
    </el-form-item>
    <el-form-item prop="captcha" class="form-item">
      <el-input v-model="form.captcha" placeholder="验证码">
        <el-button slot="append" @click="handleSendCaptcha">发送验证码</el-button>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname" class="form-item">
      <el-input v-model="form.nickname" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword" class="form-item">
      <el-input type="password" v-model="form.checkPassword" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit" @click="handleRegSubmit">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    /** 
         * 验证表单不能为空
        rule是当前规则（用不上）
        value是输入框的值
        callback 是回调函数，必须要调用，调用才能报错
        */
    const validatePass = (vule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", //手机号码
        nickname: "", //昵称
        captcha: "", //手机验证码
        password: "", //密码
        checkPassword: "" //确认密码
      },
      //表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [
          // validator： 自定义的验证函数
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      //发送验证码
    handleSendCaptcha() {
        const phoneNumber=this.form.username

        if(phoneNumber.trim()===''){
            this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: '确定',
          showCancelButton:false,
          type: 'warning'
        })
        return;
        }
        if(phoneNumber.length!==11){
             this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: '确定',
          showCancelButton:false,
          type: 'warning'
        })
        return;
        }

        // 获取验证码
        this.$store.dispatch('user/sendCode',phoneNumber)
          .then(res => {
              console.log(res);
              
           this.$confirm(`验证码:${res}`, "验证码", {
          confirmButtonText: '确定',
          showCancelButton:false,
          type: 'warning'
        })
      });
    },

        // 注册
        handleRegSubmit(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    // ...props表示除了checkPassword以外的其他属性
                    const {checkPassword,...props}=this.form
                    this.$axios({
                        url:'/accounts/register',
                        method:'post',
                        data:props
                    }).then(res=>{
                         // 保存到vuex
                        this.$store.commit("user/setUserInfo", res.data);
                        this.$router.push('/')
                        
                    }).catch(err=>{
                        console.log(err.response);
                    })
                }
            })
        }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
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

