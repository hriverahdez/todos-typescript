<template>
  <div style="max-width: 700px; margin: 0 auto;">
    <h1>{{ appName }}</h1>
    <button
      data-test="done-todo-toggle-btn"
      @click="showDoneOnly = !showDoneOnly"
    >{{ toggleButtonText }}</button>
    <hr />
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li data-test="todo-item" v-for="todo of (showDoneOnly ? doneTodos : todos)" :key="todo.id">
        <TodoItem :todo="todo" @todo:toggle="onTodoToggled" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { State, namespace } from "vuex-class";

import {
  MODULE_NAME as TODOS_MODULE_NAME,
  ActionTypes,
  TodosModuleState,
  GetterTypes,
  MutationTypes
} from "@/store/todos";

import { Todo } from "@/models";
import { RootModuleState } from "../store";
import TodoItem from "./TodoItem.vue";

const todosModule = namespace(TODOS_MODULE_NAME);

@Component({
  name: "TodoList",
  components: {
    TodoItem
  }
})
export default class TodoListComponent extends Vue {
  showDoneOnly: boolean = false;

  @State appName!: string;

  @todosModule.State loading!: boolean;
  @todosModule.State todos!: Todo[];

  @todosModule.Getter(GetterTypes.DONE_TODOS) doneTodos!: Todo[];

  @todosModule.Action(ActionTypes.fetchTodos) fetchTodos!: Function;

  @todosModule.Mutation(MutationTypes.TOGGLE_TODO)
  toggleTodo!: (todo: Todo) => void;

  created() {
    this.fetchTodos();
  }

  get toggleButtonText() {
    return this.showDoneOnly ? "Show all todos" : "Show only done todos";
  }

  onTodoToggled(todo: Todo) {
    this.toggleTodo(todo);
  }
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  list-style-type: none;
  padding: 0;
  li {
    font-size: 1.5em;
  }
}
</style>