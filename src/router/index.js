import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Layout',
        meta: { title: '首页' },
        compontent: () => import('@/pages/home')
    }
]

export default new VueRouter({ routes: constantRoutes })