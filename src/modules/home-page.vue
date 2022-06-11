<template>
    <div>
            <div class="flex-1 tx-center letter-s-3 opacity-50">
                <h1>Web3 <br> {{LANG.appDesc}} <br> (Vue)</h1>
            </div>
        <div class="flex-column flex-lg2x-row">


            <div class="flex-center flex-1 my-8" style="min-width: 300px; " v-if="!accs_length">
                <span @click="connectWallet"
                     class="clickable opacity-hover-75 mx-2 pa-6 border-r-15 n-conve tx-xl mt-8 letter-s-15 tx-center"
                >
                    {{LANG.connect}} <br> {{LANG.wallet}}
                </span>
            </div>
            <div v-if="accs_length">
                <div class="n-inset border-r-50 ma-8 pa-4">
                    <h1 class="mt-0 tx-center">Exchange </h1>
                    <exchange ref="exchange"/>
                </div>
                <div class="n-inset border-r-50 ma-8 pa-4">
                    <h1 class="mt-0 tx-center">Roulette </h1>
                    <roulette v-if="accs_length" />
                </div>
                <div class="n-inset border-r-50 ma-8 pa-4">
                    <h1 class="mt-0 tx-center">Lotto </h1>
                    <lotto v-if="accs_length" />
                </div>
            </div>
            
        </div>
        <div class="w-100 flex-center" v-if="loading">
            <infispinner />
        </div>


    </div>
</template>
<script>
    import infispinner from "../components/infispinner.vue";
    import newItem from "../components/new-item.vue";
    import txCard from "../components/tx-card.vue";
    
    import exchange from "./exchange.vue";
    import txMaker from "./tx-maker.vue";
    import roulette from "../modules/roulette.vue";
    import lotto from "../modules/lotto.vue";

    import { ABIS, CURRENT_NETWORK } from '../store/constants';

    export default {
        name: 'home-page',     
        components: {
            infispinner,

            exchange,
            roulette,
            lotto,

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
                    approveCard: {"0": { value: CURRENT_NETWORK.CONTROLLER_ADDRESS, }, "1": { value: "", }, },
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
                this.loading = true
                await this.$store.dispatch("connectWallet")
                this.loading = false
                // this.$refs.exchange.getTradeData(true)
                // this.$refs.exchange.getAccountBalances(true)
            },
        },
    }
</script>
