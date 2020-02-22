import Vue from 'vue';
import Vuex from 'vuex';

import { MODULE_NAME as TODOS_MODULE_NAME, TodosModule } from './todos';

Vue.use(Vuex);

export interface RootModuleState {
  isAuth: boolean;
  appName: string;
}

export default new Vuex.Store<RootModuleState>({
  state: {
    isAuth: false,
    appName: 'My bareboned Todo App',
  },
  mutations: {},
  actions: {},
  modules: {
    [TODOS_MODULE_NAME]: TodosModule,
  },
});
