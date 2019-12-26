<template>
  <a-modal
    :title="title"
    :visible="visible"
    :footer="null"
    @cancel="handleClose"
    :destroyOnClose="true"
    :width="900"
  >
    <map-form :row="currentArea" :points="points" :visible="formVisible" @close="handleCloseForm"/>
  </a-modal>
</template>
<script>
export default {
  name: 'AreaMap',
  data() {
    return {
      options: { ...CONFIG.option },
      isDraw: false,
      isEdit: false, // 编辑模式
      clickMap: null,
      amap: null,
      District: null, // 行政区域
      ToolBar: null, // 工具栏
      Geolocation: null, // 定位
      cityPolygons: [],
      points: [], // 节点
      markers: [], // 定位标识
      polygonEditor: null,
      currentArea: {},
      formVisible: false,
      polygonContainer: {}
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    markers(e) {
      if (e.length > 2) {
        const { amap, makers } = this
        AMap.event.removeListener(this.clickMap)
        this.createPolygon()
        amap.remove(this.markers)
      }
    }
  },
  mounted() {
    this.amapView()
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSlect(e) {
      const { pid, city, level } = e
      this.currentArea = e
      if (level === 0) return
      if (level < 3) {
        this.getDistrictCity(city)
      } else {
        this.drawAreaLevel3(e)
      }
    },
    amapView() {
      const { options } = this
      const amap = (this.amap = new AMap.Map('container', options.map))
      AMap.plugin(['AMap.ToolBar', 'AMap.Geolocation', 'AMap.DistrictSearch', 'AMap.PolyEditor'], () => {
        this.District = new AMap.DistrictSearch(options.district)
        this.ToolBar = new AMap.ToolBar()
        this.Geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true
        })
        amap.addControl(this.ToolBar)
        amap.addControl(this.Geolocation)
        amap.addControl(this.District)
      })
    },
    makeMarker(lnglat) {
      const marker = new AMap.Marker({
        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: lnglat
      })
      marker.setMap(this.amap)
      return marker
    },
    handleEditMap() {
      this.clickMap = AMap.event.addListener(amap, 'click', e => {
        const marker = this.makeMarker(e.lnglat)
        this.markers.push(marker)
        this.points.push(e.lnglat)
      })
    }
  }
}
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 800px;
}
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.control-card {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 200px;
  background: #fff;
  text-align: center;
  .btn {
    margin: 10px 0;
  }
}
</style>