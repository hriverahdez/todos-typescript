<template>
  <div class="container">
    <div>
      <input
        data-test="todo-item-toggle"
        type="checkbox"
        :checked="todo.isDone"
        @change="todoToggle"
      />
    </div>
    <div style="padding-left: 8px">{{ todo.text }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { Todo } from "../models";

@Component
export default class TodoItemComponent extends Vue {
  @Prop({ required: true, type: Object }) todo!: Todo;

  @Emit("todo:toggle") todoToggle() {
    return this.todo;
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
</style>