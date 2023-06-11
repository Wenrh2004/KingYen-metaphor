<template>
    <div class="header-index">
        <div class="logo">
            <img src="@/assets/images/yksg.svg" alt="logo-img">
            <p class="logo-name">metaphor</p>
        </div>
        <div class="=menu">
            <metaphorButton nom="cprimary" class="menu-messagewall">留言墙</metaphorButton>
            <metaphorButton nom="csecondary" class="menu-photowall">照片墙</metaphorButton>
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>
<script>
import metaphorButton from './metaphorButton.vue';
export default {
    data() {
        return{

        }
    },
    components:{
        metaphorButton,
    }
}
</script>
<style lang="less" scoped>
.header-index{
    width: 100%;
    height: 50px;
    background: rgba(255,255,255,0.80);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter:blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;

    .logo{
        width: 30px;
        display: flex;
        align-items: center;

        .logo-name {
            font-size: 20px;
            color: @gray-10;
            font-weight: 600;
            padding-left: 10px;
        }
    }
    .menu{
        .menu-message{
            margin-right: 24px;
        }
    }
    .user{
        width: 30px;
        .user-head{
            float: right;
            border-radius: 50%;
            height:36px;
            width: 36px;
            background-image: linear-gradient(180deg,#7be7ff 2%,#1e85e2 100%);
        }
    }
}
</style>