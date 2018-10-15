<template>
  <div>
    <div class="d-flex  mb-3" >
      <v-btn v-if="this.panel.length !== 0" center xs12 sm4 color="primary" @click="none">Collapse All</v-btn>
    </div>
  
    <v-expansion-panel v-model="panel" expand>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <p>Enter the name and amount of your budget item.</p>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Title"></v-text-field>
                </v-flex>
                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.price" label="Amount"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-expansion-panel-content v-for="item in categoryList" :key="item.categoryId">
        <v-toolbar flat color="white">
      <v-toolbar-title>{{item.name}}</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
        <v-btn  color="primary" dark class="mb-2" @click="dialog = true, selectedCat = item.categoryId">New Budget Item</v-btn>
    </v-toolbar>
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
              <td  >{{ props.item.name }}</td>
              <td  >${{ props.item.price }}</td>
              <td  >$100</td>
              <td  >-$100</td>
              <!-- <td class="text-xs-right" :key="budgetItem.categoryId">{{ budgetItem.diff }}</td> -->
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItem(props.item)"
                        >
                          edit
                        </v-icon>
                        <v-icon
                          small
                          @click="deleteItem(props.item)"
                        >
                          delete
                        </v-icon>

            </template>
             <template slot="footer">
              <td><strong>Totals</strong></td>
              <td>${{getFilteredTotal(item, item.name)}}</td>
              <td>asdf</td> 
              <td>asdf</td>
                    <v-spacer></v-spacer> 
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
import { apiCalls } from "../../api/ApiHandler.js";
export default {
  computed: {
    ...mapState(["user", "userInfo"]),
    ...mapGetters(["user", "userInfo", "categories"]),
    ...mapActions(["getCategories"]),
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
      },
      { text: "Actions", value: "name", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      categoryId: 0,
      name: "",
      price: 0,
      userId: 0
    },
    defaultItem: {
      categoryId: 0,
      name: "",
      price: 0,
      userId: 0
    },
    panel: [],
    asd: "",
    categoryList: [],
    budgetItemList: [],
    selectedCat: 0
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  beforeMount() {
    fetch("http://localhost:50297/api/Categories")
      .then(response => response.json())
      .then(categories => {
        return categories;
      })
      .then(categories => {
        store.commit("setCategories", categories);
      })
      .then(data => {
        this.setCategories();
      });
  },
  created() {
    this.setCategories();
    this.initialize();
    this.setBudgetItemList();
  },

  methods: {
    initialize() {},

    editItem(item) {
      console.log(item);
      this.editedIndex = this.budgetItemList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const itemId = item.budgetItemId;

      confirm("Are you sure you want to delete this item?") &&
        axios.delete(`http://localhost:50297/api/BudgetItems/${itemId}`);
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
    getFilteredList(item) {
      let it = this.budgetItemList.filter(
        budgetItem => budgetItem.categoryId === item.categoryId
      );
      return this.budgetItemList.filter(
        budgetItem => budgetItem.categoryId === item.categoryId
      );
    },
    getFilteredTotal(item, row) {
      let it = this.budgetItemList.filter(
        budgetItem => budgetItem.categoryId === item.categoryId
      );
      let total = 0;
      it.forEach(element => {
        total += element.price
      });
      console.log(row, total)
      return total
      ;
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.budgetItemList[this.editedIndex], this.editedItem);
        axios.put(
          `http://localhost:50297/api/BudgetItems/${
            this.editedItem.budgetItemId
          }`,
          this.editedItem
        );
      } else {
        console.log(this.selectedCat);
        this.editedItem.categoryId = this.selectedCat;
        this.editedItem.userId = this.$store.state.userInfo.userId;
        this.editedItem.price = parseInt(this.editedItem.price);
        console.log(this.editedItem);
        this.budgetItemList.push(this.editedItem);
        fetch("http://localhost:50297/api/BudgetItems", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(this.editedItem) // body data type must match "Content-Type" header
        });
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