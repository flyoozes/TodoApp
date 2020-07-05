<template>
  <modal v-show="show" @close="closeModal">
    <template v-slot:header>
      <h2>New note: {{ newNote.title }}</h2>
    </template>
    <template v-slot:body>
      <TodoList
        :todos="newNote.todos"
        @add="addTodo"
        @remove="removeTodo"
        @update="updateTodo"
      />
    </template>
    <template v-slot:footer>
      <button class="CreateButton" @click="add">
        Create
      </button>
    </template>
  </modal>
</template>

<script>
import modal from '@/views/ModalTemplate.vue';
import TodoList from '@/components/Todo/TodoList.vue';

import arrayHelper from '@/utils/array';

import { mapActions } from 'vuex';

export default {
  name: 'NoteCreate',
  components: { TodoList, modal },
  props: {
    newNote: {
      type: Object,
      required: true,
    },
    show: Boolean,
  },
  methods: {
    ...mapActions('note', ['addNote']),
    closeModal() {
      this.$emit('close');
    },

    add() {
      this.addNote({
        id: this.$uuid.v1(),
        ...this.newNote,
      });

      this.closeModal();
    },
    addTodo(todoTitle) {
      this.newNote.todos.push({
        id: this.$uuid.v4(),
        title: todoTitle,
        completed: false,
      });
    },
    removeTodo(id) {
      this.newNote.todos = this.newNote.todos.filter((n) => n.id !== id);
    },
    updateTodo(todo) {
      this.newNote.todos = arrayHelper.updateOrInsert(todo, this.newNote.todos);
    },
  },
};
</script>

<style>
.CreateButton {
  width: 100px;
  height: 40px;
  border: 0.5px solid #29b6f6;
  background: #29b6f6;
  border: none;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.CreateButton:focus {
  outline: none;
}

.CreateButton:hover {
  background: #0086c3;
}
</style>
