<template>
  <div class="editModal modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-light">Edit your Board</h5>
          <button
            type="button"
            class="close"
            id="close-btn"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <EditBoard></EditBoard>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import EditBoard from "../components/EditBoard.vue";
export default {
  name: "editModal",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: { EditBoard }
};
</script>


<style scoped>
#close-btn {
  text-shadow: none;
  color: rgb(255, 56, 56);
}
</style>