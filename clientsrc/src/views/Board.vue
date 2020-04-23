<template>
  <div class="board container-fluid bg-style">
    <div class="row pt-4">
      <div class="col-sm-9">
        <div class="d-flex align-items-center">
          <h1>{{board.title}}</h1>

          <button
            class="btn board-edit-button mb-2 mx-3 p-0"
            @click="triggerEdit()"
            data-toggle="modal"
            data-target="#editModal"
          >
            <i class="fas fa-pencil-alt text-warning"></i>
          </button>

          <button class="btn board-delete-button mb-2 p-0" @click="deleteBoard()">
            <i class="fas fa-trash-alt text-danger"></i>
          </button>
        </div>
        <EditModal id="editModal" />

        <h3 class="text-dark pl-3">{{board.description}}</h3>
      </div>
      <div class="col-sm-3">
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
            <button class="btn border-none btn-primary mb-2 add-list-form" @click="addList()">
              <i class="fas fa-plus text-white pb-2"></i>
            </button>
          </div>
        </div>
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
    // console.log(this.$store.state.activeBoard);
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.board.id);
      this.$router.push({ name: "boards" });
    },
    triggerEdit() {
      this.$store.commit("setActiveBoard", this.board);
    },
    addList() {
      this.newList.boardId = this.board.id;
      this.newList.creatorEmail = this.board.creatorEmail;
      console.log(this.newList);
      this.$store.dispatch("addList", this.newList);
      this.newList = {};
    }
  },
  props: ["boardId"],
  components: {
    EditModal,
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
