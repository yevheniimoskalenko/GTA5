<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-form ref="form" :model="data" :rules="rules">
          <div class="content">
            <h2>Sign in</h2>
          </div>
          <el-form-item label="email" prop="email">
            <el-input v-model="data.email"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input
              v-model="data.password"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" @click="login">sign in</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      loading: false,
      data: { email: 'testjokerqwerty@gmail.com', password: '1qaz2wsx' },
      rules: {
        email: [
          { required: true, message: 'email is required' },
          { type: 'email', message: 'email is need valide' }
        ]
      }
    }
  },
  created() {
    if (this.$auth.$state.loggedIn) {
      this.$router.replace({ name: 'panel' })
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            const data = {
              email: this.data.email,
              password: this.data.password
            }
            await this.$auth.loginWith('local', { data })
            this.$router.push({ name: 'panel' })
          } catch (e) {
            this.$message({
              message: 'user is not logged in',
              type: 'error'
            })
            console.log(e)
          } finally {
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  },
  head: { title: 'Sign in' }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
}
</style>
