<template>
  <div id="chart-part1">
    <div ref="dom" class="charts chart-bar"></div>
  </div>


</template>

<script>
/*import tdTheme from './theme.json'
/!*import { on, off } from '@/libs/tools'*!/
echarts.registerTheme('tdTheme', tdTheme)*/
export default {

  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    // 显示图表
    getEchartData() {
      console.log('------')
      const dom = this.$refs.dom;
      if(dom) {
        const myChart = this.$echarts.init(
          // document.getElementById('chart-part1')
          dom
        )
        const options = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data:['当日达','即时达','涨跌幅']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '单量',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value} 单'
              }
            },
            {
              type: 'value',
              name: '涨跌幅',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [
            {
              name:'当日达',
              type:'bar',
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name:'即时达',
              type:'bar',
              data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name:'涨跌幅',
              type:'line',
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
          ]

        }
        myChart.setOption(options)
        window.addEventListener("resize", function () {
          myChart.resize();
        })
      }
    }
  },
  mounted () {
     this.getEchartData();
    // this.$nextTick(() => {
    //   let xAxisData = Object.keys(this.value)
    //   let seriesData = Object.values(this.value)
    //   let option = {
    //     title: {
    //       text: this.text,
    //       subtext: this.subtext,
    //       x: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: xAxisData
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     series: [{
    //       data: seriesData,
    //       type: 'bar'
    //     }]
    //   }
    //   this.dom = echarts.init(this.$refs.dom, 'tdTheme')
    //   this.dom.setOption(option)
    //   // on(window, 'resize', this.resize)
    // })
  },
  beforeDestroy () {
    // off(window, 'resize', this.resize)
  }
}
</script>
<style lang="less" scoped>
  .chart-bar{
    //width: 600px;
    width: 100%;
    height: 600px;
  }

</style>
