<template>
  <div class="list-target">
    <button class="dropdown-item" type="button" @click="moveTask()">{{targetData.title}}</button>
  </div>
</template>


<script>
export default {
  name: "list-target",
  props: ["targetData", "taskData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    moveTask() {
      // console.log(this.targetData._id);
      this.$store.dispatch("moveTask", {
        oldListId: this.taskData.listId,
        taskId: this.taskData.id,
        newListId: this.targetData.id,
        boardId: this.targetData.boardId
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>