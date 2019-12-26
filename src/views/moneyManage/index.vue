<!-- 钱包管理 -->
<template>
  <div>

 <div class="app-content">
   <a-card>
      <a-col :span="8">
          <a-input-group compact>
          <a-select defaultValue="用户名" @select="changeSearch">
            <a-select-option  v-for="item in selectOptions" :value=item.value>{{item.name}}</a-select-option>
        </a-select>
          <a-input  @change="inputChange" style="width: 40%" v-model="searchValue" placeholder="请输入关键词" />
        </a-input-group>
      </a-col>
      <a-col :span="6">
          <a-range-picker @change="dataChange">
        
    </a-range-picker>
      </a-col>
    
   </a-card>

    <a-card>
      <!-- :rowSelection="rowSelection" -->
     <a-table  :rowKey="record => record.id" :pagination="false" :dataSource="dataSource" :columns="columns" >  
    
    <template slot="genre" slot-scope="text, record">
    
      <span v-if="record.genre == 1"> 当日达</span>
      <span v-if="record.genre == 2"> 即时达</span>
    </template>

    <template slot="status" slot-scope="text, record">
    
      <span v-if="record.genre == 0"> 未操作</span>
      <span v-if="record.genre == 1"> 已操作</span>
    </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="确认审核通过?"
          @confirm="() => pass(record)"
        >
        <span class="button_sty">通过</span>
        </a-popconfirm>
       <a-popconfirm
          v-if="dataSource.length"
          title="确认驳回?"
          @confirm="() => rejiect(record)"
        >
         <span class="button_sty">驳回</span>
         </a-popconfirm>
      

      </template>
  

    </a-table>
    <div class="page">
       <!-- <a-pagination showQuickJumper :defaultCurrent="2" :total="500" @change="onChange" /> -->
        <a-pagination size="small" :total="pageInfo.total" showSizeChanger showQuickJumper @change="onChange" @showSizeChange="showSizeChange" :showTotal="total => `总共 ${total} 条`" />

    </div>
      
         
    </a-card>

 </div>

  </div>
</template>

<script>
import moment from 'moment'
import { WITHDRAWAL, WITHDRAWAL_REJECT } from '@/api/url'
import { mapGetters } from 'vuex'
import { axios } from '@/utils/request'
export default {
  name:'moneyManage',
  data () {
    return {
      selected:[],
      pageInfo:{
        page: 0,
        limit:10,
        total:0,
      },

      searchKey:'username',
      searchValue: '',
      startTime:'',
      endTime:'',
      username: '',
      selectOptions:[
        {value: 'uesrname', name:'用户名'},
      //  {value: 'orderId', name:'订单编号'},
      ],
      columns: [
          
          {
            title: '姓名',
            dataIndex: 'courierName',
           // width: '30%',
          },
     
          {
            title: '账号类型',
            dataIndex: 'genre',
           scopedSlots: { customRender: 'genre'},
         
          },
           {
            title: '卡号',
            dataIndex: 'cardNum',
          },
          {
            title: '数额',
            dataIndex: 'money',
          },
            {
            title: '状态',
            dataIndex: 'status',
           scopedSlots: { customRender: 'status'},
          },
          {
            title: '操作',
            dataIndex: 'operation',
            align:'center',
            scopedSlots: { customRender: 'operation'},
          },
        ],
      dataSource: [
  
        ],
    };
  },

  components: {},

  computed: {
   
             rowSelection() {
          console.log('this', this)

          const { selectedRowKeys } = this;
          return {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
             // this.$emit('selected', selectedRows)
             this.selected = selectedRows
            },
            getCheckboxProps: record => ({
              props: {
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
              }
            }),
          }
        }
  },

 mounted() {
   this.getList()
 },

  methods: {
    // 通过申请
    pass(row) {
      //  this.selected =   this.selected.map(item => {
      //     return item.id
      //   })
      let params = {
        courierIds: [row.courierId],
        status:1,
      }
        console.log(this.selected)
        axios.put(`${WITHDRAWAL}`, params ).then(res => {
          if(res.data.code === 200) {
            console.log('res', res)
            this.pageInfo.page = 0
            this.getList()
          }
        })

    },
    // 驳回申请
    rejiect(row) {
      console.log(row)
        // let params = {
        //    id: row.id,
        //    courierId: row.courierId
        // }
        axios.put(`${WITHDRAWAL_REJECT}`, row).then(res => {
          if(res.data.code === 200) {
            console.log('res', res)
            this.pageInfo.page = 0
            this.getList()
          }
        })
    },
    // 切换选择
    changeSearch(value) {
      console.log('changeSearch', value)
      if(value) {
        this.searchKey = value
      }
    },
      // 切换选择
    inputChange(value) {
    //  if(value.data) {
          console.log('inputChange', this.searchKey,this.searchValue, value.data)
          this[this.searchKey] = this.searchValue
          this.getList()
          
   // }
    },
    // 时间改变
    dataChange(value) {
      console.log('dataChange', value)
      this.startTime = moment(value[0]).format("YYYY-MM-DD")
      this.endTime = moment(value[1]).format("YYYY-MM-DD")
      console.log('startTime', this.startTime, this.endTime)
      this.getList()
    },
    // 分页改变
     onChange(pageNumber) {
        console.log('Page: ', pageNumber);
      },
      // 每页条数
      showSizeChange(current, size) {
            console.log('size: ', current, size);
      },
      // 获取提现记录
      getList() {
        let params = {
            username: this.searchValue || '',
            startTime: this.startTime || '',
            endTime: this.endTime || '',
            page: this.pageInfo.page || 0,
            limit: this.pageInfo.limit || 10
        }
        axios.get(`${WITHDRAWAL}?courierName=${params.username}&startTime=${params.startTime}&endTime=${params.endTime}&page=${params.page}&limit=${params.limit}`).then(res => {
          if(res.data.code === 200) {
            console.log('res', res)
            this.dataSource = res.data.data.rows
            this.pageInfo.total = res.data.data.total || 0
            console.log(this.pageInfo)
          }
        })
      },
    

  }
}

</script>
<style lang='scss'  scoped>
 .category-list {
    margin: 10px 0;
  }
  .button_sty{
    color:#8793f9
    
  }
  .button_sty:hover{
    cursor: pointer;
    border-bottom: #8793f9 1px solid;
  }
  .page {
    text-align: right;
    margin-top: 20px;
  }
</style>