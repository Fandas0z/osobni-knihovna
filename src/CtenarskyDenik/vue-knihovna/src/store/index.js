import { createStore } from "vuex";

const store = createStore({
    state: {
        books: [], // Pole pro ukládání knih
    },
    mutations: {
        ADD_BOOK(state, book) {
            state.books.push(book); // Přidání knihy do pole
        },
    },
    actions: {
        addBook({ commit }, book) {
            commit("ADD_BOOK", book);
        },
    },
    getters: {
        allBooks: (state) => state.books,
    },
});

export default store;

