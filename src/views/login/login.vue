<template>
  <div class="login">
    <div class="main">
      <div class="left">
        <img src="../../assets/login-bg.png" alt="" />
      </div>
      <div class="right">
        <div class="r-form">
          <div class="hello">
            <img src="../../assets/login-left-line.png" alt="" />
            <span class="text">欢迎使用</span>
            <img src="../../assets/login-right-line.png" alt="" />
          </div>
          <div class="r-title">脑机运营后台</div>
          <el-form :model="formData" :rules="rules" ref="ruleForm">
            <el-form-item label="账号" prop="username">
              <el-input
                placeholder="请输入登录账号"
                v-model.trim="formData.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" style="font-size: 20px">
              <el-input
                placeholder="请输入登录密码"
                type="password"
                v-model.trim="formData.password"
              ></el-input>
            </el-form-item>
            <div class="btn-wrap">
              <el-button class="btn" @click="login">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      rules: {
        //这种rules方案，是可以用来检验例如：手机号是否符合手机号规则，身份证等.官网上还有更简单的
        username: {
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入登录账号'))
            }
            callback()
          },
          trigger: 'blur',
        },
        password: {
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入登录密码'))
            }
            callback()
          },
          trigger: 'blur',
        },
      },
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    async submit() {
      // 这里是真实联网登录。存储用户信息及token
      // let data = JSON.parse(JSON.stringify(this.formData))
      // data.password = btoa(encodeURIComponent(data.password))
      // data.showLoading = true
      // var res = await this.$Http.login(data)
      // // //存储登录token
      // localStorage.setItem('COBRAIN_ADMIN_TK', `bmu ${res.data.token}`)
      // // //存储用户信息
      // this.$store.commit('SET_USER', res.data)
      //跳转页面
      this.$router.push('/patientMessage')
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 90vh;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    .left {
      flex: 48;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        width: 39vw;
        height: 37vw;
      }
    }
    .right {
      flex: 51;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .r-form {
        min-height: 500px;
        min-width: 300px;
        width: 35vw;
        height: 67vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5vw;
        padding-right: 5vw;
        background: linear-gradient(90deg, #619afe 0%, #186cff 100%);
        box-shadow: 0px 0px 40px 0px rgba(15, 19, 40, 0.1);
        border-radius: 20px;
        .hello {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          .text {
            color: #fff;
            font-size: 22px;
            margin: 0 12px;
          }
          img {
            width: 50px;
          }
        }
        .r-title {
          font-size: 34px;
          color: #fff;
          margin-bottom: 7.7vh;
        }
        .btn-wrap {
          width: 100%;
          margin-top: 9.1vh;
          .btn {
            width: 100%;
            border-radius: 35px;
            color: #2e7afe;
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.login {
  .el-form-item__label {
    font-size: 20px;
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #fff;
  }
  ::-webkit-input-placeholder {
    color: #fff !important;
    opacity: 0.7;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: #fff !important;
    opacity: 0.7;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: #fff !important;
    opacity: 0.7;
  }
  :-ms-input-placeholder {
    color: #fff !important;
    opacity: 0.7;
  }
  .el-textarea__inner,
  .el-input__inner {
    background: transparent !important;
    color: #fff;
    caret-color: #fff;
  }
  input:-internal-autofill-previewed,
  input:-internal-autofill-selected {
    -webkit-text-fill-color: #fff !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }
  .el-form-item__label {
    font-size: 20px;
    color: #fff;
  }
  .el-input__inner {
    height: 5.5vh;
    min-height: 50px;
  }
}
</style>
