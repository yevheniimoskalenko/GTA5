<template>
  <div>
    {{ $auth.$state.user.email }}
    <el-button @click="logout">logout</el-button>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped></style>
