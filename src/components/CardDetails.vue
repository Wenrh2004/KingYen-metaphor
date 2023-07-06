<template>
    <div class="details-index">
        <div class="top">
            <p class="link">联系墙主</p>
            <p class="remove">移除</p>
        </div>
        <NoteCard :note="card" class="note-card"></NoteCard>
        <div class="form">
            <textarea class="message" placeholder="请输入..." v-model="discuss"></textarea>
            <div class="comment">
                <input type="text" class="name" placeholder="签名" v-model="name">
                <metaphorButton :class="{ notallowed:!isDis }" @click="submit">评论</metaphorButton>
            </div>
        </div>
        <p class="title">评论{{ cards.comment[0].COUNT }}</p>
        <div class="foot-commont">
            <div class="commont-li" v-for="(e,index) in comment" :key="index">
                <div class="user-head" :style="{backgroundImage:portrait[e.imgurl]}"></div>
                <div class="comment-m">
                    <div class="m-top">
                        <p class="c-name">{{ e.name }}</p>
                        <p class="c-time">{{ dateOne(e.moment) }}</p>
                    </div>
                    <div class="c-message">{{ e.comment }}</div>
                </div>
            </div>
            <p class="more" @click="getComment" v-show="page > 0">加载更多</p>
        </div>
    </div>
</template>
<script>
import NoteCard from './NoteCard.vue';
import metaphorButton from './metaphorButton.vue';
import { portrait } from '@/utils/data'
import { dateOne } from '@/utils/way';
import { insertCommentApi,selectCommentApi } from "@/api/index";
export default {
    data() {
        return {
            comment:[],
            portrait,
            dateOne,
            discuss:'', //  输入内容
            name:'',    //  签名
            user:this.$store.state.user,
            page:1,
            pagesize:2,
        }
    },
    props: {
        card: {
            default: {}
        }
    },
    computed: {
        isDis() {
            if (this.discuss) {
                return true
            } else {
                return false
            }
        },
        cards() {
            return this.card;
        }
    },
    components: {
        NoteCard,
        metaphorButton,
    },
    methods:{
        submit() {
            if (this.isDis) {
                let img = Math.floor(Math.random() * 5)
                let name = '匿名'
                if (this.name) {
                    name = this.name
                }
                let data = {
                    wallID:this.cards.id,
                    userID:this.user.id,
                    imgurl:img,
                    comment:this.discuss,
                    name:name,
                    moment:new Date(),
                }
                console.log(data);
                insertCommentApi(data).then(() => {
                    this.comment.unshift(data)
                    this.cards.comment[0].COUNT++
                    this.discuss = '',
                    this.name ='',
                    this.$message({ type:"success",message:"感谢您的评论！"});
                })
            }
        },
        getComment() {
            if (this.page > 0) {
                let data = {
                    id:this.cards.id,
                    page:this.page,
                    pagesize:this.pagesize,
                }
                console.log(data);
                selectCommentApi(data).then((res) => {
                    this.comment = this.comment.concat(res.message)
                    if (res.message.length == this.pagesize) {
                        this.page++
                    } else {
                        this.page = 0
                    }
                    console.log(this.comment);
                })
            }
        }
    },
    mounted() {
        this.getComment()
    },
    watch:{
        card() {
            this.page = 1;
            this.comment = [];
            this.getComment();
        }
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
    .foot-commont{
        height: 180px;
        scroll-behavior: auto;

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
    .more {
        color: @gray-2;
        text-align: center;
        padding-top: 12px;
        cursor: pointer;
    }
    }
}
</style>