<template>
  <div class="book-list">
    <h2>Seznam knih</h2>
    <ul>
      <li v-for="book in books" :key="book.bookId">
        <div v-if="!book.editing">
          <strong>{{ book.title }}</strong> - {{ book.author }} ({{ book.year }})
          <button @click="openEditForm(book)">Upravit</button>
          <button @click="deleteBook(book.bookId)">Smazat</button>
          <button @click="toggleNoteForm(book.bookId)">Přidat poznámku</button>
        </div>

        <div v-else>
          <input v-model="book.title" type="text" />
          <input v-model="book.author" type="text" />
          <input v-model="book.year" type="number" />
          <button @click="saveBook(book)">Uložit</button>
          <button @click="cancelEdit(book)">Zrušit</button>
        </div>

        <!-- Formulář pro přidání poznámky -->
        <div v-if="showNoteForm === book.bookId">
          <textarea v-model="newNote" placeholder="Napište poznámku"></textarea>
          <button @click="addNote(book.bookId)">Uložit poznámku</button>
          <button @click="toggleNoteForm(null)">Zrušit</button>
        </div>

        <!-- Seznam poznámek -->
<!--        <ul v-if="getNotes(book.bookId).length">-->
<!--          <li v-for="(note, index) in getNotes(book.bookId)" :key="index">{{ note.content }}</li>-->
<!--        </ul>-->
        <ul>
          <li v-for="note in getNotes(book.bookId)" :key="note.noteId">
            <div v-if="!note.editing">
              {{ note.content }}
              <button @click="toggleEditNote(note)">Upravit</button>
            </div>

            <div v-else>
              <input v-model="note.editingContent" type="text" />
              <button @click="saveNote(note)">Uložit</button>
              <button @click="toggleEditNote(note)">Zrušit</button>
            </div>
          </li>
        </ul>
      </li>
    </ul>


  </div>
</template>

<script>



export default {
  data() {
    return {
      showNoteForm: null, // ID knihy, ke které se přidává poznámka
      newNote: "", // Obsah poznámky
    };
  },
  computed: {
    books() {
      return this.$store.getters.allBooks;
    },
    getNotes() {
      return (bookId) => this.$store.getters.getNotesByBookId(bookId) || [];
    }
  },
  methods: {
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
    toggleNoteForm(bookId) {
      console.log("Přepínám formulář pro knihu:", bookId);
      this.showNoteForm = this.showNoteForm === bookId ? null : bookId;
      this.newNote = "";
    },
    //async addNote(bookId) {
    //  if (!this.newNote.trim()) {
    //   console.error("❌ Chyba: Poznámka nemůže být prázdná!");
    //   return;
    // }
    // try {
    //   const note = {
    //     bookId: bookId,
    //     content: this.newNote.trim()
    //   };
    //   await this.$store.dispatch("addNote", { note });
    //   console.log("✅ Poznámka byla úspěšně přidána:", note);
    //   this.newNote = "";
    //    this.showNoteForm = null;
    // } catch (error) {
    //   console.error("❌ Chyba při přidávání poznámky:", error);
    // }
    //}
    async addNote(bookId) {
      if (!this.newNote.trim()) {
        console.error("❌ Chyba: Poznámka nemůže být prázdná!");
        return;
      }
      try {
        const note = {
          bookId: bookId,
          content: this.newNote.trim()
        };

        await this.$store.dispatch("addNote", { bookId, note });

        console.log("✅ Poznámka byla úspěšně přidána:", note);

        // ⬇ Po přidání poznámky rovnou načteme aktualizovaný seznam poznámek
        await this.$store.dispatch("fetchNotes", bookId);

        this.newNote = "";
        this.showNoteForm = null;
      } catch (error) {
        console.error("❌ Chyba při přidávání poznámky:", error);
      }
    },
    toggleEditNote(note) {
      note.editing = !note.editing;
      note.editingContent = note.content;
    },
    async saveNote(note) {
      if (!note.editingContent.trim()) return;

      await this.$store.dispatch("updateNote", {
        noteId: note.noteId,
        newContent: note.editingContent
      });

      note.editing = false;
    }
  },

  async mounted() {
    await this.$store.dispatch("fetchBooks"); // Načtení knih
    for (const book of this.books) {
      await this.$store.dispatch("fetchNotes", book.bookId); // Načtení poznámek pro každou knihu
    }
  }
};
</script>
