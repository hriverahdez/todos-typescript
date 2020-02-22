import { MutationTree } from 'vuex';
import { TodosModuleState } from './state';
import { Todo } from '@/models';

export enum MutationTypes {
  LOAD_TODOS = 'LOAD_TODOS',
  LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS',
  LOAD_TODOS_FAIL = 'LOAD_TODOS_FAIL',
  CLEAR_TODOS = 'CLEAR_TODOS',
}

export const mutations: MutationTree<TodosModuleState> = {
  [MutationTypes.CLEAR_TODOS](state) {
    state.todos = [];
  },

  [MutationTypes.LOAD_TODOS](state) {
    state.todos = [];
    state.loading = true;
  },

  [MutationTypes.LOAD_TODOS_FAIL](state) {
    state.todos = [];
    state.error = {
      message: 'SOMETHING HAS GONE TERRIBLY WRONG',
      code: 'WRONG',
    };
  },

  [MutationTypes.LOAD_TODOS_SUCCESS](state, payload: Todo[]) {
    state.todos = payload;
    state.loading = false;
  },
};
