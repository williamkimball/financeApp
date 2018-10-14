<template>
  <div>
    <div class="d-flex justify-between align-center mb-3">
      <v-btn @click="none">Collapse All</v-btn>
    </div>
  
    <v-expansion-panel v-model="panel" expand dark>
      <v-expansion-panel-content v-for="item in categoryList" :key="item.categoryId">
        <div slot="header">{{item.name}}</div>
        <v-card :key="item.categoryId">
          <v-data-table
            :headers="headers"
            :items="getFilteredList(item)"
            hide-actions
            class="elevation-1"
            :key="item.categoryId"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-right" >{{ props.item.name }}</td>
              <td class="text-xs-right" >${{ props.item.price }}</td>
              <!-- <td class="text-xs-right" :key="budgetItem.categoryId">{{ budgetItem.diff }}</td> -->
            </template>
          </v-data-table>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import store from "./../../store/index.js";
import { mapState, mapGetters, mapActions } from "vuex";
import { userInfo } from "os";
export default {
  computed: {
    ...mapState(["user", "userInfo"]),
    ...mapGetters(["user", "userInfo", "categories"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      {
        text: "Budgeted",
        value: "price"
      },
      {
        text: "Actual",
        value: "actual"
      },
      {
        text: "Difference",
        value: "diff"
      }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    panel: [],
    asd: "",
    categoryList: [],
    budgetItemList: []
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
    this.setCategories();
    this.setBudgetItemList();
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.budgetItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.budgetItems.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.budgetItems.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    setCategories() {
      this.categoryList = this.$store.state.categories;
    },
    setBudgetItemList() {
      this.budgetItemList = this.$store.state.userInfo.budgetItems;
    },
    getFilteredList(item){
      let it = this.budgetItemList.filter(budgetItem => budgetItem.categoryId === item.categoryId);
      return this.budgetItemList.filter(budgetItem => budgetItem.categoryId === item.categoryId);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.budgetItems[this.editedIndex], this.editedItem);
      } else {
        this.budgetItems.push(this.editedItem);
      }
      this.close();
    },
    // Reset the panel
    none() {
      this.panel = [];
    }
  }
};
</script>