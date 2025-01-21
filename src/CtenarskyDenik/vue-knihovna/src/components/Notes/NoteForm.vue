<template>
  <div>
    <form @submit.prevent="addNote">
      <input v-model="note" placeholder="Zadejte poznámku" required />
      <button type="submit">Přidat</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['bookId'],
  data() {
    return {
      note: '',
    };
  },
  methods: {
    async addNote() {
      try {
        await this.$store.dispatch('addNote', { bookId: this.bookId, note: this.note });
        this.note = '';
        this.$emit('noteAdded');
      } catch (error) {
        console.error('Chyba při přidávání poznámky:', error);
      }
    },
  },
};
</script>
