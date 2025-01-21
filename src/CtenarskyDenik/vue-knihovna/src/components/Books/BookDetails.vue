<template>
  <div>
    <h1>{{ book.title }}</h1>
    <p><strong>Autor:</strong> {{ book.author }}</p>
    <p><strong>Žánr:</strong> {{ book.genre }}</p>
    <p><strong>Rok vydání:</strong> {{ book.year }}</p>

    <h2>Poznámky</h2>
    <note-list :notes="notes" :bookId="book.id" />
    <note-form :bookId="book.id" @noteAdded="fetchNotes" />

    <button @click="$router.push('/dashboard')">Zpět</button>
  </div>
</template>

<script>
import NoteList from '../Notes/NoteList.vue';
import NoteForm from '../Notes/NoteForm.vue';

export default {
  components: { NoteList, NoteForm },
  data() {
    return {
      book: null,
      notes: [],
    };
  },
  async created() {
    const bookId = this.$route.params.id;
    await this.fetchBook(bookId);
    await this.fetchNotes(bookId);
  },
  methods: {
    async fetchBook(bookId) {
      try {
        const response = await this.$store.dispatch('fetchBooks');
        this.book = response.find((b) => b.id === parseInt(bookId));
      } catch (error) {
        console.error('Chyba při načítání knihy:', error);
      }
    },
    async fetchNotes(bookId) {
      try {
        await this.$store.dispatch('fetchNotes', bookId);
        this.notes = this.$store.state.notes;
      } catch (error) {
        console.error('Chyba při načítání poznámek:', error);
      }
    },
  },
};
</script>
