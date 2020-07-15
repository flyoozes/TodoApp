import arrayHelper from '../../utils/array';

const initialState = () => ({
  notes: [],
});

const state = initialState();

const getters = {
  notes: (state) => state.notes,
  noteById: (state) => (id) => {
    return state.notes.find((n) => n.id === id);
  },
  lengthNote: (state) => {
    return state.notes.length;
  },
};

const actions = {
  async addNote({ commit }, noteData) {
    return new Promise((resolve) => {
      commit('updateNote', { note: noteData, callback: resolve });
    });
  },
  async removeNote({ commit }, note) {
    commit('removeNote', note);
  },
  async updateNote({ commit }, noteData) {
    commit('updateNote', noteData);
  },
};

const mutations = {
  updateNote: (state, { note, callback }) => {
    state.notes = arrayHelper.updateOrInsert(note, state.notes);
    callback(note.id);
  },
  removeNote(state, note) {
    state.notes = state.notes.filter((n) => n.id !== note.id);
  },

  // emptyState: () => {
  //   // Object.assign(state, initialState);
  //   this.$store.replaceState([]);
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
