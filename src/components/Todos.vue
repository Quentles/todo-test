<template>
  <section class="todoapp">
    <header class="header">
      <input type="checkbox" class id="toggle-all" v-model="allDone">
      <h1>Todos</h1>
      <input
        type="text"
        class="new-todo"
        placeholder="Ajouter une tache"
        v-model="newTodo"
        @keyup.enter="addTodo"
      >
    </header>
    <div class="main">
      <ul class="todo-list">
        <li
          class="todo"
          v-for="todo in filteredTodos"
          :class="{completed: todo.completed, editing: todo === editing}"
        >
          <div class="view">
            <input type="checkbox" class="toggle" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.name }}</label>
            <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
          </div>
          <input
            type="text"
            class="edit"
            v-model="todo.name"
            v-focus="todo === editing"
            @keyup.enter="doneEdit"
            @keyup.esc="cancelEdit"
            @blur="doneEdit"
          >
        </li>
      </ul>
    </div>
    <footer class="footer" v-show="todos.length > 0">
      <button
        style="float: none;"
        class="clear-completed"
        v-show="completedTodosCount"
        @click.prevent="deleteCompleted"
      >Supprimer les tâches terminées</button>
      <span class="todo-count">
        <strong>{{ remainingTodosCount }}</strong>
        tâches à faire
      </span>
      <ul class="filters">
        <li>
          <a href="#" :class="{selected : filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a>
        </li>
        <li>
          <a
            href="#"
            :class="{selected : filter === 'todo'}"
            @click.prevent="filter = 'todo'"
          >À faire</a>
        </li>
        <li>
          <a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<script>
import Vue from "vue";
import store from "../stores/TodosStore";
import Vuex from "vuex";

export default {
  store: store,
  data() {
    return {
      // todos: [],
      newTodo: "",
      filter: "all",
      editing: null
    };
  },
  methods: {
    ...Vuex.mapActions({
      addTodoStore: "addTodo",
      editTodoStore: "editTodo",
      deleteTodo: "deleteTodo",
      fetchTodos: "fetchTodos"
    }),
    addTodo() {
      this.addTodoStore(this.newTodo);
      this.newTodo = "";
    },
    // addTodo() {
    //   this.todos.push({
    //     completed: false,
    //     name: this.newTodo
    //   });

    //   this.newTodo = "";
    // },
    // deleteTodo(todo) {
    // this.$todo.remove({ id: todo.id }).then(response => {}, response => {});
    // this.todos = this.todos.filter(i => i !== todo);
    // this.deleteTodo(todo);
    // },
    deleteCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    editTodo(todo) {
      this.editing = todo;
      this.oldTodo = todo;
    },
    doneEdit() {
      if (this.editing != null) {
        this.editTodoStore(this.editing);
        // this.$todos.update({ id: todo.id }, { name: todo.name }).then(
        //   response => {
        //     console.log("ok");
        //   },
        //   response => {
        //     console.log("erreur");
        //   }
        // );
        this.editing = null;
      }
    },
    cancelEdit() {
      console.log("done");

      this.editing.name = this.oldTodo;
      this.doneEdit();
    }
  },
  mounted() {
    this.fetchTodos();
    // this.$todos = this.$resource("posts{/id}");
    // this.$todos.query().then(
    //   response => {
    //     this.todos = response.data;
    //   },
    //   response => {
    //     console.log("erreur", response);
    //   }
    // );
  },
  computed: {
    ...Vuex.mapGetters([
      "todos",
      "remainingTodosCount",
      "completedTodosCount",
      "remainingTodos",
      "completedTodos"
    ]),
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach(todo => {
          todo.completed = value;
        });
      }
    },
    remaining() {
      return this.remainingTodos;
    },
    doneTodos() {
      return this.completedTodos;
    },
    filteredTodos() {
      if (this.filter === "todo") {
        // return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === "done") {
        // return this.todos.filter(todo => todo.completed);
      }

      return this.todos;
    }
  },
  directives: {
    focus(el, value) {
      if (value) {
        Vue.nextTick(_ => {
          el.focus();
        });
      }
    }
  }
};
</script>

<style src="./todos.css">
</style>
