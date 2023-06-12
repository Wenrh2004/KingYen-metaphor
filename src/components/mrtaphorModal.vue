<template>
    <div class="meta-modal" v-if="isModal">
        <div class="meta-modal-head">
            <p class="modal-name">{{ title }}</p>
            <span class="iconfont icon-guanbi" @click="clooseModal"></span>
        </div>
    </div>
</template>
<script setup>
import { defineProps,defineEmits } from 'vue';

const props = defineProps({
    title:{
        default:'标题',
    },
    isModal:{
        default:false,
    }
});

const emit = defineEmits(['cloose']);
function clooseModal() {
    emit('cloose','关闭');
}

// onMounted(clooseModal)
props

</script>
<style lang="less" scoped>
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
    padding: @padding-20;
    box-sizing: border-box;
    .meta-modal-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .modal-name {
            font-size: 16px;
            color: @gray-10;
            font-weight: 600;
        }

        .icon-guanbi {
            color: @gray-9;
            cursor: pointer;
        }
    }
}
</style>