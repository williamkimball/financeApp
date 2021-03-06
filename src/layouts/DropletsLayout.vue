<template>
    <v-app>
        <v-navigation-drawer
                width="250"
                class="blue-grey darken-4"
                dark
                persistent
                :mini-variant="miniVariant"
                v-model="drawer"
                fixed
                app
        >
            <v-toolbar flat class="transparent" dense>
                <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                    <v-list-tile>
                        <v-list-tile-action v-if="!miniVariant">
                            <v-img :src="require('@/assets/droplet.svg')"/>
                        </v-list-tile-action>
                        <v-list-tile-content v-if="!miniVariant">
                            <v-list-tile-title>
                                <h2 v-text="appName"></h2>
                            </v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click.stop="miniVariant = !miniVariant">
                                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>

            <v-tooltip right :disabled="!miniVariant">
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        <v-list-tile to="/dashboard/home" exact>
                            <v-list-tile-action>
                                <v-icon>home</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title> Home</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <span>Home</span>
            </v-tooltip>
            <v-divider></v-divider>

            <v-list subheader :class="{'list-border-bottom' : miniVariant}">
                <v-subheader>Analytics</v-subheader>
                <template v-for="item in analyticsItems">
                    <v-tooltip right :disabled="!miniVariant">
                        <v-list-tile
                                :key="item.icon"
                                :to="item.link"
                                exact
                                slot="activator"
                        >
                            <v-list-tile-action>
                                <v-icon v-html="item.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span v-text="item.title"></span>
                    </v-tooltip>
                </template>
            </v-list>
            <v-divider></v-divider>

            <v-list subheader>
                <v-subheader>Accounts</v-subheader>
                <template v-for="item in accountItems">
                    <v-tooltip right :disabled="!miniVariant">
                        <v-list-tile
                                :key="item.icon"
                                :to="item.link"
                                exact
                                slot="activator"
                        >
                            <v-list-tile-action>
                                <v-icon v-html="item.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span v-text="item.title"></span>
                    </v-tooltip>
                </template>
            </v-list>
            <!--<v-divider></v-divider>-->
        </v-navigation-drawer>

        <v-toolbar
                app
                flat
                dense
                color="primary"
                dark
        >
            <v-toolbar-side-icon
                    @click.stop="drawer = !drawer"
                    class="hidden-lg-and-up"
                    :class="searching ? 'hidden-xs-only' : ''"
            />
            <v-menu :nudge-width="100" :class="searching ? 'hidden-xs-only' : ''">
                <v-toolbar-title slot="activator" class="pl-2">
                    <span>{{ menuItems[currentMenuItem].title }}</span>
                    <v-icon>arrow_drop_down</v-icon>
                </v-toolbar-title>
                <v-list light>
                    <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link" @click="getMenuItem(item.id)">
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>

            <v-btn icon @click.native.stop="searchBegin">
                <v-icon>search</v-icon>
            </v-btn>
            <div :class="{'searching--closed': !searching}" class="searching">
                <v-text-field
                        id="search"
                        v-model="search"
                        append-icon="close"
                        @click:append="searchEnd"
                        label="Search"
                        hide-details
                        single-line
                        color="white"
                        @blur="onBlur"
                ></v-text-field>
            </div>

            <v-tooltip bottom>
                <v-btn icon @click.stop="rightDrawer = !rightDrawer" slot="activator">
                     <v-badge color="red" overlap>
                         <span slot="badge">{{this.numOfNotifications}}</span>
                        <v-icon>notifications</v-icon> 
                    </v-badge> 
                </v-btn>
                <span>{{this.numOfNotifications}} unread notifications</span>
            </v-tooltip>

            <v-menu>
                <v-btn icon slot="activator">
                    <v-avatar class="white" size="32">
                        <v-icon color="primary">person</v-icon>
                    </v-avatar>
                </v-btn>
                <v-list class="pa-0" light>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <v-avatar class="primary" size="48px">
                                <img :src="this.user.picture">
                            </v-avatar>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{this.user.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{this.title}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile key="profile" @click="">
                        <v-list-tile-action>
                            <v-icon>person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>My Profile</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile key="lock_open" @click="logout()">
                        <v-list-tile-action>
                            <v-icon>lock_open</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>

        <v-content>
            <router-view/>
        </v-content>

        <v-navigation-drawer
                temporary
                :right="right"
                v-model="rightDrawer"
                fixed
                app
        >
            <v-toolbar flat prominent dark class="primary">
                <v-toolbar-title>Notifications</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="rightDrawer = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list subheader dense>
                <v-subheader>All notifications</v-subheader>
                 <template v-for="item in notifications">
               <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                       {{item.text}}
                    </v-list-tile-title>
                </v-list-tile>
                <v-divider></v-divider>
                 <!-- <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        DB overloaded 80%
                    </v-list-tile-title> -->
                <!-- </v-list-tile>? -->
                 </template>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>

<script>
import store from "./../store/index.js";
import AuthService from "./../auth/AuthService.js";
import { mapState, mapGetters, mapActions } from "vuex";
const auth = new AuthService();
const {
  login,
  logout,
  authenticated,
  authNotifier,
  getProfile,
  userProfile
} = auth;

export default {
  name: "DropletsLayout",
  computed: {...mapState(["user"]), ...mapGetters(["user"]), ...mapActions(["addUser"])},
  beforeCreate(){    getProfile();},
  data() {
    return {
      appName: process.env.VUE_APP_APP_NAME,
      drawer: true,
      fixed: false,
      title: "Administrator",
      numOfNotifications: 3,
      notifications: [
        {
          text: "12 new users registered",
          icon: "person_add"
        },
        {
          text: "80% full",
          icon: "data_usage"
        }
      ],
      analyticsItems: [
        {
          icon: "dashboard",
          title: "Dashboard",
          link: "/dashboard/overview"
        },
        {
          icon: "list_alt",
          title: "Budget",
          link: "/dashboard/budget"
        },
        {
          icon: "remove_red_eye",
          title: "Insights",
          link: "/dashboard/insights"
        },
        {
          icon: "restore_from_trash",
          title: "Savings Buckets",
          link: "/dashboard/buckets"
        }
      ],
      accountItems: [
        {
          icon: "account_balance",
          title: "Accounts",
          link: "/dashboard/accounts"
        },
        {
          icon: "account_balance_wallet",
          title: "Link Account",
          link: "/dashboard/link_account"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      tabs: null,
      tabsItems: [
        {
          id: 1,
          title: "Overview",
          link: "overview"
        },
        {
          id: 2,
          title: "Budget",
          link: "budget"
        },
        {
          id: 3,
          title: "Insights",
          link: "insights"
        }
      ],
      menuItems: [
        {
          id: 0,
          title: "Home",
          link: "/dashboard/home"
        },
        {
          id: 1,
          title: "Budget",
          link: "/dashboard/budget"
        },
        {
          id: 2,
          title: "Insights",
          link: "/dashboard/insights"
        },
        {
          id: 4,
          title: "Buckets",
          link: "/dashboard/buckets"
        },
        {
          id: 3,
          title: "Accounts",
          link: "/dashboard/accounts"
        }
      ],
      currentMenuItem: 0,
      searching: false,
      search: ""
    };
  },

  methods: {
    onBlur() {
      this.searching = false;
      this.search = "";
    },

    searchBegin() {
      this.searching = true;
      setTimeout(() => document.querySelector("#search").focus(), 50);
    },
    getMenuItem(id) {
      this.currentMenuItem = id;
    },

    searchEnd() {
      this.searching = false;
      this.search = "";
      document.querySelector("#search").blur();
    },

    login,
    logout,
    getProfile
  }
};
</script>

<style scoped lang="stylus">
@import '../../node_modules/vuetify/src/stylus/settings/_variables.styl';

.bottom-menu {
    position: absolute;
    width: 100%;
    bottom: 0;
}

.searching {
    overflow: hidden;
    width: 208px;
    padding-left: 8px;
    transition: $primary-transition;
}

.searching--closed {
    padding-left: 0;
    width: 0;
}

.searching > * {
    right: 8px;
}

.searching--closed > * {
    display: none;
}

.hidden-searching {
    @media $display-breakpoints.sm-and-down {
        display: none !important;
    }
}

.list-border-bottom {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
