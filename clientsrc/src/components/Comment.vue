<template>
  <div class="comment">
    <li>{{commentData.body}}</li>
    <button @click="deleteComment()">Delete Comment</button>
  </div>
</template>


<script>
export default {
  name: "comment",
  props: ["commentData", "taskId"],
  data() {
    return {};
  },
  computed: {
    // activeTask() {
    //   return;
    // }
  },
  methods: {
    deleteComment() {
      // console.log(this.commentData, this.taskId);
      this.$store.dispatch("deleteComment", {
        comment: this.commentData,
        taskId: this.taskId
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>