import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [
      {
        parentId: null,
        id: 1,
        name: "root"
      }
    ],
    recursiveList: []
  },
  getters: {
    recursiveList: (state) => {
      return state.recursiveList;
    },
    list: (state) => {
      return state.list;
    }
  },
  mutations: {
    listToTree: (state) => {
      state.recursiveList = [];
      const map = {};

      state.list.forEach((item, index) => {
        map[item.id] = index;
        item.children = [];
      });

      state.list.forEach((item, index, array) => {
        if (item.parentId !== null) {
          array[map[item.parentId]].children.push(item);
        } else {
          state.recursiveList.push(item);
        }
      });
    },
    createElement: (state, element) => {
      state.list.push(element);
    },
    removeElements: (state, elementsId) => {
      elementsId.forEach((id) => {
        const index = state.list.findIndex((item) => {
          return id === item.id;
        });

        state.list.splice(index, 1);
      });
    },
    replaceElements: (state, elementsToReplace) => {
      const [index, targetIndex] = elementsToReplace;

      [state.list[index], state.list[targetIndex]] = [
        state.list[targetIndex],
        state.list[index]
      ];
    }
  },
  actions: {
    create: (context, element) => {
      context.commit("createElement", element);
      context.commit("listToTree");
    },
    remove: (context, elements) => {
      context.commit("removeElements", elements);
      context.commit("listToTree");
    },
    replace: (context, elementsToReplace) => {
      context.commit("replaceElements", elementsToReplace);
      context.commit("listToTree");
    }
  },
  modules: {}
});
