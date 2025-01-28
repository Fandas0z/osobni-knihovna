<template>
  <div class="book-list">
    <h2>Seznam knih</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <div>
          <strong>{{ book.title }}</strong> - {{ book.author }}
        </div>
        <button @click="openNotesForm(book.id)">Přidat poznámku</button>
      </li>
    </ul>
    <NoteForm v-if="showNoteForm" :bookId="selectedBookId" @close="closeNotesForm" />
  </div>
</template>

<script>
import NoteForm from "../Notes/NoteForm.vue";

export default {
  components: {
    NoteForm,
  },
  data() {
    return {
      showNoteForm: false,
      selectedBookId: null,
    };
  },
  computed: {
    books() {
      return this.$store.getters.allBooks;
    },
  },
  methods: {
    openNotesForm(bookId) {
      this.selectedBookId = bookId;
      this.showNoteForm = true;
    },
    closeNotesForm() {
      this.showNoteForm = false;
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchBooks");
  },
};
</script>
