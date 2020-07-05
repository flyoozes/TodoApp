<template>
  <div class="NoteList">
    <NoteItem v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<script>
import NoteItem from './NoteItem.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'NoteList',
  components: { NoteItem },
  computed: {
    ...mapGetters('note', ['notes']),
  },
};
</script>

<style>
.NoteList {
  width: 100%;
}
</style>
