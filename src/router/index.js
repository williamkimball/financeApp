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
        path: '/loading',
        name: 'loading',
        component: () => import('../components/Callback')
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
                path: 'overview',
                name: 'dashboard.overview',
                component: () => import('../views/Dashboard/Overview')
            },
            {
                path: 'buckets',
                name: 'dashboard.buckets',
                component: () => import('../views/Dashboard/SavingsBuckets')
            },
            {
                path: 'insights',
                name: 'dashboard.insights',
                component: () => import('../views/Dashboard/Insights')
            },
            {
                path: 'accounts',
                name: 'dashboard.accounts',
                component: () => import('../views/Dashboard/Accounts')
            },
            {
                path: 'link_account',
                name: 'dashboard.link_account',
                component: () => import('../views/Dashboard/LinkAccounts')
            }
        ]
    }
]

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
