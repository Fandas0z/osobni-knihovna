<template>
  <div>
    <h1>Seznam knih</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }} ({{ book.author }})
        <button @click="viewDetails(book.id)">Detail</button>
      </li>
    </ul>
    <button @click="addBook">Přidat knihu</button>
  </div>
</template>

<script>
export default {
  computed: {
    books() {
      return this.$store.state.books;
    },
  },
  methods: {
    viewDetails(bookId) {
      this.$router.push(`/books/${bookId}`);
    },
    addBook() {
      this.$router.push('/books/add');
    },
  },
};
</script>
