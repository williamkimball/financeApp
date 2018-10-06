import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'landing',
        component: () => import('../views/Landing')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../layouts/DropletsLayout'),
        children: [
            {
                path: 'home',
                name: 'dashboard.home',
                component: () => import('../views/Home')
            },
            {
                path: 'indicators',
                name: 'dashboard.indicators',
                component: () => import('../views/Dashboard/Indicators')
            },
            {
                path: 'backup',
                name: 'dashboard.backup',
                component: () => import('../views/Dashboard/Backup')
            },
            {
                path: 'logs',
                name: 'dashboard.logs',
                component: () => import('../views/Dashboard/Logs')
            }
        ]
    }
]

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
