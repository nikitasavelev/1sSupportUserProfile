<template>
  <div>
    <v-btn color="white" dark class="primary--text" @click.stop="dialog = true">
      <v-icon class="mr-3" color="primary">folder</v-icon>Переместить
    </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Выберите папку {{active}} </v-card-title>

        <v-treeview
					:items="items"
					v-model="tree"
					activatable
				></v-treeview>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ChangeDirectory",
  props: {
		items: Array,
  },
  data: () => ({
    dialog: true,
		tree: []
  }),
  methods: {
	}
};
</script>

<style scoped>
</style>
