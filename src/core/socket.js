import io from 'socket.io-client'
import Vue from 'vue'

const socket = io('http://localhost:3000')

Vue.prototype.$socket = socket

socket.on('connect', () => {
  console.log('connect success')
  // socket.emit('print', {
  //   printMachine: 'TSC TTP-244 Pro',
  //   url: 'https://www.baidu.com/'
  // })
})
