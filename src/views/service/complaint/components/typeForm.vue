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
        <a-col>
          <a-form-item label="名称" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              v-decorator="[
                `typeName`,
                {
                  initialValue: fieldValues.typeName,
                  rules: [{
                    required: true,
                    message: '请输入类型名',
                  }],
                }
              ]"
              placeholder="请输入用户名"
            />
          </a-form-item>
        </a-col>
        <a-col>
<!--          <a-form-item label="投诉类型" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--            <a-input-->
<!--              class="form-item"-->
<!--              type="number"-->
<!--              v-decorator="[-->
<!--                `typeState`,-->
<!--                {-->
<!--                  initialValue: fieldValues.typeState,-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '请输入投诉类型',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--              placeholder="请输入投诉类型"-->
<!--            />-->
<!--          </a-form-item>-->
<!--          <a-form-item label="启用状态" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--            <a-radio-group-->
<!--              placeholder="选择所属状态"-->
<!--              v-decorator="[-->
<!--                'state',-->
<!--                {-->
<!--                  initialValue: fieldValues.state,-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '请选择所属状态',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--            >-->
<!--              <a-radio :value="1">启用</a-radio>-->
<!--              <a-radio :value="0">停用</a-radio>-->
<!--            </a-radio-group>-->
<!--          </a-form-item>-->
        </a-col>
<!--        <a-col v-if="!isTop">-->
<!--          <a-form-item label="上级类别" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--            <a-select-->
<!--              v-decorator="[-->
<!--                'pid',-->
<!--                {-->
<!--                  initialValue: fieldValues.pid,-->
<!--                  rules: [{-->
<!--                    message: '上级类别',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--            >-->
<!--              <a-select-option-->
<!--                v-for="item in pids"-->
<!--                :key="item.id"-->
<!--                :value="item.id"-->
<!--              >{{item.typeName}}</a-select-option>-->
<!--            </a-select>-->
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
export default {
  name: 'type-form',
  data() {
    return {
      wrapperCol: {
        span: 12
      },
      labelCol: {
        span: 6
      },
      reloading: false
    }
  },
  props: {
    url: {
      type: String
    },
    pids: {
      type: Array,
      default: () => []
    },
    post: {
      type: Boolean,
      default: true
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
    },
    isTop: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    method() {
      return this.post ? 'post' : 'put'
    },
    formTitle() {
      const { post } = this
      return post ? `添加类别` : `修改类别`
    },
    fieldValues() {
      const { typeId, pid, ...props } = this.row
      return {
        ...props,
     //   pid: this.post ? '' : typeId,
        typeId: this.post ? '' : typeId,
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    interceptors(values) {
      let { typeId } = this.row
      console.log(values)
      const data = {...values}
      if (this.isTop) {
        data.pid === ''
      }
      if (this.post) {
        return data
      }
      return {
        typeId,
        ...data
      }
    },
    interceptorsSuccess() {
      this.$emit('refetch')
      this.$emit('close')
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
