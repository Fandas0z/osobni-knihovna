<template>
  <div class="register">
    <h2>Registrace</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">E-mail:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Heslo:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Registrovat se</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      // Přidat logiku registrace
      this.$router.push("/dashboard");
    },
  },
};
</script>
