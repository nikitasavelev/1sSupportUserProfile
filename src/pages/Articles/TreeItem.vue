<template>
  <li>
    <div :class="{bold: isFolder}" @click="toggle">
      {{ item.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <router-link to="">
        <tree-item
          style="list-style-type: disc"
          class="item"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
        ></tree-item>
      </router-link>
    </ul>
  </li>
</template>

<script>
export default {
  name: "TreeItem",
  props: {
    item: Object
  },
  data: function() {
    return {
      isOpen: true
    };
  },
  computed: {
    isFolder: function() {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    }
  }
};
</script>

<style scoped>
</style>