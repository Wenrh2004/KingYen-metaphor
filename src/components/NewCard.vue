<template>
    <div class="new-card">
        <div class="color" v-show="id == 0">
        <p class="color-li" v-for="(e,index) in cardColorChooese" :key="index" :style="{background:e}" :class="{colorselected:index==colorSelected}" @click="changeColor(index)"></p>
        </div>
        <!-- 照片 -->
        <div class="photo-main" v-if="id == 1">
            <input type="file" name="file" id="file" multiple="multiple" @change="showPhoto">
            <div class="add-bt" v-if="url == ''">
                <span class="iconfont icon-tianjia"></span>
            </div>
            <div class="change-bt" v-if="url != ''">
                <span class="iconfont icon-xiugai"></span>
            </div>
            <div class="photo-div"><img :src="url"></div>
        </div>
        <!-- 卡片 -->
        <div class="card-main" :style="{background:id==0 ? cardColor[colorSelected]:cardColor[5]}">
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
            <metaphorButton size="max" class="sumbit" @click="submit()">确定</metaphorButton>
        </div>
    </div>
</template>
<script>
import { cardColor,cardColorChooese,label } from "@/utils/data";
import { getObjectURL } from "@/utils/way";
import metaphorButton from './metaphorButton.vue';
import { insertWallApi,profileApi } from "@/api/index";
export default {
    data() {
        return {
            cardColor,
            cardColorChooese,
            label,
            colorSelected:0, // 当前选择颜色
            labelSelected:0,    //  当前选择标签
            message:'', //  留言信息
            name:'',    //  签名
            url:'',     //  图片路径
            user:this.$store.state.user,    //  用户ID
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
        },
        // submit
        submit(){
            let name = '匿名';
            if (this.name) {
                name = this.name
            }
            let data = {
                type:this.id,
                message:this.message,
                name:name,
                userID:this.user.id,
                moment:new Date(),
                label:this.labelSelected,
                color:5,
                imgurl:'',
            };
            console.log(data);
            if (this.message && this.id == 0) {
                data.color = this.colorSelected,
                insertWallApi(data).then((res) => {
                    console.log(res);
                    let cardDate = {
                        type:this.id,
                        message:this.message,
                        name:name,
                        userID:this.user.id,
                        moment:new Date(),
                        label:this.labelSelected,
                        color:this.colorSelected,
                        imgurl:'',
                        id:res.message.insertId,
                        islove:[{COUNT:0}],
                        love:[{COUNT:0}],
                        comment:[{COUNT:0}],
                        report:[{COUNT:0}],
                        revoke:[{COUNT:0}]
                    }
                    this.$emit("clickbt",cardDate);
                    this.message = '';
                    this.$message({ type:"success",message:"感谢您的记录！"});
                })
            } else if (this.id == 1 && this.url) {
                this.updatePhoto(data);
            }
        },
        // 图片展示
        showPhoto() {
            let aa = getObjectURL(document.getElementById("file").files[0]);
            this.url = aa;
        },
        // 图片上传
        updatePhoto(data) {
            let file = document.getElementById("file")
            if (file.files.length > 0) {
                let formData = new FormData()
                formData.append('file',file.files[0])

                // 后端提交
                profileApi(formData).then((res) => {
                    // console.log(res);
                    data.imgurl = res
                    // 数据存储
                    insertWallApi(data).then((result) => {
                    // console.log(result);
                    let cardDate = {
                        type:this.id,
                        message:this.message,
                        name:data.name,
                        userID:this.user.id,
                        moment:new Date(),
                        label:this.labelSelected,
                        color:5,
                        imgurl:res,
                        id:result.message.insertId,
                        islove:[{COUNT:0}],
                        love:[{COUNT:0}],
                        comment:[{COUNT:0}],
                        report:[{COUNT:0}],
                        revoke:[{COUNT:0}]
                    }
                    this.$emit("clickbt",cardDate);
                    this.message = '';
                    this.$message({ type:"success",message:"感谢您的记录！"});
                })
                })
            }
        },
    }
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
    .photo-main {
        padding-bottom: 10px;
        position: relative;

        #file {
            position: absolute;
            z-index: 10;
            top:-10px;
            height: 74px;
            width: 64px;
            opacity: 0;
            cursor: pointer;
        }

        .add-bt {
            width: 64px;
            height: 64px;
            border: 1px solid @gray-2;
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            .icon-tianjia {
                font-size: 24px;
            }
        }

        .change-bt {
            position: absolute;
            top: 12px;
            left: 12px;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;

            .icon-xiugai {
                color: #fff;
            }
        }

        .photo-div {
            max-height: 200px;
            width: 100%;
            background: #333;
            overflow: hidden;
            display: flex;
            align-items: center;

            img {
                width: 100%;
            }
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