<template>
    <div class="wall-message">
        <p class="title">{{ wallType[id].name }}</p>
        <p class="slogan">{{ wallType[id].slogan }}</p>
        <div class="label">
            <p class="label-list" :class="{selected:nlabel==-1}" @click="selectNode(-1)">全部</p>
            <p class="label-list" :class="{selected:nlabel==index}" v-for="(e,index) in label[id]" :key="index" @click="selectNode(index)">{{ e }}</p>
        </div>
        <div class="card">
            <NodeCard></NodeCard>
        </div>
    </div>
</template>
<script>
import { wallType,label } from "@/utils/data";
import NodeCard from '@/components/NodeCard.vue'
export default {
    data(){
        return {
            wallType,
            label,
            id:0,   //  留言与照片功能切换
            nlabel:-1
        }
    },
    components:{
        NodeCard,
    },
    methods:{
        // label 切换
        selectNode(e) {
            this.nlabel= e;
        }
    }
}
</script>
<style lang="less" scoped>
.wall-message {
    min-height: 700px;
    padding-top: 52px;

    .title {
        padding-top: 48px;
        padding-bottom: 8px;
        font-size: 56px;
        color: @gray-10;
        text-align: center;
        font-weight: 600;
    }
    .slogan {
        color: @gray-2;
        text-align: center;
    }
    .label {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        .label-list {
            padding: 0 14px;
            display: flex;
            align-items: center;
            height: 30px;
            margin: @padding-4;
            color: @gray-9;
            box-sizing: border-box;
            cursor: pointer;
        }
        .selected {
            color: @gray-10;
            font-weight: 600;
            border: 1px solid @gray-10;
            border-radius: 16px;
        }
    }
}
</style>