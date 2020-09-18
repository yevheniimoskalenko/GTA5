export const state = () => ({ error: null })
export const mutations = {
  setError(state, payload) {
    return (state.error = payload)
  }
}
export const getters = {}
export const actions = {
  async create({ commit }, payload) {
    try {
      await this.$axios.$post('/api/create', payload)
    } catch (e) {
      commit('setError', e)
    }
  }
}
