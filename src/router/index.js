import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect:'/wall',
        name: 'index',
        component: () => import('../views/metaphorIndex'),
        children:[
            {
                path:'wall',
                component: () => import('../views/wallMessage')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;