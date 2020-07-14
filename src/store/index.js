import Vue from 'vue';
import Vuex from 'vuex';
import note from './modules/note';
import todo from './modules/todo';

import { VuexPersistence } from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = new Vuex.Store({
  modules: {
    note,
    todo,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
