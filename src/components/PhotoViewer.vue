<template>
    <transition name="view">
        <div class="photoviewer" v-if="isView">
        
            <div class="bg"></div>
            <div class="viewer-photo">
                <img :src="require('../../static/' + photos[nowNumber] + '.jpg')">
            </div>
            <div class="switch sw-left" @click="changeNumber(0)" v-show="nowNumber > 0">
                <span class="iconfont icon-xiangzuo"></span>
            </div>
            <div class="switch sw-right" @click="changeNumber(1)" v-show="nowNumber < photos.length-1">
                <span class="iconfont icon-xiangyou"></span>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        photos: {
            default:[],
        },
        nowNumber:{
            type:Number,
            default:0,
        },
        isView: {
            default:false,
        }
    },
    methods: {
        changeNumber(e) {
            this.$emit('viewSwitch',e);
        }
    }
}
</script>
<style lang="less" scoped>
// 动画
.view {
    // 入场
    &-enter {
        &-from {
            opacity: 0;
        }
        &-active {
            transition: @tr;
        }
        &-to {
            opacity: 1;
        }
    }
    // 出场
    &-leave {
        &-from {
            opacity: 1;
        }
        &-active {
            transition: @tr;
        }
        &-to {
            opacity: 0;
        }
    }
}
// 样式
.photoviewer {
    position: fixed;
    top: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        height: 100%;
        width: 100%;
    }
    .viewer-photo {
        position: absolute;
        padding: 82px 454px 0px 96px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        img {
            width: 100%;
        }
    }
    .switch {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: @gray-2;
        color: @gray-1;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        transition: @tr;
        .iconfont {
            font-size: 24px;
        }
        &:hover {
            opacity: 1;
        }
    }
    .sw-left {
        left: 20px;
    }
    .sw-right {
        right: 380px;
    }
}
</style>