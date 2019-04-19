const mutations = {
  CHANGE_NAV_INDEX(state, _index) {
    state.navIndex = _index
    sessionStorage.navIndex = _index
  },
  CHANGE_USER_ROLE(state, _user) {
    state.userRole = Number(_user)
  }
}
export default mutations
