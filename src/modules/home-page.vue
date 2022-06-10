<template>
    <div>
        <div class="flex-column flex-lg2x-row">
            <div class="flex-center flex-1 my-8" style="min-width: 300px; " v-if="!accs_length">
                <span @click="connectWallet"
                     class="clickable opacity-hover-75 mx-2 pa-6 border-r-15 n-conve tx-xl mt-8 letter-s-15 tx-center"
                >
                    {{LANG.connect}} <br> {{LANG.wallet}}
                </span>
            </div>

            <!-- <exchange ref="exchange"/> -->
            <div class="flex-1 tx-center letter-s-15 opacity-50">
                <h1>{{LANG.welcome}} <br> to my <br> Portfolio </h1>
            </div>
            
        </div>
        <div class="w-100 flex-center" v-if="loading">
            <infispinner />
        </div>

        <!-- <farms v-if="accs_length" /> -->
        <!-- <tx-maker v-if="accs_length" /> -->
        <div  v-if="accs_length" >
            <!-- <tx-maker v-if="accs_length" /> -->
            <hr class="w-50 opacity-10">
            <h1 class="tx-center">Dashboard </h1>
            <div class="flex-wrap">
                <tx-card  class="n-flat flex-column pa-5 ma-2" style="width: 260px"
                    :props="
                        {
                            form_args: form.txCard1,
                            abi: ABIS.ROUTER,
                            address: CURRENT_NETWORK.BANK_ADDRESS,
                            function: 'factory',
                        }"
                />
                <tx-card class="n-flat flex-column pa-5 ma-2" style="width: 260px"
                    :props="
                        {
                            title: 'Test',
                            form_args: form.txCard2,
                            abi: ABIS.FACTORY,
                            advanced: true
                        }"
                />
                <tx-card class="n-flat flex-column pa-5 ma-2" style="width: 260px"
                    :props="
                        {
                            form_args: form.txCard3,
                            address: CURRENT_NETWORK.BANK_ADDRESS,
                            abi: ABIS.FACTORY,
                        }"
                />
            </div>
        </div>

    </div>
</template>
<script>
    import infispinner from "../components/infispinner.vue";
    import newItem from "../components/new-item.vue";
    import exchange from "./exchange.vue";
    import txMaker from "./tx-maker.vue";
    import txCard from "../components/tx-card.vue";

    import { ABIS, CURRENT_NETWORK } from '../store/constants';

    export default {
        name: 'home-page',     
        components: {
            infispinner,

            exchange,
            txMaker,
            txCard,

            newItem,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
                form: {
                    txCard1: {"0": { value: "", }, },
                    txCard2: {"0": { value: "", }, },
                    txCard3: {"0": { value: "", }, "1": { value: "", }, "2": { value: "", }, },
                },
            };
        }, 
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            accs_length()           { return this.$store.getters.accs_length },
            
            articles() {
                return this.$store.getters.articles;
            },
        },
        mounted()
        {

        },
        methods: {
            async connectWallet() {
                await this.$store.dispatch("connectWallet")
                // this.$refs.exchange.getTradeData(true)
                // this.$refs.exchange.getAccountBalances(true)
            },
        },
    }
</script>
