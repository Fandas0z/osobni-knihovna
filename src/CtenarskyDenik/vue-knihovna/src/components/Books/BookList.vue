<template>
  <div class="book-list">
    <h2>Seznam knih</h2>
    <ul>
      <li v-for="(book, index) in books" :key="index">
        <strong>{{ book.title }}</strong> - {{ book.author }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BookList",
  computed: {
    books() {
      // Načtení seznamu knih z Vuex store
      return this.$store.getters.allBooks;
    },
  },
};
</script>

<style>
.book-list {
  margin-top: 20px;
}
</style>
