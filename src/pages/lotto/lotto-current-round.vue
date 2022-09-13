<template>
    <div style="z-index: 50">
        <div class="flex-column n-flat border-r-15 mx-2 pa-2 px-4 pos-relative" style="z-index: 2" >  <!-- Prize Pool -->
            <div class="show-lg_x  tx-primary n-tx-s tx-xl" style="position: absolute; top: -100px; z-index: 999">
                <i class="fa fa-2x fa-award"></i>
            </div>

            <h3 class="tx-ls-5 my-2  tx-center">{{LANG.prizePool}} </h3>

            <div v-if="_loadings.daiBalanceOfAndAllowance" class="flex-column opacity-75">
                <i class="fas fa-circle-notch spin-nback"></i>
                <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.walletInfo}}</span>
            </div>
            <div v-if="_loadings.currentRoundAndLastTicket" class="flex-column opacity-75">
                <i class="fas fa-circle-notch spin-nback"></i>
                <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.roundInfo}}</span>
            </div>
            <h1  class=" flex-column  tx-success" style="z-index: 88" v-if="values.prize_pool">
                ${{parseDecimals(values.prize_pool * 0.8)}} 
            </h1>

            <div class="w-100 flex-between tx-sm" >
                <div></div>
                <div @click="togglers.round_advanced = !togglers.round_advanced"
                :class="[togglers.round_advanced ? 'n-inset' : 'n-flat']"
                    class=" clickable pa-2 opacity-hover-50 border-r-50"
                >
                    <i :class="[togglers.round_advanced ? 'fa-minus' : 'fa-plus']" class="fa"></i>
                </div>
            </div>

            <div class="flex-column " v-show="togglers.round_advanced">

                <h6  class="ma-0 flex-column  tx-xs" style="z-index: 88" v-if="values.prize_pool">
                    MAX SINGLE PRIZE: ${{parseDecimals(values.prize_pool * 0.2)}} 
                </h6>
                <div class="tx-xs opacity-50 w-100 flex-column my-3" >
                    <span v-if="values.deadline" >{{values.deadline}}</span>
                    
                </div>
                <div class="flex flex-align-start">

                    <div  class=" flex-column tx-sm  " >
                        <span class="tx-xs">{{LANG.currentRound}}</span>
                        <span class="tx-xl" v-if="values.current_round">{{values.current_round - 1}}</span>
                    </div>

                    <div v-if="dark_mode" style="height: 70px; width: 2px; background: white; display: block;" class="mx-3 mb-3 opacity-10"></div>
                    <div v-if="!dark_mode" style="height: 70px; width: 2px; background: black; display: block;" class="mx-3 mb-3 opacity-10"></div>

                    <tx-card  class=" flex-column  mb-5" 
                        ref="lastTicketNumber"
                        :props="
                            {
                                title: LANG.lastTicketBought,
                                form_args: forms.getProposalPropertyAmountVotes,
                                abi: ABIS.DAO,
                                address: CURRENT_NETWORK.DAO_ADDRESS,
                                function: 'proposals',
                                res_type: 'struct.amountOfVotes.uint',
                                button_only: true,
                                call_only: true,
                            }"
                    />
                </div>
            </div>
        </div>
        <tx-card  v-show="false" ref="prizePool"
            :props="
                {
                    title: 'tokens required',
                    form_args: forms.amountOfTokensRequired,
                    abi: ABIS.DAO,
                    address: CURRENT_NETWORK.DAO_ADDRESS,
                    function: 'proposals',
                    res_type: 'struct.amountOfTokensRequired.uint256',
                    call_only: true,
                }"
        />
        <tx-card v-show="false" ref="currentRound"
            :props="
                {
                    title: LANG.currentRound,
                    form_args: {},
                    abi: ABIS.DAO,
                    address: CURRENT_NETWORK.DAO_ADDRESS,
                    function: 'numProposals',
                    res_type: 'uint',
                    button_only: true,
                    call_only: true,
                }"
        />
        <tx-card v-show="false" ref="deadline"
            :props="
                {
                    title: 'getDeadline ',
                    form_args: forms.getProposalPropertyDeadline,
                    abi: ABIS.DAO,
                    address: CURRENT_NETWORK.DAO_ADDRESS,
                    function: 'proposals',
                    res_type: 'struct.deadline.timestamp',
                    call_only: true,
                }"
        />
    </div>
</template>

<script>
    import { ABIS, CURRENT_NETWORK } from '../../store/constants';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../../store/helpers';

    import txCard from "../../components/tx-card.vue";

    export default {
        name: 'lotto-current-round',   
        props: ["_loadings", "_values"],
        components: {
            txCard,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
                loadings: {
                    currentRoundAndLastTicket: false,
                },

                togglers: {
                    round_advanced: false,
                },
                forms: {
                    getProposalPropertyAmountVotes: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    amountOfTokensRequired: {
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyAmount: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyAmountRequired: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyDeadline: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                },  
                values: {
                    prize_pool: null,
                    deadline: null,
                    current_round: null,
                },  
            }
        },
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            first_acc()             { return this.$store.getters.first_acc },
            pro_mode()              { return this.$store.getters.pro_mode },
            dark_mode()             { return this.$store.getters.dark_mode },
        },
        async mounted()
        {
            // this.forms.DAIBalanceOf["0"].value = this.first_acc.address

            await this.trigger_currentRoundAndLastTicket()

            this.$nextTick(() => {
                console.log("update_currentRound")
                this.$emit("update_currentRound", { data: {
                    current_round: this.values.current_round,
                    prize_pool: this.values.prize_pool,
                }})
            })
        },
        methods: {
            parseDecimals,
            shortAddress,
            trigger_currentRoundAndLastTicket()
            {
                if (this.loadings.currentRoundAndLastTicket) return

                return new Promise(async (resolve,reject) =>
                {
                    this.loadings.currentRoundAndLastTicket = true
                    this.$emit("update_loading", {key: "currentRoundAndLastTicket", value: true, })

                    await this.$refs.currentRound.execute()
                    console.log("this.values.current_round",this.$refs.currentRound._parsedResult)
                    this.values.current_round = this.$refs.currentRound._parsedResult

                    if (this.values.current_round == 0) return this.loadings.currentRoundAndLastTicket = false

                    this.forms.getProposalPropertyAmountVotes["0"].value = (parseInt(this.values.current_round) - 1)+""
                    await this.$refs.lastTicketNumber.execute()

                    this.forms.amountOfTokensRequired["0"].value = (parseInt(this.values.current_round) - 1)+""
                    this.forms.getProposalPropertyAmount["0"].value = (parseInt(this.values.current_round) - 1)+""
                    await this.$refs.prizePool.execute()
                    this.values.prize_pool = parseDecimals(parseFloat(this.$refs.prizePool._parsedResult))

                    this.forms.getProposalPropertyDeadline["0"].value = (parseInt(this.values.current_round) - 1)+""

                    await this.$refs.deadline.execute()
                    this.values.deadline = this.$refs.deadline._parsedResult
                    
                    this.loadings.currentRoundAndLastTicket = false
                    this.$emit("update_loading", {key: "currentRoundAndLastTicket", value: false, })
                    // this.forms.voteOnProposal["0"].value = (parseInt(this.values.current_round) - 1)+""
                    resolve(true)
                })
            },
        },
    }
</script>
