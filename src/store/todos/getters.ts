import { GetterTree } from 'vuex';
import { TodosModuleState } from './state';
import { RootModuleState } from '..';

export enum GetterTypes {
  DONE_TODOS = 'DONE_TODOS',
}

export const getters: GetterTree<TodosModuleState, RootModuleState> = {
  [GetterTypes.DONE_TODOS](state) {
    return state.todos.filter(t => t.isDone);
  },
};
