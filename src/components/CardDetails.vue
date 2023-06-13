<template>
    <div class="details-index">
        <div class="top">
            <p class="link">联系墙主</p>
            <p class="remove">移除</p>
        </div>
        <NoteCard :note="card" class="note-card"></NoteCard>
        <div class="form">
            <textarea class="message" placeholder="请输入..."></textarea>
            <div class="comment">
                <input type="text" class="name" placeholder="签名">
                <metaphorButton>评论</metaphorButton>
            </div>
        </div>
        <p class="title">评论{{ card.comment }}</p>
        <div class="foot-commont">
            <div class="commont-li" v-for="(e,index) in comment" :key="index">
                <div class="user-head" :style="{backgroundImage:portrait[e.imgurl]}"></div>
                <div class="comment-m">
                    <div class="m-top">
                        <p class="c-name">{{ e.name }}</p>
                        <p class="c-time">{{ dateOne(e.moment) }}</p>
                    </div>
                    <div class="c-message">{{ e.message }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NoteCard from './NoteCard.vue';
import metaphorButton from './metaphorButton.vue';
import { comment } from '../../mock/index'
import { portrait } from '@/utils/data'
import { dateOne } from '@/utils/way';
export default {
    data() {
        return {
            comment:comment.data,
            portrait,
            dateOne,
        }
    },
    props: {
        card: {
            default: {}
        }
    },
    components: {
        NoteCard,
        metaphorButton,
    }
}
</script>
<style lang="less" scoped>
.details-index {
    position: relative;
    padding: 0 @padding-20;
    .top {
        position: fixed;
        top: 0;
        left: 0;
        padding: @padding-20;
        display: flex;

        .link {
            color: @primary-color;
            cursor: pointer;
            padding-right: 30px;
            font-size: 16px;
        }

        .remove {
            font-size: 16px;
            color: @warning-color;
        }
    }

    .note-card {
        transition: @tr;
    }

    .form {
        .message {
            background: none;
            height: 56px;
            border: 1px solid rgba(148, 148, 148, 1);
            resize: none;
            padding: @padding-8;
            box-sizing: border-box;
            width: 100%;
            margin-top: @padding-12;
        }

        .comment {
            display: flex;
            padding-top: 8px;
            justify-content: space-between;
        }
        
        .name {
            width: 200px;
            box-sizing: border-box;
            padding: 6px;
            background: none;
            border: 1px solid rgba(148, 148, 148, 1);
            line-height: 20px;
        }
    }
    .title {
        font-weight: 600;
        padding-top: 30px;
        padding-bottom: 20px;
    }
    .commont-li{
        display: flex;
        padding-bottom: 30px;

        .user-head {
            flex: none;
            width: 28px;
            height: 28px;
            border-radius: 20px;
            overflow: hidden;
            // background-image: linear-gradient(180deg,rgba(245,65,65,0.50) 0%,#f43f3f 100%);
        }
        .comment-m {
            padding-left: @padding-8;
        }
        .m-top {
            display: flex;
            align-items: center;

            .c-name {
                font-weight: 600;
            }

            .c-time {
                font-size: @font-size-12;
                padding-left: @padding-4;
                color: @gray-2;
            }

            .c-message {
                padding-top: @padding-4;
            }
        }
    }
}
</style>