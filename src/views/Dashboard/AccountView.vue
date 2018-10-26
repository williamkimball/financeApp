<template>
    <div>
        <v-toolbar dense color="primary" dark extended extension-height="300" flat>
            <v-toolbar-title class="mx-auto" slot="extension">
                <h2>Account View</h2>
                <!-- <span>Drople</span> -->
                <h4></h4>
            </v-toolbar-title>
        </v-toolbar>
        <v-container>
         <v-data-table
    :headers="headers"
    :items="transactions"
    :rows-per-page="20" :rows-per-page-items="[25, 50, 100]"
    :pagination.sync="pagination"
    class="elevation-1"
  >
    <template slot="items" itemsLength: 25 slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.date }}</td>
      <td>{{ props.item.amount }}</td>
      <td>{{ props.item.category[0] }}</td>
    </template>
    <template slot="footer">
      <td colspan="100%">
        <strong>This is an extra footer</strong>
      </td>
    </template>
  </v-data-table>
        </v-container>
    
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user", "userInfo", "acctById"]),
    ...mapGetters(["user", "userInfo", "categories", "accounts", "acctById"]),
    ...mapActions(["getCategories"])
  },
  created() {
    let acct = this.$store.state.acctById;
    let acctNum = this.$route.query.q;

    for (let value of acct) {
      if (value[0] === acctNum) {
        this.transactions = value[1];
      }
    }
  },
  data() {
    return {
      pagination: {
        'sortBy': "date",
        'descending': true
      },
      headers: [
        {
          text: "Transaction",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Transaction Date", value: "date" },
        { text: "Amount", value: "amount" },
        { text: "Category", value: "category" }
      ],
      debits: [],
      credits: []
    };
  }
};
</script>
