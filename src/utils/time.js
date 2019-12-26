import moment from 'moment'

const YMD = 'YYYY-MM-DD'
export const time2moment = (format) => time => moment(time, format)

export const range2ymd = (...times) => times.map(item => time2moment(YMD)(item))

export const getRangeNow = () => {
  const now = moment(YMD)
  return [now, now]
}
const
  s = 1000,
  m = 60 * s,
  h = 60 * m,
  d = 24 * h,
  mo = 30 * d,
  y = 365 * d

const date = [
  {
    time: y,
    text: '年'
  }, {
    time: mo,
    text: '月'
  }, {
    time: d,
    text: '天'
  }, {
    time: h,
    text: '小时'
  }, {
    time: m,
    text: '分钟'
  }, {
    time: s,
    text: '秒'
  }
]

function time2last(time) {
  // 计算出时间差
  const cal = Date.now() - new Date(time)
  for (let i = 0; i < date.length; i++) {
    const t = cal / date[i].time
    if (t >= 1) {
      return Math.floor(t) + date[i].text + '前'
    }
  }

}
