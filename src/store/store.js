/**
 * Created by jingqw on 17/6/30.
 * 统一状态管理store
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './type'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: ''
  },
  mutations: {
    [types.USER]: (state, data) => {
      localStorage.user = JSON.stringify(data);
      state.user = data;
    },
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
  }
});
