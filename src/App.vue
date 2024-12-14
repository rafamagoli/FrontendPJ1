<template>
<div id="nav">
  <router-link :to="{ name: 'user-dashboard'}">user-dashboard</router-link>
  <router-link :to="{ name: 'user-login'}">user-login</router-link>
  <router-link :to="{ name: 'user-register'}">user-register</router-link>
  <router-link :to="{ name: 'rota-default'}">rota-default</router-link>
  <router-link :to="{ name: 'employee-list'}">employee-list</router-link>
  <router-link :to="{ name: 'employee-add'}">employee-add</router-link>

</div>

  <div id="app">
    <main>
      <!-- Dynamic Component Based on Routes -->
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>

<style>
</style>