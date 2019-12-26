/*
 * @Author: your name
 * @Date: 2019-11-22 17:32:52
 * @LastEditTime: 2019-12-06 15:10:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\utils\util.js
 */
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

export const formatLetter = (str) => str.replace(/(-[a-z])/g, (match) => match[1].toUpperCase())

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export const getRandomColor = () => {
  // const rgb = [1, 2, 3].map(item => {
  //   return Math.floor(Math.random() * 256)
  // }).join()
  // return `rgb(${rgb})`


      let r = Math.floor(Math.random()*256); // 16进制
			let g = Math.floor(Math.random()*256);
			let b = Math.floor(Math.random()*256);
			let color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
      return color;
      
      // let r = Math.floor(Math.random()*256); // rgb进制
			// let g = Math.floor(Math.random()*256);
			// let b = Math.floor(Math.random()*256);
			// let rgb = '('+r+','+g+','+b+')';
			// return rgb;

}
