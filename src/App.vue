<template>
  <div id="app">
    <!-- <div class="ui fixed inverted menu">
      <div class="ui container">
        <router-link :to="{name: 'Hello'}" class="header item">Accueil</router-link>
        <router-link :to="{name: 'Todos'}" class="item">Todo</router-link>
      </div>
    </div>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
