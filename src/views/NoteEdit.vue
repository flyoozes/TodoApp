<template>
  <div class="NoteEdit">
    <div class="NoteEdit__header">
      <div class="NoteEdit__headline">
        <h2>
          Note:
          <span v-if="!editing" @dblclick="editNote">
            {{ note.title }}
          </span>
          <input
            v-else
            class="NoteEdit__edit-label"
            type="text"
            v-model="note.title"
            @blur="doneEdit"
            @keyup.enter="doneEdit"
            @keyup.esc="cancelEdit"
            v-focus
          />
        </h2>
      </div>
      <div>
        <a class="NoteEdit__header-link" @click="$router.go(-1)">Back</a>
      </div>
    </div>
    <div class="NoteEdit__content">
      <TodoList
        :todos="note.todos"
        @add="addTodo"
        @remove="removeTodo"
        @update="updateTodo"
      />
    </div>
    <div class="NoteEdit__footer">
      <button class="NoteEdit__button left" @click="cancelNote">Cancel</button>
      <button class="NoteEdit__button" @click="saveNote">Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import arrayHelper from '@/utils/array';
import { events } from '@/utils/events';

import TodoList from '@/components/Todo/TodoList.vue';

export default {
  name: 'NoteEdit',
  components: { TodoList },
  data() {
    return {
      id: this.$route.params.id,
      newTitle: '',
      editing: false,
      beforeEdit: '',
    };
  },
  computed: {
    ...mapGetters('note', ['noteById']),
    note() {
      return this.noteById(this.id);
    },
  },
  methods: {
    ...mapActions('note', ['updateNote']),
    addTodo(title) {
      if (this.title === '') return;
      this.note.todos.push({
        id: this.$uuid.v4(),
        title: title,
        completed: false,
      });
    },
    removeTodo(id) {
      this.note.todos = this.note.todos.filter((n) => n.id !== id);
    },
    updateTodo(todo) {
      this.note.todos = arrayHelper.updateOrInsert(todo, this.note.todos);
    },
    saveNote() {
      this.updateNote(this.note);
      this.$router.push({ path: '/' });
    },
    editNote() {
      this.beforeEdit = this.note.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.note.title == '') this.note.title = this.beforeEdit;
      this.editing = false;
    },
    cancelEdit() {
      this.note.title = this.beforeEdit;
      this.editing = false;
    },
    cancelNote() {
      events.$emit('open', {
        title: 'Confirm',
        message: `Are you sure you want to cancel editing?`,
        button: {
          yes: 'Yes',
          no: 'No',
        },
        callback: (confirm) => {
          if (confirm) {
            this.$router.push({ path: '/' });
          }
        },
      });
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
.NoteEdit__edit-label {
  padding: 6px;
  font-size: 20px;
}
.NoteEdit__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.NoteEdit__headline {
  padding-left: 10px;
}
.NoteEdit__headline span {
  padding: 5px;
}
.NoteEdit__headline span:hover {
  background-color: #eceff1;
  border-radius: 3px;
  transition: background-color 0.5s ease;
}
.NoteEdit__header-link:hover {
  text-decoration: underline;
}
.NoteEdit__button.left {
  margin-right: 10px;
}
.NoteEdit__button.left:hover {
  background: #f44336;
}
.NoteEdit__button {
  width: 100px;
  height: 40px;
  border: 0.5px solid #29b6f6;
  background: #29b6f6;
  border: none;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
.NoteEdit__button:focus {
  outline: none;
}
.NoteEdit__button:hover {
  background: #0086c3;
}
.NoteEdit__footer {
  display: flex;
  justify-content: flex-end;
}
</style>
