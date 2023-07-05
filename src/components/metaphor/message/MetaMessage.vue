<template>
    <transition name="down">
        <div class="meta-message" v-if="isShow">
            <div class="meta-m-i">
                <i class="iconfont" :class="style[type].icon"></i>
                <span class="text">{{ message }}</span>
            </div>
        </div>
    </transition>
</template>
<script>
import { onMounted,ref } from "vue";
export default {
    name:"metaMessage",
    props:{
        message:{
            type:String,
            default:"",
        },
        type:{
            type:String,
            // warning error success
            default:"waring",
        },
    },
    setup() {
        // 定义一个对象，包含三种情况的样式，对象 key (类型字符串)
        const style = {
            warning:{
                icon:"icon-warning",
            },
            error:{
                icon:"icon-error",
            },
            success:{
                icon:"icon-success",
            },
        };
        // 定义一个数据控制显示/隐藏,默认为隐藏，组建挂在完毕显示
        const isShow = ref(false);
        onMounted(() => {
            // 需要调用狗子函数，等待 dom 渲染完成后，再进行复制，如果在 setup 中直接复制则会呗直接渲染
            isShow.value = true;
            setTimeout(() => {
                isShow.value = false;
            },3000)
        });
        return{ style,isShow };
    },
}
</script>
<style scoped lang="less">
.down {
    &-enter {
        &-from {
            transform: translateY(-30px);
            opacity: 0;
        }

        &-active {
            transition: all 0.3s;
        }

        &-to {
            transform: translateY(0px);
            opacity: 1;
        }
    }

    &-leave {
        &-from {
            transform: translateY(0px);
            opacity: 1;
        }

        &-active {
            transform: all 0.3s;
        }

        &-to {
            transform: translate(-30px);
            opacity: 0;
        }
    }
}

.meta-message {
    width: 100%;
    height: 40px;
    position: fixed;
    z-index: 9999;
    top: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;

    .meta-m-i {
        padding: 0 20px;
        border-radius: 8px;
        color: @gray-10;
        background: @gray-0;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    i {
        margin-right: 6px;
        vertical-align: middle;
    }

    .text {
        vertical-align: middle;
    }
}

// icon color
.icon-warning {
    color: @warning-color;
}

.icon-error {
    color: @error-color;
}

.icon-success {
    color: @success-color;
}
</style>