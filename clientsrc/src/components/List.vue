<template>
  <div class="list col-md-3 bg-dark mt-3 mx-2 p-2">
    <div class="d-flex justify-content-between align-items-center mr-1">
      <h3 class="text-light">{{listData.title}}</h3>
      <div>
        <button
          class="btn board-edit-button mb-2 mr-3 p-0"
          @click="triggerEditList()"
          data-toggle="modal"
          data-target="#editListModal"
        >
          <i class="fas fa-pencil-alt text-warning"></i>
        </button>
        <button class="btn mb-2 p-0" @click="deleteList()">
          <i class="fas fa-trash-alt text-danger fa-sm"></i>
        </button>
      </div>
    </div>

    <EditModal id="editListModal" title="Edit your List">
      <EditList></EditList>
    </EditModal>

    <ul class="list-unstyled">
      <Task v-for="task in tasks" :taskData="task" :key="task.id" />
    </ul>

    <form action="submit" @submit.prevent="addTask()">
      <div class="form-row">
        <div class="col-9">
          <input
            type="text"
            class="form-control form-control-sm add-task-form"
            placeholder="Add a task here..."
            v-model="newTask.title"
          />
        </div>
        <div class="col-3">
          <button class="btn btn-sm btn-secondary add-task-form mb-2" type="submit">
            <i class="fas fa-plus text-primary pb-2"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import Task from "../components/Task.vue";
import EditList from "../components/EditList.vue";
import EditModal from "../components/EditModal.vue";
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
    triggerEditList() {
      this.$store.commit("setActiveList", this.listData);
    }
  },
  components: {
    EditList,
    EditModal,
    Task
  }
};
</script>


<style scoped>
.add-task-form {
  height: 75%;
}
</style>