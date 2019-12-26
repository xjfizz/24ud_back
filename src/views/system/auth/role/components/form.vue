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
          <a-form-item label="角色名称" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              v-decorator="[
                `name`,
                {
                  initialValue: fieldValues.name,
                  rules: [{
                    required: true,
                    message: '请输入角色名称',
                  }],
                }
              ]"
              placeholder="请输入角色名称"
            />
          </a-form-item>
        </a-col>
<!--        <a-col :span="12">-->
<!--          <a-form-item label="所属部门" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--            <a-select-->
<!--              :options="deptNames"-->
<!--              allowClear-->
<!--              placeholder="选择所属部门"-->
<!--              v-decorator="[-->
<!--                'dept',-->
<!--                {-->
<!--                  initialValue: fieldValues.dept,-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '请选择部门',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col :span="24">-->
<!--          <a-form-item label="分类" :label-col="{span: 3}" :wrapper-col="{span: 18}">-->
<!--            <a-radio-group-->
<!--              style="width: 600px"-->
<!--              v-decorator="[-->
<!--                'category',-->
<!--                {-->
<!--                  initialValue: fieldValues.category,-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '请设置访问权限',-->
<!--                  }],-->
<!--                }-->
<!--            ]"-->
<!--            >-->
<!--            <a-radio :value="0">全部</a-radio>-->
<!--            <a-radio :value="1">当日达</a-radio>-->
<!--            <a-radio :value="2">即时达</a-radio>-->
<!--            </a-radio-group>-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col :span="24">
          <a-form-item label="功能权限" :label-col="{span: 3}" :wrapper-col="{span: 18}">
            <!--  :showCheckedStrategy="TreeSelect.SHOW_ALL"   treeCheckable -->
            <a-tree-select
              style="width: 600px"
              :treeData="permissionTree"
              treeCheckable
               :showCheckedStrategy="SHOW_ALL"
              searchPlaceholder="选择权限"
              v-decorator="[
                'permissionTree',
                {
                  initialValue: fieldValues.permissionTree,
                  rules: [{
                    required: true,
                    message: '请设置访问权限',
                  }],
                }
            ]"
            />
          </a-form-item>
        </a-col>
<!--        <a-col :span="24">-->
<!--          <a-form-item label="备注" :label-col="{span: 3}" :wrapper-col="{span: 18}">-->
<!--            <a-textarea-->
<!--              placeholder="输入备注"-->
<!--              v-decorator="[-->
<!--                'describe',-->
<!--                {-->
<!--                  initialValue: fieldValues.describe,-->
<!--                  rules: [{-->
<!--                    required: false,-->
<!--                    message: '输入备注',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--              :rows="2"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script >
import FormMixis from '@/mixins/form'
import { TreeSelect } from 'ant-design-vue';

const SHOW_ALL = TreeSelect.SHOW_ALL;

const filterTree = (list, tree, keys) => {
  tree.forEach(node => {
    const { id, name, state, url, children } = node
    if (keys.includes(id)) {
      list.push({ id, name, state, url })
    } else {
      children && children.length && filterTree(list, children, keys)
    }
  })
}

export default {
  name: 'RoleForm',
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
      SHOW_ALL
    }
  },
  props: {
    url: {
      type: String
    },
    row: {
      type: Object,
      default: () => {}
    },
    permissions: {
      type: Object,
      default: () => {}
    },
    permissionTree: {
      type: Array,
      default: () => []
    },
    deptNames: {
      type: Array,
      default: () => []
    },
    postParams: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 850
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    method() {
      return this.row.roleId ? 'put' : 'post'
    },
    formTitle() {
      console.log('this.row', this.row)
      const { roleId = '' } = this.row
      return roleId ? `修改角色` : `添加角色`
    },
    fieldValues() {
      const { roleId, authorities, ...params } = this.row
      console.log(params, this.row)
      let permissionTree = []
      if (authorities) {
        permissionTree = authorities.filter(item => item.authorityId !== 'Home').map(item => item.authorityId)
      }
      return {
        permissionTree,
        ...params
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    interceptors(values) {
      
      const { roleId } = this.row
      let { name, dept, describe, permissionTree } = values
      console.log(values)
      console.log(this.permissions)
      const p = this.permissions
      const permissions = permissionTree.map(id => {
        return p[id]
      })
      delete values.permissionTree
      let post = {
        ...values,
        authorities: permissions
      }
      console.log(values, permissions,post)
      if (roleId) {
        return {
          roleId,
          ...post
        }
      }
      return post
    },
    onSelect(selectedKeys, info) {

      this.selectKeys = selectKeys
      console.log('onSelect', this.selectKeys)
    },
    onCheck(selectKeys, info) {
      this.selectKeys = selectKeys
      console.log('selectKeys', this.selectKeys)
    },
    // 权限改变
    selectChange(value, node, extra) {
      console.log(this.permissionTree, value, node, extra);
      let treeList = []
      value.forEach(item1 => {
       // this.couriers.forEach(item => item.value === pickerId)
        this.permissionTree.forEach(item => {
          if(item1 == item.authorityId) {
            treeList.push(item)
          }
          if (item.children && item.children.length) {
              item.children.forEach(item3 => {
                if(item1 == item3.authorityId) {
                  treeList.push(item3)
                }
              })
          }
        })
      })
      treeList = treeList.map(item => {
        return{
          authorityId: item.authorityId,
          code: item.code,
          name: "string",
          parentId:item.parentId,
          type: item.name

        }
      })
      console.log('treeList', treeList);

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
</style>
