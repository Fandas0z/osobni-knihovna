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
      <div>
        <label for="year">Rok vydání:</label>
        <input v-model="year" type="number" min="1000" max="2100" required />
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
      year: "",
    };
  },
  methods: {
    async submitBook() {
      try {
        const newBook = {
          title: this.title,
          author: this.author,
          year: this.year,
        };
        await this.$store.dispatch("addBook", newBook);
        this.title = "";
        this.author = "";
        this.year = "";
        alert("Kniha byla úspěšně přidána!");
      } catch (error) {
        console.error("Chyba při přidávání knihy:", error);
      }
    },
  },
};
</script>

<style>
.book-form {
  margin-top: 20px;
}
</style>
