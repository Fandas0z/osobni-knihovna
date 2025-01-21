<template>
  <div>
    <h1>Přidat/Upravit knihu</h1>
    <form @submit.prevent="saveBook">
      <input v-model="book.title" placeholder="Název knihy" required />
      <input v-model="book.author" placeholder="Autor" required />
      <button type="submit">Uložit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
      },
    };
  },
  methods: {
    async saveBook() {
      try {
        await this.$store.dispatch('addBook', this.book);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Chyba při ukládání knihy:', error);
      }
    },
  },
};
</script>
