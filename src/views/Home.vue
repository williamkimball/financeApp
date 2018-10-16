<template>
    <body>
        <!-- <DropletsLayout> -->
        <div>
            <v-toolbar dense color="primary" dark extended extension-height="300" flat>
                <v-toolbar-title class="mx-auto" slot="extension">
                    <span>Welcome to Droplets, {{this.user.given_name}} </span>
                    <h2>Everything starts here.</h2>
                    <!-- <v-layout row>
                                <v-flex wrap>
                                    <v-btn outline large fab color="white" class="outine-2">
                                        <i class="fab fa-vuejs fa-3x"></i>
                                    </v-btn>
                                </v-flex>
                                <v-flex wrap>
                                    <v-btn outline large fab color="white" class="outine-2">
                                        <i class="fab fa-node fa-3x"></i>
                                    </v-btn>
                                </v-flex>
                                <v-flex wrap>
                                    <v-btn outline large fab color="white" class="outine-2">
                                        <i class="fab fa-laravel fa-2x"></i>
                                    </v-btn>
                                </v-flex>
                            </v-layout> -->
                    <v-dialog v-model="this.dialogNote" width="500">

                        <v-card v-if="this.budgetExists === false">
                            <v-card-title class="headline grey " primary-title>
                                Budget Setup
                            </v-card-title>
    
                            <v-card-text>
                                It looks like this is either your first time logging onto Droplets or you haven't set up a budget yet. Click the button below to start setting up your budget.
                            </v-card-text>
    
                            <v-divider></v-divider>
    
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" flat @click=" this.toggleDialogNote">
                                    Let's go!
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar-title>
            </v-toolbar>
    
            <v-container>
                <v-layout row>
                    <v-flex xs12 md8 offset-md2>
                        <v-card flat class="card--flex-toolbar" color="transparent">
                            <v-container fluid grid-list-lg>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <h2 class="white--text">Discover Droplets</h2>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 md6 lg4 v-for="item in links" :key="item.id">
                                        <v-hover>
                                            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                                                <v-img src="" aspect-ratio="2.75" height="125px" :class="item.color"></v-img>
    
                                                <v-card-title primary-title>
                                                    <div>
                                                        <h3 class="headline mb-0">{{item.title}}</h3>
                                                        <div>
                                                            {{item.description}}
                                                        </div>
                                                    </div>
                                                </v-card-title>
    
                                                <v-card-actions>
                                                    <!-- <v-btn flat color="primary" class="learn-more-btn">
                                                                Learn more
                                                            </v-btn> -->
                                                    <!-- <v-spacer></v-spacer> -->
                                                    <v-btn flat color="primary" :to="item.link">Get started</v-btn>
    
                                                </v-card-actions>
                                            </v-card>
                                        </v-hover>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    
        <!-- </DropletsLayout> -->
    </body>
</template>

<script>
import AuthService from "./../auth/AuthService.js";
import store from "./../store/index.js";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import DropletsLayout from "./../layouts/DropletsLayout";
import { apiCalls } from "./../api/ApiHandler";

import router from "./../router";
import plaidData from "./../api/plaid"

const auth = new AuthService();

const { login, logout, authenticated, authNotifier, getProfile } = auth;

// getProfile();

export default {
  name: "home",
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["categories"])
  },
  beforeCreate() {
    getProfile();
  },
  created() {
    // console.log("pd:", plaidData.data)
    apiCalls.getTransactions().then(function(myJson) {
      store.commit('setAccounts', myJson.accounts)
    });
    
  },
  updated() {
    fetch("http://localhost:50297/api/Users")
      .then(response => response.json())
      .then(data => {
        this.users = data;
        return data;
      })
      .then(data => {
        let sub = this.$store.state.user.sub;
        if (this.updated === false) {
          sub = sub.substring(sub.indexOf("|") + 1);
          this.users.forEach(user => {
            // console.log(user)
            if (user.idString === sub) {
              this.userExists = true;
              this.currentUser = user;
              store.commit("setUser", user);
              // sessionStorage.setItem('userId', user.userId)
            }
          });
          if (!this.currentUser) {
            console.log("no such user exists");
            this.userExists = false;
          } 
          if (this.currentUser && this.currentUser.budgetItems.length !== 0) {
            this.budgetExists = true;
          } else {
            this.budgetExists = false;
          }

          if (this.userExists === false) {
            console.log("First time loging in.");
            store.commit("noBudget");
            const newUser = {
              firstName: this.user.given_name,
              idString: sub
            };
            fetch(`http://localhost:50297/api/Users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify(newUser)
            }).then(ex => {
              this.dialogNote = true;
            });
            this.dialogNote = true;
          }
          if (this.userExists === false || this.budgetExists === false) {
            this.dialogNote = true;
          }
          this.updated = true;
        }
      })
      .then(data => {
        fetch("http://localhost:50297/api/Categories")
          .then(response => response.json())
          .then(categories => {
            return categories;
          })
          .then(categories => {
            store.commit("setCategories", categories);
          });
      });
  },
  data() {
    return {
      links: [
        {
          id: "1",
          title: "Dashboard",
          description:
            "Get a general overview of your finances.                              ",
          color: "orange",
          link: "/dashboard/overview"
        },
        {
          id: "2",
          title: "Link Account",
          description:
            "Link an existing bank account into Droplets so you can start tracking your money more effectively.",
          color: "teal",
          link: "/dashboard/link_account"
        },
        {
          id: "3",
          title: "Create a new Savings Bucket",
          description:
            "Make a new savings goal that your leftover change can go towards.",
          color: "blue",
          link: "/dashboard/buckets"
        },
        {
          id: "4",
          title: "Insights",
          description:
            "See where you're spending your money, and how much your habits are costing you.",
          color: "purple",
          link: "/dashboard/insights"
        }
      ],
      users: [],
      userExists: false,
      updated: false,
      budgetExists: true,
      dialogNote: false
    };
  },
  methods: {
    getProfile,
    toggleDialogNote() {
      this.dialogNote = false;
      router.replace("/dashboard/newBudget");
    }
  },
  components: {},
  mixins: [apiCalls]
};
</script>


<style scoped>
.outine-2 {
  border: 2px solid white;
}

.card--flex-toolbar {
  margin-top: -124px;
}

.learn-more-btn {
  text-transform: initial;
  text-decoration: underline;
}
</style>
