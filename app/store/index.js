export const strict = false;

export const state = () => ({
  isReaded: null,
});

export const mutations = {
  setIsReaded(state, payload) {
    state.isReaded = payload;
  },
};

export const actions = {
  setIsReaded({ commit }, payload) {
    commit('setIsReaded', payload);
  },
};

export const getters = {
  getIsReaded(state) {
    return state.isReaded;
  },
};
