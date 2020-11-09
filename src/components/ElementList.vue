<template>
  <div class="element">
    <div v-if="parentId">
      <div class="element__item">
        <div>{{ name }}</div>
      </div>
      <button v-if="notFirst" type="button" @click="replaceElements(id, 'up')">
        UP
      </button>
      <button v-if="notLast" type="button" @click="replaceElements(id, 'down')">
        DOWN
      </button>
      <button type="button" @click="removeElements(item, false)">REMOVE</button>
      <button
        v-if="children.length || showForm"
        type="button"
        @click="
          removeElements(item, true);
          showForm = false;
        "
      >
        REMOVE SUBLIST
      </button>
      <button v-if="!showForm" type="button" @click="showForm = true">
        ADD SUBLIST
      </button>
    </div>
    <form-list v-if="showForm || !parentId" :id="id" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormList from "./FormList.vue";

export default {
  name: "CustomList",
  components: {
    FormList,
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0,
    },
    parentId: {
      type: [Number, null],
      default: 0,
    },
    name: {
      type: String,
      required: true,
      default: "Element",
    },
    children: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    notFirst: {
      type: Boolean,
      default: false,
      required: true,
    },
    notLast: {
      type: Boolean,
      default: false,
      required: true,
    },
    item: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
    };
  },
  computed: {
    ...mapGetters(["recursiveList", "list"]),
  },
  methods: {
    ...mapActions(["remove", "replace"]),

    removeElements(item, isSubList) {
      const childrenId = [];

      this.findChildren(item.children, childrenId);

      if (!isSubList) {
        childrenId.push(item.id);
      }

      this.remove(childrenId);
      childrenId.length = 0;
    },

    findChildren(children, childrenId) {
      children.forEach((item) => {
        childrenId.push(item.id);

        if (item.children.length) {
          this.findChildren(item.children, childrenId);
        }
      });
    },

    replaceElements(id, direction) {
      const index = this.list.findIndex((item) => item.id === id);

      switch (direction) {
        case "up":
          this.movingUpElement(index, this.list);
          break;
        case "down":
          this.movingDownElement(index, this.list);
          break;
        default:
          break;
      }
    },

    movingUpElement(index, list) {
      for (let i = index - 1; i > -1; i--) {
        if (list[i].parentId === this.parentId) {
          this.replace([index, i]);
          break;
        }
      }
    },

    movingDownElement(index, list) {
      for (let i = index + 1; i < list.length; i++) {
        if (list[i].parentId === this.parentId) {
          this.replace([index, i]);
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.element {
  margin-bottom: 10px;
}

.element button {
  margin-right: 10px;
}

.element__item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>