import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  todos: []
};

const getters = {
  todos: state => state.todos,
  completedTodos: state => state.todos.filter(todo => todo.completed),
  remainingTodos: state => state.todos.filter(todo => !todo.completed),
  remainingTodosCount: state => getters.remainingTodos(state).length,
  completedTodosCount: state => getters.completedTodos(state).length
};

const mutations = {
  SET_TODOS: (state, datas) => {
    state.todos = datas;
    console.log("Initialisation des taches", datas);
  },
  ADD_TODO: (state, name) => {
    console.log("Ajout d'une tache");
    state.todos.push({
      completed: false,
      name: name
    });
  },
  DELETE_TODO: (state, todo) => {
    console.log("Suppression de la tache ", todo);
    state.todos = state.todos.filter(i => i !== todo);
  }
};

const actions = {
  fetchTodos({ commit }) {
    axios
      .get("https://my-json-server.typicode.com/Quentles/todos/posts")
      .then(r => {
        commit("SET_TODOS", r.data);
      });
  },
  addTodo: (store, name) => {
    axios
      .post("https://my-json-server.typicode.com/Quentles/todos/posts", {
        name: name
      })
      .then(r => {
        store.commit("ADD_TODO", name);
      });
  },
  editTodo: (store, todo) => {
    axios
      .put(
        "https://my-json-server.typicode.com/Quentles/todos/posts/" + todo.id,
        {
          name: todo.name
        }
      )
      .then(r => {});
  },
  deleteTodo: (store, todo) => {
    axios.delete(
      "https://my-json-server.typicode.com/Quentles/todos/posts/" + todo.id
    );
    store.commit("DELETE_TODO", todo);
  }
};

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
});

global.store = store;

export default store;
