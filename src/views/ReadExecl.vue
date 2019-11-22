<template>
    <div id="container">
    <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    multiple
    :limit="1"
    accept=".xls,.xlsx"
    :on-change="selectFile">
        <el-button size="small" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
    </el-upload>

    <el-row :gutter="20">
        <el-col :span="12"><div class="grid-content bg-purple">
            <h1>导入的表格显示如下:</h1>
        </div></el-col>
        <el-col :span="4" :offset="8"><div class="grid-content bg-purple right">
            <el-button @click="readExcel(file)">导入</el-button>
        </div></el-col>
    </el-row>
    
    <el-table
    :data="this.outputs"
    border
    stripe>
        <el-table-column v-for="(outputItem,index) of outputs[0]" :key="outputItem"
            :prop="index"
            :label="index"
            width="180">
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
    name: 'ReadExecl',
    data () {
        return {
            // 获取导入的execl文件的内容
            outputs: [],
            // 获取导入的文件
            file: undefined
        }
    },
    methods: {
        selectFile(file){
            this.file = file.raw
        },
        readExcel (files) {
            if(files === undefined) return;
            const fileReader = new FileReader()
            fileReader.onload = (ev) => {
                const data = ev.target.result
                // 读取工作薄数据
                const workbook = XLSX.read(data, {
                    type: 'binary'
                })
                const wsname = workbook.SheetNames[0] // 取第一张表的名字
                const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
                // console.log(ws)
                this.outputs = [] // 清空接收数据
                
                for (let i = 0; i < ws.length; i++) {
                    let sheetData = ws[i] // 对数据自行操作
                    this.outputs.push(sheetData)
                }
                // console.log(this.outputs)
            }
            fileReader.readAsBinaryString(files)
        }
    }
}
</script>

<style lang='less' scoped>
    #container{
        width: 720px;
        margin: 0 auto;
        text-align: center;

        h1{
            font-size: 24px;
            text-align: left;
        }

        .el-row{
            display: flex;
            align-items: center;
        }

        .right{
            text-align: right;
        }
    }
</style>