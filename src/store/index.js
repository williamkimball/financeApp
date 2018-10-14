import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { 
        user: {},
        budgetExists: true
    },
    mutations: {
        // Add user mutation
        addUser: (state, payload) => {
          // Add to existing users
          state.user = payload;
        },
        noBudget: (state) => {
            state.budgetExists = false
        }
    },
    getters: {
        user: state => state.user,
        budgetExists: state => state.budgetExists
    },
    actions: {
        
    }
})
