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
    name: 'HomePage',
    component: HomePage,
    meta: {
      reload: true
    }
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
    path: '/products',
    name: 'GetProducts',
    component: () => import('@/views/product/ProductsListingPage.vue')
  }, {
    path: '/products/edit/:id',
    name: 'EditProduct',
    component: () => import('@/views/product/EditProductPage.vue')
  }, {
    path: '/products/:id',
    name: 'GetSingleProduct',
    component: () => import('@/views/product/ProductSinglePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
