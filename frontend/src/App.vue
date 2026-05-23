<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/AppHeader.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
/* Глобальные стили (без scoped) */
body, html {
  overflow-x: hidden; /* Отключает горизонтальный скролл */
  width: 100%; /* Фиксирует ширину */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>