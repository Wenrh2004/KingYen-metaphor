<template>
    <div class="photo-card">
        <img :src="require('../../static/'+photo.imgurl+'.jpg')">
        <div class="photo-bg"></div>
        <div class="photo-love">
            <span class="iconfont icon-aixin1"></span>
            <span class="love-data">{{ photo.love }}</span>
        </div>
    </div>
</template>
<script>
import { label,cardColor } from '@/utils/data';
export default {
    data() {
        return {
            label,
            cardColor
        }
    },
    props: {
        photo: {
            default:{}
        }
    },
    computed: {
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
    }
}
</style>