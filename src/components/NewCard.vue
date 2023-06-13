<template>
    <div class="new-card">
        <div class="color">
        <p class="color-li" v-for="(e,index) in cardColorChooes" :key="index" :style="{background:e}" :class="{colorselected:index==colorSelected}" @click="changeColor(index)"></p>
        </div>
        <div class="card-main" :style="{background:cardColor[colorSelected]}">
            <textarea placeholder="留言..." class="message" maxlength="96" v-model="message"></textarea>
            <input type="text" placeholder="签名" class="name" v-model="name">
        </div>
        <div class="labels">
            <p class="title">选择标签</p>
            <div class="label">
                <p v-for="(e,index) in label[id]" :key="index" class="label-li" :class="{labelselected:index==labelSelected}" @click="changeLabel(index)">{{ e }}</p>
            </div>
            <div class="foot">
                <p class="foot-title">King Yen</p>
                <p class="foot-index">
                    Developer Team from QIT Software Studio.
                </p>
            </div>
        </div>
        <div class="foot-butten">
            <metaphorButton size="max" nom="secondary" @click="closeModal(0)">丢弃</metaphorButton>
            <metaphorButton size="max" class="sumbit">确定</metaphorButton>
        </div>
    </div>
</template>
<script>
import { cardColor,cardColorChooes,label } from "@/utils/data";
import metaphorButton from './metaphorButton.vue';
export default {
    data() {
        return {
            cardColor,
            cardColorChooes,
            label,
            colorSelected:0, // 当前选择颜色
            labelSelected:0,    //  当前选择标签
            message:'', //  留言信息
            name:'',    //  签名
        }
    },
    components:{
        metaphorButton,
    },
    props:{
        // 留言与照片功能的分类
        id:{
            default:0,
        }
    },
    methods: {
        // 颜色切换
        changeColor(e) {
            this.colorSelected = e;
        },
        // 标签切换
        changeLabel(e) {
            this.labelSelected = e;
        },
        // 关闭弹窗
        closeModal(data) {
            this.$emit('addClose',data);
        }
    },
}
</script>
<style lang="less" scoped>
.new-card {
    position: relative;
    padding: 0 @padding-20 120px;
    .color{
        padding-bottom: @padding-12;
        display: flex;
        align-items: center;
        .color-li {
            width: 24px;
            height: 24px;
            margin-right: @padding-8;
            float: left;
            cursor: pointer;
        }
        .colorselected {
            border: 1px solid @primary-color;
        }
    }
    .card-main {
        height: 240px;
        width: 100%;
        padding: 12px;
        box-sizing: border-box;
        transition: @tr;
    }
    .message{
        background: none;
        border: none;
        resize: none;
        padding: @padding-8;
        box-sizing: border-box;
        height: 172px;
        width: 100%;
        font-family: HanziPenSC-W3;
        font-size: 15px;
    }
    .name {
        width: 100%;
        box-sizing: border-box;
        padding: @padding-8;
        background: none;
        border: #fff 1px solid;
        line-height: 20px;
        font-family: HanziPenSC-W3;
        font-size: 15px;
        font-weight: 600;
    }
    .title{
        color: @gray-10;
        font-weight: 600;
        padding-top: 30px;
    }
    .label{
        display: flex;
        flex-wrap: wrap;
        width: 320px;
        .label-li{
            padding: 2px 8px;
            border-radius: 20px;
            margin: @padding-20 @padding-4 0 0;
            color: @gray-9;
            cursor: pointer;
            transition: @tr;
        }
        .labelselected{
            background: #ebebeb;
            color: #000;
            font-weight: 600;
        }
    }
    .foot {
        padding-top:80px;
        font-family: HanziPenSC-W3;
        .foot-title {
            padding-bottom:0px;
            font-size: 15px;
            font-weight: lighter;
            color: @gray-10;
        }
        .foot-index {
            padding-bottom:0px;
            font-size: 14;
            color: @gray-9;
        }
    }
    .foot-butten {
        padding: @padding-20;
        box-sizing: border-box;
        position: fixed;
        bottom: 52px;
        left: 0;
        width: 100%;
    }
    .sumbit {
        margin-left: @padding-20;
        width: 200px;
    }
}
</style>