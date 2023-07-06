<template>
    <div class="photo-card">
        <img :src="baseUrl + photo.imgurl" class="photo-img">
        <div class="photo-bg" @click="toDetail"></div>
        <div class="photo-love" @click="clicklove">
            <span class="iconfont icon-aixin1" :class="{islove:card.islove[0].COUNT>0}"></span>
            <span class="love-data">{{ photo.love[0].COUNT }}</span>
        </div>
    </div>
</template>
<script>
import { label,cardColor } from '@/utils/data';
import { baseUrl } from "@/utils/env";
import { insertFeedbackApi } from "@/api/index";
export default {
    data() {
        return {
            label,
            cardColor,
            baseUrl,
            user:this.$store.state.user
        }
    },
    props: {
        photo: {
            default:{}
        }
    },
    methods:{
        // 显示详情
        toDetail() {
            this.$emit('toDetail')
        },
        // 点赞
        clicklike() {
            if (this.card.islove[0].COUNT == 0) {
                let data = {
                    wallID:this.card.id,
                    userID:this.user.id,
                    type:0,
                    moment:new Date()
                }
                insertFeedbackApi(data).then(() => {
                    this.card.love[0].COUNT++
                    this.card.islove[0].COUNT++
                    this.$message({ type:"success",message:"感谢您的点赞！"});
                })
            }
        }
    },
    computed: {
        card() {
            return this.photo;
        }
    },
    created() {
        console.log(this.card);
    }
}
</script>
<style lang="less" scoped>
.photo-card {
    position: relative;
    .photo-img {
        width: 100%;
    }
    .photo-bg {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: @tr;
        cursor: pointer;
    }
    .photo-love {
        position: absolute;
        left: @padding-8;
        top: @padding-8;
        background: rgba(255,255,255,0.80);
        border-radius: 20px;
        height: 28px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: @tr;
        cursor: pointer;
        .icon-aixin1 {
            color: @gray-2;
            padding-right: @padding-4;
            transition: @tr;
            &:hover {
                color: @love-color;
            }
        }
        .love-data {
            color:@gray-10
        }
    }
    &:hover {
        .photo-bg {
            opacity: 1;
        }
        .photo-love {
            opacity: 1;
        }
        .islove {
                color: @love-color;
            }
    }
}
</style>