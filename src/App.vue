<template>
  <h1>Hello World!</h1>
  <router-link to="/dashboard">Dashboard</router-link>
  <router-link to="/login">login</router-link>

  <div>
    <router-view></router-view>
  </div>

  <div id="app">
    <header>

    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>&copy; 2024 ABR Technology. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: open sans-serif, sans-serif;
  text-align: center;
}


.logo-container {
  text-align: center;
}

.logo {
  width: 150px;
}

h1 {
  margin-top: 1rem;
  font-size: 2rem;
}

h2 {
  font-size: 1.2rem;
  color: #555;
}

footer {
  background-color: #f4f4f4;
  padding: 1rem;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>