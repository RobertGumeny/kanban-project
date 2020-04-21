<template>
  <div class="board-preview">
    <div class="card">
      <h3>{{boardData.title}}</h3>
      <h4>{{boardData.description}}</h4>
      <button @click="openBoard()">Open</button>
      <button @click="deleteBoard()">Delete</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "board-preview",
  props: ["boardData"],

  data() {
    return {};
  },
  computed: {
    boards() {
      return this.$store.boards;
    },
    user() {
      return this.$store.user;
    }
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.boardData.id);
    },
    openBoard() {
      this.$store.commit("setActiveBoard", {});
      this.$router.push({
        name: "board",
        params: { boardId: this.boardData.id }
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>