import Vue from "vue";
import Router from "vue-router";
import Todos from "@/components/Todos";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    // {
    //   path: "/",
    //   name: "Hello",
    //   component: HelloWorld
    // },
    {
      path: "/",
      name: "Todos",
      component: Todos
    }
  ]
});
