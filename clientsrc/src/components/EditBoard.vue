<template>
  <div class="EditBoard">
    <div class="form-group">
      <label for>Title</label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter Board title here..."
        v-model="board.title"
      />
    </div>
    <div class="form-group">
      <label for>Description</label>
      <input
        class="form-control"
        type="text"
        placeholder="Enter description here..."
        v-model="board.description"
      />
    </div>
    <button data-dismiss="modal" @click="editBoard()">Submit Changes</button>
  </div>
</template>


<script>
export default {
  name: "EditBoard",
  data() {
    return {};
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    }
  },
  methods: {
    editBoard() {
      this.$store.dispatch("editBoard", this.board);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>