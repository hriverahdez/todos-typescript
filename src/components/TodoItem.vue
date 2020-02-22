<template>
  <div class="container">
    <div>
      <input type="checkbox" :checked="todo.isDone" disabled />
    </div>
    <div style="padding-left: 8px">{{ todo.text }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Todo } from "../models";

@Component
export default class TodoItemComponent extends Vue {
  @Prop({ required: true, type: Object }) todo!: Todo;
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
</style>