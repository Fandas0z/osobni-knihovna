<template>
  <div class="book-form">
    <h2>Přidat knihu</h2>
    <form @submit.prevent="submitBook">
      <div>
        <label for="title">Název knihy:</label>
        <input v-model="title" type="text" required />
      </div>
      <div>
        <label for="author">Autor:</label>
        <input v-model="author" type="text" required />
      </div>
      <button type="submit">Přidat knihu</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "BookForm",
  data() {
    return {
      title: "",
      author: "",
    };
  },
  methods: {
    submitBook() {
      // Vytvoříme objekt knihy
      const newBook = {
        title: this.title,
        author: this.author,
      };

      // Zavoláme akci z Vuex
      this.$store.dispatch("addBook", newBook);

      // Reset formuláře
      this.title = "";
      this.author = "";

      // Přesměrování na seznam knih nebo potvrzení
      alert("Kniha byla úspěšně přidána!");
    },
  },
};
</script>

<style>
.book-form {
  margin-top: 20px;
}
</style>
