const utils = {
    /**
     * 时间比较大小工具方法-Moment
     *
     */
    compareMoment: (start,end) => {
        console.log('start,end', new Date(start),new Date(end))
        let startTime = new Date(start)
        let endTime = new Date(end)
        startTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate() + ' ' + startTime.getHours() + ':' + startTime.getMinutes() + ':' + startTime.getSeconds();
        endTime = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' ' + endTime.getHours() + ':' + endTime.getMinutes() + ':' + endTime.getSeconds();
        startTime =  new Date(Date.parse(startTime.replace("-","/")))
        endTime = new Date(Date.parse(endTime.replace("-","/")))
        let text = startTime - endTime
        console.log('比较时间', startTime, endTime,text)
        if (text > 0 ) {
            return -1 // 开始时间大于结束时间
        } else if(text < 0) {
            return 1 // 开始时间小于结束时间
        } else if(text === 0) {
            return 0 // 开始时间等于结束时间
        }
    },
    /**
     * 时间比较大小工具方法-time, 12:05:03
     *
     */
    compareTime: (start,end) => {
        console.log('start,end', new Date(start),new Date(end))
        let date = new Date()
        let startTime = start.split(":")
        let endTime =   end.split(":")
        console.log('start,end', start,end)
        let text = (Number(startTime[0] * 3600) + Number(startTime[1] * 60) + Number(startTime[2])) - (Number(endTime[0] * 3600) + Number(endTime[1] * 60) + Number(endTime[2]))
        console.log('比较时间', startTime, endTime,text)
        if (text > 0 ) {
            return -1 // 开始时间大于结束时间
        } else if(text < 0) {
            return 1 // 开始时间小于结束时间
        } else if(text === 0) {
            return 0 // 开始时间等于结束时间
        }
    },
    /**
     * 时间转换-time, Moment --- 12:05:03
     *
     */
    timeTransfar: (time) => {
        let returnTime = new Date(time)
        returnTime = returnTime.getHours() + ':' + returnTime.getMinutes() + ':' + returnTime.getSeconds();

        return returnTime
    },


}
export {utils}
