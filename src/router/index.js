import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/form-by-Jade',
      name: 'JForm',
      component: () => import('@/views/JFormView.vue')
    },
    {
      path: '/form-by-Chiahsuan',
      name: 'CForm',
      component: () => import('@/views/CFormView.vue')
    },
    {
      path: '/trello-mockup',
      name: 'Trello-Mockup',
      component: () => import('@/views/TrelloView.vue')
    },
    {
      path: '/e-signature',
      name: 'E-Signature',
      component: () => import('@/views/ESignatureView.vue')
    },
    {
      path: '/presigned-url',
      name: 'Presigned-URL',
      component: () => import('@/views/PresignedURLView.vue')
    }
  ]
});

export default router;
