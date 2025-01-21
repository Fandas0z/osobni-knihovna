import { createStore } from 'vuex';
import apiClient from '../axios';

const store = createStore({
    state: {
        user: null,
        books: [],
        notes: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setBooks(state, books) {
            state.books = books;
        },
        setNotes(state, notes) {
            state.notes = notes;
        },
    },
    actions: {
        async fetchBooks({ commit }) {
            try {
                const response = await apiClient.get('/books');
                commit('setBooks', response.data);
            } catch (error) {
                console.error('Chyba při získávání knih:', error);
            }
        },
        async addBook({ dispatch }, book) {
            try {
                await apiClient.post('/books', book);
                dispatch('fetchBooks');
            } catch (error) {
                console.error('Chyba při přidávání knihy:', error);
            }
        },
        async fetchNotes({ commit }, bookId) {
            try {
                const response = await apiClient.get(`/notes?bookId=${bookId}`);
                commit('setNotes', response.data);
            } catch (error) {
                console.error('Chyba při získávání poznámek:', error);
            }
        },
        async addNote({ dispatch }, { bookId, note }) {
            try {
                await apiClient.post('/notes', { bookId, text: note });
                dispatch('fetchNotes', bookId);
            } catch (error) {
                console.error('Chyba při přidávání poznámky:', error);
            }
        },
    },
});

export default store;
