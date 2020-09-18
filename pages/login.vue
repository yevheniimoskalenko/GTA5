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
            <el-button @click="login">sign in</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: { email: '', password: '' },
      rules: {
        email: [
          { required: true, message: 'email is required' },
          { type: 'email', message: 'email is need valide' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const data = {
              email: this.data.email,
              password: this.data.password
            }
            await this.$store.dispatch('login', data)
          } catch (e) {}
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
