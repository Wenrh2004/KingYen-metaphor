<template>
    <div class="note-card" :style="{ width: width, background: cardColor[card.imgurl] }">
        <div class="top">
            <p class="time">{{ dateOne(card.moment) }}</p>
            <p class="title">{{ label[card.type][card.label] }}</p>
        </div>
        <p class="message">{{ card.message }}</p>
        <div class="foot">
            <div class="foot-left">
                <div class="icon">
                    <span class="iconfont icon-aixin1"></span>
                    <span class="value">{{ card.love }}</span>
                </div>
                <div class="icon">
                    <span class="iconfont icon-liuyan"></span>
                    <span class="value">{{ card.comment }}</span>
                </div>
            </div>
            <div class="name">{{ card.name }}</div>
        </div>
    </div>
</template>
<script>
import { label,cardColor } from '@/utils/data';
import { dateOne } from '@/utils/way';
export default {
    data() {
        return{
            label,
            cardColor,
            dateOne
        }
    },
    props: {
        width: {
            default: '100%',
        },
        note:{
            default:{},
        }
    },
    computed:{
        card() {
            return this.note;
        }
    },
    created() {
        // console.log(this.card);
    }
}
</script>
<style lang="less" scoped>
.note-card {
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