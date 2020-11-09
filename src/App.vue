<template>
  <div>
    <custom-list :list="recursiveList" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import CustomList from "./components/CustomList.vue";

export default {
  name: "App",
  components: {
    CustomList,
  },

  created() {
    this.listToTree();
  },

  computed: {
    ...mapGetters(["recursiveList"]),
  },

  methods: {
    ...mapMutations(["listToTree"]),
  },
};
</script>

<style>
button:hover {
  cursor: pointer;
}
</style>
