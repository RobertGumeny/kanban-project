<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col-8 mr-auto">
        <h1>
          {{board.title}}
          <button @click="deleteBoard()">Delete</button>
        </h1>
        <h3>{{board.description}}</h3>
      </div>
      <div class="col-4 ml-auto">
        <div>from goes heree</div>
      </div>
    </div>
    <div class="row">
      <p>magic makes the rest go here</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  computed: {
    user() {
      return this.$store.user;
    },
    board() {
      return this.$store.state.activeBoard;
    }
  },
  mounted() {
    this.$store.dispatch("getBoardById", this.$route.params.boardId);
    // console.log(this.$store.state.activeBoard);
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.board.id);
      this.$router.push({ name: "boards" });
    }
  },
  props: ["boardId"]
};
</script>
