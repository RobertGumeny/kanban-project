import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./router"; // this.$router
import store from "./store"; // this.$store
import { Auth0Plugin } from "@bcwdev/auth0-vue"; //$ this.$auth
import { domain, clientId, audience } from "./authConfig";
import VueSweetalert2 from 'vue-sweetalert2'; // this.$swal
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  }
}).$mount("#app");
