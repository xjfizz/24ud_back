<template>
  <a-modal
    :title="formTitle"
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <!-- <template v-if="isEmpty">
    <a-button @click="handleAddTop">添加一级目录</a-button>
    </template>-->
    <a-button @click="handleAddTop">添加一级目录</a-button>
    <a-tree class="modal-warpper" checkable :treeData="treeData" :autoExpandParent="true">
      <div v-for="node in nodes" :key="node.key" class="node-item" :slot="node.key">
        <span class="node-label">{{node.title}}</span>
<!--        <a-button v-if="node.pid === '' " class="node-btn" size="small" @click="handleAdd(node)">添加</a-button>-->
        <a-button
          v-for="btn in btns"
          :key="btn.action"
          class="node-btn"
          size="small"
          @click="handleAction(btn, node)"
        >{{btn.label}}</a-button>
      </div>
    </a-tree>
    <type-form
      :row="row"
      :pids="pids"
      :post="post"
      :url="url"
      :isTop="isTop"
      :visible="formVisible"
      @refetch="refetch"
      @close="handleCloseForm"
    />
  </a-modal>
</template>

<script >
import TypeForm from './typeForm'
import { URL_SERVICE_COMPLAINT_TYPES } from '@/api/url'
import { axios } from '@/utils/request'

const btns = [
  {
    label: '编辑',
    action: 'edit'
  },
  {
    label: '删除',
    action: 'del'
  }
]
const row = {
  typeName: '',
  state: 1,
  pid: ''
}
export default {
  name: 'CompalintType',
  data() {
    return {
      formTitle: '投诉类型设置',
      btns,
      formVisible: false,
      row: {},
      url: URL_SERVICE_COMPLAINT_TYPES,
      post: true,
      isTop: false
    }
  },
  props: {
    nodes: {
      type: Array,
      default: () => []
    },
    treeData: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 650
    }
  },
  computed: {
    pids() {
      return this.treeData.map(item => {
        const { typeId, typeName } = item
        return {
          typeId,
          typeName
        }
      })
    },
    isEmpty() {
      return !!this.treeData
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleAction(btn, node) {
      const { action } = btn
      let { pid, typeName, state, typeId } = node
      if (action === 'edit') {
        this.post = false
        this.row = { pid, typeName, state, typeId }
        this.formVisible = true
      } else {
        typeId = [typeId]
        let data = {
          complaintTypeIds: typeId
        }
          axios.delete(`${URL_SERVICE_COMPLAINT_TYPES}`,{data:data}).then(res => {
          this.$message.success('成功删除')
          this.refetch()
        })
      }
    },
    handleAdd(node) {
      const { typeName, state, typeId } = node
      console.log(node)
      this.post = true
      this.isTop = false
      this.row = {
        ...row,
        pid: typeId,
        typeId
      }
      this.formVisible = true
    },
    handleCloseForm() {
      this.formVisible = !this.formVisible
    },
    handleAddTop() {
      this.isTop = true
      this.formVisible = true
      console.log('顶级目录')
    },
    refetch() {
      this.$emit('refetch')
    }
  },
  components: {
    TypeForm
  }
}
</script>
<style lang="less" scoped>
.modal-warpper {
  min-height: 400px;
}
.node-item {
  display: flex;
  width: 300px;
  margin-left: 10px;
  .node-label {
    flex: 1;
  }
  .node-btn {
    margin-right: 10px;
  }
}
</style>
