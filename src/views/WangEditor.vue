<template>
    <div id="test">
        <!-- 点击弹出富文本 -->
        <el-button @click="open">回答</el-button>
    </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
export default {
    name:'WangEditor',
    components:{
        Editor
    },
    data(){
        return {
            // 获取子组件的内容
            content:'',
            index:1
        }
    },
    methods:{
        open() {
            this.index ++
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h('p', null, [
                h('span', null, '请输入您的回答 '),
                h(Editor, {
                    // 将子组件传过来的内容再次传到子组件，从而实现再次弹出富文本还存在上次的内容
                    props: { content: this.content },
                    // 每次弹出富文本都进行重新渲染
                    key: this.index ,
                    on: {edit:(html) =>{
                        this.content = html
                    }} 
                })
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(() => {
                    done();
                    setTimeout(() => {
                        instance.confirmButtonLoading = false;
                    }, 300);
                }, 3000);
            } else {
                done();
            }
            }
            }).then(action => {
                alert(this.content);
                // 实现了提交后再次弹出富文本里的内容为空
                this.content=''
                this.$message({
                    type: 'success',
                    message: '回答成功'
                });
            });
            }
    }
}
</script>

<style lang="less">
    .el-message-box{
        width: 820px!important;
    }
</style>