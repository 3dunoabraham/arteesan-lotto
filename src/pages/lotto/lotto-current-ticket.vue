<template>
    <div >
        <div class="flex-column  n-flat border-r-25 mx-8 pa-2 pos-relative" style="z-index: 2" > <!-- Buy Ticket -->

            <!-- <h5 class="tx-ls-5 my-2 tx-center opacity-50">OPEN LOTTO </h5>
            <hr class="w-100 opacity-10 "> -->
            <div class="show-lg_x  n-tx-s tx-xl"  style="color: #0b85ff; position: absolute; top: -55px;"><i class="fa fa-store"></i></div>

            <h5 class="tx-ls-5 my-2 tx-center opacity-50"> {{LANG.myTicket.toUpperCase() }} </h5>

            <hr class="w-100 opacity-10 ">

            <div v-if="_loadings.daiBalanceOfAndAllowance" class="flex-column opacity-75">
                <i class="fas fa-circle-notch spin-nback"></i>
                <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.walletInfo}}</span>
            </div>

            <div v-if="_loadings.currentRoundAndLastTicket" class="flex-column opacity-75">
                <i class="fas fa-circle-notch spin-nback"></i>
                <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.roundInfo}}</span>
            </div>

            <div v-if="!!values.accountVoteIndex" class="flex-column">
                <div class="flex">
                    <div v-if="values.accountVoteIndex == 1" class="flex-column">
                        <span class="tx-xs">Ticket Number: </span>
                        <span class="tx-xl">1</span>
                    </div>
                    <div v-if="values.accountVoteIndex > 1" class="flex-column">
                        <span class="tx-xs">Ticket Pack Number: </span>
                        <span class="tx-xl">{{values.accountVoteIndex}}</span>
                    </div>

                    <div v-if="dark_mode" style="height: 70px; width: 2px; background: white; display: block;" class="mx-3 mb-3 opacity-10"></div>
                    <div v-if="!dark_mode" style="height: 70px; width: 2px; background: black; display: block;" class="mx-3 mb-3 opacity-10"></div>

                    <div v-if="values.accountVoteLength > 0" class="flex-column">
                        <span class="tx-xs">Ticket Length: </span>
                        <span class="tx-xl">{{values.accountVoteLength}}</span>
                    </div>
                </div>
            </div>


            <template v-if="_values.dai_dao_allowance > 0 && !_loadings.daiBalanceOfAndAllowance && !_loadings.currentRoundAndLastTicket" >

                <div v-if="!values.accountVoteIndex" class="  flex-column tx-sm w-100" >
                    <div class="" v-if="!values.val_randomResultBlock" >

                        <div class="flex-row n-inset border-r-25 " v-if="!togglers.buy_advanced3">
                            <div @click="togglers.buy_advanced3 = true"  
                                class="pt- pa-3 px-1 clickable opacity-hover-75 border-r-15    mb-6 mx-5"
                            >
                                <div v-if="loadings.buyTicket" class="flex-column opacity-75 mb-1">
                                    <i class="fas fa-circle-notch spin-nback"></i>
                                    <span class="opacity-75  tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                                </div>
                                <div class="flex-row tx-xl flex-column ">
                                    <div class="pr-1 tx-lg n-tx-3d tx-ls-3">{{LANG.buy}}</div>
                                    <!-- <div v-if="!!form.form_buyTicketAmount" class="mx-2 tx-lg">{{form.form_buyTicketAmount}}</div> -->
                                    <div class="n-tx-3d tx-ls-">Ticket 
                                        <!-- <span v-if="form.form_buyTicketAmount > 1">(s)</span> -->
                                    </div>
                                    <div class="n-tx-3d hover-hover"><i class=" fa fa-hand-pointer"></i></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="opacity-50 tx-xs my-5" v-if="!!values.val_randomResultBlock">
                        Round Done
                    </div>
                </div>
        </div>
        <tx-card v-show="false" ref="accountVoteIndex"
            :props="
                {
                    title: 'user vote index',
                    form_args: forms.getVoterVoteIndex,
                    abi: ABIS.DAO,
                    address: CURRENT_NETWORK.DAO_ADDRESS,
                    function: 'getVoterVoteIndex',
                    call_only: true,
                    res_type: 'uint',
                    advanced: true,
                }"
        />
        <tx-card v-show="false" ref="ticketLength"
            :props="
                {
                    title: 'user votes',
                    form_args: forms.getVoterAmountOfVotes,
                    abi: ABIS.DAO,
                    address: CURRENT_NETWORK.DAO_ADDRESS,
                    function: 'getVoterAmountOfVotes',
                    DEBUG: true,
                    res_type: 'uint',
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
        name: 'lotto-current-ticket',   
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
                },

                togglers: {
                    buy_advanced3: false,
                },
                forms: {
                    getVoterVoteIndex: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    voteOnProposal: {
                        "0": {placeholder:"Round",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"Amount of Votes",label:`value: '',`,value: '', type: "uint" },
                        "2": {placeholder:"Refferal",label:`value: "",`,value: "", type: "address" },
                    },
                    getVoterAmountOfVotes: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                },  
                values: {
                    accountVoteIndex: null,
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
            this.forms.getVoterVoteIndex["1"].value = this.first_acc.address
            this.forms.getVoterAmountOfVotes["1"].value = this.first_acc.address
            this.forms.voteOnProposal["2"].value = this.first_acc.address

            await this.trigger_currentTicket()

            this.$emit("update_currentTicket", { data: {
                accountVoteIndex: this._values.accountVoteIndex,
                // prize_pool: this.values.prize_pool,
            }})
        },
        methods: {
            parseDecimals,
            shortAddress,
            trigger_currentTicket()
            {
                if (this.loadings.currentTicket) return

                return new Promise(async (resolve,reject) =>
                {
                    this.loadings.currentTicket = true
                    this.$emit("update_loading", {key: "currentTicket", value: true, })

                    try {
                        this.forms.getVoterVoteIndex["0"].value = (parseInt(this._values.current_round) - 1)+""
                        await this.$refs.accountVoteIndex.execute().catch()
                        this.values.accountVoteIndex = this.$refs.accountVoteIndex._parsedResult

                        // this.forms.getVoterAmountOfVotes["0"].value = (parseInt(this._values.current_round) - 1)+""
                        // await this.$refs.ticketLength.execute()
                        // this.values.accountVoteLength = this.$refs.ticketLength._parsedResult

                        // this.form.form_multiCallResultsStart = this.$refs.accountVoteIndex._parsedResult
                        // this.form.form_multiCallResultsEnd = this.$refs.accountVoteIndex._parsedResult+this.values.accountVoteLength

                        // try {
                        //     this.form.form_getVoterRefAmount["0"].value = (parseInt(this.values.current_round) - 1)+""
                        //     await this.$refs.ref_getVoterRefAmount.execute()
                        //     this.values.val_getVoterRefAmount = this.$refs.ref_getVoterRefAmount._parsedResult

                        //     this.form.withdrawRefBonus["0"].value = (parseInt(this.values.current_round) - 1)+""
                        // } catch (error) {
                        // }

                        // this.form.form_getProposalPropertyResultBlock["0"].value = (parseInt(this.values.current_round) - 1)+""
                        // await this.$refs.ref_randomResultBlock.execute()
                        // this.values.val_randomResultBlock = this.$refs.ref_randomResultBlock._parsedResult
                        // // randomResultBlock

                        // this.form.form_getVoteScratchedNumberMulticall["0"].value = (parseInt(this.values.current_round) - 1)+""
                        resolve(true)
                    } catch (error) {
                        console.log("no vote found")
                        this.values.accountVoteIndex = 0
                    }

                    this.forms.voteOnProposal["0"].value = (parseInt(this._values.current_round) - 1)+""
                    
                    this.loadings.currentTicket = false
                    this.$emit("update_loading", {key: "currentTicket", value: false, })
                })
            },
        },
    }
</script>
