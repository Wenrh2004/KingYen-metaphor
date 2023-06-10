<template>
    <div class="metaphor-index">
        <HeaderIndex></HeaderIndex>
        <video src="@/assets/images/qm1.mp4" autoplay="autoplay" class="bg-video"></video>
        <router-view></router-view>
    </div>
</template>
<script>
import HeaderIndex from '@/components/HeaderIndex.vue'
export default {
    data() {
        return {
            username: '',
        }
    },
    components: {
        // 组件
        HeaderIndex,
    },
    computed: {

    },
    created() {
        this.gerUser()
    },
    methods: {
        gerUser() {
            this.axios.post("", {
                data: 'username',
                pwd: 'password'
            }).then((res) => {
                console.log(res);
            })

        }
    }
}
</script>
<style lang="less" scoped>
.metaphor-index{
    .bg-video{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 0;
        height: 880px;
    }
}
</style>