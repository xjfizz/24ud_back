<template>
  <div class="main">
    <p class="title">全国快递行业大数据分析</p>
    <div class="item">
      <chart-bar style="width:30%"  :value="chartData.value" :text="chartData.text" :subtext="chartData.subtext"></chart-bar>
      <chart-pie style="width:70%"   :value="chartData.value" :text="chartData.text" :subtext="chartData.subtext"></chart-pie>
    </div>
    <div class="item">
      <chart-bar2 style="width:100%"  :value="chartData.value" :text="chartData.text" :subtext="chartData.subtext"></chart-bar2>
    </div>
    <!-- <img src="/avatar2.jpg" alt=""> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { ChartPie, ChartBar, ChartBar2 } from './charts/index'

export default {
  name: 'Home',
  components:{
    ChartBar,
    ChartPie,
    ChartBar2
  },
  data () {
    return {
      targetTime: new Date().getTime() + 3900000,
      chartData: {
        value: {},
        text: '',
        subtext: ''
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .title{
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    color: blueviolet
  }
  .main{
    width: 100%;
    background: #ffffff;
    padding: 20px 20px;
    /* min-height: 600px; */
  }
  .item{
    width: 100%;
    margin-top: 20px;
    display: flex;
  }

</style>
