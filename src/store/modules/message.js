export default{
  state:{
    isNewMessage: 0,
    isClickMessage: '',
  },
  mutations: {
    SET_ISNEWMESSAGE(state, data){
        state.isNewMessage = data
        console.log(' state.isNewMessage',  state.isNewMessage)
    },
    SET_ISCLICKMESSAGE(state, data){
      state.isClickMessage = data
      console.log('state.isClickMessage', state.isClickMessage)
  },
  
  },
  actions: {
    changeMesage({commit},data) {
      console.log('changeMesage', data)
      commit('SET_ISNEWMESSAGE', data)
    },
    clickMesage({commit},data) {
      console.log('changeMesage', data)
      commit('SET_ISCLICKMESSAGE', data)
    },
  }
}