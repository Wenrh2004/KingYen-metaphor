<template>
    <div class="wall-message">
        <p class="title">{{ wallType[id].name }}</p>
        <p class="slogan">{{ wallType[id].slogan }}</p>
        <div class="label">
            <p class="label-list" :class="{selected:nlabel==-1}" @click="selectNote(-1)">全部</p>
            <p class="label-list" :class="{selected:nlabel==index}" v-for="(e,index) in label[id]" :key="index" @click="selectNote(index)">{{ e }}</p>
        </div>
        <!-- 留言 -->
        <div class="card" v-show="id==0">
            <NoteCard class="card-inner" v-for="(e,index) in note" :key="index" :note="e" :width="'288px'" :class="{cardselected:index==cardSelected}" @toDetail="selectedCard(index)"></NoteCard>
        </div>
        <!-- 图片 -->
        <div class="photo" v-show="id==1">
            <PhotoCard :photo="e" class="photo-card" v-for="(e,index) in note" :key="index" @toDetail="selectedCard(index)"></PhotoCard>
        </div>
        <!-- 卡片状态 -->
        <div class="none" v-if="isOK == -1">
        <img :src="none[id].url">
        <p>{{ none[id].msg }}</p>
        </div>
        <!-- 加载状态 -->
        <div class="loading" v-show="isOK == 0">
            <div id="lottile"></div>
            <p>加载中...</p>
        </div>
        <p class="loading" v-show="isOK == 2">我也是有底线的～～～</p>
        <!-- 添加卡片 -->
        <div class="add" :style="{ bottom:addBottom + 'px' }" @click="addModal" v-show="!modal">
            <span class="iconfont icon-tianjia"></span>
        </div>
        <metaModal :title="title" @cloose="changeModal" :isModal="modal">
        <NewCard :id="id" @addClose="changeModal" v-if="cardSelected==-1"  @clickbt="newCard"></NewCard>
        <CardDetails v-if="cardSelected!==-1" :card="note[cardSelected]"></CardDetails>
        </metaModal>
        <PhotoViewer :isView="view" :photos="photoArr" :nowNumber="cardSelected" @viewSwitch="viewSwitch()"></PhotoViewer>
    </div>
</template>
<script>
import { wallType,label,none } from "@/utils/data"
import { selectWallPageApi } from "@/api/index";
import NoteCard from '@/components/NoteCard.vue'
import metaModal from "@/components/mrtaphorModal.vue"
import NewCard from '@/components/NewCard.vue'
import CardDetails from '@/components/CardDetails.vue'
import PhotoCard from '@/components/PhotoCard.vue'
import PhotoViewer from "@/components/PhotoViewer.vue"
import lottie from 'lottie-web'
import loading from '@/assets/images/loading.json'
export default {
    data(){
        return {
            wallType,
            label,
            nWidth:0,   // 卡片模块宽度
            nlabel:-1,   //  对应标签
            note:[],  //  时间数据
            cardWidth:0,    //  卡片模块宽度
            addBottom:30 ,   //  add 按钮距离底部高度
            title:'留言',    // 标题
            modal:false,    // 弹窗状态
            cardSelected:-1, //  当前选择卡片
            photoArr:[],    //  图片列表
            view:false, //  预览大图
            isOK:-1, //  加载状态   -1 加载中   0 无数据
            none,   //  背景板
            page:1,
            pagesize:3,
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
    watch:{
        id() {
            this.modal = false;
            this.view = false;
            this.nLable = -1;
            this.cardSelected = -1;
        }
    },
    computed:{
        //  留言与照片功能切换
        id() {
            return this.$route.query.id; 
        },
        user() {
            return this.$store.state.user
        }
        // card() {
        //     let a = '';
        //     if (this.$route.query.id == 0) {
        //         a = this.note;
        //     } else if (this.$route.query.id == 1) {
        //         a = photo.data;
        //     }
        //     return a;
        // }
    },
    methods:{
        // label 切换
        selectNote(e) {
            this.nlabel= e;
            // 清空当前数据
            this.note = [],
            this.page = 1;
            this.getWallCard(this.id)
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
            // 加载更多
            if (scrollTop + clientHeight == scrollHeight) {
                this.getWallCard(this.id);
            }
        },
        // 添加卡片
        addModal() {
            if (this.id == 0) {
                this.title = '新增留言';
            } else {
                this.title = '新增照片';
            }
            this.modal=true;
        },
        // 切换弹窗状态
        changeModal() {
            this.modal=false;
            if (this.id==1) {
                this.view = false;
            }
        },
        // 卡片选择
        selectedCard(e) {
            this.title = "";
            if(e != this.cardSelected) {
                this.cardSelected = e;
                this.modal = true;
                if (this.id==1) {
                    this.view = true;
                }
            } else {
                this.cardSelected = -1;
                this.modal = false;
                if (this.id==1) {
                    this.view = false;
                }
            }
        },
        // getPhoto() {
        //     for (let i = 0; i < this.photo.length; i++) {
        //         this.photoArr.push(this.photo[i].imgurl)
        //     }
        // },
        // 切换图片
        viewSwitch(e) {
            if (e == 0) {
                this.cardSelected--;
            } else {
                this.cardSelected++;
            }
        },
        // 添加卡片
        newCard(e) {
            console.log(e);
            this.note.push(e);
            this.changeModal();
        },
        // 加载动画
        loading() {
            if (this.isOK == -1) {
                this.$nextTick(async () => {
                    var params1 = {
                        container:document.getElementById("lottile"),
                        renderer:"svg",
                        loop:true,
                        autoplay:true,
                        animationDate:loading,
                    };
                    lottie.loadAnimation(params1);
                })
            }
        },
        // 获取卡片
        getWallCard(id){
            if (this.page > 0) {
                this.isOK = -1;
                let data = {
                    type:id,
                    page:this.page,
                    pagesize:this.pagesize,
                    userID:this.user.id,
                    label:this.nlabel,
                }
                console.log(data);
                selectWallPageApi(data).then((res) => {
                    this.note = this.note.concat(res.message)
                    // 设置下一次的 page
                    console.log(res.message);
                    if (res.message.length) {
                        this.page++
                    } else {
                        this.page = 0
                    }
                    if (this.note.length > 0) {
                        this.isOK = 1
                        if (this.page == 0) {
                            this.isOK = 2
                        } else {
                            this.isOK = 0
                        }
                    }

                    // 图片
                    if (this.id == 1) {
                        for (let i = 0; i < this.note.length; i++) {
                            this.photoArr.push(this.note[i].imgurl)
                        }
                    }
                })
            }
        },
        // 获取用户ID
        getUser() {
            let timer = setInterval(() => {
                if(this.user){
                    clearInterval(timer)
                    this.getWallCard(this.id)
                }
            },10)
        }
    },
    mounted() {
        // this.getPhoto();
        this.loading();
        this.getUser()
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
        padding: 28px;
        margin: auto;
        padding: auto;
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

    .none {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 280px;

        img {
            width: 360px;
            display: inline;
        }

        p {
            font-family: serif;
            font-weight: 700;
            font-size: 24px;
            color: @gray-2;
        }
    }

    .loading{
        text-align: center;
        width: 100%;

        p {
            margin-top: -72px;
            font-family: serif;
            font-size: 24px;
            color: @gray-2;
        }
    }

    #lottile {
        margin-top: 20px;
        height: 200px;
    }
}
</style>