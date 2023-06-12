<template>
    <transition name="modal">
        <div class="meta-modal" v-if="isModal">
            <div class="meta-modal-head">
                <p class="modal-name">{{ title }}</p>
                <span class="iconfont icon-guanbi" @click="clooseModal"></span>
            </div>
            <div class="modal-main">
                <slot class="slot"></slot>
            </div>
        </div>
    </transition>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: {
        default: '标题',
    },
    isModal: {
        default: false,
    }
});

const emit = defineEmits(['cloose']);
function clooseModal() {
    emit('cloose', '关闭');
}

// onMounted(clooseModal)
props

</script>
<style lang="less" scoped>
// 动画
.modal {
    // 入场
    &-enter {
        &-from {
            transform: translateX(360px);
        }
        &-active {
            transition: @tr;
        }
        &-to {
            transform:translateX(0px);
        }
    }
    // 出场
    &-leave {
        &-from {
            transform:translateX(0px);
        }
        &-active {
            transition: @tr;
        }
        &-to {
            transform: translateX(360px);
        }
    }
}
// 样式
.meta-modal {
    font-family: HanziPenSC-W3;
    width: 360px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 52px;
    z-index: 1;
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(10px);

    .meta-modal-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: @padding-20;
        box-sizing: border-box;

        .modal-name {
            font-size: 16px;
            color: @gray-10;
            font-weight: 600;
        }

        .icon-guanbi {
            color: @gray-9;
            cursor: pointer;
        }

        .modal-main {
            height: 100%;
            overflow-y: auto;
            padding-bottom: 116px;
            box-sizing: border-box;
            border: 1px solid #eee;
            overflow-x: auto;
            margin: 2px;
        }

        .modal-main {
            overflow-x: auto;
            margin-right: 2px;
        }

        .slot {
            height: 1200px;
            background-color: #eee;
        }

        .modal-main::-webkit-scrollbar {
            /* 滚动条整体样式 */
            width: 4px;
            /* 高宽分别对应横竖滚动条的尺寸 */
            height: 4px;
        }

        .modal-main::-webkit-scrollbar-thumb {
            /* 滚动条内的滑块 */
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.2);
        }

        .modal-main::-webkit-scrollbar-track {
            /* 滚动条内的轨道 */
            border-radius: 4px;
            background: rgba(0, 0, 0, 0);
        }
    }
}
</style>