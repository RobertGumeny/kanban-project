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
      console.log(this.targetData, this.taskData);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>