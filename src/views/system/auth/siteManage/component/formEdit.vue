<template>
   <a-modal :title="modelOptions.title" v-model="modelOptions.visible" @ok="submit" :width="700" @cancel="cancel">
     <a-form :form="form">
       <a-row>
         <a-col :span="12">
                  <a-form-item label="账号名称" :label-col="{span: 8}" :wrapper-col="{span:15}">
        <a-input placeholder="请输入账号名称" v-decorator="['userName',{   initialValue: row.userName, rules:[{required: true, message: '请输入账号名称'}]}]"></a-input>
     </a-form-item>
         </a-col>
         <a-col :span="12">
            <a-form-item label="手机号码" :label-col="{span: 8}" :wrapper-col="{span:15}">
        <a-input placeholder="请输入手机号" v-decorator="['phone',{ initialValue: row.phone, rules:[{required: true, message: '请输入手机号'}]}]"></a-input>


       </a-form-item>
         </a-col>
       </a-row>
      <a-row>
         <a-col :span="12">
          <a-form-item label="密码" :label-col="{span: 8}" :wrapper-col="{span:15}">
            <a-input placeholder="请输入密码" v-decorator="['password',{ rules:[{required: false, message: '请输入账号密码'}]}]"></a-input>
          </a-form-item>
         </a-col>
         <a-col :span="12">
            <a-form-item label="所属站点" :label-col="{span: 8}" :wrapper-col="{span:15}">
<!--         <a-input v-decorator="['siteName',{ rules:[{required: true, message: '请选择站点'}]}]"></a-input>-->

         <a-cascader  class="selectSite" :options="options" @change="onChange" placeholder="请选择站点"
                      v-decorator="['siteName',{ initialValue: row.oid, rules:[{required: true, message: '请选择站点'}]}]"
                      changeOnSelect
         ></a-cascader>

       </a-form-item>
         </a-col>
       </a-row>

             
      
     </a-form>


   </a-modal>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
import { parse } from 'path';

    export default {
        name: "formEdit",
      components: {AFormItem},
      props:{
          modelOptions:{
            type: Object,
            default: {}
          },
        options:{
            type:Array,
            default: []
        },
        row:{
            type: Object,
            default: {}
          },
      },
      data() {
          return{
            form: this.$form.createForm(this),
            startTime: '',
            endTime: '',
            timeArrayNumber: [
              { startTime: null,  endTime: null,}
            ],
            timeNumber: 1,
          }
      },
      methods:{
          submit() {
            this.form.validateFields((err, values) => {
              console.log(err,values, this.timeArrayNumber)
              if (!err) {
                let params = {
                  id: this.row.id,
                  ...values
                }
               this.$emit('addForm', params)
              }
            });
          },
        // 站点改变
        onChange(value, selected,Options) {
          console.log(value, selected,Options);
          this.$emit('onchange', selected)
        },
       // 取消
        cancel() {
          this.resetForm()
        },
        // 重置表单
        resetForm() {
          this.form.resetFields();
          this.timeArrayNumber = [
            { startTime: null,  endTime: null,}
          ]
        }
      }
    }
</script>

<style scoped lang="less">
.time-input{
  display: flex;
  justify-content:space-between;
  margin-top: 10px;
}
</style>
