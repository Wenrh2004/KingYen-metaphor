<template>
    <div class="metaphor-index">
        <Header></Header>
        <video src="@/assets/images/qm1.mp4" autoplay="autoplay" class="bg-video"></video>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '@/components/HeaderIndex.vue'
import Footer from '@/components/FooterIndex.vue'
export default {
    data() {
        return {
            username: '',
        }
    },
    components: {
        // 组件
        Header,
        Footer,
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
        z-index: -1;
        height: 880px;
    }
}
</style>