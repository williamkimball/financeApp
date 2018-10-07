<template>
    <v-card color="white">
        <v-card-text>Insights</v-card-text>
            <section>
        <plaid-link
            env="sandbox"
            publicKey="95104d2d3c88fc884741130acc90b7"
            clientName="Droplets"
            product="transactions"
            v-bind="{ onSuccess }">
            Open Plaid Link
        </plaid-link>
    </section>
    </v-card>
</template>

<script>
import PlaidLink from 'vue-plaid-link'

export default {
    components: { PlaidLink },
    methods: {
        onSuccess (token) {
            console.log(token)
        }
    }
}
</script>