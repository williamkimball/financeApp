import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { 
        user: {},
        userInfo: {},
        categories: [],
        budgetExists: true,
        accounts: {},
        acctById: {},
        transByCat: {}
    },
    mutations: {
        // Add user mutation
        addUser: (state, payload) => {
          // Add to existing users
          state.user = payload;
        },
        setUser: (state, payload) => {
            state.userInfo = payload
        },
        setCategories: (state, payload) => {
            state.categories = payload
        },
        setAccounts: (state, payload) => {
            state.accounts = payload
        },
        setAccountById: (state, payload) => {
            state.acctById = payload
        },
        setTransByCat: (state, payload) => {
            state.transByCat = payload
        },
        noBudget: (state) => {
            state.budgetExists = false
        }
    },
    getters: {
        user: state => state.user,
        budgetExists: state => state.budgetExists,
        userInfo: state => state.userInfo,
        categories: state => state.categories,
        accounts: state => state.accounts,
        acctById: state => state.acctById,
        transByCat: state => state.transByCat,
    },
    actions: {
        
    }
})
