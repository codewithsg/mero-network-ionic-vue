import { loadingController } from '@ionic/vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/auth/LoginPage.vue';
import RegisterPage from './../views/auth/RegisterPage.vue';
import { addTeleportedUserComponent } from '@ionic/vue/dist/types/components/IonApp';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  }, {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }, {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }, {
    path: '/products/add',
    name: 'AddProduct',
    component: () => import('@/views/product/CreateProductPage.vue')
  }, {
    path: '/camera',
    name: 'CameraTest',
    component: () => import('@/views/CameraPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
