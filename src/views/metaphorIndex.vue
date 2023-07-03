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
import { signIpApi } from "@/api/index";
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
            signIpApi().then((res) => {
                // console.log(res);
                let user = {
                    id:res.ip,
                }
                this.$store.commit('getUser',user)
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