<template>
  <div class="comment border d-flex justify-content-between align-items-center">
    <li class="pl-3">{{commentData.body}}</li>
    <button class="btn" @click="deleteComment()">
      <i class="fas fa-trash-alt text-muted fa-sm"></i>
    </button>
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