<template>
  <div>
    <ul>
      <li v-for="note in notes" :key="note.id">
        {{ note.text }}
        <button @click="deleteNote(note.id)">Smazat</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['notes', 'bookId'],
  methods: {
    async deleteNote(noteId) {
      try {
        await this.$store.dispatch('deleteNote', { bookId: this.bookId, noteId });
      } catch (error) {
        console.error('Chyba při mazání poznámky:', error);
      }
    },
  },
};
</script>
