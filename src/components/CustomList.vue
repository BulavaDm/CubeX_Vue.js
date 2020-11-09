<template>
  <div>
    <ul v-for="(item, index) in list" :key="item.id">
      <li>
        <element-list
          :id="item.id"
          :parent-id="item.parentId"
          :name="item.name"
          :children="item.children"
          :not-first="!!index"
          :not-last="list.length > 1 && index !== list.length - 1"
          :item="item"
        />
        <custom-list :list="item.children" />
      </li>
    </ul>
  </div>
</template>

<script>
import CustomList from "./CustomList.vue";
import ElementList from "./ElementList.vue";

export default {
  name: "CustomList",
  components: {
    CustomList,
    ElementList,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
  },
};
</script>