<template>
    <v-card color="white">
        <v-toolbar dense color="primary" dark extended extension-height="300" flat>
            <v-toolbar-title class="mx-auto" slot="extension">
                <h2>Accounts</h2>
                <!-- <span>Drople</span> -->
            </v-toolbar-title>
        </v-toolbar>
<!-- <v-container> -->
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
                                    <v-flex xs12 sm6 md6 lg4 v-for="item in this.$store.state.accounts.accounts" :key="item.account_id">
                                        <v-hover>
                                            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                                                <!-- <v-img src="" aspect-ratio="2.75" height="125px" :class="dark"></v-img>-->
                                                <v-card-title primary-title>
                                                    <div>
                                                        <h3 class="headline mb-0">{{item.name}}</h3>
                                                        <div>
                                                            Current Balance: {{item.balances.current}}
                                                        </div>
                                                    </div>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <!-- <v-btn flat color="primary" class="learn-more-btn">
                                                                Learn more
                                                            </v-btn> -->
                                                    <!-- <v-spacer></v-spacer> -->
                                                    <v-btn flat color="primary" :to='`/dashboard/accountView/?q=${item.account_id}`'>See More</v-btn>
    
                                                </v-card-actions>
                                            </v-card>
                                        </v-hover>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            <!-- </v-container> -->
    </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user", "userInfo"]),
    ...mapGetters(["user", "userInfo", "categories", "accounts"]),
    ...mapActions(["getCategories"])
  }
};
</script>