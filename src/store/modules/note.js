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
    commit('updateNote', noteData);
  },
  async removeNote({ commit }, note) {
    commit('removeNote', note);
  },
  async updateNote({ commit }, noteData) {
    commit('updateNote', noteData);
  },
};

const mutations = {
  updateNote: (state, note) => {
    state.notes = arrayHelper.updateOrInsert(note, state.notes);
  },
  removeNote(state, note) {
    state.notes = state.notes.filter((n) => n.id !== note.id);
  },

  resetState: (state) => {
    Object.assign(state, initialState);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
