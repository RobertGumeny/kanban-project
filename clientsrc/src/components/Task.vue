<template>
  <div class="task">
    <li>
      <span>
        <p>{{taskData.title}}</p>
        <button @click="deleteTask()">Delete Task</button>
      </span>
    </li>
  </div>
</template>


<script>
export default {
  name: "task",
  props: ["taskData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>