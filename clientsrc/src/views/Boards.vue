<template>
  <div class="boards container-fluid bg-style">
    <div class="row">
      <div class="col-sm-8 mx-auto my-4">
        <form @submit.prevent="addBoard">
          <div class="form-row">
            <div class="col-md-5">
              <input
                class="form-control form-control-sm m-1"
                type="text"
                maxlength="50"
                placeholder="Board title..."
                v-model="newBoard.title"
                requiredne
              />
            </div>
            <div class="col-md-5">
              <input
                class="form-control form-control-sm m-1"
                type="text"
                maxlength="100"
                placeholder="Description..."
                v-model="newBoard.description"
              />
            </div>
            <div class="col-md-2 ml-2 ml-md-0">
              <button class="btn btn-sm btn-primary mt-1" type="submit">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card-deck">
          <boardPreview v-for="board in boards" :boardData="board" :key="board.id"></boardPreview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import boardPreview from "../components/BoardPreview.vue";
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    user() {
      return this.$store.user;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  },
  components: { boardPreview }
};
</script>

<style scoped>
.bg-style {
  background-color: #8ec6e1;
}
</style>