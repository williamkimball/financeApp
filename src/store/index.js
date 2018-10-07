import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { 
        user: {}
    },
    mutations: {
        // Add todo mutation
        addUser: (state, payload) => {

          // Add to existing todos
          state.user = payload;
        }
    },
    getters: {
        user: state => state.user
    }
})
