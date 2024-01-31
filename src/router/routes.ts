import Login from '@/views/admin/Login.vue'
import MainView from '@/views/MainView.vue'

export const default_routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/mainView',
    name: 'MainView',
    component: MainView,
    children: [
      {
        path: 'testPage',
        name: 'TestPage',
        component: () => import('@/views/test/TestPage.vue')
      },
      {
        path: 'user',
        name: 'UserTable',
        component: () => import('@/views/user/UserTable.vue')
      }
    ]

  }
]