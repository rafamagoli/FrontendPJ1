<template>
<div id="nav">
  <router-link :to="{ name: 'user-dashboard'}">user-dashboard</router-link>
  <router-link :to="{ name: 'user-login'}">user-login</router-link>
  <router-link :to="{ name: 'user-register'}">user-register</router-link>
  <router-link :to="{ name: 'rota-default'}">rota-default</router-link>
  <router-link :to="{ name: 'employee-list'}">employee-list</router-link>
  <router-link :to="{ name: 'employee-add'}">employee-add</router-link>
  <router-link :to="{ name: 'department-list'}">department-list</router-link>
  <router-link :to="{ name: 'department-add'}">department-add</router-link>
  <router-link :to="{ name: 'department-edit'}">department-edit</router-link>

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

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>