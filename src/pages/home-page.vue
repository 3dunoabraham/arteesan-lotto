<template>
    <div>
        <div class="flex-column flex-lg2x-row">
            <div class="flex-column mt-8 pt-8" v-if="!accs_length">
                <div class="flex-center flex-1 my-8" style="min-width: 300px; " >
                    <span @click="connectWallet"
                         class="clickable opacity-hover-75 mx-2 pa-6 border-r-15 n-conve tx-xl mt-8 letter-s-15 tx-center"
                    >
                        {{LANG.connect}} <br> {{LANG.wallet}}
                    </span>
                </div>
            </div>
            <div v-if="accs_length">
                <template v-if="current_page == 'lottery'">
                    <div class=" py-8">
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
            <div class="flex-column" style="z-index: 99" >
                <div class="n-inset w-100 tx-center py-2 border-r-t-15 tx-ls-3" style="transform: translateY(5px);">arteesan</div>
                <div class="flex-row"> <social-media  /> </div>
            </div>
            <div></div>
        </footer>
        <div class="py-4"></div>
    </div>
</template>
<script>
    import { ethers, Contract }  from 'ethers';
    import { ABIS, CURRENT_NETWORK } from '../store/constants';

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

            lotto,

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
            },
            async register() {
                this.loading = true
                await this.$store.dispatch("connectWallet")
                if (!this.first_acc) return

                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                const theContract = new Contract(CURRENT_NETWORK.BASE_USD_ADDRESS, ABIS.ERC20, USER_WALLET)

                let waiting = await new Promise(async (resolve, reject) => {
                    try {
                        let response = {}

                        let aTx = await theContract["approve"].apply(this, [CURRENT_NETWORK.DAO_ADDRESS,ethers.constants.MaxUint256])
                        let aResult = await aTx.wait()
                        resolve(aResult)
                    } catch (error)
                    {
                        reject(error)
                    }
                })
                this.loading = false
            },
        },
    }
</script>
