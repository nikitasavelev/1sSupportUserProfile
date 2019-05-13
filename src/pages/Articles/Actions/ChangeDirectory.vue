<template>
  <div>
    <v-btn color="white" dark class="primary--text" @click.stop="changeDirectory">
      <v-icon class="mr-3" color="primary">folder</v-icon>Переместить
    </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title class="headline" color="white">Выберите папку</v-card-title>
        <v-treeview
          :items="items"
					:active.sync="active"
          v-model="tree"
          activatable
          active-class="grey lighten-3 primary--text"
          expand-icon="expand_more"
          transition
          class="mx-3"
        >
          <template v-slot:prepend="{ item }">
            <v-icon class="pa-2">{{ item.icon }}</v-icon>
          </template>
          <template v-slot:label="{ item }">{{ item.name }}</template>
        </v-treeview>
        <v-btn color="red" flat="flat" class="ma-3" @click="reset">Отменить</v-btn>

        <v-btn color="primary" flat="flat" @click="confirmChangeDirectory">Сохранить</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="error" max-width="800">
      <v-card>
        <v-card-title class="headline" color="white">Нельзя переместить папку в саму себя</v-card-title>
        <v-btn color="primary" flat="flat" @click="error=false">Ок</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ChangeDirectory",
  props: {
    items: Array,
    folderId: Number,
    parentId: Number
  },
  data: () => ({
    dialog: false,
    tree: [],
    active: [],
    open: [],
    error: false
  }),
  methods: {
    changeDirectory() {
      this.dialog = true;
      this.active.push(this.parentId);
    },
    reset() {
      this.dialog = false;
    },
    async confirmChangeDirectory() {
			if (this.active[0] !== this.folderId) {
				this.$emit("changeDirectory", {
					parentId: this.active[0]
        });
        this.reset();
      } else this.error = true;
    }
  }
};
</script>

<style scoped>
</style>
