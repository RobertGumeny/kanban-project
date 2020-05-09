<template>
  <div class="comment table-active border-light border-bottom d-flex align-items-center">
    <img class="avatar pl-1" :src="user.picture" :alt="user.name" />
    <li>
      <p class="pl-1 small mb-0 text-dark">{{commentData.body}}</p>
    </li>
    <button class="btn ml-auto" @click="deletePrompt()">
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
  computed: {
    user() {
      return this.$auth.user;
    }
  },
  methods: {
    deletePrompt() {
      this.$swal
        .fire({
          title: "Are you sure you want to delete this comment?",
          text: "Once it has been deleted, it cannot be recovered.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#b83535",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.deleteComment();
          }
        });
    },
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
.avatar {
  border-radius: 50%;
  height: 2rem;
  border: 1px solid #e1eef4;
}
.border-bottom {
  border: 2px solid #fff;
}
</style>