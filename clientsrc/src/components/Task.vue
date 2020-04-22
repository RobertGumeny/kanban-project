<template>
  <div class="task">
    <li class="card mb-4 p-1">
      <div class="d-flex justify-content-between align-items-center mb-0 task-title">
        <h5>{{taskData.title}}</h5>
        <button class="btn" @click="deleteTask()">
          <i class="fas fa-trash-alt text-muted fa-sm mb-3"></i>
        </button>
      </div>

      <div class="move-task">
        <div class="dropdown">
          <button
            class="btn btn-sm btn-outline-primary dropdown-toggle text-muted"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Move Task</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <ListTarget
              v-for="list in lists"
              :key="list.id"
              :targetData="list"
              :taskData="taskData"
            />
          </div>
        </div>
      </div>

      <button class="btn btn-sm" @click="showComments = false" v-if="showComments">
        {{comments.length}} Comments
        <i class="fas fa-arrow-up"></i>
      </button>
      <button class="btn btn-sm" @click="showComments = true" v-if="!showComments">
        {{comments.length}} Comments
        <i class="fas fa-arrow-down"></i>
      </button>

      <div v-if="showComments">
        <ul class="list-unstyled">
          <comment
            v-for="comment in comments"
            :commentData="comment"
            :taskData="taskData"
            :key="comment.id"
          ></comment>
        </ul>

        <div class="input-group">
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Add comment..."
            v-model="newComment.body"
          />
          <div class="input-group-append">
            <button class="btn btn-sm btn-primary" @click="addComment()">
              <i class="fas fa-plus text-white"></i>
            </button>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>


<script>
import ListTarget from "../components/ListTarget.vue";
import comment from "../components/Comment.vue";
export default {
  name: "task",
  props: ["taskData"],
  data() {
    return {
      newComment: {},
      showComments: false
    };
  },
  computed: {
    comments() {
      return this.taskData.comments;
    },
    lists() {
      return this.$store.state.activeLists;
    }
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    },
    addComment() {
      this.newComment.taskId = this.taskData.id;
      this.newComment.listId = this.taskData.listId;
      this.$store.dispatch("createComment", this.newComment);
      this.newComment = {};
    }
  },
  components: { comment, ListTarget }
};
</script>


<style scoped>
.move-task {
  margin-top: -20px;
  padding-top: -20px;
}
.task-title {
  margin-bottom: 0px;
  padding-bottom: 0px;
}
</style>