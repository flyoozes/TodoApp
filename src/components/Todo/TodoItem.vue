<template>
  <div class="TodoItem">
    <div class="TodoItem__left">
      <input
        class="NoteItem__checkbox"
        type="checkbox"
        :id="`todo-item-${todo.id}`"
        v-model="todo.completed"
        @change="doneEdit"
      />
      <label
        class="NoteItem__checkbox-label"
        :for="`todo-item-${todo.id}`"
      ></label>
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="TodoItem__label"
        :class="{ completed: todo.completed }"
      >
        {{ todo.title }}
      </div>
      <input
        v-else
        class="TodoItem__edit"
        type="text"
        v-model="todo.title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      />
    </div>
    <div>
      <span class="TodoItem__remove" @click="removeTodo(todo.id)">
        &times;
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
      beforeEdit: '',
    };
  },
  methods: {
    removeTodo(id) {
      this.$emit('remove', id);
    },
    editTodo() {
      this.beforeEdit = this.todo.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.todo.title == '') {
        this.todo.title = this.beforeEdit;
      }
      this.editing = false;
      this.$emit('updateTodo', this.todo);
    },
    cancelEdit() {
      this.todo.title = this.beforeEdit;
      this.editing = false;
    },
  },
  directives: {
    focus: {
      inserted: (e) => {
        e.focus();
      },
    },
  },
};
</script>

<style>
.TodoItem {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.TodoItem__left {
  display: flex;
  align-items: center;
}
.TodoItem__label {
  padding: 10px;
  margin-left: 12px;
}
.TodoItem__label:hover {
  background-color: #eceff1;
  border-radius: 3px;
  transition: background-color 0.5s ease;
}
.TodoItem__edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
