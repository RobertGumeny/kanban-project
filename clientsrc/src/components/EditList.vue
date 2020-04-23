<template>
  <div class="EditList">
    <form>
      <div class="form-group">
        <label for>Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter List title here..."
          v-model="list.title"
        />
      </div>

      <button
        type="submit"
        data-dismiss="modal"
        class="btn btn-sm btn-primary"
        @click="editList()"
      >Submit Changes</button>
    </form>
  </div>
</template>


<script>
export default {
  name: "EditList",
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$store.state.activeList;
    }
  },
  methods: {
    editList() {
      this.$store.dispatch("editList", this.list);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>