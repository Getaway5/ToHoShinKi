export const state=()=>({
    userInfo:{
        token:"",
        // 用户信息
        user:{}
    }
})

export const mutations={
    // 设置用户信息
    setUserInfo(state,data){
        state.userInfo=data;
    },

    clearUserInfo(state){
        state.userInfo={
            token:'',
            user:{}
        }
    }
}

export const actions={
    login({commit},data){
        return this.$axios({
            url:'/accounts/login',
            method:'post',
            data
        }).then(res=>{
            const data=res.data;
            commit('setUserInfo',data)
            return data;
        })
    },

    sendCode(store,phoneNumber){
        return this.$axios({
          url: "/captchas",
          method: "post",
          data: {
            tel: phoneNumber
          }
        }).then(res => {
            const {code}=res.data
            return code
        });
    }
}


