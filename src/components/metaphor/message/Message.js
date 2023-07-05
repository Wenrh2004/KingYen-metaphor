import { createVNode,render } from "vue";
import metaMessage from './MetaMessage.vue'

const divVNode = createVNode('div',{ class:'xtx-message-container'})
render(divVNode,document.body)

const div = divVNode.el

const Message = ({ message,type }) => {
    // 动态创建虚拟 DOM (creatVNode(h) 函数)
    const comVNode = createVNode( metaMessage,{ message,type })
    // 渲染 body(render 函数)
    render(comVNode,div)
    // 加载后自动销毁
    setTimeout(() => {
        render(null,div)
    },6000)
}

export default Message