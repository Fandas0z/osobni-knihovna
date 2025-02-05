<template>
  <div class="book-list">
    <h2>Seznam knih</h2>
    <ul>
      <li v-for="book in books" :key="book.bookId">
        <div v-if="!book.editing">
          <strong>{{ book.title }}</strong> - {{ book.author }} ({{ book.year }})
          <button @click="openEditForm(book)">Upravit</button>
          <button @click="deleteBook(book.bookId)">Smazat</button>
          <button @click="addNote">Přidat poznámku</button>
        </div>

        <div v-else>
          <input v-model="book.title" type="text" />
          <input v-model="book.author" type="text" />
          <input v-model="book.year" type="number" />
          <button @click="saveBook(book)">Uložit</button>
          <button @click="cancelEdit(book)">Zrušit</button>
        </div>
      </li>
    </ul>


  </div>
</template>

<script>



export default {
  computed: {
    books() {
      return this.$store.getters.allBooks; // Data z Vuex Store
    },
  },
  methods: {
    addNote(){

    },
    openEditForm(book) {
      book.editing = true;
    },
    saveBook(book) {
      console.log("💾 Ukládám knihu:", book);
      if (!book.bookId) { // Zkontrolujte, že je bookId správně nastavené
        console.error("❌ ID knihy není definováno!", book);
        return;
      }
      this.$store.dispatch("updateBook", book).then(() => {
        book.editing = false;
      });
    },
    deleteBook(bookId) {
      console.log("🗑️ Mažu knihu s ID:", bookId);
      if (!bookId) {
        console.error("❌ Chyba: ID knihy není definováno!", bookId);
        return;
      }
      this.$store.dispatch("deleteBook", bookId);
    },
    cancelEdit(book) {
      book.editing = false; // Zruší režim úprav
      this.$store.dispatch("fetchBooks"); // Obnoví knihy z databáze
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchBooks"); // Načte knihy při načtení komponenty
  },
};
</script>
