<template>
<!-- import { parse } from 'querystring'; -->
    <v-container>
    
        <v-layout row>
    
            <v-flex xs12 md8 offset-md2>
    
                <v-card color="white">
    
                    <v-stepper v-model="e1">
                         <v-alert
                        :value="alert"
                        type="success"
                        transition="scale-transition"
                        >
                        Budget Item Added Successfully
                        </v-alert>
                         <v-alert
                        :value="badAlert"
                        type="error"
                        transition="scale-transition"
                        >
                        All Fields Must be Completed
                        </v-alert>
    
                        <v-stepper-header>
    
                            <v-stepper-step :complete="e1 > 1" step="1">Income</v-stepper-step>
    
                            <v-divider></v-divider>
    
                            <v-stepper-step :complete="e1 > 2" step="2">Bills</v-stepper-step>
    
                            <v-divider></v-divider>
    
                            <v-stepper-step :complete="e1 > 3" step="3">Savings</v-stepper-step>
    
                            <v-divider></v-divider>
    
                            <v-stepper-step :complete="e1 > 4" step="4">Housing</v-stepper-step>
    
                            <v-divider></v-divider>
    
                            <v-stepper-step :complete="e1 > 5" step="5">Transportation</v-stepper-step>
    
                        </v-stepper-header>
    
                        <v-stepper-header>
    
                            <v-stepper-step :complete="e1 > 6" step="6">Food</v-stepper-step>
    
                            <v-divider></v-divider>
    
                            <v-stepper-step :complete="e1 > 7" step="7">Health</v-stepper-step>
    
                            <v-divider></v-divider>
    
                            <v-stepper-step :complete="e1 > 8" step="8">Insurance</v-stepper-step>
    
                            <v-divider></v-divider>
    
                            <v-stepper-step :complete="e1 > 9" step="9">Debt</v-stepper-step>
    
                            <v-divider></v-divider>
    
                            <v-stepper-step :complete="e1 > 10" step="10">Entertainment</v-stepper-step>
    
                            <v-divider></v-divider>
    
                            <v-stepper-step :complete="e1 > 11" step="11">Miscellaneous</v-stepper-step>
    
                        </v-stepper-header>
    
                        <v-stepper-items v-for="steper in steps" :key="steper.id">
    
                            <v-stepper-content :step="steper.step">
    
                                <v-card class="mb-5"  height="200px">
    
                                    <h1>{{steper.title}}</h1>
    
                                    <p>{{steper.description}}</p>
    
                                    <v-flex xs12 sm10 md12>
                                    <v-card>
                                    <v-text-field
                                    box :value="currentValue" @input="up"               :rules="[rules.required, rules.nums]"></v-text-field>
                                    <v-text-field
                                    :label="steper.title" :value="currentTitle" @input="makeTitle" :rules="[rules.required]"></v-text-field>
                                    </v-card>
    
                                    </v-flex>
                                     
                                </v-card>
                                    <v-btn
                                    color="primary"
                                    small
                                    @click="submitBudgetItem(steper.id, steper.step)"
                                    >
                                    <v-icon>add</v-icon>Add more items
                                    </v-btn>    
    
                                <v-btn color="primary" @click="submitBudgetItem(steper.id, steper.step)">
    
                                    Continue
    
                                </v-btn>
    
                                <v-btn flat>Cancel</v-btn>
    
                            </v-stepper-content>
    
                        </v-stepper-items>
    
                    </v-stepper>
    
                </v-card>
    
            </v-flex>
    
        </v-layout>
    
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { userInfo } from "os";

export default {
  methods: {
    submitBudgetItem(categoryId, stepId) {
      let id = this.$store.state.userInfo.userId;
      console.log("cat", categoryId);
      console.log("val", this.currentValue);
      console.log("title", this.currentTitle);
      let parsedStep = parseInt(stepId);
      console.log(stepId);
      if (this.currentValue !== 0 && this.currentTitle !== "") {
        let body = {
          categoryId: categoryId,
          userId: id,
          name: this.currentTitle,
          price: this.currentValue
        };
        this.currentValue = 0;
        this.currentTitle = "";
        console.log(body)
        return fetch(`http://localhost:50297/api/BudgetItems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(body)
        }).then(data => {
          this.showAlert(this.alert);
          this.e1 = parsedStep + 1;
        });
      } else {
        this.showBadAlert(this.badAlert);
      }
    },
    up(value) {
      this.currentValue = value;
    },
    makeTitle(value) {
      this.currentTitle = value;
      console.log("title", this.currentTitle);
    },
    showAlert(alert) {
      this.alert = true;

      let timer = this.showAlert.timer;
      if (timer) {
        clearTimeout(timer);
      }
      this.showAlert.timer = setTimeout(() => {
        this.alert = false;
      }, 1700);

      this.elapse = 0.35;
      let t = this.showAlert.t;
      if (t) {
        clearInterval(t);
      }

      this.showAlert.t = setInterval(() => {
        if (this.elapse === 1.5) {
          this.elapse = 0;
          clearInterval(this.showAlert.t);
        } else {
          this.elapse++;
        }
      }, 1000);
    },
    showBadAlert(alert) {
      this.badAlert = true;

      let timer = this.showBadAlert.timer;
      if (timer) {
        clearTimeout(timer);
      }
      this.showBadAlert.timer = setTimeout(() => {
        this.badAlert = false;
      }, 1700);

      this.elapse = 0.35;
      let t = this.showBadAlert.t;
      if (t) {
        clearInterval(t);
      }

      this.showBadAlert.t = setInterval(() => {
        if (this.elapse === 1.5) {
          this.elapse = 0;
          clearInterval(this.showBadAlert.t);
        } else {
          this.elapse++;
        }
      }, 1000);
    }
  },
  computed: {    ...mapState(["user", "userInfo"]),
    ...mapGetters(["user", "userInfo", "categories"]),
    ...mapActions(["getCategories"]),},
  data() {
    return {
      e1: 0,

      steps: [
        {
          id: 11,

          step: "1",

          title: "Income",

          description:
            'Please input your monthly after tax income. If you have more than one source of income, click the "Add More Items" button to add another income source.'
        },

        {
          id: 1,

          step: "2",

          title: "Bills",

          description:
            'Please put in your estimated monthly bills, click the "Add More Items" button to add another bill.'
        },

        {
          id: 10,

          step: "3",

          title: "Savings",

          description:
            'Please put in your monthly savings goal. If you have more than one savings goal, click the "Add More Items" button.'
        },

        {
          id: 9,

          step: "4",

          title: "Housing",

          description:
            'Please input your monthly mortgage or rent payment. If you have more than one housing expenditure, click the "Add More Items" button.'
        },

        {
          id: 8,

          step: "5",

          title: "Transportation",

          description:
            'Please put in your monthly transportation spending. If you have more than one transportaion expenditure, click the "Add More Items" button.'
        },

        {
          id: 7,

          step: "6",

          title: "Food",

          description:
            'Please put in your monthly food budget. If you want to specify different types of food expenditure (e.g. Gocery store, Restaurant) click the "Add More Items" button.'
        },

        {
          id: 6,

          step: "7",

          title: "Health",

          description:
            'Please put in your estimated health budget. If you want to specify different types of health expenditure (e.g. Gym membership, Dr\'s Office visit) click the "Add More Items" button.'
        },

        {
          id: 5,

          step: "8",

          title: "Insurance",

          description:
            'Please put in your monthly Insurance costs. If you want to specify different types of insurance expenditure (e.g. Health, Car) click the "Add More Items" button.'
        },

        {
          id: 4,

          step: "9",

          title: "Debt",

          description:
            'Please put in your monthly debt payments. If you want to specify different types of debt (e.g. Student Loans, Credit Card Payment) click the "Add More Items" button.'
        },

        {
          id: 3,

          step: "10",

          title: "Entertainment",

          description:
            'Please put in your entertainment spending. If you want to specify different types of entertainment spending (e.g. Netflix, Books) click the "Add More Items" button.'
        },

        {
          id: 2,

          step: "11",

          title: "Miscellaneous",

          description:
            "Please put in any other spending that does not fit with the previous categories."
        }
      ],
      currentValue: 0,
      currentTitle: "",
      rules: {
        required: value => {
          if (value !== "" && value !== 0) {
            return !!value || "Required.";
          } else return true;
        },
        nums: value => {
          if (value !== 0) {
            let parsed = parseInt(value);
            const pattern = /^-?\d*\.?\d*$/;
            if (typeof parsed === NaN) {
              explanation = false;
            }
            return pattern.test(parsed) || "Please input numbers";
          } else if (value === 0) {
            return true;
          } else {
            return true;
          }
        }
      },
      alert: false,
      badAlert: false
    };
  }
};
</script>