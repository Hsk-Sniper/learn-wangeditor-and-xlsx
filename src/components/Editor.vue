<template>
    <div>
        <div class="editor"></div>
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    name: 'editor',
    props: [ 'content' ],
    data(){
        return {
            editor:''
        }
    },
    mounted() {
        this.new()
        // 接受父组件传过来的内容，设置为富文本的默认内容
        this.editor.txt.html(this.content)
    },
    methods:{
        new(){
            this.editor = new E('.editor')
                this.editor.customConfig.onchange = (html) => {
                this.$emit('edit', html)
            }
            this.editor.customConfig.uploadImgShowBase64 = true
            this.editor.create()
        }
    }
}
</script>

<style lang='less'>
    .editor{
        width: 800px;
        text-align: left;
    }
</style>
