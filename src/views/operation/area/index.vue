<template>
  <a-card>
    <a-col :span="4">
      <StructureList @select="handleSlect"/>
    </a-col>
    <a-col :span="19" offset="1">
      <div class="map-wrapper">
        <div id="container"></div>
        <div class="control-card" v-if="isDraw">
          <h3>当前选中 {{currentArea.name}}</h3>
          <a-button class="btn" type="primary" v-if="isEdit" @click="handleEditSave">保存</a-button>
          <!-- <a-button class="btn" type="primary" v-if="isEdit" @click="handleCancelDraw">取消绘图</a-button> -->
          <a-button class="btn" type="primary" @click="handleEditMap">{{isEdit?'取消':'开始'}}编辑</a-button>
        </div>
      </div>
    </a-col>
   <map-form :row="currentArea" :points="points" :visible="formVisible" @submit-form = 'saveRefresh' @close="handleCloseForm"/>
  </a-card>
</template>
<script>
import { axios } from '@/utils/request'
import StructureList from './components/structure'
import * as CONFIG from './config'
import { getDistrict } from '@/utils/map'
import MapForm from './components/form'
import { getRandomColor } from '@/utils/util'
import { URL_SYSTEM_AUTH_STRUCTURE, URL_SYSTEM_AUTH_STRUCTURE_BRO, URL_SYSTEM_AUTH_STRUCTURE_ALLList } from '@/api/url'
import store from '../../../store'

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
      polygonContainer: {},
      areaPolygons: [],
      currentAreaPolygons:[],
      allSameLevelArea:[],
      savePull: {},
      level: null, // 当前区域级别
    }
  },
  watch: {
    markers(e) {
      console.log(e);
      if (e.length > 2) {
        const { amap, makers } = this
        AMap.event.removeListener(this.clickMap)
        this.createPolygon()
        amap.remove(this.markers)
      }
    },
    points:{
      handler(newValue,oldValue) {
        console.log(newValue, oldValue)
        this.currentAreaPolygons = newValue
      }
    }

  },
  mounted() {
    this.amapView()
  },
  methods: {
    handleSlect(e) {
      console.log('e',e)
      this.savePull = e
      if(e.level > 3) {
        this.isDraw = true
      } else {
         this.isDraw = false
      }
      this.isEdit = false
      const { id,parentId, city, level } = e
      this.currentArea = e
      this.level = level
      /**
      * 数据重构
      */
      let data = JSON.parse(JSON.stringify(e))
       data.polygon = {coordinates: []}
       if(e.region && e.region.points) {
         e.region.points.forEach(item => {
           data.polygon.coordinates.push([item.x, item.y])
         })
        // data.polygon.coordinates = this.transferPathArray(data.polygon.coordinates)
       }

      console.log('data', data)
      delete  data.region
      if(level === 0) { // 省 1 级
        return
      } else if( level < 4) {
        // Todo 1  省-显示行政，显示自定义，可编辑

        // 获取同级区域并画图
        // axios.get(`${URL_SYSTEM_AUTH_STRUCTURE_BRO}?id=${data.id}`).then(res => {
        //   let list = JSON.parse(JSON.stringify(res.data.data[0]))
        //   console.log("res2:");
        //   console.log(res.data);
        //   // Todo 显示上级
        //   if(res.data.data[0].children) {
        //     // Todo显示同级
        //     if(list.children) {
        //      list.children.map(item => {
        //         console.log('item', item)
        //         if(item.region) {
        //           item.polygon = {coordinates: []}
        //           item.region.points.map(item1 => {
        //             console.log(item1)
        //             item.polygon.coordinates.push([item1.x, item1.y])
        //          //  return
        //           })
        //         }
        //       })
        //       console.log('------', list)
        //       console.log('=====', list)
        //       this.allSameLevelArea = list.children // 同级判断
        //       list.children.forEach(item => {
        //    //     this.drawAreaLevel3(item) // 显示同级-----正式可打开
        //       })
        //     }

        //   }
        // })
        // setTimeout( () =>  {
        //   this.getDistrictCityNoRemove(city) // 显示自身省级行政区域
        //   this.drawAreaLevel3(data) // 显示自身区域
          
        // },500)

         this.getDistrictCity(city) // 显示自身省级行政区域
         //this.getDistrictCityNoRemove(city) // 显示自身省级行政区域

      } else if(level >= 4) {
        // Todo 2 市-显示父级，显示自定义，可编辑
        // 获取同级区域并画图
        axios.get(`${URL_SYSTEM_AUTH_STRUCTURE_BRO}?id=${data.id}`).then(res => {
          let list = JSON.parse(JSON.stringify(res.data.data[0]))
          console.log("res2:");
          console.log(res.data);
          if(res.data.data[0].parentId) {
            // Todo 显示上级
            list.polygon = {coordinates: []}
            if(list.region) {
              list.polygon = {coordinates: []}
              list.region.points.map(item1 => {
                  console.log(item1)
                list.polygon.coordinates.push([item1.x, item1.y])
                  //  return
                })
              }
             //  this.areaPolygons = list.polygon.coordinates; // 父级
               // this.getDistrictCityNoDraw(list.city) // 显示父级省级行政区域-为了不重复渲染去掉
             //  this.getDistrictCityNoRemove(list.city)
             // this.getDistrictCity(list.city)

              // this.drawAreaLevel3(list)
              setTimeout(() => {
                this.drawAreaLevel3(data) // 显示自身区域
              },500)
               
          }
          if(res.data.data[0].children) {
            // Todo显示同级
            if(list.children) {
              list.children.map(item => {
                console.log('item', item)
                if(item.region) {
                  item.polygon = {coordinates: []}
                  item.region.points.map(item1 => {
                    console.log(item1)
                    item.polygon.coordinates.push([item1.x, item1.y])
                    //  return
                  })
                }
              })
              console.log('------', list)
              console.log('=====', list)
              this.allSameLevelArea = list.children // 同级判断
              list.children.forEach(item => {
               // this.drawAreaLevel3(item) // 显示同级---正式可打开
              })
            }

          }
        })
        setTimeout( () =>  {
          // this.drawAreaLevel3(data) // 显示自身区域
        },1000)
      }
      // else if(level === 3) {
      //   // Todo 3 区县级-显示父级，显示自定义，可编辑
      //
      // }  else if(level === 4) {
      //   // Todo 4 分拨中心-显示父级，显示自定义，可编辑
      //
      // } else if (level === 5) {
      //   // Todo 5 区域-显示父级，显示自定义，可编辑
      // }


    },
    saveRefresh(data) {
      console.log('----------------111-', this.currentArea, data, this.points, this.savePull.points)
      if(data.points !== null || data.points !== undefined ) {
        if(this.savePull.points === null || this.savePull.points === undefined ) {
          Object.assign(this.savePull, { points: data.points})
          console.log('this.savePull--', this.savePull)
        } else {
         // this.savePull.polygon = data.polygon
        }
      }
      setTimeout( () =>{
        let e = this.savePull
        e.region = data.points;
        this.handleSlect(e)
      },500)
    },
    amapView() {
      const { options } = this
      const amap = (this.amap = new AMap.Map('container', options.map))
      AMap.plugin(['AMap.ToolBar', 'AMap.Geolocation', 'AMap.DistrictSearch', 'AMap.PolyEditor'], () => {
        this.District = new AMap.DistrictSearch(options.district)
        this.ToolBar = new AMap.ToolBar()
        this.Geolocation = new AMap.Geolocation()
        amap.addControl(this.ToolBar)
        amap.addControl(this.Geolocation)
        amap.addControl(this.District)
      })
    },
    // 生成多边形
    createPolygon() {
      const { points } = this
      const map = this.amap
      const polygon = new AMap.Polygon({
        map,
        path: points,
        strokeColor: '#0000ff',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#f5deb3',
        fillOpacity: 0.35
      })
      this.handlePolyEditor(polygon)
    },
     compute(polygon1,polygon2){//1区域点,2自定义点
      console.log('polygon1', polygon1, polygon2 )
        var polygon1_path = polygon1;
        // var polygon2 = this.createPolygons(polygon22);
        var polygon2_path = polygon2;
        // 小圈是否在大圈内
        var isRingInRing = AMap.GeometryUtil.isRingInRing(polygon2_path,polygon1_path);
        // 两圈是否交叉
        var doesRingRingIntersect = AMap.GeometryUtil.doesRingRingIntersect(polygon2_path,polygon1_path);
        var ringRingClip = AMap.GeometryUtil.ringRingClip(polygon2_path,polygon1_path);
        var ringArea = parseInt(AMap.GeometryUtil.ringArea(ringRingClip))
        var text = 1;//'两圈关系：在大圈外'
       console.log('isRingInRing', isRingInRing)
       console.log('doesRingRingIntersect', doesRingRingIntersect)
        if(isRingInRing){
            text = 2;//'两圈关系：在大圈内'
        }else if(doesRingRingIntersect){
            text = 3//'两圈关系：两圈相交, 交叉区域面积为'+ringArea+'平方米'
        }
        return text;
    },
    handlePolyEditor(polygon) {
      this.polygonEditor = new AMap.PolyEditor(this.amap, polygon)
      this.polygonEditor.open()
      console.log(this.points);
      AMap.event.addListener(this.polygonEditor, 'end', e => {
        const { id } = this.currentArea
        this.points = e.target.getPath().map(item => {
          const { lat, lng } = item
          return [lng, lat]
        })
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
    // 获取城市区域
    getDistrictCity(keywords) {
      let { District, polygonContainer } = this
      const map = this.amap
      District.setLevel('district')
     // this.isDraw = false // 获取行政区域-无需编辑
      Object.keys(this.polygonContainer).forEach(key => {
        map.remove(polygonContainer[key])
      })
      District.search(keywords, (status, result) => {
        map.remove(this.cityPolygons) //清除上次结果
        this.cityPolygons = []
        const bounds = result.districtList[0].boundaries
        const fillColor = getRandomColor()
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.3,
             // fillColor: '#80d8ff',
              fillColor,
             // strokeColor: '#0091ea',
               strokeColor: fillColor,
            })
            this.cityPolygons.push(polygon)
          }
        }
        /* 湖北地图bug修复-start*/
        let cityPolygons = []
        this.cityPolygons.forEach( (item,index) => {
          if(this.transferArray(this.cityPolygons[index].getPath()).length > cityPolygons.length) {
            cityPolygons = this.transferArray(this.cityPolygons[index].getPath())
          }
        })
        /* 湖北地图bug修复-end*/
        this.areaPolygons = cityPolygons
        //this.areaPolygons = this.transferArray(this.cityPolygons[0].getPath())
        map.add(this.cityPolygons)
        map.setFitView(this.cityPolygons) //视口自适应
      })
    },
    // 获取城市区域-不清除上次结果
    getDistrictCityNoRemove(keywords) {
      let { District, polygonContainer } = this
      const map = this.amap
      District.setLevel('district')
     // this.isDraw = false // 获取行政区域-无需编辑
      // Object.keys(this.polygonContainer).forEach(key => {
      //   map.remove(polygonContainer[key])
      // })
      console.log('keywords', keywords)
      District.search(keywords, (status, result) => {
     //   map.remove(this.cityPolygons) //清除上次结果
        this.cityPolygons = []
        const bounds = result.districtList[0].boundaries

        const fillColor = getRandomColor()

        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.1,
             // fillColor: '#80d8ff',
              fillColor,
              strokeColor: '#0091ea',
              // strokeColor: fillColor,
            })
            this.cityPolygons.push(polygon)
          }
        }
        /* 湖北地图bug修复-start*/
        let cityPolygons = []
        this.cityPolygons.forEach( (item,index) => {
          if(this.transferArray(this.cityPolygons[index].getPath()).length > cityPolygons.length) {
            cityPolygons = this.transferArray(this.cityPolygons[index].getPath())
          }
        })
        /* 湖北地图bug修复-end*/
        this.areaPolygons = cityPolygons
        console.log('this.areaPolygons', this.areaPolygons, cityPolygons )
        //this.areaPolygons = this.transferArray(this.cityPolygons[0].getPath())
        map.add(this.cityPolygons)
        map.setFitView(this.cityPolygons) //视口自适应
      })
    },


    // 获取父级行政区域-不画图
    getDistrictCityNoDraw(keywords) {
      let { District, polygonContainer } = this
      const map = this.amap
      District.setLevel('district')
     // this.isDraw = false // 获取行政区域-无需编辑
      // Object.keys(this.polygonContainer).forEach(key => {
      //   map.remove(polygonContainer[key])
      // })
      console.log('keywords', keywords)
      District.search(keywords, (status, result) => {
     //   map.remove(this.cityPolygons) //清除上次结果
        this.cityPolygons = []
        const bounds = result.districtList[0].boundaries
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.2,
              fillColor: '#80d8ff',
              strokeColor: '#0091ea'
            })
            this.cityPolygons.push(polygon)
          }
        }
        /* 湖北地图bug修复-start*/
        let cityPolygons = []
        this.cityPolygons.forEach( (item,index) => {
          if(this.transferArray(this.cityPolygons[index].getPath()).length > cityPolygons.length) {
            cityPolygons = this.transferArray(this.cityPolygons[index].getPath())
          }
        })
        /* 湖北地图bug修复-end*/
        this.areaPolygons = cityPolygons
        console.log('this.areaPolygons ', this.areaPolygons )
      })
    },

    // 绘制地图入口
    drawAreaLevel3(e) {
      console.log(e)
      this.isDraw = true
      const {  level } = this.currentArea
      const { polygon, id } = e
      if (!polygon) return
      const path =  polygon.coordinates || []
      this.polygonEditor && this.polygonEditor.close()
      const map = this.amap
      this.points = [...path]
      if (!path.length) return
      const polygons = this.polygonContainer[id]
      polygons && map.remove(polygons)
      const fillColor = getRandomColor()
      console.log(path)
      const p = (this.polygonContainer[id] = new AMap.Polygon({
        path,
        strokeColor: '#FF33FF',
        strokeWeight: 1,
        strokeOpacity: 0.2,
        fillOpacity: 0.2,
        fillColor,
        zIndex: 50 * level
      }))
      map.add(p)
      map.setFitView([p])

    /* 地图标记-start */
    let markers = []
   let pointCenter =   this.calculateCenter(e.polygon.coordinates)
   console.log('pointCenter', pointCenter)
    let icon = new AMap.Icon({
    					image: 'https://vdata.amap.com/icons/b18/1/2.png',
    					size: new AMap.Size(24, 24)
            });
            let content= `<div class = 'siteSty'>${e.name}</div>`;
      let marker = new AMap.Marker({
              content,
    					// icon: icon,
              // position: [e.polygon.coordinates[ e.polygon.coordinates.length - 1].lng, e.polygon.coordinates[ e.polygon.coordinates.length - 1].lat],
              position: pointCenter,
    					offset: new AMap.Pixel(-20,0),
    					zIndex: 101,
    					title: e.name,
    					map: map
            });
            
          markers.push(marker);
         // map.setFitView();
    /* 地图标记-end */

    },

     // 计算区域中心点-fun1
     calculateCenter(lnglatarr){
      let total = lnglatarr.length;
      let X=0,Y=0,Z=0;
      // $.each(lnglatarr, function(index, lnglat) {
      //   let lng = lnglat.lng * Math.PI / 180;
      //   let lat = lnglat.lat * Math.PI / 180;
      //   let x,y,z;
      //   x = Math.cos(lat) * Math.cos(lng);
      //   y = Math.cos(lat) * Math.sin(lng);
      //   z = Math.sin(lat);
      //   X += x;
      //   Y += y;
      //   Z += z;
      // });
      lnglatarr.forEach((lnglat, index) => {
        let lng = lnglat.lng * Math.PI / 180;
        let lat = lnglat.lat * Math.PI / 180;
        let x,y,z;
        x = Math.cos(lat) * Math.cos(lng);
        y = Math.cos(lat) * Math.sin(lng);
        z = Math.sin(lat);
        X += x;
        Y += y;
        Z += z;
      })

      X = X/total;
      Y = Y/total;
      Z = Z/total;

      let Lng = Math.atan2(Y,X);
      let Hyp = Math.sqrt(X*X + Y*Y);
      let Lat = Math.atan2(Z,Hyp);

      return new AMap.LngLat(Lng*180/Math.PI,Lat*180/Math.PI);
    },
    // 计算区域中心点-fun2
     calculateCenter2(path) {
      //var path =e.;//Array<Point> 返回多边型的点数组
      //var ret=parseFloat(num1)+parseFloat(num2);
      var x = 0.0;
      var y = 0.0;
      for (var i = 0; i < path.length; i++) {
        x = x + parseFloat(path[i].lng);
        y = y + parseFloat(path[i].lat);
      }
      x = x / path.length;
      y = y / path.length;

      //return new BMap.Point(path[0].lng,path[0].lat);
      return new BMap.Point(x, y);
      //return path[0];
    },
        // 计算区域中心点-fun3
     calculateCenter3(points) {
        var sum_x = 0;
        var sum_y = 0;
        var sum_area = 0;
        var p1 = points[1];
        for (var i = 2; i < points.length; i++) {
            p2 = points[i];
            area = Area(points[0], p1, p2);
            sum_area += area;
            sum_x += (points[0][0] + p1[0] + p2[0]) * area;
            sum_y += (points[0][1] + p1[1] + p2[1]) * area;
            p1 = p2;
        }
        var xx = sum_x / sum_area / 2.5;
        var yy = sum_y / sum_area / 2.5;
        return new Point(xx, yy,new SpatialReference({wkid:4326}));
    },


    Area(p0,p1,p2)
    {
        var area = 0.0 ;
        area = p0[0] * p1[1] + p1[0] * p2[1] + p2[0] * p0[1] - p1[0] * p0[1] - p2[0] * p1[1] - p0[0] * p2[1];
        return area / 2 ;
    },


    handleEditMap() {
      if (this.isEdit) {
        console.log('111')
        this.isEdit = false;
        this.polygonEditor && this.polygonEditor.close()
        return
      }
      this.isEdit = !this.isEdit
      const { amap, polygonContainer} = this
      const { id } = this.currentArea
      console.log("markers:")
      console.log(this.markers)
      if (this.markers.length > 0){
        Object.keys(this.markers).forEach(key => {
          console.log(this.markers[key])
          this.markers[key].setMap(null)
        })
        this.markers = []
      }
      console.log('this.currentArea',this.savePull, polygonContainer[id])
      if (polygonContainer[id]) {
        console.log('222')
        return this.handlePolyEditor(polygonContainer[id])
      }
      if (this.isEdit) {
        console.log('333')
        this.points = []
        this.clickMap = AMap.event.addListener(amap, 'click', e => {
          console.log('e------', e)
          const marker = this.makeMarker(e.lnglat)
          this.markers.push(marker)
          this.points.push(e.lnglat)
        })

      }
    },
    handleCancelDraw() {
      const polygon = this.currentArea.polygon.coordinates.map(item => {
        const { lat, lng } = item
        return [lng, lat]
      })
      this.amap.remove([...polygon])
      this.polygonEditor && this.polygonEditor.close()
    },
    handleEditSave() {
      this.polygonEditor.close()
      this.polygonEditor.open()
      setTimeout( () => {
        if (this.points[0]!=undefined) {
          console.log('typeof',this.points,this.currentAreaPolygons,this.areaPolygons , this.allSameLevelArea, this.points[0].constructor==Array)
          // if (this.points[0].constructor==Array) {
          //  // this.currentAreaPolygons = this.transferArray(this.points[0]);
          //   this.currentAreaPolygons = this.points;
          // } else {
          //   // this.currentAreaPolygons = this.transferArray(this.points);
          //   this.currentAreaPolygons = this.points;
          // }

          let text = null
          var index = 0;
          if(this.level < 4) {

            text = 2
          } else {
            text = this.compute(this.areaPolygons, this.currentAreaPolygons);//与上级判断
          }
          if (text === 1) {//行政区划外
            return this.$message.error('不能在指定区域外规划!')
          } else if (text === 3) {//相交
            return this.$message.error('部分区域超出指定区域!')
          } else {//在行政区域内
            console.log('coordinates', this.allSameLevelArea)
            //判断是否与同级相交
            this.allSameLevelArea.forEach(item => {
              if (item.polygon && item.polygon.coordinates) {
                var text = this.compute(item.polygon.coordinates, this.currentAreaPolygons);//与同级判断
                if (text != 1) { // 同级有相交
                  index = 1;
                }
              }
            })
          }
          if (index != 1) {
            this.isEdit = false
            this.polygonEditor.close()
            console.log(this.currentAreaPolygons,this.points);
            this.formVisible = !this.formVisible

          } else {
            console.log(this.currentAreaPolygons,this.points);
            return this.$message.error('同级区域有重合');
          }
        }else{
          this.isEdit = false
          return this.$message.error('当前区域未指定，保存失败！')

        }
      },500)

    },
    handleCloseForm() {
      this.isEdit = false
      this.formVisible = !this.formVisible
    },
    // 转二维数组
    transferArray (array) {
      let arr = []
      if (array) {
        console.log('array',array)
        for(var i=0;i<array.length;i++){
          var currentPoint = [];
          currentPoint.push(array[i].lng);
          currentPoint.push(array[i].lat);
          arr.push(currentPoint);
        }
      }
      return arr
    },
    // 二维数组转路径数组
    transferPathArray(array) {
      console.log('array', array)
      let polygon = new AMap.Polygon({
        fillColor:'red',
        fillOpacity:0.3,
        path:array,
        draggable: true
      })
      return polygon.getPath()
    }
  },
  components: {
    StructureList,
    MapForm
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
<style>
  .siteSty{
      	border: solid 2px #ffffff;
      	color: #333;
      	float: left;
        min-width: 80px;
        font-size: 12px;
      	background-color: #ffffff;
      }
</style>
