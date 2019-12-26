<!--
 * @Author: your name
 * @Date: 2019-11-26 12:11:23
 * @LastEditTime: 2019-12-08 00:40:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\views\operation\driveTimeSet\components\tableList.vue
 -->
<template>
    <div class="main">
      <a-table :rowKey="row=>row.oid" :dataSource="tableList" :pagination="pagination"  :columns="columns"  class="components-table-demo-nested">
        <a-button type="primary" slot="action" slot-scope="text" href="javascript:;" @click="edit(text)">编辑</a-button>
          <a-table :rowKey="row=>row.oid" slot="expandedRowRender"   slot-scope="text" :dataSource="text.times" :pagination="false" :columns="columnsInner" class="components-table-demo-nested"></a-table>
      </a-table>
    </div>
</template>



<script>
  import CommonPagination from '@/components/common-tools/common-pagination'
    export default {
      name: "tableList",
      components:{
        CommonPagination
      },
      props:{
        tableList:{
            type:Array,
            default: []
          },
        columns:{
          type:Array,
          default:[]
        },
        tableListInner:{
          type:Array,
          default: []
        },
        columnsInner:{
          type:Array,
          default:[]
        }
      },
      data() {
        return{
          pagination:{
            total: 0,
            pageSize: 10,//每页中显示10条数据
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
            showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
          }
        }
      },
      computed:{
        rowSelection() {
          console.log('this', this)

          const { selectedRowKeys } = this;
          return {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              this.$emit('selected', selectedRows)
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
      methods:{
        // 编辑
        edit(row) {
          console.log('row', row)
          this.$emit('openEditForm', row)
        }
      }
    }
</script>

<style scoped>


</style>
<style lang="less">
  .main{
    .ant-table-thead{
      div{
        color: #000000;
        font-size: 14px;
        font-weight: 800;
      }
    }
    .page{
      text-align: center;
    }
  }
</style>
