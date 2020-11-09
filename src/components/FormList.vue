<template>
  <form class="form">
    <label>
      Element of list:<input
        type="text"
        :placeholder="error"
        v-model="text"
        @input="clearError"
    /></label>
    <button type="button" @click="createElement(id)">ADD</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FormList",
  props: {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      text: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["create"]),

    createElement(parentId) {
      if (!this.text) {
        this.error = "Enter at least one character";
        return;
      }

      const id = this.generateId();

      const element = {
        id: id,
        parentId: parentId,
        name: this.text,
      };

      this.create(element);
      this.clearForm();
    },

    generateId() {
      return Date.now();
    },

    clearForm() {
      this.text = "";
    },

    clearError() {
      if (this.error) {
        this.error = "";
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin-top: 10px;
}

.form input {
  margin: 0 10px;
}
</style>