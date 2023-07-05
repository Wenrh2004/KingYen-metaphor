import message from './message/Message'

// 注册全局组件
// app.component(组件名，组件文件)

// 导出配置(用于 app.use() 安装组件使用)
export default {
    install (app) {
        // 全局挂载 原型函数 通过组件实力调用的属性 this.$message
        app.config.globalProperties.$message = message
    }
}