import { createStore } from 'vuex';
import instance from '@/utils/axios';
import users from './users';
import { ILoginUSer, IRegisterUser } from '@/interfaces/User.Interface';

export default createStore({
  state: {
    access_token: sessionStorage.getItem("access_token"),
    login_status: sessionStorage.getItem('login_status'),
    user_name: sessionStorage.getItem("user_name")
  },
  getters: {
    getLoginStatus(state) {
      return state.login_status;
    }
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.access_token = data;
      sessionStorage.setItem("access_token", data);
      sessionStorage.setItem("login_status", 'true');
    },
    SET_USER_NAME(state, data) {
      state.user_name = data;
      sessionStorage.setItem('user_name', data);
      sessionStorage.setItem("login_status", 'true');

    },
    LOGOUT: (state) => {
      sessionStorage.removeItem("access_token");
      state.access_token = null;
      sessionStorage.removeItem("login_status");
      state.login_status = null;
      sessionStorage.removeItem('user_name');
      state.user_name = null;
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
        return res;
      } catch (err: any) {
        return err;
      }
    },
    loginUser: async (context: any, data: ILoginUSer) => {
      try {
        const res = await instance.post('auth/login', data);
        if (res.data.user != undefined) {
          if (res.data.token != undefined) {
            context.commit('SET_TOKEN', res.data.token);
          }
          if (res.data.user.firstName != undefined) {
            context.commit('SET_USER_NAME', res.data.user.firstName);
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
  modules: {
    users: users
  }
})
