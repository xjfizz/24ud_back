import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import organizations from './modules/organizations'
import message from './modules/message'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    app,
    user,
    permission,
    fetch,
    organizations,
    message
  },
  state: {
    isRouterAlive: true
  },
  mutations: {

  },
  getters
})
