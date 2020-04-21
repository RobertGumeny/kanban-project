<template>
  <div class="boards container-fluid">
    WELCOME TO THE BOARDS!!!
    <div class="row">
      <div class="col-6 mx-auto">
        <form @submit.prevent="addBoard">
          <input type="text" placeholder="title" v-model="newBoard.title" required />
          <input type="text" placeholder="description" v-model="newBoard.description" />
          <button type="submit">Create Board</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card-deck">
          <boardPreview v-for="board in boards" :boardData="board" :key="board.id">
            <!-- <router-link :to="{name: 'board', params: {boardId: board.id}}">{{board.title}}</router-link> -->
          </boardPreview>
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