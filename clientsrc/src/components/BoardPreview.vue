<template>
  <div class="board-preview col-sm-4">
    <div class="card my-3">
      <h3 class="text-wrap p-2">{{boardData.title}}</h3>
      <h6 class="text-muted text-wrap p-2">{{boardData.description}}</h6>
      <div class="text-center m-2">
        <button class="btn btn-sm btn-outline-primary" @click="openBoard()">Open</button>
        <button class="btn btn-sm btn-outline-danger" @click="deletePrompt()">Delete</button>
      </div>
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
    deletePrompt() {
      this.$swal
        .fire({
          title: "Are you sure you want to delete this board?",
          text: "Once it has been deleted, it cannot be recovered.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#b83535",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.deleteBoard();
          }
        });
    },
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
.card {
  background-color: rgb(255, 255, 255);
}
</style>