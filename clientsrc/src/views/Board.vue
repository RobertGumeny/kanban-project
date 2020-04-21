<template>
  <div class="board container-fluid">
    <div class="row justify-content-between">
      <div class="col-10">
        <div class="d-flex">
          <h1>{{board.title}}</h1>
          <button class="m-1" @click="deleteBoard()">Delete</button>
          <button
            class="m-1"
            @click="triggerEdit()"
            data-toggle="modal"
            data-target="#editModal"
          >Edit</button>
        </div>
        <EditModal id="editModal" />

        <h3>{{board.description}}</h3>
      </div>
      <div class="col-2">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Add a list here..."
            v-model="newList.title"
          />
          <div class="input-group-append">
            <button @click="addList()">Add</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
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
