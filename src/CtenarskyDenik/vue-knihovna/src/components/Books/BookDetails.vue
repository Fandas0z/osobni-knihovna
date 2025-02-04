<template>
  <div class="book-details">
    <h1>{{ book?.title }}</h1>
    <p><strong>Autor:</strong> {{ book?.author }}</p>
    <p><strong>Rok vydání:</strong> {{ book?.year }}</p>

    <h2>Poznámky</h2>
    <note-list :bookId="bookId" :notes="notes" />
    <note-form :bookId="bookId" @noteAdded="fetchNotes" />

  </div>
</template>

<script>
import NoteList from "../Notes/NoteList.vue";
import NoteForm from "../Notes/NoteForm.vue";

export default {
  components: { NoteList, NoteForm },
  data() {
    return {
      bookId: null,
      book: null,
      notes: [],
    };
  },
  computed: {

  },
  async created() {
    this.bookId = this.$route.params.id;
    await this.fetchBook();
    await this.fetchNotes();
  },
  methods: {
    async fetchBook() {
      try {
        const response = await this.$store.dispatch("fetchBooks");
        this.book = response.find((b) => b.id === parseInt(this.bookId));
      } catch (error) {
        console.error("Chyba při načítání knihy:", error);
      }
    },
    async fetchNotes(bookId) {
      try {
        await this.$store.dispatch('fetchNotes', bookId);
      } catch (error) {
        console.error('Chyba při načítání poznámek:', error);
      }
    }


  },
};
</script>

<style>
.book-details {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
