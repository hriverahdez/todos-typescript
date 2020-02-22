import { createLocalVue, mount } from '@vue/test-utils';

import Vuex from 'vuex';

import TodoList from '@/components/TodoList.vue';
import {
  ActionTypes,
  MODULE_NAME as TODOS_MODULE_NAME,
  initialState,
  getters,
} from '@/store/todos';
import { MOCK_TODOS } from '@/models/todo-items.mock';
import { RootModuleState } from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);

const actions = {
  [ActionTypes.fetchTodos]: jest.fn(() => Promise.resolve(MOCK_TODOS)),
};

const store = new Vuex.Store<RootModuleState>({
  modules: {
    [TODOS_MODULE_NAME]: {
      namespaced: true,
      actions,
      state: initialState,
    },
  },
});

const factory = (params: any) => {
  const wrapper = mount(TodoList, {
    localVue,
    ...params,
  });

  return wrapper;
};

describe('TodoList.vue', () => {
  it('should fetch all the todos upon initialization', () => {
    const wrapper = factory({ store });

    expect(actions[ActionTypes.fetchTodos]).toHaveBeenCalled();
  });

  it('should render all the items', () => {
    const storeWithData = new Vuex.Store<RootModuleState>({
      modules: {
        [TODOS_MODULE_NAME]: {
          namespaced: true,
          actions,
          state: {
            loading: false,
            todos: MOCK_TODOS,
          },
        },
      },
    });

    const wrapper = factory({ store: storeWithData });

    expect(wrapper.findAll('[data-test="todo-item"]').length).toBe(4);
  });

  it('should toggle the todos', done => {
    const storeWithData = new Vuex.Store<RootModuleState>({
      modules: {
        [TODOS_MODULE_NAME]: {
          namespaced: true,
          actions,
          getters,
          state: {
            loading: false,
            todos: MOCK_TODOS,
          },
        },
      },
    });

    const wrapper = factory({ store: storeWithData });

    wrapper.find('[data-test="done-todo-toggle-btn"]').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('[data-test="todo-item"]').length).toBe(1);
      done();
    });
  });
});
