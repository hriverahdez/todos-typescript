import { ActionTree } from 'vuex';
import { TodosModuleState } from './state';
import { RootModuleState } from '..';
import { MutationTypes } from './mutations';

import { MOCK_TODOS } from '../../models/todo-items.mock';

export enum ActionTypes {
  fetchTodos = 'fetchTodos',
}

export const actions: ActionTree<TodosModuleState, RootModuleState> = {
  [ActionTypes.fetchTodos]({ commit }) {
    commit(MutationTypes.LOAD_TODOS);

    return new Promise((res, rej) => {
      setTimeout(() => {
        commit(MutationTypes.LOAD_TODOS_SUCCESS, MOCK_TODOS);
        res();
      }, 800);
    });
  },
};
