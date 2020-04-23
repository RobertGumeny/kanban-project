<template>
  <div class="board container-fluid bg-style">
    <div class="row pt-4">
      <div class="col-sm-9">
        <div class="d-flex align-items-center">
          <h1>{{board.title}}</h1>

          <button
            class="btn board-edit-button mb-2 mx-3 p-0"
            @click="triggerEditBoard()"
            data-toggle="modal"
            data-target="#editBoardModal"
          >
            <i class="fas fa-pencil-alt text-warning"></i>
          </button>

          <button class="btn board-delete-button mb-2 p-0" @click="deleteBoard()">
            <i class="fas fa-trash-alt text-danger"></i>
          </button>
        </div>
        <EditModal id="editBoardModal" title="Edit your Board">
          <EditBoard></EditBoard>
        </EditModal>

        <h3 class="text-dark pl-3">{{board.description}}</h3>
      </div>
      <div class="col-sm-3">
        <form action="submit" @submit.prevent="addList()">
          <div class="form-row">
            <div class="col-9">
              <input
                type="text"
                class="form-control add-list-form"
                placeholder="Add a list..."
                v-model="newList.title"
              />
            </div>
            <div class="col-3">
              <button type="submit" class="btn border-none btn-primary mb-2 add-list-form">
                <i class="fas fa-plus text-white pb-2"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-4 mx-lg-1">
      <List v-for="list in lists" :listData="list" :key="list.id" />
    </div>
  </div>
</template>

<script>
import List from "../components/List.vue";
import EditModal from "../components/EditModal.vue";
import EditBoard from "../components/EditBoard.vue";
export default {
  name: "board",
  data() {
    return {
      newList: {}
    };
  },
  computed: {
    user() {
      return this.$store.user;
    },
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.activeLists;
    }
  },
  mounted() {
    this.$store.dispatch("getBoardById", this.$route.params.boardId);
    this.$store.dispatch("getListsByBoardId", this.$route.params.boardId);
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.board.id);
      this.$router.push({ name: "boards" });
    },
    triggerEditBoard() {
      this.$store.commit("setActiveBoard", this.board);
    },
    addList() {
      this.newList.boardId = this.board.id;
      this.newList.creatorEmail = this.board.creatorEmail;
      this.$store.dispatch("addList", this.newList);
      this.newList = {};
    }
  },
  props: ["boardId"],
  components: {
    EditModal,
    EditBoard,
    List
  }
};
</script>

<style scoped>
.bg-style {
  background-color: #8ec6e1;
  height: 100vh;
}
.board-delete-button {
  /* margin-left: -30px; */
}
.add-list-form {
  height: 75%;
}
</style>
