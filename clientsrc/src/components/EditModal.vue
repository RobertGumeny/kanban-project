<template>
  <div class="editModal modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-light">{{title}}</h5>
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
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import EditBoard from "../components/EditBoard.vue";
import EditList from "../components/EditList.vue";
export default {
  name: "editModal",
  props: ["title"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: { EditBoard, EditList }
};
</script>


<style scoped>
#close-btn {
  text-shadow: none;
  color: rgb(255, 56, 56);
}
</style>