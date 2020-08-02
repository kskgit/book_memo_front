export const state = () => ({
  showLoading: false,
})
export const mutations = {
  loadingStart(state) {
    state.showLoading = true
  },
  loadingStop(state) {
    state.showLoading = false
  },
}
export const actions = {
  loadingStart({ commit }) {
    commit("loadingStart")
  },
  loadingStop({ commit }) {
    commit("loadingStop")
  },
}
export const getters = {
  showLoading(state) {
    return state.showLoading
  },
}
