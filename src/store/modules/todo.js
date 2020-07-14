// import arrayHelper from '../../utils/array';
// import note from './note';

const initialState = () => ({
  todos: [],
});

const state = initialState();

const getters = {
  todosById: (state) => (id) => {
    return state.todos.filter((n) => n.noteId === id);
  },
};

const actions = {
  async addTodos({ commit }, todosData) {
    commit('addTodos', todosData);
  },
  async addTodo({ commit }, todoData) {
    commit('updateTodo', todoData);
  },
  async removeTodo({ commit }, todo) {
    commit('removeTodo', todo);
  },
  async updateTodos({ commit }, data) {
    commit('updateTodos', data);
  },
};

const mutations = {
  addTodos: (state, todos) => {
    state.todos.push(...todos);
  },
  updateTodos: (state, { todos, noteId }) => {
    state.todos = [
      ...todos,
      ...state.todos.filter((todo) => todo.noteId !== noteId),
    ];
  },
  removeTodo(state, todo) {
    state.todos = state.todos.filter((n) => n.id !== todo.id);
  },
  resetState: (state) => {
    Object.assign(state, initialState);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
