<template>
  <div class="comment">
    <li>{{commentData.body}}</li>
    <button @click="deleteComment()">Delete Comment</button>
  </div>
</template>


<script>
export default {
  name: "comment",
  props: ["commentData", "taskData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", {
        comment: this.commentData,
        taskId: this.taskData._id,
        listId: this.taskData.listId
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>