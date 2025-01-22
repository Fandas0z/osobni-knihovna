<template>
  <div class="login">
    <h2>Přihlášení</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Heslo:</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Přihlásit se</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        // Zde může být Axios volání na backend pro přihlášení
        console.log("Email:", this.email);
        console.log("Password:", this.password);

        // Po úspěšném přihlášení přesměruj na dashboard
        this.$router.push({ name: "Dashboard" });
      } catch (error) {
        console.error("Chyba při přihlášení:", error);
      }
    },
  },
};
</script>

<style>
.login {
  margin-top: 20px;
}
</style>
