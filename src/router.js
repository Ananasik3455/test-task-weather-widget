import {createRouter, createWebHistory} from 'vue-router'
import viewWeather from './views/viewWeather'
import viewSettings from './views/viewSettings'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: viewWeather,
            name: 'viewWeather'
        },
        {
            path: '/viewSettings',
            component: viewSettings,
            name: 'viewSettings'
        }
    ]
})

export default router