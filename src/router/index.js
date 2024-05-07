import { createRouter, createWebHistory } from "vue-router";
import store from "../store"; 

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/auth',
            component: () => import('../components/pages/AuthPage.vue'),
            beforeEnter: (to, from, next) => {
                const USER_TOKEN = localStorage.getItem('token');
                if(USER_TOKEN){
                    next('/');
                }
                else{
                    next();
                }
            }
        },
        {
            path: '/',
            component: () => import('../components/pages/HomePage.vue'),
            beforeEnter: (to, from, next) => {
                const USER_TOKEN = localStorage.getItem('token');
                if (!USER_TOKEN) {
                    next('/auth');
                }
                else{
                    next();
                }
            }
        },
        {
            path: '/board/:id',
            component: () => import('../components/pages/BoardPage.vue'),
            beforeEnter: async (to, from, next) => {
                const BOARD_ID = to.params.id;
                const USER_TOKEN = localStorage.getItem('token');
                if (!USER_TOKEN) {
                    next('/auth');
                }
                else{
                    try {
                        await store.dispatch("columnModule/getBoardId", {boardId: BOARD_ID});
                        await store.dispatch("columnModule/axiosGetStatuses", null);
                        next();
                    } catch {
                        next("/");
                    }
                }
              },
        },
    ]
})



export default router
