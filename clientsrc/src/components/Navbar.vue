<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" :to="{ name: 'home' }">Kanban</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'home' }">
          <router-link :to="{ name: 'home' }" class="nav-link">
            <i class="fas fa-home"></i> Home
          </router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'boards' }"
        >
          <router-link class="nav-link" :to="{ name: 'boards' }">
            <i class="fab fa-trello"></i> Dashboard
          </router-link>
        </li>
      </ul>

      <div class="navbar-nav ml-auto">
        <button class="btn btn-outline-secondary" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <div class="nav-item btn-group" v-else>
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img class="avatar" :src="user.picture" :alt="user.name" />
          </a>

          <div class="dropdown-menu dropdown-menu-right">
            <router-link class="dropdown-item" :to="{ name: 'boards' }">Dashboard</router-link>
            <button class="dropdown-item text-danger" @click="logout" type="button">Logout</button>
          </div>
        </div>
      </div>

      <!-- <span class="navbar-text">
        <button class="btn btn-success" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>-->
    </div>
  </nav>
</template>


<script>
import axios from "axios";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true
});
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    },
    checkUser() {
      console.log(this.user);
    }
  },
  computed: {
    user() {
      return this.$auth.user;
    }
  }
};
</script>

<style>
.avatar {
  border-radius: 50%;
  height: 3rem;
  border: 1px solid #e1eef4;
}
</style>
