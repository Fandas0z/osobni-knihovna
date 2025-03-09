<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <a href="/" class="navbar-brand">Knihovnička</a>
        <div class="navbar-links">
          <router-link to="/" class="btn btn-secondary">Dashboard</router-link>
        </div>
      </div>
    </nav>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<style>
.navbar {
  background-color: #343a40;
  padding: 10px 0;
}

.navbar-brand {
  color: #fff;
  font-size: 24px;
  text-decoration: none;
}

.navbar-links {
  float: right;
}

.navbar-links .btn {
  margin-left: 10px;
}
</style>
