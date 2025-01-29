import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import "./style.css"; // Import globálních stylů

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
