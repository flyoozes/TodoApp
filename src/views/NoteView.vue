<template>
  <div class="NoteView">
    <h1>All Notes</h1>
    <div class="NoteList__create-note">
      <input
        type="text"
        class="NoteList__input"
        :placeholder="lengthNote !== 0 ? `${lengthNote} note` : 'New note'"
        v-model="newNote.title"
        @keyup.enter="createNote"
      />
      <button class="NoteList__button-create" @click="createNote">
        New Note
      </button>
    </div>
    <NoteList />
    <NoteCreate :newNote="newNote" :show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import NoteList from '@/components/Note/NoteList.vue';
import NoteCreate from '@/components/Note/NoteCreate.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'NoteView',
  components: { NoteList, NoteCreate },
  data() {
    return {
      newNote: {
        title: '',
        todos: [],
      },
      isModalVisible: false,
    };
  },
  computed: {
    ...mapGetters('note', ['lengthNote']),
  },
  methods: {
    createNote() {
      this.newNote.title.trim().length !== 0 ? this.showModal() : '';
    },

    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;

      this.newNote = {
        title: '',
        todos: [],
      };
    },
  },
};
</script>

<style>
.NoteList__input {
  font-weight: 600;
  font-size: 16px;
  border: none;
  width: 100%;
  padding: 7px;
}

.NoteList__input:focus {
  outline: none;
}

.NoteList__create-note {
  margin: 10px 0;
  display: flex;
  align-content: center;
  justify-content: space-between;
  border: 0.5px solid #eceff1;
  width: 100%;
  height: 40px;
}

.NoteList__button-create {
  width: 150px;
  height: 40px;
  border: 0.5px solid #29b6f6;
  background: #29b6f6;
  border: none;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.NoteList__button-create:focus {
  outline: none;
}

.NoteList__button-create:hover {
  background: #0086c3;
}
</style>
