<template>
  <div class="auth-form">
    <h1>Přihlášení</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Heslo" required />
      <button type="submit">Přihlásit se</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Chyba při přihlášení:', error);
      }
    },
  },
};
</script>
