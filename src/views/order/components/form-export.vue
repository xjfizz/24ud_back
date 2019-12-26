<template>
  <a-modal
    title="批量导出"
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <!-- <a-input addonBefore="文件名" placeholder="输入要导出的文件名" :value="filename" /> -->
    <a-transfer
      class="data-tree"
      :dataSource="dataSource"
      :titles="['源数据', '导出项']"
      :targetKeys="targetKeys"
      :selectedKeys="selectedKeys"
      :render="item=>item.title"
      @change="handleChange"
      @selectChange="handleSelectChange"
      :listStyle="listStyle"
    />
    <a-button
      class="export-btn"
      type="primary"
      :loading="exportLoading"
      icon="download"
      @click="handleExport"
    >导出</a-button>
  </a-modal>
</template>

<script >
import excel from '@/utils/excel'
import moment from 'moment'

export default {
  name: 'OrderExport',
  data() {
    return {
      exportLoading: false,
      targetKeys: [],
      selectedKeys: [],
      filename: '',
      listStyle: {
        width: '200px',
        height: '300px',
        textAlign: 'left'
      },
      target: []
    }
  },
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    rowKeys: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 600
    }
  },
  computed: {
    closable() {
      return true
    },
    dataSource() {
      const { rows, selectedKeys, columns } = this
      const props = columns.filter(item => !(item.dataIndex == 'num' || item.dataIndex == 'operations'))
      return props.map(item => {
        const { dataIndex, title, convert, meta } = item
        return {
          title,
          key: dataIndex,
          disabled: false,
          description: title,
          convert,
          meta
        }
      })
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]
    },
    handleDisable(disabled) {
      this.disabled = disabled
    },
    handleExport() {
      const { targetKeys, dataSource, rows } = this
      if (!targetKeys.length) {
        this.$message.warn('不能导出空数据文档')
        return
      }
      const target = dataSource.filter(item => {
        return targetKeys.includes(item.key)
      })

      const title = target.map(item => item.title)

      const data = rows.map(row => {
        const ret = {}
        target.forEach(item => {
          const { key, convert, meta } = item
          const value = row[key]
          if (convert) {
            const [fields] = meta.convert.filter(item => item.value == value)
            ret[key] = fields.title
          } else {
            ret[key] = value
          }
        })
        return ret
      })
      const params = {
        title,
        key: [...targetKeys],
        data,
        autoWidth: true,
        filename: `订单报表-${moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')}`
      }
      excel.export_array_to_excel(params)
      this.exportLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.data-tree {
  text-align: center;
  .ant-transfer-list {
    width: 260px;
    height: 300px;
  }
}
.export-btn {
  display: block;
  margin: 20px auto 30px;
}
</style>
