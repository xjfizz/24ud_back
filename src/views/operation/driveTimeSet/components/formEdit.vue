<template>
  <a-modal :title="modelOptions.title" v-model="modelOptions.visible" @ok="submit" :width="500" @cancel="cancel">
    <a-form :form="form">
      <a-form-item label="站点名称" :label-col="{span: 5}" :wrapper-col="{span:12}">
                   <a-cascader :disabled=true class="selectSite" :options="siteList" @change="onChange()" placeholder="请选择站点"
                      v-decorator="['siteName',{
                          initialValue: options.siteName,
                         rules:[{required: true, message: '请选择站点'}]}]"
                      changeOnSelect
         ></a-cascader>

        <!-- <span>{{options.siteName}}</span> -->

      </a-form-item>
      <a-form-item  label="班车时间" :label-col="{span: 5}" :wrapper-col="{span:19}">
        <!--         <a-input v-decorator="['time',{ rules:[{required: true, message: '请选择时间'}]}]" placeholder="请选择时间"></a-input>-->
        <div class="time-input" v-for="(item, index) in options.times ">
          <!--           <span>第{{index + 1}}班:</span>-->
          <a-time-picker  class="startTime"  @change="onChangeStart" v-model="item.startTime"
          >
          </a-time-picker>
          <a-time-picker  class="endTime" @change="onChangeEnd" v-model="item.endTime">
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
  import { axios } from '@/utils/request'
  import moment from 'moment'
  import {utils} from '../utils.js'
    import { BUSTIME } from '@/api/url'
  export default {
    name: "formEdit",
    components: {AFormItem},
    props:{
      modelOptions:{
        type: Object,
        default: {}
      },
      options:{
        type:Object,
        default: {}
      },
      siteList:{
            type:Array,
            default: []
        }
    },
    data() {
      return{
        form: this.$form.createForm(this),
        startTime: '',
        endTime: '',
        timeArrayNumber:this.options.times,
        timeNumber: 1,
      }
    },
    created() {
    },
    methods:{
      moment,
      submit() {
        this.startTime = this.options.times[this.options.times.length - 1].startTime
        this.endTime = this.options.times[this.options.times.length - 1].endTime

        this.form.validateFields((err, values) => {
          console.log(err,values, this.options.times)
          if (!err) {
            console.log(this.startTime,this.endTime)
            if (this.startTime && this.endTime) {
             let text =  utils.compareMoment(this.startTime, this.endTime)
              console.log('text', text)
              if(text === -1) {
                return this.$message.error('开始时间大于结束时间');
              } else if (text === 0) {
                return this.$message.error('开始时间等于结束时间');
              } else if (text === 1) {
                console.log('success')
                /* moment转time */
                let time =    this.options.times.map(item => {
                  return {startTime: utils.timeTransfar(item.startTime),endTime: utils.timeTransfar(item.endTime), id: item.id || null }
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
        this.options.times.splice(index,1)
        this.startTime = this.options.times[this.options.times.length - 1].startTime
        this.endTime = this.options.times[this.options.times.length - 1].endTime
        console.log('this.options.times', this.options.times, this.startTime, this.endTime)
        if(item.id) {
            this.delete(item.id)
        }
      },
      // 添加时间
      addTime () {
        console.log('添加时间')
        this.startTime = this.options.times[this.options.times.length - 1].startTime
        this.endTime = this.options.times[this.options.times.length - 1].endTime

        console.log( this.options.times)
        if (this.startTime && this.endTime) {
          this.startTime = this.options.times[this.options.times.length - 1].startTime
          this.endTime = this.options.times[this.options.times.length - 1].endTime
          let text =  utils.compareMoment(this.startTime, this.endTime)
          console.log('text', text)
          if(text === -1) {
            return this.$message.error('开始时间大于结束时间');
          } else if (text === 0) {
            return this.$message.error('开始时间等于结束时间');
          } else if (text === 1) {
            console.log('success')
            this.options.times.push(
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
        this.options.times = [
          { startTime: null,  endTime: null,}
        ]
      },
      // 删除单条数据
      delete(id) {
        let params  = [id]
          axios.delete(`${BUSTIME}`,{data:params}).then(res => {
           if(res.data.code === 200 ) {
            console.log('res',res)
              this.getList()
            }
         // this.refetch()
        })
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
