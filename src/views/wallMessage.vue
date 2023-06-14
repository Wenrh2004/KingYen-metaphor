<template>
    <div class="wall-message">
        <p class="title">{{ wallType[id].name }}</p>
        <p class="slogan">{{ wallType[id].slogan }}</p>
        <div class="label">
            <p class="label-list" :class="{selected:nlabel==-1}" @click="selectNote(-1)">全部</p>
            <p class="label-list" :class="{selected:nlabel==index}" v-for="(e,index) in label[id]" :key="index" @click="selectNote(index)">{{ e }}</p>
        </div>
        <div class="card" v-show="id==0">
            <NoteCard class="card-inner" v-for="(e,index) in note" :key="index" :note="e" :width="'288px'" :class="{cardselected:index==cardSelected}" @click="selectedCard(index)"></NoteCard>
        </div>
        <div class="photo" v-show="id==1">
            <PhotoCard :photo="e" class="photo-card" v-for="(e,index) in photo" :key="index" @click="selectedCard(index)"></PhotoCard>
        </div>
        <div class="add" :style="{ bottom:addBottom + 'px' }" @click="addModal" v-show="!modal">
            <span class="iconfont icon-tianjia"></span>
        </div>
        <metaModal :title="title" @cloose="changeModal" :isModal="modal">
        <NewCard :id="id" @addClose="changeModal" v-if="cardSelected==-1"></NewCard>
        <CardDetails v-if="cardSelected!==-1" :card="note[cardSelected]"></CardDetails>
        </metaModal>
        <PhotoViewer v-show="modal"></PhotoViewer>
    </div>
</template>
<script>
import { wallType,label } from "@/utils/data";
import NoteCard from '@/components/NoteCard.vue';
import { note,photo } from "../../mock/index";
import metaModal from "@/components/mrtaphorModal.vue"
import NewCard from '@/components/NewCard.vue'
import CardDetails from '@/components/CardDetails.vue'
import PhotoCard from '@/components/PhotoCard.vue'
import PhotoViewer from "@/components/PhotoViewer.vue";
export default {
    data(){
        return {
            wallType,
            label,
            nWidth:0,   // 卡片模块宽度
            nlabel:-1,   //  对应标签
            note:note.data,  //  时间数据
            cardWidth:0,    //  卡片模块宽度
            addBottom:30 ,   //  add 按钮距离底部高度
            title:'留言',    // 标题
            modal:false,    // 弹窗状态
            cardSelected:-1, //  当前选择卡片
            photo:photo.data    //  图片资源
        }
    },
    components:{
        NoteCard,
        metaModal,
        NewCard,
        CardDetails,
        PhotoCard,
        PhotoViewer,
    },
    computed:{
        //  留言与照片功能切换
        id() {
            return this.$route.query.id; 
        },
        card() {
            let a = '';
            if (this.$route.query.id == 0) {
                a = note.data;
            } else if (this.$route.query.id == 1) {
                a = photo.data;
            }
            return a;
        }
    },
    methods:{
        // label 切换
        selectNote(e) {
            this.nlabel= e;
        },
        // 卡片模块宽度
        getnotewidth() {
            let wWidth = document.body.clientWidth
            this.nWidth = Math.floor((wWidth - 120) / 300) * 300
        },
        // 监听页面滚动
        scrollBottom() {
            // 距离顶部高度
            let  scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 屏幕高度
            let clientHeight = document.documentElement.clientHeight;
            // 内容高度
            let scrollHeight = document.documentElement.scrollHeight;
            if (scrollTop + clientHeight + 200 >= scrollHeight) {
                this.addBottom = scrollTop + clientHeight + 230 - scrollHeight;
            } else {
                this.addBottom = 30;
            }
        },
        // 添加卡片
        addModal() {
            this.title = '新增留言';
            this.changeModal();
        },
        // 切换弹窗状态
        changeModal() {
            this.modal= !this.modal;
        },
        // 卡片选择
        selectedCard(e) {
            this.title = "";
            if(e != this.cardSelected) {
                this.cardSelected = e;
                this.modal = true;
            } else {
                this.cardSelected = -1;
                this.modal = false;
            }
        },
    },
    mounted() {
        // 监听滚动高度变化
        window.addEventListener('scroll',this.scrollBottom)
    },
    unmounted() {
        // 监听滚动高度变化
        window.addEventListener('scroll',this.scrollBottom)
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
    .card {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 28px;
        margin: auto;
        .card-inner {
            margin: 6px;
        }
        .cardselected {
            border: 1px solid @primary-color;
        }
    }
    .photo {
        width: 88%;
        margin: 0 auto;
        columns: 5;
    }
    .photo-card {
        margin-bottom: @padding-4;
        break-inside: avoid;
        column-gap: 4px;
    }
    .add {
        width: 56px;
        height: 56px;
        background: @link-color;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 28px;
        position: fixed;
        right: 30px;
        // bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: @tr;

        .icon-tianjia {
            color: @primary-color;
            font-size: 36px;
        }
    }
}
</style>