<template>
  <div class="dashboard">
    <h1>Vítejte v Dashboardu</h1>
    <BookForm/>
    <BookList/>
  </div>
</template>

<script>
import BookForm from "../components/Books/BookForm.vue";
import BookList from "../components/Books/BookList.vue";

export default {
  name: "Dashboard",
  components: {
    BookForm,
    BookList,
  },
};
</script>

<style>
.dashboard {
  margin-top: 20px;
}
</style>
