<template>
   <a-modal :title="modelOptions.title" v-model="modelOptions.visible" @ok="submit" :width="500" @cancel="cancel">
     <a-form :form="form">
       <a-form-item label="站点名称" :label-col="{span: 5}" :wrapper-col="{span:12}">
<!--         <a-input v-decorator="['siteName',{ rules:[{required: true, message: '请选择站点'}]}]"></a-input>-->

         <a-cascader  class="selectSite" :options="options" @change="onChange()" placeholder="请选择站点"
                      v-decorator="['siteName',{ rules:[{required: true, message: '请选择站点'}]}]"
                      changeOnSelect
         ></a-cascader>

       </a-form-item>
       <a-form-item  label="班车时间" :label-col="{span: 5}" :wrapper-col="{span:19}">
<!--         <a-input v-decorator="['time',{ rules:[{required: true, message: '请选择时间'}]}]" placeholder="请选择时间"></a-input>-->
         <div class="time-input" v-for="(item, index) in timeArrayNumber ">
<!--           <span>第{{index + 1}}班:</span>-->
           <a-time-picker class="startTime"  @change="onChangeStart" v-model="item.startTime"
           >
           </a-time-picker>
           <a-time-picker class="endTime" @change="onChangeEnd" v-model="item.endTime">
           </a-time-picker>
          <a-button type="primary" v-if="index > 0" class="deleteTime" @click="deleteTime(item,index)">删除</a-button>
           <a-button class="addtime" v-if="index == 0" type="primary" @click="addTime()">新增</a-button>
         </div>

       </a-form-item>
     </a-form>


   </a-modal>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import {utils} from '../utils.js'
    export default {
        name: "formAdd",
      components: {AFormItem},
      props:{
          modelOptions:{
            type: Object,
            default: {}
          },
        options:{
            type:Array,
            default: []
        }
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
                console.log(this.startTime,this.endTime)
                if (this.startTime && this.endTime) {
                  this.startTime = this.timeArrayNumber[this.timeArrayNumber.length - 1].startTime
                  this.endTime = this.timeArrayNumber[this.timeArrayNumber.length - 1].endTime
                  let text =  utils.compareMoment(this.startTime, this.endTime)
                  console.log('text', text)
                  if(text === -1) {
                    return this.$message.error('开始时间大于结束时间');
                  } else if (text === 0) {
                    return this.$message.error('开始时间等于结束时间');
                  } else if (text === 1) {
                    console.log('success')
                    /* moment转time */
                let time =    this.timeArrayNumber.map(item => {
                      return {startTime: utils.timeTransfar(item.startTime),endTime: utils.timeTransfar(item.endTime) }
                    })
                    values.time = time
                    let data = {values}
                    console.log('time', time)
                    this.resetForm()
                    this.$emit('submit', data)
                  }
                  let startTime= this.startTime.toString().substring(16,24)
                  let endTime= this.endTime.toString().substring(16,24)
                  console.log('startTime, endTime',startTime, endTime)
                } else {
                  return this.$message.error('开始时间和结束时间不能为空');
                }


              }
            });
          },
        // 站点改变
        onChange(value) {
          console.log(value);
          this.$emit('onchange', value)
        },
        onChangeStart(time, timeString) {
          console.log(time, timeString, this.startTime);
          this.startTime = timeString
        },
        onChangeEnd(time, timeString) {
          console.log(time, timeString);
          this.endTime = timeString
        },
        // 删除时间
        deleteTime(item,index) {
          console.log(item,index)
          this.timeArrayNumber.splice(index,1)
          this.startTime = this.timeArrayNumber[this.timeArrayNumber.length - 1].startTime
          this.endTime = this.timeArrayNumber[this.timeArrayNumber.length - 1].endTime
          console.log('this.timeArrayNumber', this.timeArrayNumber, this.startTime, this.endTime)
        },
        // 添加时间
        addTime () {
          console.log('添加时间')


          console.log( this.timeArrayNumber)
          if (this.startTime && this.endTime) {
            this.startTime = this.timeArrayNumber[this.timeArrayNumber.length - 1].startTime
            this.endTime = this.timeArrayNumber[this.timeArrayNumber.length - 1].endTime
            let text =  utils.compareMoment(this.startTime, this.endTime)
            console.log('text', text)
            if(text === -1) {
              return this.$message.error('开始时间大于结束时间');
            } else if (text === 0) {
              return this.$message.error('开始时间等于结束时间');
            } else if (text === 1) {
              console.log('success')
              this.timeArrayNumber.push(
                { startTime: null,  endTime: null,}
              )
              this.startTime = ''
              this.endTime = ''
            }
            let startTime= this.startTime.toString().substring(16,24)
            let endTime= this.endTime.toString().substring(16,24)
            console.log('startTime, endTime',startTime, endTime)
          } else {
            return this.$message.error('开始时间和结束时间不能为空');
          }

          // this.timeNumber++
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
