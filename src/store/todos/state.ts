import { Todo } from '@/models';
import { Module } from 'vuex';

import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { RootModuleState } from '..';

export const MODULE_NAME = 'TodosModule';

export interface TodosModuleState {
  loading: boolean;
  todos: Todo[];
  error: any;
}

export const initialState: TodosModuleState = {
  loading: false,
  todos: [],
  error: null,
};

export const TodosModule: Module<TodosModuleState, RootModuleState> = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters,
};
