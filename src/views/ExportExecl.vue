<template>
    <div id="table-container">
        <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
            <el-table-column
            prop="date"
            label="日期"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地址">
            </el-table-column>
        </el-table>  

        <el-button @click="exportExcel">导出</el-button>
    </div>
</template>

<script>
export default {
    name: 'ExportExecl',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
        exportExcel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../execl/Export2Excel');
                // tHeader 数组里面放的是字段的对应名
                const tHeader = ['日期', '姓名', '地址'];
                // filterVal  字段对应的值
                const filterVal = ['date', 'name', 'address'];　
                const list = this.tableData;
                const data = this.formatJson(filterVal, list);
                // console.log(data)
                export_json_to_excel(tHeader, data, '导出');
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    }
}
</script>

<style lang="less">
    #table-container{
        width: 720px;
        margin: 0 auto;
        text-align: center;
    }
    .el-button{
        margin-top:20px;
    }
</style>