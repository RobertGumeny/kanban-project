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
            :taskId="taskData.id"
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
        </div>
      </span>
    </li>
  </div>
</template>


<script>
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
  components: { comment }
};
</script>


<style scoped>
</style>