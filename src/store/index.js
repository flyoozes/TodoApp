import Vue from 'vue';
import Vuex from 'vuex';
import note from './modules/note';

import { VuexPersistence } from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = new Vuex.Store({
  modules: {
    note,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
