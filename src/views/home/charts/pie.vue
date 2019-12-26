<template>
  <div id="chart-part1">
    <div ref="dom" class="charts chart-pie"></div>
  </div>


</template>

<script>
  /*import tdTheme from './theme.json'
  /!*import { on, off } from '@/libs/tools'*!/
  echarts.registerTheme('tdTheme', tdTheme)*/
  export default {

    name: 'ChartPie',
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
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              // orient: 'vertical',
              // x: 'top',
              data:['冷链物流','敏捷物流','军事物流','电子商务','云物流','虚拟物流','运输','储存','配送','包装']
            },
            series: [
              {
                name:'物流分类',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                  normal: {
                    position: 'inner'
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:[
                  {value:335, name:'冷链物流', selected:true},
                  {value:679, name:'电子商务'},
                  {value:1548, name:'云物流'}
                ]
              },
              {
                name:'物流分类',
                type:'pie',
                radius: ['40%', '55%'],
                label: {
                  normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                      a: {
                        color: '#999',
                        lineHeight: 22,
                        align: 'center'
                      },
                      // abg: {
                      //     backgroundColor: '#333',
                      //     width: '100%',
                      //     align: 'right',
                      //     height: 22,
                      //     borderRadius: [4, 4, 0, 0]
                      // },
                      hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                      },
                      b: {
                        fontSize: 16,
                        lineHeight: 33
                      },
                      per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2
                      }
                    }
                  }
                },
                data:[
                  {value:335, name:'冷链物流'},
                  {value:310, name:'敏捷物流'},
                  {value:234, name:'军事物流'},
                  {value:135, name:'电子商务'},
                  {value:1048, name:'云物流'},
                  {value:251, name:'虚拟物流'},
                  {value:147, name:'运输'},
                  {value:102, name:'储存'}
                ]
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
  .chart-pie{
    // width: 800px;
    width: 100%;
    height: 600px;
  }

</style>
