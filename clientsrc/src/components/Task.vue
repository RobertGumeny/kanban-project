<template>
  <div class="task">
    <li>
      <span>
        <p>{{taskData.title}}</p>
        <button @click="deleteTask()">Delete Task</button>
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
            <button @click="addComment()">+</button>
          </div>
          <div class="move-task">
            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Dropdown</button>
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
        </div>
      </span>
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
      newComment: {}
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
</style>