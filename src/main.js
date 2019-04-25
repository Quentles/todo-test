import Vue from "vue";
import App from "./App";

import VueResource from "vue-resource";
import router from "./router";

Vue.use(VueResource);
Vue.config.productionTip = false;
// Vue.http.options.root = "https://my-json-server.typicode.com/Quentles/todos";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
