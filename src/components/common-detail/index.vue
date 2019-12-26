<template>
  <a-modal
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <!-- <detail-header slot="title" /> -->
    <header slot="title">
      <span class="detail-title">运单详情</span>
      <span class="detail-no">运单编号 {{row.tdNo || row.tmNo}}</span>
      <span class="detail-status">{{statusText}}</span>
    </header>
    <a-tabs  defaultActiveKey="1" tabPosition="left">
      <a-tab-pane  tab="运单信息" key="1">
        <detail-content :list="contentList"/>
      </a-tab-pane>
      <a-tab-pane tab="操作记录" key="2">
        <detail-log :logs="row.logs"/>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script >
// import DetailHeader from './header'
import DetailContent from './content'
import DetailLog from './log'
export default {
  name: 'CommonDetail',
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 1000
    }
  },
  data(){
    return{
      stateList:[ // 当日达
        {label: '问题件', state: 0 },
        {lable: '待取件', state: 1},
        {lable: '待入库', state: 2},
        {lable: '待运输', state: 3},
        {lable: '运输中', state: 4},
        {lable: '待出库', state: 5},
        {lable: '派送中', state: 6},
        {lable: '已签收', state: 7},
        {lable: '已取消', state: 8},
      ],
       stateListJsd:[ // 及时达
        {label: '问题件', state: 0 },
        {lable: '待接单', state: 1},
        {lable: '待取件', state: 2},
        {lable: '已取件', state: 3},
        {lable: '派送中', state: 4},
        {lable: '代签收', state: 5},
        {lable: '已签收', state: 6},
        {lable: '转单', state: 7},
      ]
    }
  },
  computed: {
    closable() {
      return true
    },
    mask() {
      const { mask } = this.options || {}
      return mask || true
    },
    module() {
      const { state = '' } = this.row
      let stateJsd = JSON.parse(JSON.stringify(state))
      if(this.row.tmNo) {
        stateJsd = Number('1'+ stateJsd)
      }
      if(stateJsd == 99 || stateJsd == 199) {
        stateJsd = 0
      }
      
      console.log(this.row, this.config)
      const { modules = {} } = this.config
      const { children = [] } = modules
       const [module = {}] = children.filter(item => item.value == stateJsd)
      return module
    },
    statusText() {
      // const { module } = this
      console.log(this,this.row.logs)
      // return module.label
      let state = 0
      if(this.row.logs && this.row.logs.length) {
         state= this.row.logs[this.row.logs.length - 1].state || 0
         if(state === 99) {
           return '问题件'
         }
      }
      console.log(state)
      if(state === 10) {
         return '取消件'
      }
      if(this.row.tdNo) {
          return this.stateList[state].lable
      } else {
          return this.stateListJsd[state].lable
      }
      
    },
    contentList() {
      let flag = false
      console.log('this', this)
      console.log(this.row)
      setTimeout( () => {
        console.log('this', this)
      },10000)
      const { module, row } = this
      const { relation = {} } = module
      const { details = [] } = relation
      const { detailOptions, detailTitle } = this.config
      console.log(this.row, details, detailOptions, detailTitle)
      let list = details.reduce((list, item) => {
        list[item] = {
          label: detailTitle[item],
          children: []
        }
        flag = true
        return list
      }, {})
      console.log('list', list, flag)
        setTimeout( () => {
        console.log('list', list, flag)
      },10000)
      flag &&
        detailOptions.forEach(item => {
          const { belong, field, convert, meta, pick } = item
          const fieldValue = row[field]
          if (item.convert) {
            // 字段转换
            const [option] = meta.convert.filter(it => it.value === fieldValue)
            const ret = option || { title: '---' }
            item.value = ret.title
          } else if (item.replaceTpl) {
            // 字段合成
            item.value = item.replaceTpl.replace(/\{\$\}/g, fieldValue || 0)
          } else if (pick) {
            // 字段提取
            const d = pick.split('.').reduce((obj, key) => obj[key] || {}, fieldValue || {})
            item.value = typeof d !== 'string' ? '暂无' : d
          } else {
            item.value = fieldValue
          }
          if (list[belong]) {
            list[belong].children.push(item)
          }
        })
      console.log('details', details)
      return details.map(item => list[item])
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.row);
    },
    handleClose() {
      this.$emit('close')
    }
  },
  components: {
    DetailContent,
    DetailLog
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
