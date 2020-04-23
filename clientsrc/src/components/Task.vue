<template>
  <div class="task">
    <li class="card mb-4 p-1">
      <div class="d-flex align-items-center mb-0 task-title">
        <div class="form-check mb-3 mx-0 px-1">
          <label class="contain mb-3">
            <input type="checkbox" checked="checked" v-if="completed" @click="markIncompleteTask()" />

            <input type="checkbox" v-if="!completed" @click="markCompleteTask()" />
            <span class="checkmark"></span>
          </label>
        </div>
        <p class="font-weight-bold ml-0 mt-1">{{taskData.title}}</p>
        <button class="btn ml-auto" @click="deleteTask()">
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
      showComments: false,
      completed: this.taskData.completed
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
    markCompleteTask() {
      this.$store.dispatch("markTaskComplete", this.taskData);
      this.completed = true;
      console.log("markTaskComplete");
    },
    markIncompleteTask() {
      this.$store.dispatch("markTaskIncomplete", this.taskData);
      this.completed = false;
      console.log("markTaskIncomplete");
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
/* Customize the label (the container) */
.contain {
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.contain input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.contain:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.contain input:checked ~ .checkmark {
  background-color: #343a40;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.contain input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.contain .checkmark:after {
  left: 8px;
  top: 4px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>