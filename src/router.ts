
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import FileUpload from './pages/FileUpload.vue';
import Admin from './pages/Admin.vue';
import Play from './pages/Play.vue';
import Tailwind from './pages/Tailwind.vue';

import Login from './pages/Login.vue';
import Sign from './pages/Sign.vue';

import Test from './pages/Test.vue'

// import Chart from './pages/echarts/Chart.vue';


import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
export const routes: Array<any> = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/sign',
        component: Sign
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/admin',
        component: Admin,
        children: [
            {
                path: 'file', component: FileUpload,
                title: '文件上传'
            },
            { path: 'play', component: Play, title: 'play' },
            { path: 'tailwind', component: Tailwind, title: 'tailwind' },
            {
                path: 'about',
                title: 'About',
                component: About,
            },
            // {
            //     path: 'chart',
            //     title: 'Chart',
            //     component: Chart,
            // },
        ]
    },
];

// keep it simple for now.
export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})
