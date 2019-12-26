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
        <a-col :span="12">
          <a-form-item label="部门名" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              v-decorator="[
                'deptName'
              ]"
              placeholder="请输入部门名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-button type="primary" html-type="submit">确认添加</a-button>
        </a-col>
      </a-row>
      <a-table :columns="columns" :dataSource="tableData" bordered :rowKey="keyRow">
        <template slot="deptName" slot-scope="text, record">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.id, 'deptName')"
          />
          <template v-else>{{text}}</template>
        </template>
        <template slot="operation" slot-scope="text, record">
          <span v-if="record.editable">
            <a-button class="btn" @click="() => save(record.id)">保存</a-button>
            <a-popconfirm title="放弃编辑?" @confirm="() => cancel(record.id)">
              <a-button class="btn">取消</a-button>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button class="btn" type="primary" @click="() => edit(record.id)">编辑</a-button>
          </span>
          <a-popconfirm title="确定删除?" @confirm="() => tdelete(record.id)">
            <a-button class="btn" type="danger">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-form>
  </a-modal>
</template>

<script >
import FormMixis from '@/mixins/form'
import { constants } from 'crypto'

const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    width: '10%'
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    width: '40%',
    scopedSlots: { customRender: 'deptName' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  name: 'depart-form',
  data() {
    return {
      wrapperCol: {
        span: 12
      },
      labelCol: {
        span: 6
      },
      selectKeys: [],
      defaultSelectedKeys: [],
      columns,
      keyRow: record => record['deptName'],
      tableData: [],
      reloading: false
    }
  },
  props: {
    url: {
      type: String
    },
    row: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 850
    }
  },
  computed: {
    method() {
      return this.row.id ? 'put' : 'post'
    },
    formTitle() {
      return '部门管理'
    },
    fieldValues() {
      const { id, ...params } = this.row
      return {
        ...params
      }
    }
  },
  watch: {
    row(e) {
      this.tableData = e.map((item, index) => {
        const num = ++index
        return {
          ...item,
          num
        }
      })
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    interceptors(values) {
      const { roleName, dept, remark } = values
      return values
    },
    onSelect(selectedKeys, info) {
      this.selectKeys = selectKeys
    },
    onCheck(selectKeys, info) {
      this.selectKeys = selectKeys
    },
    handleChange(value, key, column) {
      const newData = [...this.tableData]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        target[column] = value
        this.tableData = newData
      }
    },
    edit(key) {
      const newData = [...this.tableData]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        this.editId = key
        target.editable = true
        this.tableData = newData
      }
    },
    save(key) {
      const newData = [...this.tableData]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        delete target.editable
        this.tableData = newData
        const { num, ...data } = target
        this.$http.put(this.url, data).then(res => {
          const { id } = res.data
          if (id) {
            this.$message.success('编辑保存成功')
          }
        })
      }
    },
    cancel(key) {
      const newData = [...this.tableData]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        delete target.editable
        this.tableData = newData
      }
    },
    tdelete(id) {
      this.$http.delete(`${this.url}/${id}`).then(res => {
        this.$message.success('删除成功')
        this.$emit('refetch')
      })
    },
    interceptorsSuccess() {
      this.$emit('refetch')
    }
  },
  mixins: [FormMixis]
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
.btn {
  margin: 0 5px;
}
</style>
