<template>
  <a-modal :visible="visible" :footer="null" :width="width" @cancel="handleClose" :destroyOnClose="true">
    <header slot="title">
      <span class="detail-title">{{row.name}}</span>
      <!-- <span class="detail-status">{{statusText}}</span> -->
    </header>
    <a-tabs :defaultActiveKey="defaultActiveKey" tabPosition="left">
      <a-tab-pane tab="用户信息" key="1">
        <detail-content :id2labels="id2labels" :row="row"/>
      </a-tab-pane>
      <a-tab-pane tab="流水收入" key="2">
        <detail-income :id="row.id"/>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script >
// import DetailHeader from './header'
import DetailContent from './content'
import DetailIncome from './income'
export default {
  name: 'CourierDetail',
  data() {
    return {
      fetchIncome: false,
      defaultActiveKey: "1"
    }
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {}
    },
    id2labels: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 800
    }
  },
  computed: {
    callback(val) {
      // console.log(val)
    },
    closable() {
      return true
    },
    mask() {
      const { mask } = this.options || {}
      return mask || true
    },
    statusText() {
      return ''
    },
    contentList() {
      let flag = false
      const { module, row } = this
      const { relation = {} } = module
      const { details = [] } = relation
      const { detailOptions, detailTitle } = this.config
      let list = details.reduce((list, item) => {
        list[item] = {
          label: detailTitle[item],
          children: []
        }
        flag = true
        return list
      }, {})
      flag &&
        detailOptions.forEach(item => {
          const { belong, field, convert, meta } = item
          const key = row[field]
          if (item.convert) {
            // 字段转换
            const [option] = meta.convert.filter(it => it.value === key)
            const ret = option || { title: '---' }
            item.value = ret.title
          } else if (item.join) {
            // 字段合成
            item.value = meta.join.reduce((str, acc) => {
              str += row[acc] + '  '
              return str
            }, '')
          } else {
            item.value = row[field]
          }
          if (list[belong]) {
            list[belong].children.push(item)
          }
        })
      console.log(details.map(item => list[item]))
      return details.map(item => list[item])
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  },
  components: {
    DetailContent,
    DetailIncome
  }
}
</script>
<style lang="less" scoped>
.detail-title {
  font-size: 20px;
}
.detail-no {
  margin: 0 15px;
}
.detail-status {
  font-size: 12px;
  padding: 2px 4px;
  color: #1890ff;
  border: 1px solid #1890ff;
}
</style>
