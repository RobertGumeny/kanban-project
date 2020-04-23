<template>
  <div class="bg-img">
    <div class="home text-center pt-5 justify-content-center d-flex flex-column">
      <div v-if="$auth.isAuthenticated">
        <h1>Welcome back, {{user.name}}!</h1>
        <h4>Head to your dashboard to get started</h4>
      </div>
      <h1 v-else>Welcome, sign in to get started</h1>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {
      //   splitUserName: firstName,
      //   userFirstName: splitUserName[0]
    };
  },
  computed: {
    user() {
      return this.$auth.user;
    },
    boards() {
      return this.$store.state.boards;
    }
  },
  mounted() {
    this.$store.dispatch("getBoards");
  },
  methods: {
    // firstName() {
    //   this.$auth.user.split(" ");
    // }
  },
  components: {}
};
</script>


<style scoped>
.bg-img {
  background-image: url("https://images.all-free-download.com/images/graphiclarge/waves_geometric_vectors_background_579962.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
.home {
  height: 87vh;
}
h1 {
  color: #343a40;
}
</style>