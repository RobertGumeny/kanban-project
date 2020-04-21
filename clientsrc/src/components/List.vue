<template>
  <div class="list col-3">
    <h3>{{listData.title}}</h3>
    <button @click="deleteList()">Delete</button>
  </div>
</template>


<script>
export default {
  name: "list",
  props: ["listData"],
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$store.state.activeLists.listId;
    },
    board() {
      return this.$store.state.activeBoard;
    }
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
      this.$store.dispatch("getBoardById", this.board.id);
    },
    triggerEdit() {
      this.$store.commit("setActiveBoard", this.board);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>