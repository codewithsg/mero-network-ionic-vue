import { createStore } from 'vuex';
import instance from '@/utils/axios';
import users from './users';
import { ILoginUSer, IRegisterUser } from '@/interfaces/User.Interface';
import product from './products';

export default createStore({
  state: {
    access_token: sessionStorage.getItem("access_token"),
    login_status: sessionStorage.getItem('login_status'),
    user_name: sessionStorage.getItem("user_name"),
    user_id: sessionStorage.getItem("user_id"),
    refresh: false
  },
  getters: {
    getLoginStatus(state) {
      return state.login_status;
    },
    getUserId(state) {
      return state.user_id;
    }
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.access_token = data;
      sessionStorage.setItem("access_token", data);
      sessionStorage.setItem("login_status", 'true');
      state.login_status = 'true'
    },
    SET_USER_NAME(state, data) {
      state.user_name = data;
      sessionStorage.setItem('user_name', data);
      sessionStorage.setItem("login_status", 'true');
      state.login_status = 'true'

    },
    SET_USER_ID(state, data) {
      state.user_id = data;
      sessionStorage.setItem('user_id', data);
    },
    LOGOUT: (state) => {
      sessionStorage.removeItem("access_token");
      state.access_token = null;
      sessionStorage.removeItem("login_status");
      state.login_status = null;
      sessionStorage.removeItem('user_name');
      state.user_name = null;
      sessionStorage.removeItem('user_id');
      state.user_id = null;
    },
    SET_REFRESH_PAGE: (state, data) => {
      state.refresh = data;
    }
  },
  actions: {
    registerUser: async (context: any, data: IRegisterUser) => {
      try {
        const res = await instance.post('auth/register', data);
        // if (res.response.data.message.includes("key 'users.users_email_unique'")) {
        //     return alert('Email address is already in use');
        // }
        if (res.data.token) {
          context.commit('SET_TOKEN', res.data.token);
        }
        if (res.data.user.firstName) {
          context.commit('SET_USER_NAME', res.data.user.firstName);
        }
        if (res.data.user.id) {
          context.commit('SET_USER_ID', res.data.user.id);
        }
        return res;
      } catch (err: any) {
        return err;
      }
    },
    loginUser: async (context: any, data: ILoginUSer) => {
      try {
        const res = await instance.post('auth/login', data);
        if (res.data.user != undefined) {
          if (res.data.token) {
            context.commit('SET_TOKEN', res.data.token);
          }
          if (res.data.user.firstName) {
            context.commit('SET_USER_NAME', res.data.user.firstName);
          }
          if (res.data.user.id) {
            context.commit('SET_USER_ID', res.data.user.id);
          }
        }
        return res;
      } catch (err: any) {
        return err;
      }
    },
    logout: async ({ commit }) => {
      commit('LOGOUT');
    }
  },
  modules: <any>{
    products: product
  }
})
