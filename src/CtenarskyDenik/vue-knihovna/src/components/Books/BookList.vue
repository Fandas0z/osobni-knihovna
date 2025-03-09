<template>
  <div class="book-list">
    <h2>Seznam knih</h2>
    <ul>
      <li v-for="book in books" :key="book.bookId" class="book-item">
        <div v-if="!book.editing">
          <strong>{{ book.title }}</strong> - {{ book.author }} ({{ book.year }})
          <button @click="openEditForm(book)" class="edit">✏️ Upravit</button>
          <button @click="deleteBook(book.bookId)" class="delete">🗑️ Smazat</button>
          <button @click="toggleNoteForm(book.bookId)" class="note">📌 Přidat poznámku</button>
        </div>

        <div v-else class="edit-form">
          <input v-model="book.title" type="text" />
          <input v-model="book.author" type="text" />
          <input v-model="book.year" type="number" />
          <button @click="saveBook(book)">💾 Uložit</button>
          <button @click="cancelEdit(book)">❌ Zrušit</button>
        </div>

        <!-- Formulář pro přidání poznámky -->
        <div v-if="showNoteForm === book.bookId" class="note-form">
          <textarea v-model="newNote" placeholder="Napište poznámku"></textarea>
          <button @click="addNote(book.bookId)">💾 Uložit poznámku</button>
          <button @click="toggleNoteForm(null)">❌ Zrušit</button>
        </div>

        <!-- Seznam poznámek -->
        <ul v-if="getNotes(book.bookId).length" class="note-list">
          <li v-for="note in getNotes(book.bookId)" :key="note.noteId" class="note-item">
            <div v-if="!note.editing">
              <span>📝 {{ note.content }}</span>
              <button @click="toggleEditNote(note)">✏️ Upravit</button>
              <button @click="deleteNote(note.noteId, book.bookId)">🗑️ Smazat</button>
            </div>

            <div v-else>
              <input v-model="note.editingContent" type="text" />
              <button @click="saveNote(note, book.bookId)">💾 Uložit</button>
              <button @click="toggleEditNote(note)">❌ Zrušit</button>
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
      showNoteForm: null,
      newNote: "",
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
      if (!book.bookId) return;
      this.$store.dispatch("updateBook", book).then(() => {
        book.editing = false;
      });
    },
    deleteBook(bookId) {
      if (!bookId) return;
      this.$store.dispatch("deleteBook", bookId);
    },
    cancelEdit(book) {
      book.editing = false;
      this.$store.dispatch("fetchBooks");
    },
    toggleNoteForm(bookId) {
      this.showNoteForm = this.showNoteForm === bookId ? null : bookId;
      this.newNote = "";
    },
    async addNote(bookId) {
      if (!this.newNote.trim()) return;
      try {
        const note = { bookId: bookId, content: this.newNote.trim() };
        await this.$store.dispatch("addNote", { bookId, note });
        await this.$store.dispatch("fetchNotes", bookId);
        this.newNote = "";
        this.showNoteForm = null;
      } catch (error) {
        console.error("Chyba při přidávání poznámky:", error);
      }
    },
    toggleEditNote(note) {
      note.editing = !note.editing;
      note.editingContent = note.content;
    },
    async saveNote(note, bookId) {
      if (!note.editingContent.trim()) return;
      await this.$store.dispatch("updateNote", {
        noteId: note.noteId,
        newContent: note.editingContent,
        bookId: bookId
      });
      note.editing = false;
    },
    async deleteNote(noteId, bookId) {
      try {
        await this.$store.dispatch("deleteNote", { noteId, bookId });
      } catch (error) {
        console.error("Chyba při mazání poznámky:", error);
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchBooks");
    for (const book of this.books) {
      await this.$store.dispatch("fetchNotes", book.bookId);
    }
  }
};
</script>

<style>
/* Stylování knih */
.book-item {
  background-color: #ffffff;
  border-left: 5px solid #007bff;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

/* Stylování poznámek */
.note-item {
  background-color: #f8f9fa;
  border-left: 5px solid #28a745;
  padding: 8px;
  margin: 5px 20px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #555;
}

/* Stylování formulářů */
.edit-form,
.note-form {
  margin-top: 10px;
  padding: 10px;
  background: #f1f1f1;
  border-radius: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Stylování tlačítek */
button {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-left: 5px;
}

button.edit {
  background-color: #ffc107;
  color: #000;
}

button.delete {
  background-color: #dc3545;
  color: white;
}

button.note {
  background-color: #007bff;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style>
