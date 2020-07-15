import Vue from 'vue';
import Vuex from 'vuex';
import note from './modules/note';
import todo from './modules/todo';
import VuexUndoRedo from 'vuex-undo-redo';

import { VuexPersistence } from 'vuex-persist';

Vue.use(Vuex);
Vue.use(VuexUndoRedo);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = new Vuex.Store({
  modules: {
    note,
    todo,
  },
  strict: true,
  mutations: {
    emptyState() {
      this.replaceState({ note: { notes: [] }, todo: { todos: [] } });
    },
  },
  plugins: [vuexLocal.plugin],
});

export default store;
