import { createStore } from "vuex";
import apiClient from "../axios";
import axios from "axios"; // Import Axios klienta

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
        async updateBook({ commit }, updatedBook) {
            try {
                if (!updatedBook || !updatedBook.bookId) { // Zkontrolujeme správný název pole
                    console.error("❌ Chyba: ID knihy není definováno!", updatedBook);
                    return;
                }

                const response = await apiClient.put(`/Books/${updatedBook.bookId}`, updatedBook); // Používáme bookId
                commit("UPDATE_BOOK", response.data);
                console.log("✅ Kniha s ID ${updatedBook.bookId} byla úspěšně aktualizována.");

            } catch (error) {
                console.error("❌ Chyba při aktualizaci knihy:", error);
            }
        },
        async deleteBook({ commit }, bookId) {
            try {

                await apiClient.delete(`/Books/${bookId}`);
                commit("DELETE_BOOK", bookId);
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
        }
//async addNote({ commit, dispatch }, { note }) {
        //   try {
        //      const response = await apiClient.post("/Notes", {
        //           bookId: parseInt(note.bookId),
        //          content: note.content.trim()
        //       });

        // Po přidání poznámky znovu načteme všechny poznámky
        //       await dispatch("fetchNotes");

        //      commit("ADD_NOTE", { note: response.data });
        //   } catch (error) {
        //      console.error("❌ Chyba při přidávání poznámky:", error);
        //       await dispatch("fetchNotes");
        //   }
//,

    },
    getters: {
        allBooks: (state) => state.books,
        getNotesByBookId: (state) => (bookId) => {
           return state.notes.filter(note => note.bookId === bookId);
        }

    }
});

export default store;


