<template>
  <div class="home">
    <h1>Vítejte v Knihovničce</h1>
    <p>Přihlaste se nebo se zaregistrujte pro přístup k vaší knihovně.</p>
    <div class="actions">
      <button @click="goToLogin">Přihlásit se</button>
      <button @click="goToRegister">Registrovat se</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    goToLogin() {
      this.$router.push({ name: "Login" });
    },
    goToRegister() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>

<style>
.home {
  text-align: center;
  margin-top: 50px;
}

.actions {
  margin-top: 20px;
}
</style>
