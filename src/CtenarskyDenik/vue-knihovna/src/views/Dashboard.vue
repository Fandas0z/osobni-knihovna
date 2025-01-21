<template>
  <div>
    <h1>Vaše knihovna</h1>
    <book-list />
  </div>
</template>

<script>
import BookList from '../components/Books/BookList.vue';

export default {
  components: {
    BookList,
  },
};
</script>
