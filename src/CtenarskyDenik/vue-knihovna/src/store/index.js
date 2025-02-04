import { createStore } from "vuex";
import apiClient from "../axios"; // Import Axios klienta

const store = createStore({
    state: {
        books: [],
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
        }


    },
    actions: {
        //async fetchBooks({ commit }) {
        //    try {
        //       const response = await apiClient.get("/Books");
        //        commit("SET_BOOKS", response.data);
        //   } catch (error) {
        //        console.error("Chyba při načítání knih:", error);
        //    }
        //}
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

                const response = await apiClient.put('/Books/${updatedBook.bookId}', updatedBook); // Používáme bookId
                commit("UPDATE_BOOK", response.data);
                console.log("✅ Kniha s ID ${updatedBook.bookId} byla úspěšně aktualizována.");
            } catch (error) {
                console.error("❌ Chyba při aktualizaci knihy:", error);
            }
        },
        async deleteBook({ commit }, bookId) {
            try {
                await apiClient.delete('/Books/${bookId}');
                commit("DELETE_BOOK", bookId);
            } catch (error) {
                console.error("❌ Chyba při mazání knihy:", error);
            }
        }
    },
    getters: {
        allBooks: (state) => state.books,
    }
});

export default store;


