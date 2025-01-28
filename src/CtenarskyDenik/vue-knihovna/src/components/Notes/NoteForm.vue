<template>
  <div>
    <h2>Přidat poznámku</h2>
    <textarea v-model="noteContent" placeholder="Napište poznámku"></textarea>
    <button @click="submitNote">Přidat</button>
    <button @click="$emit('close')">Zavřít</button>
  </div>
</template>

<script>
export default {
  props: {
    bookId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      noteContent: '',
    };
  },
  methods: {
    async submitNote() {
      try {
        const note = {
          content: this.noteContent,
        };
        await this.$store.dispatch('addNote', { bookId: this.bookId, note });
        this.noteContent = '';
        alert('Poznámka byla přidána!');
      } catch (error) {
        console.error('Chyba při přidávání poznámky:', error);
      }
    },
  },
};
</script>
