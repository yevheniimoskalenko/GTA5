<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-form ref="form" :model="data" :rules="rules">
          <div class="content">
            <h2>Sign up</h2>
          </div>
          <el-form-item label="email" prop="email">
            <el-input v-model="data.email"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input
              v-model="data.password"
              type="password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-form-item label="Confirm password" prop="confirmPassword">
            <el-input
              v-model="data.confirmPassword"
              type="password"
              show-password
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" @click="create"
              >Create new Account</el-button
            >
            <nuxt-link to="login">Sign in</nuxt-link>
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
    const firstValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please requred the password'))
      } else {
        if (this.data.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    const secondValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please requred the password again'))
      } else if (value !== this.data.password) {
        callback(new Error("Two requreds don't match!"))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      data: {
        email: 'test@gmail.com',
        password: '1qaz2wsx',
        confirmPassword: '1qaz2wsx'
      },
      rules: {
        email: [
          { required: true, message: 'email is required' },
          { type: 'email', message: 'email is need valide' }
        ],
        password: [{ validator: firstValidator, trigger: 'blur' }],
        confirmPassword: [{ validator: secondValidator, trigger: 'blur' }]
      }
    }
  },
  methods: {
    create() {
      this.$refs.form.validate(async (valid) => {
        this.loading = true

        if (valid) {
          try {
            const data = {
              email: this.data.email,
              password: this.data.password
            }
            const response = await this.$store.dispatch('create', data)
            this.$message({
              message: response.message,
              type: response.status
            })
          } catch (e) {
            this.loading = false
          } finally {
            this.loading = false
          }
        } else {
        }
      })
    }
  },
  head: { title: 'Sign up' }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
}
</style>
