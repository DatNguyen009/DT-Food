import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Home.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Home.vue')
    },


    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ('../views/clients/about.vue')
    // },
    {
        path: '/news',
        name: 'News',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/News.vue')
    },
    {
        path: '/shops',
        name: 'Shops',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Shop.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Contact.vue')
    },
    {
        path: '/detail/:product_slug',
        name: 'Detail',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Detail.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/About.vue')
    },
    {
        path: '/order/:product_slug',
        name: 'Order',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Order.vue')
    },
    {
        path: '/orderAll',
        name: 'OrderAll',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/OrderAll.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '@/views/Search.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Login.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Cart.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Admin.vue'),
        children: [{
                path: 'addFood',
                name: "AddFood",
                component: () =>
                    import ( /* webpackChunkName: "Home" */ '../components/AddFood.vue')
            },
            {
                path: 'manageFood',
                name: "ManageFood",
                component: () =>
                    import ( /* webpackChunkName: "Home" */ '../components/ManagementFood.vue')
            },
            {
                path: 'softDeleted',
                name: "SoftDeleted",
                component: () =>
                    import ( /* webpackChunkName: "Home" */ '../components/SoftDeletedProduct.vue')
            },
            {
                path: 'historyMaterial',
                name: "HistoryMaterial",
                component: () =>
                    import ( /* webpackChunkName: "Home" */ '../components/admin/HistoryMaterial.vue')
            }
        ]
    },
    {
        path: '/adminLogin',
        name: 'AdminLogin',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/LoginAdmin.vue')
    },
    // {
    //     path: '/addFood',
    //     name: "AddFood",
    //     component: () =>
    //         import ( /* webpackChunkName: "Home" */ '../components/AddFood.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})


export default router