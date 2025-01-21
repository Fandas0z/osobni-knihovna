<template>
  <div class="auth-form">
    <h1>Registrace</h1>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Heslo" required />
      <button type="submit">Registrovat</button>
    </form>
  </div>
</template>

<script>
import apiClient from '../../axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        await apiClient.post('/auth/register', {
          email: this.email,
          password: this.password,
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Chyba při registraci:', error);
      }
    },
  },
};
</script>
