<template>
  <section>
    <!--      :rowSelection="rowSelection" -->
    <!-- v-if="dataSources.length" -->
   <a-table
      
      :rowKey="keyRow"
      :dataSource="dataSources"
      :columns="currentColums"
      :loading="loading"
      :selections="true"
      :defaultExpandAllRows="true"
      :rowSelection="rowSelection"
      :pagination="false"
      :selectedRowKeys="selectedRowKeys"
    >
      <template
        :slot="item.dataIndex"
        v-for="item in slotColumns"
        slot-scope="text, record"
        onFilter="onFilter"
      >
        <div :key="item.dataIndex">
          <span v-if="item.convert">{{ text | convertField(item.meta) }}</span>
        </div>
        <slot :name="item.dataIndex" :record="record"/>
      </template>
      <template slot="operations" slot-scope="text, record">
        <common-operation :operations="operations" :row="record" @row-action="handleProxyAction"></common-operation>
      </template>
    </a-table>
    <a-row class="table-footer">
      <!-- <a-col class="table-footer-item" span="8">
        <a-button disabled v-if="batchTask.length && !disabled">{{ operations.batchText }}</a-button>
        <a-dropdown placement="topLeft" v-if="disabled">
          <a-button type="primary">{{ operations.batchText }}</a-button>
          <a-menu slot="overlay">
            <a-menu-item
              v-for="item in batchTask"
              :key="item.title"
              @click="handleBatchAction(item)"
            >{{item.title}}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col> -->
      <a-col :span="options.pageSpan|| 14" class="table-footer-item" v-if="isPage" style="text-align:right">
        <common-pagination :options="pagination" @page-change="handlePageChange"></common-pagination>
      </a-col>
    </a-row>

    <!-- 示例 可以下在业务父组件调用 -->
    <!-- <template slot="action" slot-scope="{record}">
          <common-operation :btns="operations"  :row="record" @proxy-action="handleAction"></common-operation>
    </template>-->
  </section>
</template>

<script>
import CommonOperation from '../common-operation'
import CommonPagination from '@/components/common-tools/common-pagination'

export default {
  name: 'common-table',
  data() {
    return {
      dataSources: [],
      pagination: { pageSize: 10, limit: 10 },
      loading: false,
      keyRow: record => record[this.options.rowKey],
      actionProxyTable: {
        delete: 'handleProxyDelete'
      },
      actionProxyBatch: {
        delete: 'handleProxyDelete'
      },
      selectedRowKeys: []
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    operations: {
      type: Object,
      default: () => {}
    },
    params: {
      type: Object,
      default: () => {}
    },
    url: {
      type: String,
      default: ''
    },
    isPage: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => {}
    },
    interceptorsRequest: {
      type: Function,
      default: data => data
    },
    interceptorsResponse: {
      type: Function,
      default: data => data
    }
  },
  filters: {
    convertField(key, meta) {
      const [field] = meta.convert.filter(item => item.value === key)
      const ret = field || { title: '---' }
      return ret.title
    }
  },
  computed: {
    /**
     *  为需要在主页面创建的插槽的字段添加scopedSlots属性
     * */
    currentColums() {
      return this.columns.map(item => {
        if (item.slot) {
          return { ...item, scopedSlots: { customRender: item.dataIndex } }
        }
        return item
      })
    },

    /****
     *  过滤出需要在业务中特殊处理的字段，如日期拼接、预览图等
     *  @slot 在配置文件的字段设置中添加slot属性，会创建主页面对应的插槽
     * */
    slotColumns() {
      const { columns = [] } = this
      return columns.filter(item => item.slot)
    },
    rowSelection() {
      console.log('this', this)
      const { selectedRowKeys, options } = this
      return options.noIndex
        ? null
        : {
            onChange: (selectedRowKeys, selectedRows) => {
              this.selectedRowKeys = selectedRowKeys
              this.$emit('selectedRowKeys', this.selectedRowKeys, this.dataSources)
            },
            getCheckboxProps: record => ({
              props: {
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name
              }
            }),
            onSelectAll() {}
          }
    },
    disabled() {
      return this.selectedRowKeys.length > 0
    },

    /**
     *  批量任务
     *  @batch 在配置文件的操作项中添加batch字段
     * */
    batchTask() {
      const { operations = {} } = this
      const { content = [] } = operations
      // return content.filter(item => item.batch)
      let list = []
      console.log('list---',list, content)
        content.forEach(item => {
        if(item.batch) {
          list.push(item)
        }
      })
      console.log('list',list)
      return list
    },
    rowKey() {
      return this.options.rowKey || 'id'
    },
    scrollWidth() {
      const index = this.columns.length - 1
      const cols = this.columns.slice(0, index)
      const x = cols.reduce((x, item) => x + +item.width, 0)
      return {
        x
      }
    }
  },
  mounted() {
    const { initFetch } = this.options
    initFetch && this.fetch()
  },
  watch: {
    params() {
      this.fetch()
    }
  },
  methods: {
    /****
     * 监听操作，过滤需要代理的操作自行处理（delete）
     * 不需要代理的操作通知业务组件
     * @row 数据
     * @action 操作
     * @actionProxyTable 代理操作的映射
     * * */
    handleProxyAction(row, action) {
      console.log(row,action)
      const { type } = action
      const { actionProxyTable } = this
      // if (actionProxyTable[type]) {
      //   const atype = actionProxyTable[type]
      //   this[atype]([row])
      //   return
      // }
      this.$emit('proxy-action', row, action)
    },

    /****
     * 代理批量操作
     *
     **/
    handleBatchAction(action) {
      console.log('action', action)
      const { selectedRowKeys, actionProxyBatch } = this
      const { type } = action
      // console.log(actionProxyBatch, type)
      if (actionProxyBatch[type]) {
        const atype = actionProxyBatch[type]
        // console.log(atype, type)
        this[atype](selectedRowKeys, true)
        return
      }
      this.$emit('proxy-action', selectedRowKeys, action, true)
    },

    /***
     * 监听分页操作，刷新数据
     * * */
    handlePageChange(params) {
      console.log('page',params)
      this.fetch(params)
    },

    /***
     * 拉取数据
     */
    fetch(param = {}) {
      this.dataSources = []
      const params = {}
      const p = this.interceptorsRequest({ ...this.params, ...param })
      const f = Object.keys(p).filter(key => p[key] !== '');
      f.forEach(key => {
        params[key] = p[key];
      })

      this.loading = true
      this.$http.get(this.url, { params }).then(res => {
        if(res.data.code === 200) {
                   // const { data, pageNo, pageSize, totalCount } = res
        // let index = pageNo * pageSize
        // this.loading = false
        // const dataSources = data.map(item => {
        //   return { ...item, num: ++index }
        // })
        // this.dataSources = this.interceptorsResponse(dataSources)
        //
        // this.pagination = { pageNo, pageSize, total: totalCount }
        console.log('table', res)
        let { rows, pageNo, pageSize, total } = res.data.data
        console.log(rows)
        if(!rows) {
          rows = res.data.data
        }
        let index = pageNo * pageSize
     
        const dataSources = rows.map(item => {
          return { ...item, num: ++index }
        })
        this.dataSources = this.interceptorsResponse(dataSources)

        this.pagination = { pageNo, pageSize, total: total }
        setTimeout(() => {
             this.loading = false
        },500)
      }
      })
    },
    /***
     *  代理处理删除操作
     * * */
    handleProxyDelete(rows, isBatched) {
      console.log(rows,isBatched, rows)
      const { rowKey } = this
      console.log(rows.map(item => item[rowKey]))
      const ids = (isBatched ? rows : rows.map(item => item[rowKey])).join()
      let url = isBatched ? (`${this.url}`, { data: { ids } }) : `${this.url}/${rows[0][rowKey]}`
      this.$http
        // .delete(`${this.url}`, { data: { ids } })
        .delete(url)
        .then(res => {
          this.fetch()
          this.$message.success('删除成功！')
        })
        .catch(error => {
          this.$message.error('操作失败，请稍后再试')
        })
      // this.$emit('delate', rows)
    }
  },
  components: {
    CommonOperation,
    CommonPagination
  }
}
</script>

<style scoped lang="less">
.table-footer {
  margin: 20px 0;
  .table-footer-item {
    padding: 5px 0;
  }
}
</style>
