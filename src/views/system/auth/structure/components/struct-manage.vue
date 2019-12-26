<template>
  <a-modal
    :title="formTitle"
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <a-tree class="modal-warpper" :treeData="siteTree" :autoExpandParent="true">
      <div v-for="node in areaList" :key="node.key" class="node-item" :slot="node.key">
        <span class="node-label">{{node.title}}</span>
        <template v-for="btn in btns">
          <a-button
            :key="btn.action"
            class="node-btn"
            size="small"
            v-if="btn.levels.includes(node.level)"
            @click="handleAction(btn, node)"
          >{{btn.label}}</a-button>
        </template>
      </div>
    </a-tree>
    <struct-form
      :row="row"
      :post="post"
      :url="url"
      :visible="formVisible"
      @close="handleCloseForm"
    />
  </a-modal>
</template>

<script >
import { mapGetters, mapActions } from 'vuex'
import StructForm from './form-struct'
import { URL_SYSTEM_AUTH_STRUCTURE } from '@/api/url'

const btns = [
  {
    label: '添加',
    action: 'add',
    levels: [0, 1, 2, 3]
  },
  {
    label: '编辑',
    action: 'edit',
    levels: [1, 2, 3, 4,5]
  },
  {
    label: '删除',
    action: 'del',
    levels: [1, 2, 3, 4,5]
  }
]
const row = {
  label: '',
  city: '',
  type: '网点/站点',
  pid: '',
  startMoneyCentre: true,
  startAllowArrive: false
}
export default {
  name: 'StructEdit',
  data() {
    return {
      formTitle: '类别管理',
      btns,
      formVisible: false,
      row: {},
      url: URL_SYSTEM_AUTH_STRUCTURE,
      post: true
    }
  },
  computed: {
    ...mapGetters(['siteTree', 'areaList'])
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 850
    }
  },
  methods: {
    ...mapActions(['DeleteSite']),
    handleClose() {
      this.$emit('close')
    },
    handleAction(btn, node) {
      console.log('node',node, btn)
      const { action } = btn
      const {
        children,
        parentId,
        type,
        name,
        id,
        level,
        siteId,
        leader,
        leaderTel,
        sitePattern = '直营',
        startMoneyCentre,
        startAllowArrive,
        code,
        mode,
        city,
      } = node
      if (action === 'add') {
        this.post = true
        this.row = {
          ...row,
          parentId,
          id,
          level,
          siteId,
          leader,
          leaderTel,
          sitePattern,
          mode,
          //city,
        }
        this.formVisible = true
      } else if (action === 'edit') {
        this.post = false
        this.row = {
          parentId,
          type,
          name,
          id,
          level,
          siteId,
          leader,
          leaderTel,
          sitePattern,
          startMoneyCentre,
          startAllowArrive,
          code,
          mode,
          city,
        }
        console.log('------this.row---------',this.row)
        this.formVisible = true
      } else {
        if (children && children.length) {
          return this.$warning({
            title: '提示',
            content: '请先删除下级子目录'
          })
        }

        this.$confirm({
          title: '提示',
          content:'确认删除?',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            this.DeleteSite(id).then(res => {
              this.$message.success('成功删除')
            })
          },
          onCancel: () =>{
            console.log('Cancel');
          },
        });
      }
    },
    handleCloseForm() {
      this.formVisible = !this.formVisible
    }
  },
  components: {
    StructForm
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
