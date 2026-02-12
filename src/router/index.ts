import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'lists-index',
      component: () => import('../views/ListsIndex.vue'),
    },
    {
      path: '/lists/:id',
      name: 'list',
      component: () => import('../views/ListDetail.vue'),
    },
     {
      path: '/lists/:listId/invitations/:token',
      name: 'invitation',
      component: () => import('../views/AcceptInviteView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    }
  ],
})

export default router
