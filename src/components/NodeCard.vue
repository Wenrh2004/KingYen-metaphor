<template>
    <div class="node-card" :style="{ width: width, background: 'rgba(252, 175, 162, 0.30);' }">
        <div class="top">
            <p class="time">2023.06.10</p>
            <p class="title">title</p>
        </div>
        <p class="message">index</p>
        <div class="foot">
            <div class="foot-left">
                <div class="icon">
                    <span class="iconfont icon-aixin1"></span>
                    <span class="value">1</span>
                </div>
                <div class="icon">
                    <span class="iconfont icon-liuyan"></span>
                    <span class="value">1</span>
                </div>
            </div>
            <div class="name">King Yen</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        width: {
            default: '280px',
        }
    }
}
</script>
<style lang="less" scoped>
.node-card {
    height: 240px;
    padding: 10px 20px 16px;
    box-sizing: border-box;
    position: relative;

    .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;

        p {
            font-size: 12px;
            color: @gray-2;
            font-weight: 400;
        }
    }

    .message {
        height: 140px;
        font-family: HanziPenSC-W3;
        font-size: 14px;
        color: @gray-10;
        cursor: pointer;
    }

    .foot {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 16px;
        left: 0;
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;

        .foot-left {
            display: flex;

            .value {
                font-size: @font-size-12;
                color: @gray-9;
                line-height: 16px;
                padding-left: @padding-4;
            }

            .iconfont {
                font-size: 16px;
                color: @gray-9;
            }

            .icon {
                padding-right: @padding-8;
                display: flex;
                align-items: center;
            }

            .icon-aixin1 {
                cursor: pointer;
                transition: @tr;
                &:hover{
                    color: @love-color;
                }
            }
        }

        .name {
            font-family: HanziPenSC-W3;
            font-size: 16px;
            color: @gray-10;
            font-weight: 700;
        }
    }
}
</style>