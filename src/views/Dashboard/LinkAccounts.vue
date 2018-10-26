<template>
    <div>
        <v-toolbar dense color="primary" dark extended extension-height="300" flat>
            <v-toolbar-title class="mx-auto" slot="extension">
                <h2>Add a New Bank Account</h2>
                <!-- <span>Drople</span> -->
            </v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-layout row>
                <v-flex xs12 md8 offset-md2>
                    <v-card flat class="card--flex-toolbar" color="transparent">
                        <v-container fluid grid-list-lg>
                            <v-layout row wrap justify-center="true">
                                <v-flex xs12 sm6 md6 lg4 style="padding:0px;">
                                    <v-hover>
                                        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                                            <v-img src="" aspect-ratio="2.75" height="125px" :class="'teal'"></v-img>
                                            <v-card-title primary-title>
                                                <div>
                                                    <h3 class="headline mb-0">Link Bank Account</h3>
                                                    <div>Using Plaid, you can link your financial information safely and securely to Droplets. Click the button below to get started.</div>
                                                    <plaid-link env="sandbox" publicKey="95104d2d3c88fc884741130acc90b7" clientName="Droplets" product="transactions" v-bind="{ onSuccess }">
                                                        <v-btn large color="primary">Add New Account</v-btn>
                                                    </plaid-link>
                                                </div>
                                            </v-card-title>
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
</template>

<script>
import PlaidLink from "vue-plaid-link";
import AuthService from "./../../auth/AuthService.js";
import store from "./../../store/index.js";
import { mapState, mapGetters, mapActions } from "vuex";
import { userInfo } from "os";
import { apiCalls } from "../../api/ApiHandler.js";
const auth = new AuthService();

const { login, logout, authenticated, authNotifier, getProfile } = auth;
getProfile();
export default {
  computed: {
    ...mapState(["user", "userInfo"]),
    ...mapGetters(["user", "userInfo", "categories"]),
    ...mapActions(["getCategories"])
  },
  components: {
    PlaidLink
  },
  methods: {
    onSuccess(token) {
      console.log(token);
        let user = this.$store.state.userInfo.userId;
        let newAccount = {
            access_Token: token,
            userId: user
        }
        console.log(newAccount)
        fetch("http://localhost:50297/api/Accounts", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(newAccount) // body data type must match "Content-Type" header
        });

    }
  }
};
</script>