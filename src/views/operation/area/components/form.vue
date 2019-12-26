<template>
  <a-modal
    :title="formTitle"
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit">
      <a-row :gutter="24">
        <!-- <a-col>
          <a-form-item label="名称" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              v-decorator="[
                'color',
                {
                  initialValue: fieldValues.color,
                  rules: [{
                    required: true,
                    message: '选择背景色',
                  }],
                }
              ]"
              placeholder="选择背景色"
            />
            <div class="color-picker">
              <span class="color-trigger">
                <span
                  class="color-trigger-inner"
                  @click="handleMapColor"
                  :style="colorStyle"
                ></span>
              </span>
            </div>
            <chrome-picker v-if="colorPickerShow" v-model="colors" @input="updateValue"/>
          </a-form-item>
        </a-col>-->
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script >
import FormMixis from '@/mixins/form'
import { Chrome } from 'vue-color'
import { URL_SYSTEM_AUTH_STRUCTURE_POLOGON } from '@/api/url'
import { mapActions } from 'vuex'
let defaultProps = {
  hex: '#194d33e6',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 0.9
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.3,
    a: 0.9
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 0.9
  },
  a: 0.9
}
export default {
  name: 'MapForm',
  data() {
    return {
      wrapperCol: {
        span: 12
      },
      labelCol: {
        span: 6
      },
      colors: defaultProps,
      reloading: false,
      method: 'put',
      // url: URL_SYSTEM_AUTH_STRUCTURE_POLOGON,
      colorPickerShow: false,
      colorStyle: {
        backgroundColor: ''
      }
    }
  },
  props: {
    points: {
      type: Array,
      default: () => []
    },
    row: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 550
    }
  },
  computed: {
    formTitle() {
      const { id } = this.row
      return id ? `修改区域` : `添加区域`
    },
    fieldValues() {
      console.log('this.row', this.row)
      const { id, parentId, ...props } = this.row
      return {
        ...props,
        parentId: this.post ? id : parentId
      }
    },
    url() {
      const { id } = this.row
      return id ? URL_SYSTEM_AUTH_STRUCTURE_POLOGON + '/' + id : URL_SYSTEM_AUTH_STRUCTURE_POLOGON
    }
  },
  methods: {
    ...mapActions(['GetSite']),
    handleClose() {
      this.$emit('close')
    },
    handleMapColor() {
      this.colorPickerShow = !this.colorPickerShow
    },
    interceptors(values) {
      let { id, level } = this.row
      console.log('this.row', this.row, this.points)
      let first = this.points.slice().shift()
      // let coordinates = [[...this.points, first]]

      /* 坐标处理 */
      let pointsChildren = JSON.parse(JSON.stringify(this.points))
      pointsChildren= pointsChildren.map(item => {
        return {x: item[0], y: item[1]}
      })
      first = {x: first[0], y: first[1]}
      /* 坐标处理-end */


      let points = [...pointsChildren, first]
      // let polygon = {
      //   points
      // }
      // if (points[0][0][0] === undefined) {
      //   polygon = null
      // }

      // if (coordinates[0][0]['x'] === undefined) {
      //   polygon = null
      // }
      console.log('--interceptors--', this.row, pointsChildren, points)
      return {
        // id,
        points : points || null
      }
    },
    interceptorsSuccess() {
      this.GetSite()
      this.$emit('refetch')
      this.$emit('close')
    },
    updateValue(e) {
      this.colorStyle.backgroundColor = e.hex
    }
  },
  mixins: [FormMixis],
  components: {
    'chrome-picker': Chrome
  }
}
</script>
<style lang="less" scoped>
.form-title {
  .form-title-label {
    font-size: 18px;
    font-weight: 700;
    color: #146bda;
  }
  .form-title-id {
    padding-left: 20px;
    font-size: 12px;
  }
}
.form-btns {
  text-align: center;
}
.color-picker {
  display: inline-block;
  position: relative;
  line-height: normal;
  height: 40px;
  .color-trigger {
    display: inline-block;
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    font-size: 0;
    position: relative;
    cursor: pointer;
    .color-trigger-inner {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
