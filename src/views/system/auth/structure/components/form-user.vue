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
          <a-form-item label="昵称" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              v-decorator="[
                'nickname',
                {
                  initialValue:fieldValues.nickname,
                  rules: [{
                    required: true,
                    message: '请输入姓名',
                  }],
                }
              ]"
              placeholder="请输入姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :disabled="row.userId ? true : false"
              class="form-item"
              v-decorator="[
                'username',
                {
                  initialValue:fieldValues.username,
                  rules: [{
                    required: true,
                    message: '请输入用户名',
                  }],
                }
              ]"
              placeholder="请输入姓名"
            />
          </a-form-item>
        </a-col>
<!--        <a-col :span="12">-->
<!--          <a-form-item label="性别" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--            <a-radio-group-->
<!--              v-decorator="[-->
<!--                `gender`,-->
<!--                {-->
<!--                  initialValue: fieldValues.gender,-->
<!--                  rules: [{-->
<!--                    required: true-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--            >-->
<!--              <a-radio value="男">男</a-radio>-->
<!--              <a-radio value="女">女</a-radio>-->
<!--            </a-radio-group>-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col :span="12">
          <a-form-item label="手机号" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              type="number"
              placeholder="手机号码即为登录账号"
              v-decorator="[
                'phone',
                {
                  initialValue: fieldValues.phone,
                  rules: [{
                    required: true,
                    message: '请输入手机号码'
                  },
                  {
                    pattern: /^1[35789]\d{9}$/g,
                    message: '请输入合法手机号码'
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="登录密码" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="1"
              :max="100000"
              class="form-item"
              placeholder="默认密码123456"
              v-decorator="[
                'password',
                {
                  rules: [{
                    required: false,
                    message: '请输入密码',
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item label="所属部门" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              placeholder="选择所属部门"
              allowClear
              :options="departments"
              v-decorator="[
                'dept',
                {
                  initialValue: fieldValues.dept,
                  rules: [{
                    required: true,
                    message: '请选择部门',
                  }],
                }
              ]"
            >
            </a-select>
          </a-form-item>
        </a-col>-->
        <a-col :span="12">
          <a-form-item label="所属站点" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-cascader
              placeholder="选择所属站点"
              v-decorator="[
                'orgId',
                {
                  initialValue: fieldValues.orgId
                }
              ]"
              :options="mapSiteList"
              expandTrigger="hover"
              changeOnSelect
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="角色" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              placeholder="选择角色"
              :options="roles"
              v-decorator="[
                'roleId',
                {
                  initialValue: fieldValues.roleId,
                  rules: [{
                    required: true,
                    message: '请选择角色',
                  }],
                }
              ]"
            ></a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item label="状态" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-radio-group
              v-decorator="[
                'status',
                {
                  initialValue: fieldValues.status,
                  rules: [{
                    required: true
                  }],
                }
              ]"
            >
              <a-radio :value="true">启用</a-radio>
              <a-radio :value="false">禁用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col> -->
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script >
import FormMixis from '@/mixins/form'
import { mapGetters } from 'vuex'
import { URL_SYSTEM_AUTH_ROLE_ALL, CHANGE_ACCOUNT_STATUS} from '@/api/url'

export default {
  name: 'User-Form',
  data () {
    return {
      wrapperCol: {
        span: 18
      },
      labelCol: {
        span: 6
      },
      roles: [],
      userInfo:{}
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
    }
  },
  computed: {
    ...mapGetters(['siteListTree', 'topStruct']),
    method() {
      return this.row.userId ? 'put' : 'post'
    },
    formTitle() {
      const { userId } = this.row
      const title = userId ? `修改账号` : `添加账户`
      return userId ? `修改账号` : `添加账户`
    },
    mapSiteList() {
      const { siteListTree = [] } = this
      console.log('siteListTree', siteListTree, siteListTree.length)
      return siteListTree.length ? this.formatList(siteListTree) : []
    },
    fieldValues() {
      const { roleId = {}, userId, ...params } = this.row
      // gender:"男"
      // id:"5cff72dd1592504994c0f2a9"
      // name:"猪"
      // num:4
      // password:""
      // role:Object
      // roleId:"5cfdc2321592502320c8663b"
      // siteIds:Array[4]
      // state:1
      // username:"13592778966"
      console.log(this.row, this.row.roles)
      this.row.orgId = this.row.orgId || ''
      console.log('this.mapSiteList,', this.mapSiteList)
      this.row.orgId = this.getOidTree(this.mapSiteList,this.row.orgId )
      console.log(this.row, this.row.roles)
      if(!this.row.roles) {
        this.row.roles = []
      }
      return {
        username : this.row.username,
        nickname: this.row.nickname,
        phone: this.row.phone,
        orgId: this.row.orgId,
        roleId: this.row.roles[0] ? this.row.roles[0].roleId : '',
        status: this.row.status,
        password: this.row.password
      }
    }
  },
  created() {
    this.$http.get(URL_SYSTEM_AUTH_ROLE_ALL).then(res => {
      console.log('角色列表', res)
      if(res.data.code == 200) {
        const  data  = res.data.data

        this.roles = data.map(item => {
          const { roleId, name,  } = item
          return {
            value: roleId,
            label: name,
            ...item
          }
        })
      }
    })
    this.userInfo = JSON.parse(localStorage.getItem('login_user'))
  },
  methods: {

  getOid(oid,sites) {
      console.log('sites', sites)
      sites.map(item => {
        this.OID.push(item.id)
        if(item.id !== oid) {
          if(item.children) {
            this.getOid(oid, item.children)
          }else {
            this.OID = []
          }
        } else {
          console.log(item)
          return this.OID
        }
      })
    },
    // 遍历数组 查找节点的父节点
    getOidTree(data,id) {
      console.log('data',data)
      let isHeadQuarters =  true
      if(data[0]) {
         isHeadQuarters = data[0].level == 0 ? true : false
      }
      let b = []
      // tree转一位数组
      function Family(data,id) {
        data.forEach(item => {
          b.unshift(item)
          if(item.children) {
            Family(item.children, id)
          }
        })
        return id
      }
      console.log('b', b)
      let c= []
      function FamilyFun(id) {
       b.forEach(item => {
         if(item.id === id) {
           if(item.parentId) {
             c.unshift(item.parentId)
             FamilyFun(item.parentId)
           }
         }
       })
        console.log('c', c)
        return c

      }
     //  Family(data,id)
      console.log('c', c)
      if(c) {
        FamilyFun(Family(data,id))
      }
      // FamilyFun(Family(data,id))
      c.push(id)
      if(!isHeadQuarters) {
        c.shift()
      }
      console.log('c', c)
      return c
    },

    formatList(data) {
      console.log('组织树', data)
      if (!Array.isArray(data)) return []
      return data.map(item => {
        const kids = item.level === 2 ? [{ label: '全部', value: '' }].concat(item.children) : item.children
        const children = this.formatList(kids)
        return {
          ...item,
          children
        }
      })
    },
    handleClose() {
      this.$emit('close')
    },
    interceptors(values) {
      console.log('values', values)
      const { userId } = this.row
      let { roleId, dept, orgId, ...params } = values
      let roles = [{roleId: roleId}]
      const topId = this.topStruct.id

     // const [role] = this.roles.filter(item => item.id === roleId)

      let post = {
        ...params,
        orgId: orgId[orgId.length - 1],
        roleId
      }

      post.roles = roles
      delete post.roleId
      if (userId) {
        delete post.username
        const { password } = params
        return {
          operateOrgId: this.userInfo.orgId,
          userId,
          ...post,
          password,
        }
      }
      console.log('post', post)

      return post
    }
  },
  mixins: [FormMixis]
}
</script>

