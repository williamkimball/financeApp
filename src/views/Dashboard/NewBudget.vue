<template>
    <v-container>
    
        <v-layout row>
    
            <v-flex xs12 md8 offset-md2>
    
                <v-card color="white">
    
                    <v-stepper v-model="e1">
    
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
                                    :label="steper.title"  box :value="currentValue" @input="up"></v-text-field>
                                    <v-text-field
                                     placeholder="Name" box :value="currentTitle" @input="makeTitle"></v-text-field>
                                    </v-card>
    
                                    </v-flex>
                                     
                                </v-card>
                                    <v-btn
                                    color="primary"
                                    small
                                    @click="submitBudgetItem()"
                                    >
                                    <v-icon>add</v-icon>Add more items
                                    </v-btn>    
    
                                <v-btn color="primary" @click="e1 = parseInt(steper.step) + 1; submitBudgetItem(steper.id)">
    
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
export default {
  methods: {
    submitBudgetItem(categoryId) {
      let id = sessionStorage.getItem("userId");
      console.log(categoryId);
      console.log(this.currentValue);
      console.log(this.currentTitle);
      let body = {
        categoryId: categoryId,
        userId: id,
        name: this.currentTitle,
        price: this.currentValue
      };
      return fetch(`http://localhost:50297/api/BudgetItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
      }).then(data => {
        this.currentValue = 0;
        this.currentTitle = "";
      });
    },
    up(value) {
      this.currentValue = value;
    },
    makeTitle(value) {
      this.currentTitle = value;
      console.log(this.currentTitle)
    }
  },
  computed: {

  },
  data() {
    return {
      e1: 0,

      steps: [
        {
          id: 0,

          step: "0",

          title: "Budget Creation",

          description:
            "This form will take your general budget. Later on you will be able to add more specific items if you so wish."
        },
        {
          id: 11,

          step: "1",

          title: "Set Income",

          description: "Please input your monthly after tax income."
        },

        {
          id: 1,

          step: "2",

          title: "Bills",

          description: "Please put in your estimated total monthly bills."
        },

        {
          id: 10,

          step: "3",

          title: "Savings",

          description: "Please put in your monthly savings goal."
        },

        {
          id: 9,

          step: "4",

          title: "Housing",

          description: "Please input your monthly mortgage or rent payment."
        },

        {
          id: 8,

          step: "5",

          title: "Transportation",

          description: "Please put in your monthly transportation spending."
        },

        {
          id: 7,

          step: "6",

          title: "Food",

          description: "Please put in your monthly food budget."
        },

        {
          id: 6,

          step: "7",

          title: "Health",

          description: "Please put in your estimated health budget."
        },

        {
          id: 5,

          step: "8",

          title: "Insurance",

          description: "Please put in your monthly Insurance costs."
        },

        {
          id: 4,

          step: "9",

          title: "Debt",

          description: "Please put in your monthly debt payments."
        },

        {
          id: 3,

          step: "10",

          title: "Entertainment",

          description: "Please put in your entertainment spending."
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
      currentTitle: ""
    };
  }
};
</script>