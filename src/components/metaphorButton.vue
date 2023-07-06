<template>
    <button :class=[size,nom] class="mp-button"><slot></slot></button>
</template>
<script>
export default {
    props:{
        size:{
            default:'base',
        },
        nom:{
            default:'primary',
        }
    }
}
</script>
<style lang="less" scoped>
.mp-button{
    text-align: center;
    border: none;
    cursor: pointer;
}
// size
.max{
    min-width: 100px;
    height: 48px;
    border-radius: 24px;
    padding: 0 20px;
}
.base{
    min-width: 80px;
    height: 36px;
    border-radius: 24px;
    padding: 0 20px;
}
.small{
    min-width: 72px;
    height: 32px;
    border-radius: 24px;
    padding: 0 24px;
}
//nom
.primary{
    background: @gray-10;
    color: @gray-0;
}
.secondary{
    background: none;
    color: @gray-9;
    border: 5px selid @gray-10;
}
.cprimary{
    background: @primary-color;
    color: @gray-0;
    font-weight: 600;
}
.csecondary{
    background: @gray-0;
    color: @gray-10;
}

.notallowed {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>