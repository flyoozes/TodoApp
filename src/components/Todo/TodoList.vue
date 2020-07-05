<template>
  <div class="TodoList">
    <input
      type="text"
      class="TodoList__input"
      placeholder="Write down and push enter key (double click on todo to edit)"
      v-model="todoTitle"
      @keyup.enter="addTodo"
    />
    <div>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove="removeTodo"
        @update="updateTodo"
      />
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  components: { TodoItem },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      todoTitle: '',
    };
  },
  methods: {
    addTodo() {
      if (this.todoTitle === '') return;
      this.$emit('add', this.todoTitle);

      this.todoTitle = '';
    },
    removeTodo(id) {
      this.$emit('remove', id);
    },
    updateTodo(todo) {
      this.$emit('update', todo);
    },
  },
};
</script>

<style>
.TodoList {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border: 0.5px solid #eceff1;
}
.TodoList__input {
  padding: 10px 18px;
  font-size: 16px;
  margin-bottom: 16px;
  border: 0.5px solid #eceff1;
}
.TodoList__input:focus {
  outline: 0;
}
</style>
