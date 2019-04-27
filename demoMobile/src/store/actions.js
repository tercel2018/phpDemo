const actions = {
  CHANGE_NAV_INDEX({ commit }, _index) {
    commit('CHANGE_NAV_INDEX', _index)
  },
  CHANGE_USER_ROLE({ commit }, _user) {
    commit('CHANGE_USER_ROLE', _user)
  }
}
export default actions
