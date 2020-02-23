import { createLocalVue, mount, Wrapper } from '@vue/test-utils';

import TodoItem from '@/components/TodoItem.vue';

import { MOCK_TODOS } from '@/models/todo-items.mock';
import { CombinedVueInstance } from 'vue/types/vue';

const localVue = createLocalVue();

const factory = (params: any) => {
  const wrapper = mount(TodoItem, {
    localVue,
    ...params,
  });

  return wrapper;
};

const todo = MOCK_TODOS[0];
let wrapper: Wrapper<CombinedVueInstance<TodoItem, object, object, object, Record<never, any>>>;

describe('TodoItem.vue', () => {
  beforeEach(() => {
    wrapper = factory({ propsData: { todo } });
  });

  it('should render the todo text', () => {
    expect(wrapper.text()).toMatch(todo.text);
  });

  it('should emit a toggle event', () => {
    wrapper.find('[data-test="todo-item-toggle"]').trigger('click');

    expect(wrapper.emitted('todo:toggle')[0][0]).toEqual(todo);
  });
});
