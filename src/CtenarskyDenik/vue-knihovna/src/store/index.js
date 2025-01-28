import { createStore } from "vuex";

import apiClient from "../axios"; // Import Axios klienta

const store = createStore({
    state: {
        books: [],
        notes: [],
    },
    mutations: {
        SET_BOOKS(state, books) {
            state.books = books;
        },
        ADD_BOOK(state, book) {
            state.books.push(book);
        },
        SET_NOTES(state, notes) {
            state.notes = notes;
        },
        ADD_NOTE(state, note) {
            state.notes.push(note);
        },
    },
    actions: {
        async fetchBooks({ commit }) {
            try {
                const response = await apiClient.get("/books");
                commit("SET_BOOKS", response.data);
            } catch (error) {
                console.error("Chyba při načítání knih:", error);
            }
        },
        async addBook({ commit }, book) {
            try {
                const response = await apiClient.post("/books", book);
                commit("ADD_BOOK", response.data);
            } catch (error) {
                console.error("Chyba při přidávání knihy:", error);
            }
        },
        async fetchNotes({ commit }, bookId) {
            try {
                const response = await apiClient.get(`/notes/${bookId}`);
                commit("SET_NOTES", response.data);
            } catch (error) {
                console.error("Chyba při načítání poznámek:", error);
            }
        },
        async addNote({ commit }, { bookId, note }) {
            try {
                const response = await apiClient.post(`/notes/${bookId}`, note);
                commit("ADD_NOTE", response.data);
            } catch (error) {
                console.error("Chyba při přidávání poznámky:", error);
            }
        },
    },
    getters: {
        allBooks: (state) => state.books,
        allNotes: (state) => state.notes,
    },
});

export default store;

