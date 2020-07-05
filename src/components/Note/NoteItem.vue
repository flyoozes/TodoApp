<template>
  <div>
    <div class="NoteItem">
      <div class="NoteItem__note">
        <div class="NoteItem__headline">
          {{ note.title }}
        </div>
        <div class="NoteItem__content">
          <div v-for="todo in computedTodos" :key="todo.id">
            <input
              type="checkbox"
              v-model="todo.completed"
              @click.prevent
              disabled
              class="NoteItem__checkbox"
              :id="`todo-${todo.id}`"
            />
            <label class="NoteItem__checkbox-label" :for="`todo-${todo.id}`">{{
              todo.title
            }}</label>
          </div>
          <span v-if="this.note.todos.length > this.limit">
            <router-link
              class="NoteItem__link"
              :to="{ name: 'note', params: { id: note.id } }"
              >Show More...</router-link
            >
          </span>
        </div>
      </div>
      <div class="NoteItem__actions">
        <router-link :to="{ name: 'note', params: { id: note.id } }"
          ><font-awesome-icon icon="edit"
        /></router-link>
        <font-awesome-icon icon="trash-alt" @click="deleteNote" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { events } from '@/utils/events';

export default {
  name: 'NoteItem',
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      limit: 3,
    };
  },
  computed: {
    computedTodos() {
      return this.note.todos.slice(0, this.limit);
    },
  },
  methods: {
    ...mapActions(['removeNote']),
    deleteNote() {
      events.$emit('open', {
        title: 'Confirm',
        message: `Are you sure? "${this.note.title}" will be remove?`,
        button: {
          yes: 'Yes',
          no: 'No',
        },
        callback: (confirm) => {
          if (confirm) {
            this.removeNote(this.note);
          }
        },
      });
    },
  },
};
</script>

<style>
.NoteItem {
  padding: 10px;
  margin: 15px 0;
  background: #ffffff;
  border: 0.5px solid #eceff1;
  display: flex;
  align-items: flex-start;
}

.NoteItem__note {
  flex-grow: 6;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.NoteItem__headline {
  font-weight: bold;
  padding: 5px 0;
}

.NoteItem__content {
  padding: 5px 15px;
}

.NoteItem__checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.NoteItem__link {
  text-decoration: none;
}
.NoteItem__checkbox-label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}

.NoteItem__checkbox-label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.NoteItem__checkbox:checked + .NoteItem__checkbox-label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.NoteItem__checkbox:not(:disabled):not(:checked)
  + .NoteItem__checkbox-label:hover::before {
  border-color: #b3d7ff;
}

.NoteItem__checkbox:not(:disabled):active + .NoteItem__checkbox-label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}

.NoteItem__checkbox:focus + .NoteItem__checkbox-label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.NoteItem__actions {
  flex-grow: 1;
  justify-content: flex-end;
  display: flex;
}

.NoteItem__actions svg {
  margin: 10px;
  color: #4b636e;
  cursor: pointer;
}

.NoteItem__actions svg[data-icon='edit']:hover {
  color: #29b6f6;
}

.NoteItem__actions svg[data-icon='trash-alt']:hover {
  color: #f44336;
}
</style>
