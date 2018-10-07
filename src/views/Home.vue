<template>
    <body>
    <!-- <DropletsLayout> -->
    <div>
        <v-toolbar
                dense
                color="primary"
                dark
                extended
                extension-height="300"
                flat
        >
            <v-toolbar-title class="mx-auto" slot="extension">
                <span>Welcome to Droplets</span>
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
                                            <v-img
                                                    src=""
                                                    aspect-ratio="2.75"
                                                    height="125px"
                                                    :class="item.color"
                                            ></v-img>

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
                                                <v-btn flat color="primary">Get started</v-btn>
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
const auth = new AuthService();

const {
  login,
  logout,
  authenticated,
  authNotifier,
  getProfile,
  userProfile
} = auth;
import DropletsLayout from "./../layouts/DropletsLayout";
// getProfile();
// console.log(sessionStorage.getItem("userProfile_name"));
// console.log(sessionStorage.getItem("userProfile_picture"));
// console.log(sessionStorage.getItem("userProfile_id"));

export default {
  name: "home",
  data() {
    return {
      links: [
        {
          id: "1",
          title: "Dashboard",
          description:
            "Get a general overview of your finances.                              ",
          color: "orange"
        },
        {
          id: "2",
          title: "Link Account",
          description:
            "Link an existing bank account into Droplets so you can start tracking your money more effectively.",
          color: "teal"
        },
        {
          id: "3",
          title: "Create a new Savings Bucket",
          description:
            "Make a new savings goal that your leftover change can go towards.",
          color: "blue"
        },
        {
          id: "4",
          title: "Insights",
          description:
            "See where you're spending your money, and how much your habits are costing you.",
          color: "purple"
        }
      ]
    };
  },
  methods: {
    getProfile
  },
  components: {
    //   DropletsLayout
  }
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
