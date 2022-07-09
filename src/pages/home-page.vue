<template>
    <div>
                
            <!-- <div class="flex-1 tx-center letter-s-3 opacity-25 nooverflow" v-if="!accs_length">
                <h1>Web3 <br> {{LANG.appDesc}} <br> (Vue)</h1>
            </div> -->
        <div class="flex-column flex-lg2x-row">


            <div class="flex-column mt-8 pt-8" v-if="!accs_length">
                <div class="flex-center flex-1 my-8" style="min-width: 300px; " >
                    <span @click="connectWallet"
                         class="clickable opacity-hover-75 mx-2 pa-6 border-r-15 n-conve tx-xl mt-8 letter-s-15 tx-center"
                    >
                        {{LANG.connect}} <br> {{LANG.wallet}}
                    </span>
                </div>
                <!-- <hr class="opacity-10 w-50"> -->
                <!-- {{LANG.or}} -->
                <!-- <hr class="opacity-10 w-50"> -->
                <!-- <div class="flex-center flex-1 mb-8" style="min-width: 300px; " >
                    <span @click="register"
                         class="clickable opacity-hover-75 mx-2 pa-6 border-r-15 n-conve tx-xl mt-8 letter-s-15 tx-center"
                    >
                        {{LANG.signup}}
                    </span>
                </div> -->
            </div>
            <div v-if="accs_length">
                <template v-if="current_page == 'exchange'">
                    <div class=" py-8">
                        <h1 class="mt-0 tx-center">Exchange </h1>
                        <h6 class="my-0 tx-center ">
                            <a href="https://github.com/arteesanio/OpenFarm-WebDApp-V1" target="_blank" class="tx-primary">
                                Webb Dapp Github
                            </a>
                        </h6>
                        <h6 class="my-0 tx-center">
                            <a href="https://github.com/arteesanio/OpenFarm-Bank-Contracts" target="_blank" class="tx-primary">
                                Bank Contracts Github
                            </a>
                        </h6>
                        <exchange ref="exchange"/>
                    </div>
                </template>
                <template v-if="current_page == 'roulette'">
                    <div class=" py-8">
                        <h1 class="mt-0 tx-center">Roulette </h1>
                        <roulette v-if="accs_length" />
                    </div>
                </template>
                <template v-if="current_page == 'lottery'">
                    <div class=" py-8">
                        <!-- <h1 class="mt-0 tx-center">Lotto </h1> -->
                        <!-- <h6 class=" tx-center ">
                            <a href="https://github.com/arteesanio/OpenFarm-Lotto-Contracts" target="_blank" class="tx-primary">
                                Contracts Github
                            </a>
                        </h6> -->
                        <lotto v-if="accs_length" />
                    </div>
                </template>
            </div>
        </div>
        <div v-if="accs_length" class="" style="height: 50px"> </div>
        <div class="w-100 flex-center" v-if="loading">
            <infispinner />
        </div>
        <div style="height: 80px" class="show-lg_x"> </div>
        <div class="py-4 my-4 show-xs_lg"></div>
        <footer class="flex-between ">
            <div></div>
            <!-- <div class="n-flat border-r-100p px-2 py-1 ma-4" style="transform: rotate(90deg);"><i class="fa fa-dollar-sign opacity-25 spin-nback tx-secondary"></i></div> -->
            <div class="flex-column">
                <div class="n-inset w-100 tx-center py-2 border-r-t-15 tx-ls-3" style="transform: translateY(5px);">arteesan</div>
                <div class="flex-row"> <social-media /> </div>
            </div>
            <div></div>
        </footer>
        <div class="py-4"></div>


    </div>
</template>
<script>
    import { ethers, Contract }  from 'ethers';
    import { ABIS, CURRENT_NETWORK } from '../store/constants';

    import exchange from "./exchange.vue";
    import txMaker from "./tx-maker.vue";
    import roulette from "./roulette.vue";
    import lotto from "./lotto.vue";
    
    import infispinner from "../components/infispinner.vue";
    import newItem from "../components/new-item.vue";
    import txCard from "../components/tx-card.vue";
    import socialMedia from '../components/social-media.vue';

    export default {
        name: 'home-page',     
        components: {
            infispinner,
            socialMedia, 

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

                    addTargetAllowance: {
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                        
                        "1": {placeholder:"amount",label:`value: '',`,value: ethers.constants.MaxUint256, type: "uint256" },
                    },

                },
            };
        }, 
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            accs_length()           { return this.$store.getters.accs_length },
            first_acc()             { return this.$store.getters.first_acc },
            current_page()         { return this.$store.getters.current_page },
            
            articles() {
                return this.$store.getters.articles;
            },
        },
        mounted()
        {
            document.addEventListener("keydown", (e) => {
                if (e.keyCode == 13 && this.accs_length == 0)
                {
                    console.log("connecting wallet")
                    this.connectWallet()
                }
            })
        },
        methods: {
            async connectWallet() {
                this.loading = true
                await this.$store.dispatch("connectWallet")
                this.loading = false
                // this.$refs.exchange.getTradeData(true)
                // this.$refs.exchange.getAccountBalances(true)
            },
            async register() {
                this.loading = true
                await this.$store.dispatch("connectWallet")
                if (!this.first_acc) return

                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                // console.log("contractAddress",  this.form.contractAddress)
                const theContract = new Contract(CURRENT_NETWORK.BASE_USD_ADDRESS, ABIS.ERC20, USER_WALLET)

                let waiting = await new Promise(async (resolve, reject) => {
                    try {
                        let response = {}

                        // console.log ("this._parsedArgs")
                        // console.log (this._parsedArgs)
                        let aTx = await theContract["approve"].apply(this, [CURRENT_NETWORK.DAO_ADDRESS,ethers.constants.MaxUint256])
                        let aResult = await aTx.wait()
                        resolve(aResult)
                    } catch (error)
                    {
                        reject(error)
                    }
                })
                this.loading = false
                // this.$refs.exchange.getTradeData(true)
                // this.$refs.exchange.getAccountBalances(true)
            },
        },
    }
</script>
