<template>
  <div class="list col-3 border p-2">
    <div class="d-flex align-items-center">
      <h3>{{listData.title}}</h3>
      <button class="btn mb-2" @click="deleteList()">
        <i class="fas fa-trash-alt text-danger fa-sm"></i>
      </button>
    </div>
    <ul class="list-unstyled">
      <Task v-for="task in tasks" :taskData="task" :key="task.id" />
    </ul>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Add a task here..."
        v-model="newTask.title"
      />
      <div class="input-group-append">
        <button @click="addTask()">Add</button>
      </div>
    </div>
  </div>
</template>


<script>
import Task from "../components/Task.vue";
export default {
  name: "list",
  props: ["listData"],
  data() {
    return {
      newTask: {}
    };
  },
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listData.id);
  },
  computed: {
    list() {
      return this.$store.state.activeLists.listId;
    },
    board() {
      return this.$store.state.activeBoard;
    },
    tasks() {
      return this.$store.state.tasks[this.listData.id];
    }
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
      this.$store.dispatch("getBoardById", this.board.id);
    },
    addTask() {
      this.newTask.listId = this.listData.id;
      this.newTask.creatorEmail = this.listData.creatorEmail;
      console.log(this.newTask);
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = {};
    },
    triggerEdit() {
      this.$store.commit("setActiveBoard", this.board);
    }
  },
  components: {
    Task
  }
};
</script>


<style scoped>
</style>