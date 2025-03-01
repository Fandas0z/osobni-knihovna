import { createStore } from "vuex";
import apiClient from "../axios";


const store = createStore({
    state: {
        books: [],
        notes: []
    },
    mutations: {
        SET_BOOKS(state, books) {
            state.books = books;
        },
        ADD_BOOK(state, book) {
            state.books.push(book);
        },
        UPDATE_BOOK(state, updatedBook) {
            const index = state.books.findIndex(book => book.id === updatedBook.id);
            if (index !== -1) {
                state.books.splice(index, 1, updatedBook);
            }
        },

        DELETE_BOOK(state, bookId) {
            state.books = state.books.filter(book => book.id !== bookId);
        },
        SET_NOTES(state, { bookId, notes }) {
            state.notes = state.notes.filter(note => note.bookId !== bookId); // Odstraníme staré poznámky
            state.notes.push(...notes); // Přidáme nové poznámky
        },
        //ADD_NOTE(state, { note }) {
        //   const book = state.books.find(book => book.bookId === note.bookId);
        //    if (book) {
        //        if (!book.notes) {
        //           book.notes = [];
        //        }
        //        book.notes.push(note);
        //   }
        //}
        ADD_NOTE(state, note) {
            state.notes.push(note); // Přidáme novou poznámku do seznamu
        },
        UPDATE_NOTE(state, updatedNote) {
            if (!updatedNote || !updatedNote.bookId) {
                console.error("❌ Chyba: updatedNote je neplatný!", updatedNote);
                return;
            }

            const book = state.books.find(b => b.bookId === updatedNote.bookId);
            if (!book) {
                console.error("❌ Chyba: Kniha s bookId nenalezena!", updatedNote.bookId);
                return;
            }

            const noteIndex = book.notes.findIndex(n => n.noteId === updatedNote.noteId);
            if (noteIndex === -1) {
                console.error("❌ Chyba: Poznámka s noteId nenalezena!", updatedNote.noteId);
                return;
            }

            // Aktualizujeme poznámku v seznamu
            book.notes[noteIndex] = updatedNote;
        },
        DELETE_NOTE(state, { bookId, noteId }) {
            if (!state.notes[bookId]) return;

            state.notes[bookId] = state.notes[bookId].filter(n => n.noteId !== noteId);
        }

    },
    actions: {
    async fetchBooks({ commit }) {
    try {
        const response = await apiClient.get("/Books");
        const books = response.data.map(book => ({
            id: book.bookId, // Přemapování bookId na id
            ...book,
        }));
        commit("SET_BOOKS", books);
    } catch (error) {
        console.error("Chyba při načítání knih:", error);
    }
}
        ,
        async addBook({ commit }, book) {
            try {
                const response = await apiClient.post("/Books", book);
                commit("ADD_BOOK", response.data);
            } catch (error) {
                console.error("Chyba při přidávání knihy:", error);
            }
        },
        async updateBook({ commit, dispatch }, updatedBook) {
            try {
                if (!updatedBook || !updatedBook.bookId) { // Zkontrolujeme správný název pole
                    console.error("❌ Chyba: ID knihy není definováno!", updatedBook);
                    return;
                }

                const response = await apiClient.put(`/Books/${updatedBook.bookId}`, updatedBook); // Používáme bookId
                commit("UPDATE_BOOK", response.data);
                await dispatch("fetchBooks");
                console.log("✅ Kniha s ID ${updatedBook.bookId} byla úspěšně aktualizována.");

            } catch (error) {
                console.error("❌ Chyba při aktualizaci knihy:", error);
            }
        },
        async deleteBook({ commit, dispatch }, bookId) {
            try {

                await apiClient.delete(`/Books/${bookId}`);
                commit("DELETE_BOOK", bookId);
                await dispatch("fetchBooks");
            } catch (error) {
                console.error("❌ Chyba při mazání knihy:", error);
            }
        },
        async fetchNotes({ commit }, bookId) {
            try {
                const response = await apiClient.get(`/Notes/${bookId}`);
                commit("SET_NOTES", { bookId, notes: response.data });
            } catch (error) {
                console.error(`Chyba při načítání poznámek pro knihu ${bookId}:`);
            }
        },
        async addNote({ commit, dispatch }, { bookId, note }) {
            try {
                const response = await apiClient.post("/Notes", {
                    bookId: parseInt(note.bookId),
                    content: note.content.trim()
                });

                commit("ADD_NOTE", { note: response.data });

                // ⬇ Po přidání poznámky hned načíst všechny poznámky pro knihu
                await dispatch("fetchNotes", bookId);

            } catch (error) {
                console.error("Chyba při přidávání poznámky:");
            }
        },
        async updateNote({ dispatch }, { noteId, newContent, bookId }) {
            try {
                await apiClient.put(`/Notes/${noteId}`, { content: newContent });
                await dispatch("fetchNotes", bookId); // 🔄 Refresh poznámek po úpravě
            } catch (error) {
                console.error("Chyba při aktualizaci poznámky:", error);
            }
        },
        async deleteNote({ commit, dispatch }, { noteId, bookId }) {
            try {
                await apiClient.delete(`/Notes/${noteId}`);
                commit("DELETE_NOTE", { bookId, noteId });

                // ⬇ Po odstranění poznámky načteme znovu poznámky pro danou knihu
                await dispatch("fetchNotes", bookId);
                console.log(`🗑️ Poznámka ${noteId} smazána a poznámky pro knihu ${bookId} obnoveny.`);
            } catch (error) {
                console.error("❌ Chyba při mazání poznámky:", error);
            }
        }
    },
    getters: {
        allBooks: (state) => state.books,
        getNotesByBookId: (state) => (bookId) => {
           return state.notes.filter(note => note.bookId === bookId);
        }

    }
});

export default store;


